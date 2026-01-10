import {
    createAddress,
    getUserAddresses,
    getAddressById,
    updateAddress,
    deleteAddress
} from "../../services/address.service.js";

export const createAddressController = async (req, res, next) => {
    try {
        const address = await createAddress(req.user.id, req.body);

        res.status(201).json({
            success: true,
            data: address
        });
    } catch (err) {
        next(err);
    }
};

export const getUserAddressesController = async (req, res, next) => {
    try {
        const addresses = await getUserAddresses(req.user.id);

        res.status(200).json({
            success: true,
            data: addresses
        });
    } catch (err) {
        next(err);
    }
};

export const getAddressByIdController = async (req, res, next) => {
    try {
        console.log('req.user.id, req.params.id', req.user.id, req.params.addressId);
        const address = await getAddressById(req.user.id, req.params.addressId);

        res.status(200).json({
            success: true,
            data: address
        });
    } catch (err) {
        next(err);
    }
};

export const updateAddressController = async (req, res, next) => {
    try {
        const address = await updateAddress(
            req.user.id,
            req.params.addressId,
            req.body
        );

        res.status(200).json({
            success: true,
            data: address
        });
    } catch (err) {
        next(err);
    }
};

export const deleteAddressController = async (req, res, next) => {
    try {
        await deleteAddress(req.user.id, req.params.addressId);

        res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};