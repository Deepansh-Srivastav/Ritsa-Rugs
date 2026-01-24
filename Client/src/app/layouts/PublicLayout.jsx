import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { refreshAccessToken } from "../../lib/http/refreshToken";
import { logOut, setAccessToken } from "../../redux/features/authSlice";
import { useEffect } from "react";

const PublicLayout = () => {

    const dispatch = useDispatch();

    async function handleRefresh() {

        const accessToken = await refreshAccessToken();

        if (accessToken) {
            return dispatch(setAccessToken(accessToken));
        };
        dispatch(logOut());
    };

     useEffect(() => {
        handleRefresh();
      }, []);

    return (
        <main style={{ maxHeight: "100vh" }}>
            <Navbar />
            <Outlet />
            {/* <Footer /> */}
        </main>
    );
};

export default PublicLayout;