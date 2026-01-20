import { extractAccessToken, verifyAccessToken } from "../utils/token.utils.js";
import { validateAuthenticatedUser } from "../services/auth.service.js";

export default async function authenticationMiddleware(req, res, next) {
    try {
        const token = extractAccessToken(req);

        console.log('Token recieved is - ', token);
        
        const decoded = verifyAccessToken(token);
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('Token Decoded is - ', token);
        
        const user = await validateAuthenticatedUser(decoded.userId);

        req.user = user;

        next();
    } catch (err) {
        next(err);
    };
};