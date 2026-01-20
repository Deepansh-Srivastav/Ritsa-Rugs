import userService from "../../services/user.service.js"

export async function createUserController(req, res, next) {
    try {
        const userData = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            error: false,
            message: "User created successfully",
            data: userData,
        });

    } catch (err) {
        next(err);
    }
};

export async function getUserDetailsController(req, res, next) {
    try {
        const { userId } = req.params;

        const userData = await userService.getUserById(userId);

        res.status(200).json({
            success: true,
            error: false,
            data: userData,
        });
    } catch (err) {
        next(err);
    }
};

export async function updateUserDetailsController(req, res, next) {
    try {
        const { userId } = req.params;

        const user = await userService.updateUserById(userId, req.body);

        res.status(200).json({
            success: true,
            error: false,
            message: "User updated successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

export async function softDeleteUserController(req, res, next) {
    try {
        const { userId } = req.params;

        const user = await userService.softDeleteUserById(userId);

        res.status(200).json({
            success: true,
            error: false,
            message: "Account deleted successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    };
};