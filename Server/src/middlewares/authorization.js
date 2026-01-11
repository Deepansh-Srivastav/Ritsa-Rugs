import AppError from "../utils/AppError.js";

export default async function authorizationMiddleware(req, res, next) {
    try {
        const user = req.user;

        if (!user?.role || user?.role !== "admin") {
            AppError("Access denied. Admin role required.", 403);
        };

        next();

    } catch (err) {
        next(err);
    }
};