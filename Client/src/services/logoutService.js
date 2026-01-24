import { api } from "../lib/http/axiosInstance";
import { API_PATHS } from "./apiPaths";
import { store } from "../redux/store"
import { logOut } from "../redux/features/authSlice";
import { resetUserDetail } from "../redux/features/userDetailSlice";

export default async function logoutService() {
    const URL = API_PATHS?.AUTH?.LOGOUT_USER
    const res = await api.post(URL);

    const response = res?.data;

    if (response && response?.error === false && response?.success === true) {
        store.dispatch(logOut());
        store.dispatch(resetUserDetail());
        return true;
    };
    return false;
};