import { Router } from "express";
import authenticationMiddleware from "../../middlewares/auth.js";
import {
    loginUserController,
    logoutUserController,
    googleCallbackController,
    googleRedirectController,
    refreshAccessTokenController
}
    from "./authentication.controller.js";

const authRouter = Router();

authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutUserController);
authRouter.post("/refresh-token", refreshAccessTokenController);

authRouter.get("/google", googleRedirectController);
authRouter.get("/google/callback", googleCallbackController);

export default authRouter;