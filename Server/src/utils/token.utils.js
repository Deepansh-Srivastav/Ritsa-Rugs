import jwt from "jsonwebtoken";
import AppError from "./AppError.js";

export function extractAccessToken(req) {

    if (req.cookies && req.cookies.accessToken) {
        return req.cookies.accessToken;
    }

    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }

    AppError("Authentication required", 401);
};

export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        AppError("Invalid or expired token", 401);
    }
};