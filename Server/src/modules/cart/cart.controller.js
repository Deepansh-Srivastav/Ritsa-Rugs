import {
    getCart,
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
} from "../../services/cart.service.js";

export const addToCartController = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        const cart = await addToCart(
            req.user.id,
            productId,
            quantity
        );

        res.status(200).json({
            success: true,
            error: false,
            message: "Item added to cart",
            data: cart,
        });
    } catch (err) {
        next(err);
    }
};

export const getCartController = async (req, res, next) => {
    try {
        const cart = await getCart(req.user.id);
        res.status(200).json({
            success: true,
            error: false,
            message: "Cart fetched successfully",
            data: cart,
        });
    } catch (err) {
        next(err);
    }
};

export const updateCartItemQuantityController = async (req, res, next) => {
    try {
        const { productId, action } = req.body;

        const cart = await updateCartItemQuantity(
            req.user.id,
            productId,
            action
        );

        res.status(200).json({
            success: true,
            error: false,
            message: "Cart updated successfully",
            data: cart,
        });
    } catch (err) {
        next(err);
    }
};

export const removeCartItemController = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const cart = await removeCartItem(
            req.user.id,
            productId
        );

        res.status(200).json({
            success: true,
            error: false,
            message: "Item removed from cart",
            data: cart,
        });
    } catch (err) {
        next(err);
    }
};
