import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken(state, action) {
            state.accessToken = action?.payload;
            state.isAuthenticated = true;
        },
        logOut(state) {
            state.accessToken = null;
            state.isAuthenticated = null;
        }
    }
});

export const { setAccessToken, logOut } = authSlice.actions;
export default authSlice.reducer;