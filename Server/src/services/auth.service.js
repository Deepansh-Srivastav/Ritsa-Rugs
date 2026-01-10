import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import User from "../modules/user/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.generator.js";

export async function validateAuthenticatedUser(userId) {
    const user = await User.findById(userId);

    if (!user) {
        AppError("User no longer exists", 401);
    };

    if (!user.isActive) {
        AppError("Account is deactivated", 403);
    };

    return {
        id: user._id,
        role: user.role,
    };
};

export async function loginUser({ email, password }) {

    if (!email || !password) {
        AppError("Email and password are required", 400);
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail })
        .select("+password");

    if (!user) {
        AppError("Invalid email or password", 401);
    }

    if (!user.isActive) {
        AppError("Account is deactivated", 403);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        AppError("Invalid email or password", 401);
    }

    // generate tokens
    const payload = {
        userId: user._id,
        role: user.role
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // store refresh token (important)
    user.refreshToken = refreshToken;
    user.lastLoginAt = new Date();
    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

export async function logoutUser(refreshToken) {
    if (!refreshToken) {
        AppError("No active session", 400);
    }

    const user = await User.findOne({ refreshToken });

    if (!user) {
        // token already invalidated → idempotent logout
        return;
    }

    user.refreshToken = null;
    await user.save();
}