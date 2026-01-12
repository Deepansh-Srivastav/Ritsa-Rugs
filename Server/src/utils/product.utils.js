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
    // 0.05

    const baseOriginalPrice = price;
    // 5799

    const baseDiscountedPrice = discountPrice ?? price;
    // 4999

    const originalTaxAmount = Math.ceil(baseOriginalPrice * gstRate);
    // 5799 * 0.05 = 289

    const discountedTaxAmount = Math.ceil(baseDiscountedPrice * gstRate);
    // 4999 * 0.05 = 250

    const originalFinalPrice = Math.ceil(baseOriginalPrice + originalTaxAmount);
    // 5799 + 289 = 6088
    const discountedFinalPrice = Math.ceil(baseDiscountedPrice + discountedTaxAmount);
    // 4999 + 250 =5249
    const discountAmount = baseOriginalPrice - baseDiscountedPrice;

    const discountPercent =
        discountAmount > 0
            ? Number((discountAmount / baseOriginalPrice) * 100).toFixed(2)
            : 0;
    return {
        discountPercent,
        finalPrice: originalFinalPrice,
        discountedPrice: discountedFinalPrice,
    };

};