import { Router } from "express";
import authMiddleware from "../../middlewares/auth.js";
import { createUserController } from "./userController.js";

const userRouter = Router();

userRouter.post("/register", createUserController);
// userRouter.post("/login", authMiddleware, getUserById);
// userRouter.post("/logout", authMiddleware, updateUser);
// userRouter.get("/:id", authMiddleware, deleteUser);
// userRouter.delete("/:id", authMiddleware, deleteUser);

export default userRouter;