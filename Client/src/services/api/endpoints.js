// Auth Endpoints
export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    OAUTH_CALLBACK: '/auth/oauth/callback',
};

// Product Endpoints
export const PRODUCT_ENDPOINTS = {
    LIST: '/products',
    DETAILS: (id) => `/products/${id}`,
    SEARCH: '/products/search',
    CATEGORIES: '/products/categories',
    FEATURED: '/products/featured',
    BEST_SELLERS: '/products/best-sellers',
    RELATED: (id) => `/products/${id}/related`,
};

// Cart Endpoints
export const CART_ENDPOINTS = {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: (itemId) => `/cart/${itemId}`,
    REMOVE: (itemId) => `/cart/${itemId}`,
    CLEAR: '/cart/clear',
    APPLY_COUPON: '/cart/apply-coupon',
};

// Checkout Endpoints
export const CHECKOUT_ENDPOINTS = {
    CREATE_ORDER: '/orders',
    GET_SHIPPING_METHODS: '/checkout/shipping-methods',
    VALIDATE_COUPON: '/checkout/validate-coupon',
};

// Order Endpoints
export const ORDER_ENDPOINTS = {
    LIST: '/orders',
    DETAILS: (id) => `/orders/${id}`,
    CANCEL: (id) => `/orders/${id}/cancel`,
};

// User Endpoints
export const USER_ENDPOINTS = {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    ADDRESSES: '/user/addresses',
    CREATE_ADDRESS: '/user/addresses',
    UPDATE_ADDRESS: (id) => `/user/addresses/${id}`,
    DELETE_ADDRESS: (id) => `/user/addresses/${id}`,
};

// Wishlist Endpoints
export const WISHLIST_ENDPOINTS = {
    GET: '/wishlist',
    ADD: '/wishlist/add',
    REMOVE: (productId) => `/wishlist/${productId}`,
};

// Review Endpoints
export const REVIEW_ENDPOINTS = {
    LIST: (productId) => `/products/${productId}/reviews`,
    CREATE: '/reviews',
    UPDATE: (id) => `/reviews/${id}`,
    DELETE: (id) => `/reviews/${id}`,
};
