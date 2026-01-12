import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },

        basePriceAtAdd: {
            type: Number,
            required: true,
            min: 0,
        },

        baseDiscountedPriceAtAdd: {
            type: Number,
            min: 0,
        },

        taxCategoryAtAdd: {
            type: String,
            enum: ["GST_5", "GST_12", "GST_18"],
            required: true,
        },
    },
    { _id: false }
);
const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },

        items: [cartItemSchema],

        totalItems: {
            type: Number,
            default: 0,
        },

        totalPrice: {
            type: Number,
            default: 0,
        },

        finalPrice: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Cart", cartSchema);