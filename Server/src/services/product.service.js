import AppError from "../utils/AppError.js";
import { generateSlug, calculatePrices } from "../utils/product.utils.js";
import Product from "../modules/product/product.model.js";

export const createProduct = async (data) => {

    if (!data) {
        throw new AppError("Product details can't be empty", 400);
    }
    const { name, thumbnail, images, description, price, taxCategory, discountPrice } = data;

    if (discountPrice && discountPrice > price) {
        throw new AppError("Discount price cannot be greater than the original price", 400);
    };

    if (!name) {
        throw new AppError("Product name is required", 400);
    };

    if (!thumbnail) {
        throw new AppError("Product thumbnail is required", 400);
    };

    if (!description) {
        throw new AppError("Product description is required", 400);
    };

    if (!price || price === undefined || price === null) {
        throw new AppError("Price is required", 400);
    };

    const allowedCategory = ["GST_5", "GST_12", "GST_18"];

    if (!taxCategory || !allowedCategory.includes(taxCategory)) {
        throw new AppError("valid tax-category is required", 400);
    };

    if (!Array.isArray(images) || images.length === 0) {
        throw new AppError("At least one product image is required", 400);
    };

    const slug = generateSlug(name);

    const exists = await Product.findOne({ slug });
    if (exists) {
        throw new AppError("Product with this name already exists", 409);
    };

    return await Product.create({
        ...data,
        slug,
    });
};

export const getAllProducts = async () => {
    const allProducts = await Product.find({ isActive: true }).sort({ createdAt: -1 });

    const finalProducts = allProducts?.map((productItem) => {
        const { discountPercent, finalPrice, discountedPrice, } = calculatePrices(productItem);
        return { ...productItem._doc, discountPercent, finalPrice, discountedPrice }
    });;

    return finalProducts;
};

export const getProductBySlug = async (slug) => {
    const product = await Product.findOne({ slug, isActive: true });

    if (!product) throw new AppError("Product not found", 404);

    const { discountPercent, finalPrice, discountedPrice, } = calculatePrices(product);

    const finalProduct = {
        ...product._doc,
        discountPercent,
        finalPrice,
        discountedPrice,
    };

    return finalProduct;
};

export const updateProduct = async (id, data) => {
    if (data.name) {
        data.slug = generateSlug(data.name);
    }

    const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

    if (!product) throw new AppError("Product not found", 404);
    return product;
};

export const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new AppError("Product not found", 404);
};