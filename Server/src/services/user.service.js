import bcrypt from "bcrypt";
import mongoose from "mongoose";
import AppError from "../utils/AppError.js";
import User from "../modules/user/user.model.js"
import ValidateMongoId from "../utils/ValidateMongo_Id.js"

async function createUser({ name, email, password }) {

    if (!name || !email || !password || password?.length === 0) {
        AppError("Provide all the required fields.", 400);
    };

    if (name && name.length < 2) {
        AppError("User name is too short.", 400);
    };

    if (password && password.length < 8) {
        AppError("Password should at least have 8 character. ", 400);
    };

    // const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        AppError("Email already registered", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        name: user.name,
        email: user.email,
    };
};

async function getUserById(userId) {

    console.log(userId);
    console.log(typeof (userId));


    if (!mongoose.Types.ObjectId.isValid(userId)) {
        AppError("Invalid user id", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
        AppError("User not found", 404);
    }

    return {
        id: user._id,
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar,
        role: user?.role,
        isActive: user?.isActive,
        lastLoginAt: user?.lastLoginAt,
        createdAt: user?.createdAt,
    };
};

async function updateUserById(userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        AppError("Invalid user id", 400);
    }

    const allowedUpdates = ["name", "email"];
    const updates = {};

    for (const key of allowedUpdates) {
        if (updateData[key] !== undefined) {
            updates[key] = updateData[key];
        }
    }

    if (Object.keys(updates).length === 0) {
        AppError("No valid fields to update", 400);
    }

    if (updates.name && updates.name.length < 2) {
        AppError("User name is too short", 400);
    }

    const user = await User.findByIdAndUpdate(
        userId,
        updates,
        { new: true }
    );

    if (!user) {
        AppError("User not found", 404);
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        updatedAt: user.updatedAt,
    };
};

async function softDeleteUserById(userId) {

    const isValidId = ValidateMongoId(userId);

    if (!isValidId) {
        AppError("Invalid user id", 400);
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
    );

    if (!user) {
        AppError("User not found", 404);
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
    };
};

export default {
    createUser,
    getUserById,
    updateUserById,
    softDeleteUserById
};