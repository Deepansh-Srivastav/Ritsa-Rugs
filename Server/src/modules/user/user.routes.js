import { Router } from "express";
import authenticationMiddleware from "../../middlewares/auth.js";
import {
    createUserController,
    updateUserDetailsController,
    getUserDetailsController,
    softDeleteUserController
} from "./userController.js";

const userRouter = Router();

userRouter.post("/register-user", createUserController);
userRouter.get("/get-user-details", authenticationMiddleware, getUserDetailsController);
userRouter.put("/update-user-details", authenticationMiddleware, updateUserDetailsController);
userRouter.delete("/delete-user", authenticationMiddleware, softDeleteUserController);

export default userRouter;