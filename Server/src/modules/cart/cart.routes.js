import { Router } from "express";
import authenticationMiddleware from "../../middlewares/auth.js";
import {
    addToCartController,
    getCartController,
    updateCartItemQuantityController,
    removeCartItemController,
} from "./cart.controller.js"

const cartRouter = Router();

cartRouter.use(authenticationMiddleware);

cartRouter.post("/add-cart-item", addToCartController);
cartRouter.get("/get-all-cart-items", getCartController);
cartRouter.put("/update-cart-item-quantity", updateCartItemQuantityController);

export default cartRouter;