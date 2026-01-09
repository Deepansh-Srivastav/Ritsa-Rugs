import bcrypt from "bcrypt";
import User from "../modules/user/user.model.js"

async function createUser({ name, email, password }) {

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
        const error = new Error("Email already registered");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
    };
};

export default {
    createUser,
};