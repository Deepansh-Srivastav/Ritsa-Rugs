import AppError from "../utils/AppError.js";
import User from "../modules/user/user.model.js";

export async function validateAdminUser(user) {

    if (user?.role !== "admin") {
         AppError("Access denied. Admin role required.", 403);
    };

    return;

};

// role: 'user