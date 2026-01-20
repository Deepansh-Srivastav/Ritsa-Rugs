import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = params.get("token");

        if (token) {
            window.__ACCESS_TOKEN__ = token;
            navigate("/");
        };

        if (!token) {
            window.__ACCESS_TOKEN__ = token;
            navigate("/login");
        };
        
    }, []);

    return <p>Logging you in…</p>;
};

export default OAuthSuccess;