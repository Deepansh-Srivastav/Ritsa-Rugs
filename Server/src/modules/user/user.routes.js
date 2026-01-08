import { Router } from "express";
import authMiddleware from "../../middlewares/auth.js";

const userRouter = Router();

// userRouter.post("/register", getUsers);
// userRouter.post("/login", authMiddleware, getUserById);
// userRouter.post("/logout", authMiddleware, updateUser);
// userRouter.get("/:id", authMiddleware, deleteUser);
// userRouter.delete("/:id", authMiddleware, deleteUser);

export default userRouter;