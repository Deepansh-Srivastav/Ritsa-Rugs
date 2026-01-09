import mongoose from "mongoose";

export default function ValidateMongoId(_id) {
    const isValidId = mongoose.Types.ObjectId.isValid(_id);
    return isValidId;
};