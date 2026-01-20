export const googleOAuthConfig = {
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    tokenInfoUrl: "https://oauth2.googleapis.com/tokeninfo",

    get clientId() {
        return process.env.GOOGLE_CLIENT_ID;
    },

    get clientSecret() {
        return process.env.GOOGLE_CLIENT_SECRET;
    },

    get redirectUri() {
        return process.env.GOOGLE_REDIRECT_URI;
    },
};