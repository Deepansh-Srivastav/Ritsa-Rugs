const routePrefix = {
    auth: "/api/v1/auth",
    user: "/api/v1/user",
    cart: "/api/v1/cart"

}

export const API_PATHS = {
    AUTH: {
        REFRESH_TOKEN: `${routePrefix?.auth}/refresh-token`
    },
    USER: {
        GET_USER_DETAILS: `${routePrefix?.user}/get-user-details`,
    },
};