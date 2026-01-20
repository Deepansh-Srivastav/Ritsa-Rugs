export const API_PATHS = {
    AUTH: {
        LOGIN: "/auth/login",
        REFRESH: "/auth/refresh",
        LOGOUT: "/auth/logout",
    },
    RUGS: {
        GET_ALL_RUGS: "/rugs",
        GET_RUG: (id) => `/rugs/${id}`,
    },
    CART: {
        ADD_ITEM_TO_CART: "/add-to-cart",
        GET_ALL_CART_ITEMS: "/",
    },
};