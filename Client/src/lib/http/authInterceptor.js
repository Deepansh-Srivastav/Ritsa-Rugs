import { api } from "./axiosInstance";
import { refreshAccessToken } from "./refreshToken";
import { store } from "../../redux/store";
import { setAccessToken, logOut } from "../../redux/features/authSlice";
import { resetUserDetail } from "../../redux/features/userDetailSlice";

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
                error.response?.status === 401 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;

                try {
                    const accessToken = await refreshAccessToken();

                    console.log('Access token is - ', accessToken);

                    console.log('originalRequest is - ', originalRequest);

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