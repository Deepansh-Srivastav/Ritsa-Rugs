import { Router } from "express";
import authMiddleware from "../../middlewares/auth.js";
import { greetUser } from "./userController.js";

const userRouter = Router();

userRouter.get("/hello", greetUser);

// userRouter.post("/register", getUsers);
// userRouter.post("/login", authMiddleware, getUserById);
// userRouter.post("/logout", authMiddleware, updateUser);
// userRouter.get("/:id", authMiddleware, deleteUser);
// userRouter.delete("/:id", authMiddleware, deleteUser);

export default userRouter;