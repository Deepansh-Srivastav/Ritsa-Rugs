import axios from "axios";
import { ENV } from "../../app/config/apiconfig"; 

export const api = axios.create({
    baseURL: ENV.API_BASE_URL,
    withCredentials: true,
});