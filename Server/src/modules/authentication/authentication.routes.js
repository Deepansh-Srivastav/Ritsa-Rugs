import { Router } from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
    createUserController,
    updateUserDetailsController,
    getUserDetailsController,
    softDeleteUserController
} from "./userController.js";

const authRouter = Router();

// authRouter.post("/register-user", createUserController);
// authRouter.get("/get-user-details", authMiddleware, getUserDetailsController);
// authRouter.put("/update-user-details", authMiddleware, updateUserDetailsController);
// authRouter.delete("/delete-user", authMiddleware, softDeleteUserController);

export default authRouter;