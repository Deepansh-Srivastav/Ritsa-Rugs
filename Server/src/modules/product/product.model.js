import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120,
            index: true,
            required: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 2000,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        discountPrice: {
            type: Number,
            min: 0,
        },

        taxCategory: {
            type: String,
            enum: ["GST_5", "GST_12", "GST_18"],
            required: true,
        },

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        // category: {
        //     type: String,
        //     // required: true,
        //     index: true,
        //     default: "Rugs"
        // },

        thumbnail: {
            type: String,
            required: true,
        },

        images: [
            {
                type: String,
                required: true,
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },

        // createdBy: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true,
        // },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Product", productSchema);