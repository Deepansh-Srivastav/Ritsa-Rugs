import { Router } from "express";
import authenticationMiddleware from "../../middlewares/auth.js";
import {
    addToCartController,
    getCartController,
    updateCartItemQuantityController,
    deleteCartItemController
} from "./cart.controller.js"

const cartRouter = Router();

cartRouter.use(authenticationMiddleware);

cartRouter.post("/add-cart-item", addToCartController);
cartRouter.get("/get-all-cart-items", getCartController);
cartRouter.put("/update-cart-item-quantity", updateCartItemQuantityController);
cartRouter.delete("/delete-cart-item/:productId", deleteCartItemController);

export default cartRouter;