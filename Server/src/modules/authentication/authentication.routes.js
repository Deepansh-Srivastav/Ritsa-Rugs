import { Router } from "express";
import authMiddleware from "../../middlewares/auth.js";
import { loginUserController } from "./authentication.controller.js";

const authRouter = Router();

authRouter.post("/auth/login", loginUserController);

export default authRouter;