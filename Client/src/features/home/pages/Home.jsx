import { useEffect } from "react";
import { api } from "../../../lib/http/axiosInstance";
import { API_PATHS } from "../../../services/apiPaths";

const Home = () => {

    async function checkUserSession() {
        const res = await api.post(API_PATHS?.AUTH?.REFRESH_TOKEN);

        console.log(res);
        
    }

    useEffect(()=>{
        checkUserSession();
    },[])

    return (
        <div>
            HOME
        </div>
    )
}

export default Home;