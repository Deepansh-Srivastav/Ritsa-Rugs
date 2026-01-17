import axios from "axios";
import qs from "qs";
import AppError from "../utils/appError.js";
import User from "../modules/user/user.model.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/token.generator.js";
import { googleOAuthConfig } from "../config/googleOAuth.config.js";

export async function handleGoogleAuth(code) {
    if (!code) {
        AppError("Authorization code missing", 400);
    }

    // 🔥 THIS IS THE CRITICAL FIX
    const tokenPayload = qs.stringify({
        client_id: googleOAuthConfig.clientId,
        client_secret: googleOAuthConfig.clientSecret,
        redirect_uri: googleOAuthConfig.redirectUri,
        grant_type: "authorization_code",
        code,
    });

    let tokenResponse;
    try {
        tokenResponse = await axios.post(
            googleOAuthConfig.tokenUrl,
            tokenPayload,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
    } catch (err) {
        console.error("Google token error:", err.response?.data);
        AppError("Failed to exchange Google auth code", 401);
    }

    const { id_token } = tokenResponse.data;

    if (!id_token) {
        AppError("Google ID token missing", 401);
    }

    // Verify token
    const googleUser = await axios.get(
        `${googleOAuthConfig.tokenInfoUrl}?id_token=${id_token}`
    );

    const { email, name } = googleUser.data;

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            name,
            email,
            authProvider: "google",
        });
    }

    const payload = { userId: user._id, role: user.role };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    user.lastLoginAt = new Date();
    await user.save();

    return { accessToken, refreshToken };
}