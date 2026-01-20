const BASE_URL = (import.meta.env?.VITE_ENVIRONMENT === "DEVELOPMENT" ? import.meta.env.VITE_API_BASE_URL_DEV : import.meta.env.VITE_API_BASE_URL_PROD)

export const ENV = {
    API_BASE_URL: BASE_URL,
};