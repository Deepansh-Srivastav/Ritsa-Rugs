import { loginUser, logoutUser, refreshToken } from "../../services/auth.service.js";
import { handleGoogleOAuth } from "../../services/googleOAuth.service.js";
import { googleOAuthConfig } from "../../config/googleOAuth.config.js";
import { removeItemFromCookie, setItemInCookie } from "../../utils/cookie.utils.js";

export const loginUserController = async (req, res, next) => {
    try {
        const result = await loginUser(req.body);
        const isProd = process.env.NODE_ENV === "production";

        setItemInCookie(res, "refreshToken", result.refreshToken);

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken: result.accessToken,
            user: result.user
        });
    } catch (err) {
        next(err);
    }
};

export const logoutUserController = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        await logoutUser(refreshToken);

        removeItemFromCookie(res, "refreshToken");

        res.status(200).json({
            success: true,
            error: false,
            message: "Logged out successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const googleRedirectController = (req, res) => {
    const url =
        `${googleOAuthConfig.authUrl}?` +
        `client_id=${googleOAuthConfig.clientId}` +
        `&redirect_uri=${googleOAuthConfig.redirectUri}` +
        `&response_type=code` +
        `&scope=openid%20email%20profile`;

    res.redirect(url);
};

export const googleCallbackController = async (req, res, next) => {
    try {
        const { code } = req.query;

        const { accessToken, refreshToken } =
            await handleGoogleOAuth(code);

        setItemInCookie(res, "refreshToken", refreshToken);

        const URL = process.env.NODE_ENV === "production" ? process.env.PROD_URL : process.env.DEV_URL

        res.redirect(
            `${URL}/oauth-success?token=${accessToken}`
        );
    } catch (err) {
        next(err);
    }
};

export async function googleOAuthController(req, res, next) {
    try {
        const { code } = req.query;

        const { accessToken, refreshToken } = await handleGoogleOAuth(code);

        setItemInCookie(res, "refreshToken", refreshToken);

        const URL = process.env.NODE_ENV === "production" ? process.env.PROD_URL : process.env.DEV_URL

        res.redirect(
            `${URL}/oauth-success?token=${accessToken}`
        );
    } catch (err) {
        next(err);
    };
};

export async function refreshAccessTokenController(req, res, next) {
    let token = null;

    try {
        token = req.cookies.refreshToken;

        const { accessToken } = await refreshToken(token);

        res.status(200).json({
            error: false,
            success: true,
            message: "access token generated successfully",
            data: {
                accessToken
            }
        });
    } catch (error) {

        await logoutUser(token);

        removeItemFromCookie(res, "refreshToken");

        next(error)
    };
};