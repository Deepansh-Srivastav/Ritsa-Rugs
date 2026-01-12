import {
    createProduct,
    getAllProducts,
    getProductBySlug,
    updateProduct,
    deleteProduct,
} from "../../services/product.service.js";

export const createProductController = async (req, res, next) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json({
            success: true,
            error: false,
            message: "Product created successfully",
            data: product,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllProductsController = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.status(200).json({
            success: true,
            error: false,
            message: "Products fetched successfully",
            data: products,
        });
    } catch (err) {
        next(err);
    }
};

export const getProductController = async (req, res, next) => {
    try {
        const product = await getProductBySlug(req.params.slug);
        res.status(200).json({
            success: true,
            error: false,
            message: "Product fetched successfully",
            data: product,
        });
    } catch (err) {
        next(err);
    }
};

export const updateProductController = async (req, res, next) => {
    try {
        const product = await updateProduct(req.params.productId, req.body);
        res.status(200).json({
            success: true,
            error: false,
            message: "Product updated successfully",
            data: product,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteProductController = async (req, res, next) => {
    try {
        await deleteProduct(req.params.productId);
        res.status(200).json({
            success: true,
            error: false,
            message: "Product deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};