import axios from "axios";
import qs from "qs";
import AppError from "../utils/appError.js";
import User from "../modules/user/user.model.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/token.generator.js";
import { googleOAuthConfig } from "../config/googleOAuth.config.js";

export async function handleGoogleOAuth(code) {
    if (!code) AppError("Authorization code missing", 400);

    // Exchange code → tokens (FORM ENCODED)
    const payload = qs.stringify({
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
            payload,
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
    } catch (err) {
        console.error("Google token error:", err.response?.data);
        AppError("Google token exchange failed", 401);
    }

    const { id_token } = tokenResponse.data;

    const googleUser = await axios.get(
        `${googleOAuthConfig.tokenInfoUrl}?id_token=${id_token}`
    );

    console.log('This is the data', googleUser.data);

    const { email, name, picture } = googleUser.data;

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            name,
            email,
            avatar: picture,
            authProvider: "google",
        });
    }

    if (!user.isActive) {
        AppError("Account deactivated", 403);
    }

    const payloadJwt = { userId: user._id, role: user.role };

    const accessToken = generateAccessToken(payloadJwt);
    const refreshToken = generateRefreshToken(payloadJwt);

    user.refreshToken = refreshToken;
    user.lastLoginAt = new Date();
    await user.save();

    return { accessToken, refreshToken };
}