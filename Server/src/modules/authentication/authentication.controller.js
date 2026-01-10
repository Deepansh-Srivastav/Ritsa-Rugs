import { loginUser, logoutUser } from "../../services/auth.service.js";

export const loginUserController = async (req, res, next) => {
    try {
        const result = await loginUser(req.body);

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

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

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        next(err);
    }
};