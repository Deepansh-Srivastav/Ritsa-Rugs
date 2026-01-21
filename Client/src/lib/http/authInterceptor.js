import { api } from "./axiosInstance";
import { refreshAccessToken } from "./refreshToken";
import { store } from "../../redux/store";
import { setAccessToken, logOut } from "../../redux/features/authSlice";

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
                    const { data } = await refreshAccessToken();
                    store.dispatch(setAccessToken(data.accessToken));

                    originalRequest.headers.Authorization =
                        `Bearer ${data.accessToken}`;

                    return api(originalRequest);
                } catch (err) {
                    store.dispatch(logOut());
                    console.log('ERROR FORM INTERCEPTOR', err);
                    // window.location.href = "/login";
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );
};