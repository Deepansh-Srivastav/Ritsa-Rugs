import { Google } from "../../../shared/images/images";
// import { useGoogleLogin } from "@react-oauth/google";
import "./OAuth.css"
import axios from "axios"

const GoogleOAuth = ({ url }) => {

    const URL = import.meta.env.VITE_GOOGLE_REDIRECT_URL

    const googleResponse = async () => {
        window.location.href = URL;
    };

    // const googleLogin = useGoogleLogin({
    //     onSuccess: googleResponse,
    //     onError: googleResponse,
    //     flow: "auth-code"
    // })

    return (
        <button className="auth-btn" onClick={googleResponse}>
            <div className="auth-icon">
                <img src={Google} alt="auth-icon" />
            </div>
            <span>Continue with Google</span>
        </button>
    );
};

export default GoogleOAuth;