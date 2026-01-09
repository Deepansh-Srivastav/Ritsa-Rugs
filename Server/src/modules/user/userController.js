import userService from "../../services/user.service.js"

export async function createUserController(req, res, next) {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

