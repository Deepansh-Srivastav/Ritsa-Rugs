import { Router } from "express";
import authMiddleware from "../../middlewares/auth.js";
import { loginUserController, logoutUserController } from "./authentication.controller.js";

const authRouter = Router();

authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutUserController);

export default authRouter;