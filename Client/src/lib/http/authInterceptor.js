import { api } from "./axiosInstance";
import { refreshAccessToken } from "./refreshToken";
import { store } from "../../redux/store";
import { setAccessToken, logOut } from "../../redux/features/authSlice";
import { resetUserDetail } from "../../redux/features/userDetailSlice";
import { API_PATHS } from "../../services/apiPaths";
import logoutService from "../../services/logoutService.js"

export const setupAuthInterceptor = () => {

    api.interceptors.request.use((config) => {
        const token = store.getState().auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        };
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (
                originalRequest.url?.includes(API_PATHS.AUTH.REFRESH_TOKEN)
            ) {
                logoutService();
                return Promise.reject(error);
            };


            if (
                error.response?.status === 401 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;

                try {
                    const accessToken = await refreshAccessToken();

                    store.dispatch(setAccessToken(accessToken));

                    originalRequest.headers.Authorization =
                        `Bearer ${accessToken}`;

                    return api(originalRequest);
                } catch (err) {
                    store.dispatch(logOut());
                    store.dispatch(resetUserDetail());
                    // window.location.href = "/login";
                    return Promise.reject(err);
                };
            };

            return Promise.reject(error);
        }
    );
};