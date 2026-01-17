export const googleOAuthConfig = {
    tokenUrl: "https://oauth2.googleapis.com/token",
    tokenInfoUrl: "https://oauth2.googleapis.com/tokeninfo",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
};
