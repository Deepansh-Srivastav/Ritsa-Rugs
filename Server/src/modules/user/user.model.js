import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        // password: {
        //     type: String,
        //     required: true,
        //     minlength: 8,
        //     select: false,
        // },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        avatar: {
            type: String,
        },

        // isEmailVerified: {
        //     type: Boolean,
        //     default: false,
        // },

        isActive: {
            type: Boolean,
            default: true,
        },

        lastLoginAt: {
            type: Date,
        },

        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "google",
        },

        refreshToken: {
            type: String,
            select: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("User", userSchema);