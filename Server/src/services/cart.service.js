import Cart from "../modules/cart/cart.model.js";
import Product from "../modules/product/product.model.js";
import AppError from "../utils/AppError.js";
import { calculateCartPricing } from "../utils/cart.utils.js";

export const addToCart = async (userId, productId, quantity = 1) => {

    if (!productId) {
        AppError("Product not provided", 404);
    }

    const product = await Product.findById(productId)

    if (!product.isActive) {
        AppError("Product not available", 404);
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            productId: product._id,
            quantity,
            price: product.price,
            discountPrice: product.discountPrice,
            taxCategory: product.taxCategory,
            image: product.images[0],
            stock: product.stock,
        });
    }

    await cart.save();
    return getCart(userId);
};

export const getCart = async (userId) => {

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return {
            items: []
        };
    };

    const pricing = calculateCartPricing(cart.items);

    return {
        ...cart.toObject(),
        ...pricing,
    };
};

export const updateCartItemQuantity = async (
    userId,
    productId,
    delta
) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new AppError("Cart not found", 404);

    const item = cart.items.find(
        (i) => i.product.toString() === productId
    );

    if (!item) throw new AppError("Item not in cart", 404);

    item.quantity += delta;

    if (item.quantity <= 0) {
        cart.items = cart.items.filter(
            (i) => i.product.toString() !== productId
        );
    }

    await cart.save();
    return getCart(userId);
};

export const removeCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new AppError("Cart not found", 404);

    cart.items = cart.items.filter(
        (i) => i.product.toString() !== productId
    );

    await cart.save();
    return getCart(userId);
};