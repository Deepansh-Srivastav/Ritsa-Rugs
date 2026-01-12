import { Router } from "express";
import authenticationMiddleware from "../../middlewares/auth.js";
import authorizationMiddleware from "../../middlewares/authorization.js";
import { adminLoginController } from "./admin.controller.js";
import {
    createProductController,
    updateProductController,
    deleteProductController
} from "../product/product.controller.js"

const adminRouter = Router();

adminRouter.post("/login", adminLoginController);

adminRouter.post("/create-product", authenticationMiddleware, authorizationMiddleware, createProductController);
adminRouter.put("/update-product/:productId", authenticationMiddleware, authorizationMiddleware, updateProductController);
adminRouter.delete("/delete-product/:productId", authenticationMiddleware, authorizationMiddleware, deleteProductController);

export default adminRouter;