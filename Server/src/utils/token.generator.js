import jwt from "jsonwebtoken";

export function generateAccessToken(payload) {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
    );
};

export function generateRefreshToken(payload) {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "25s" }
    );
};