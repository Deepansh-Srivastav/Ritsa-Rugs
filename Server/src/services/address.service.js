import Address from "../modules/address/address.model.js";
import AppError from "../utils/appError.js";
import ValidateMongoId from "../utils/ValidateMongo_Id.js";

export async function createAddress(userId, data) {
    if (!ValidateMongoId(userId)) {
        AppError("Invalid user id", 400);
    }

    if (data.isDefault) {
        await Address.updateMany(
            { user: userId, isActive: true },
            { isDefault: false }
        );
    }

    const address = await Address.create({
        ...data,
        user: userId
    });

    return address;
}

export async function getUserAddresses(userId) {
    return Address.find({
        user: userId,
        isActive: true
    }).sort({ isDefault: -1, createdAt: -1 });
}

export async function getAddressById(userId, addressId) {
    if (!ValidateMongoId(addressId)) {
        AppError("Invalid address id", 400);
    }

    const address = await Address.findOne({
        _id: addressId,
        user: userId,
        isActive: true
    });

    if (!address) {
        AppError("Address not found", 404);
    }

    return address;
}

export async function updateAddress(userId, addressId, data) {
    if (!ValidateMongoId(addressId)) {
        AppError("Invalid address id", 400);
    }

    if (data.isDefault) {
        await Address.updateMany(
            { user: userId, isActive: true },
            { isDefault: false }
        );
    }

    const address = await Address.findOneAndUpdate(
        { _id: addressId, user: userId, isActive: true },
        data,
        { new: true }
    );

    if (!address) {
        AppError("Address not found", 404);
    }

    return address;
}

export async function deleteAddress(userId, addressId) {
    if (!ValidateMongoId(addressId)) {
        AppError("Invalid address id", 400);
    }

    const address = await Address.findOneAndUpdate(
        { _id: addressId, user: userId, isActive: true },
        { isActive: false, isDefault: false },
        { new: true }
    );

    if (!address) {
        AppError("Address not found", 404);
    }

    return;
}
