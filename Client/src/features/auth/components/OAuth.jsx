import { Google } from "../../../shared/images/images";
import { useGoogleLogin } from "@react-oauth/google";
import "./OAuth.css"
import axios from "axios"

const GoogleOAuth = ({ url }) => {

    const googleResponse = async (result) => {
        try {
            const { code } = result;
            console.log(code);

            const response = await axios.get(`http://localhost:8080/api/v1/auth/google/callback?code=${code}`);

            console.log("This is the response - ", response);

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