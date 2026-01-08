import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
            maxlength: 15,
        },

        addressLine1: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        addressLine2: {
            type: String,
            trim: true,
            maxlength: 150,
        },

        city: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },

        state: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },

        postalCode: {
            type: String,
            required: true,
            trim: true,
            maxlength: 20,
            index: true,
        },

        country: {
            type: String,
            required: true,
            default: "India",
            trim: true,
        },

        type: {
            type: String,
            enum: ["home", "work", "other"],
            default: "home",
        },

        isDefault: {
            type: Boolean,
            default: false,
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

export default mongoose.model("Address", addressSchema);