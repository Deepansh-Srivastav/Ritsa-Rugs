import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../../redux/features/authSlice";
import { oauthSuccess } from "./api/user.api";
import { setUserDetail } from "../../../redux/features/userDetailSlice";

const OAuthSuccess = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function fetchUserDetail() {
        const res = await oauthSuccess();
        const response = res?.data

        if (response && response?.error === false && response?.success === true && response?.data) {
            dispatch(setUserDetail(response?.data));
            navigate("/");
            return;
        };
        navigate("/login");
    };

    useEffect(() => {
        const token = params.get("token");
        if (token) {
            dispatch(setAccessToken(token));
            fetchUserDetail();
        };

        if (!token) {
            navigate("/login");
        };

    }, []);

    return <p>Logging you in…</p>;
};

export default OAuthSuccess;