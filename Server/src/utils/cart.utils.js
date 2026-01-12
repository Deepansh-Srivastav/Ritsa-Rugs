import GST_RATES from "../config/tax.config.js";
import { calculatePrices } from "./product.utils.js";

export const calculateCartPricing = (items) => {
    let cartTotalDiscountedPrice = 0;
    let cartTotalPrice = 0;
    let cartTotalItems = 0;

    items?.forEach((item) => {
        const { quantity } = item;
        cartTotalItems += quantity;
        const { finalPrice, discountedPrice } = calculatePrices(item);
        cartTotalPrice += (finalPrice * quantity);
        cartTotalDiscountedPrice += (discountedPrice * quantity);
    })

    return {
        cartTotalDiscountedPrice,
        cartTotalPrice,
        cartTotalItems
    }
};
