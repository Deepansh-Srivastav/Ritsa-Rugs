import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../../redux/features/authSlice";
import { api } from "../../../lib/http/axiosInstance";
import { API_PATHS } from "../../../services/apiPaths";
import { oauthSuccess } from "./api/user.api";

const OAuthSuccess = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function fetchUserDetail() {
        const response = await oauthSuccess();
        return response;
    };

    useEffect(() => {
        const token = params.get("token");

        console.log(token);
        
        
        if (token) {
            console.log("token in if block",token);

            dispatch(setAccessToken(token));

            const res = fetchUserDetail();

            console.log(res);

            // navigate("/");
        };

        if (!token) {
            navigate("/login");
        };

    }, []);

    return <p>Logging you in…</p>;
};

export default OAuthSuccess;