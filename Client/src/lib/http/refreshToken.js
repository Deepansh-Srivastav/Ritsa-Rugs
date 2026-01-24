import { api } from "./axiosInstance";
import { API_PATHS } from "../../services/apiPaths";

export const refreshAccessToken = async () => {
    const res = await api.post(API_PATHS?.AUTH?.REFRESH_TOKEN);
    const response = res?.data;
    if (response?.success === true && response?.error === false && response?.data) {
        return response?.data?.accessToken;
    };
    return null;
};