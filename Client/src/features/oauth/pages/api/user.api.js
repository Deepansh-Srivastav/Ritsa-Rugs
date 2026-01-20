import { api } from "../../../../lib/http/axiosInstance";
import { API_PATHS } from "../../../../services/apiPaths";

export const oauthSuccess = () => {
    return api.get(API_PATHS.USER.GET_USER_DETAILS);
};