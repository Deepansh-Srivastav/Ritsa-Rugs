export function setItemInCookie(res, itemName = "refreshToken", item) {

    const isProd = process.env.NODE_ENV === "production"

    const cookieOptions = {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie(itemName, item, cookieOptions)
};

export function removeItemFromCookie(res, itemName) {

    const isProd = process.env.NODE_ENV === "production"

    const cookieOptions = {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.clearCookie(itemName, cookieOptions);
}