import { Router } from "express";
import authenticationMiddleware from "../../middlewares/auth.js";
import {
    getAllProductsController,
    getProductController,
} from "../product/product.controller.js";

const productRouter = Router();

productRouter.use(authenticationMiddleware);

productRouter.get("/get-all-products", getAllProductsController);
productRouter.get("/get-product/:slug", getProductController);

export default productRouter;