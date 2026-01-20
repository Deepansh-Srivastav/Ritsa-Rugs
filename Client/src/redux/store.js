import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userDetailReducer from "./features/userDetailSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userDetail: userDetailReducer
    },
});