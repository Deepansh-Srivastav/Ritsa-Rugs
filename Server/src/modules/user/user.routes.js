import { Router } from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
    createUserController,
    updateUserDetailsController,
    getUserDetailsController,
    softDeleteUserController
} from "./userController.js";

const userRouter = Router();

userRouter.post("/register-user", createUserController);
userRouter.get("/get-user-details", authMiddleware, getUserDetailsController);
userRouter.put("/update-user-details", authMiddleware, updateUserDetailsController);
userRouter.delete("/delete-user", authMiddleware, softDeleteUserController);

export default userRouter;