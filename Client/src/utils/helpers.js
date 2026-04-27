// Currency formatting
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    }).format(amount);
};

// Percentage discount
export const calculateDiscount = (originalPrice, discountedPrice) => {
    const discount = originalPrice - discountedPrice;
    return Math.round((discount / originalPrice) * 100);
};

// Truncate text
export const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Format date
export const formatDate = (date, format = 'DD/MM/YYYY') => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return format.replace('DD', day).replace('MM', month).replace('YYYY', year);
};

// Debounce function
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Validate email
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone
export const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

// Validate postal code
export const validatePostalCode = (code) => {
    const pinRegex = /^\d{6}$/;
    return pinRegex.test(code);
};

// Format product slug
export const slugify = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Get image alt text
export const getImageAltText = (productName, imageIndex = 0) => {
    return `${productName} - Image ${imageIndex + 1}`;
};

// Calculate shipping
export const calculateShipping = (amount, method = 'standard') => {
    const freeShippingThreshold = 500;

    if (amount >= freeShippingThreshold) {
        return 0;
    }

    const shippingRates = {
        standard: 50,
        express: 100,
        overnight: 200,
    };

    return shippingRates[method] || shippingRates.standard;
};

// Handle API error messages
export const getErrorMessage = (error) => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }
    if (error.message) {
        return error.message;
    }
    return 'Something went wrong. Please try again.';
};
