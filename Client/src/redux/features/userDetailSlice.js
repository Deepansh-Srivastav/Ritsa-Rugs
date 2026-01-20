import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: null,
    email: null,
    avatar: null,
    lastLogin: null
};

const userDetailSlice = createSlice({
    name: "userDetail",
    initialState,
    reducers: {
        setUserDetail(state, action) {
            
            const { name, email, avatar, lastLoginAt } = action?.payload || {};
            state.userName = name;
            state.email = email;
            state.avatar = avatar;
            state.lastLogin = lastLoginAt;
        },
        resetUserDetail(state) {
            state.name = null;
            state.email = null;
            state.avatar = null;
            state.lastLogin = null;
        }
    }
});

export const { setUserDetail, resetUserDetail } = userDetailSlice.actions;
export default userDetailSlice.reducer;