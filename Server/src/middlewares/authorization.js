import { validateAdminUser } from "../services/authorization.service.js";
import AppError from "../utils/AppError.js";

export default async function authorizationMiddleware(req, res, next) {
    try {
        // const authorize = await validateAdminUser(req.user);

        if (user?.role !== "admin") {
                AppError("Access denied. Admin role required.", 403);
           };


        console.log("NEXT WILL RUN HERE");
        next();

    } catch (err) {
        next(err);
    }
};