import express from "express";
import authenticationMiddleware from "../../middlewares/auth.js";
import {
    createAddressController,
    getUserAddressesController,
    deleteAddressController,
    getAddressByIdController,
    updateAddressController,
} from "../address/address.controller.js";

const addressRouter = express.Router();

const param = ":addressId"

addressRouter.use(authenticationMiddleware);

addressRouter.post("/create-address", createAddressController);
addressRouter.get("/get-all-addresses", getUserAddressesController);
addressRouter.get("/get-address/:addressId", getAddressByIdController);
addressRouter.put(`/update-address/${param}`, updateAddressController);
addressRouter.delete(`/delete-address/${param}`, deleteAddressController);

export default addressRouter;