import { Router } from "express";
import authMiddleware from "../../middlewares/auth.js";
import authorizationMiddleware from "../../middlewares/authorization.js";
import { adminLoginController } from "./admin.controller.js";

const adminRouter = Router();

adminRouter.post("/login", adminLoginController)

export default adminRouter;