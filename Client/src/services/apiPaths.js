export const API_PATHS = {
    AUTH: {
        LOGIN: "/auth/login",
    },
    USER: {
        GET_USER_DETAILS: "/api/v1/user/get-user-details",
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