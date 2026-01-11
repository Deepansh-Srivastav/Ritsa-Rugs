import { loginUser } from "../../services/auth.service.js";

export async function adminLoginController(req, res, next) {
    try {
        const result = await loginUser(req.body, true);

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
    };
};