import { Google } from "../../../shared/images/images";
import { useGoogleLogin } from "@react-oauth/google";
import "./OAuth.css"

const GoogleOAuth = ({ url }) => {

    const googleResponse = async (result) => {
        try {
            console.log(result);
        }
        catch (e) {
            console.log("Error while getting the code from google - ", e);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: googleResponse,
        onError: googleResponse,
        flow: "auth-code"
    })

    return (
        <button className="auth-btn" onClick={googleLogin}>
            <div className="auth-icon">
                <img src={Google} alt="auth-icon" />
            </div>
            <span>Continue with Google</span>
        </button>
    );
};

export default GoogleOAuth;