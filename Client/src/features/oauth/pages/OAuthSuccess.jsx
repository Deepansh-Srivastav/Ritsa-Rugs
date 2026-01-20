import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = params.get("token");

        if (token) {
            // store in memory / state manager
            window.__ACCESS_TOKEN__ = token;
            navigate("/");
        }
    }, []);

    return <p>Logging you in…</p>;
};

export default OAuthSuccess;