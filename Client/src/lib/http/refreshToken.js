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
    return api.post(API_PATHS.AUTH.REFRESH);
};
