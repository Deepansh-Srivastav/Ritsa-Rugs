import { Router } from "express";
import authenticationMiddleware from "../../middlewares/auth.js";
import { loginUserController, logoutUserController, googleOAuthController } from "./authentication.controller.js";

const authRouter = Router();

authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutUserController);
authRouter.get("/google/callback", googleOAuthController);

export default authRouter;