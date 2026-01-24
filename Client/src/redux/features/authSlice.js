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
            if (action?.payload.length > 0) {
                state.isAuthenticated = true;
            };
        },
        logOut(state) {
            state.accessToken = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setAccessToken, logOut } = authSlice.actions;
export default authSlice.reducer;