import { api } from "./axiosInstance";
import { API_PATHS } from "../../services/apiPaths";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

export const refreshAccessToken = async () => {
    const res = await api.post(API_PATHS?.AUTH?.REFRESH_TOKEN);
    const response = res?.data;


    console.log('REFRESH RESPONSE  is - ', res);

    if (response?.success === true && response?.error === false && response?.data) {
        return response?.data?.accessToken;
    };
    return null;
};