import slugify from "slugify";
import GST_RATES from "../config/tax.config.js";

export const generateSlug = (name) => {
    return slugify(name, {
        lower: true,
        strict: true,
        trim: true,
    });
};

export const calculatePrices = (product) => {

    const { price, discountPrice, taxCategory } = product;

    const gstRate = GST_RATES[taxCategory];

    const baseOriginalPrice = price;

    const baseDiscountedPrice = discountPrice ?? price;

    const originalTaxAmount = Math.ceil(baseOriginalPrice * gstRate);
    const discountedTaxAmount = Math.ceil(baseDiscountedPrice * gstRate);

    const originalFinalPrice = Math.ceil(baseOriginalPrice + originalTaxAmount);
    const discountedFinalPrice = Math.ceil(baseDiscountedPrice + discountedTaxAmount);

    const discountAmount = baseOriginalPrice - baseDiscountedPrice;

    const discountPercent =
        discountAmount > 0
            ? Math.ceil((discountAmount / baseOriginalPrice) * 100)
            : 0;
    return {
        discountPercent,
        finalPrice: originalFinalPrice,
        discountedPrice: discountedFinalPrice,
    };

};