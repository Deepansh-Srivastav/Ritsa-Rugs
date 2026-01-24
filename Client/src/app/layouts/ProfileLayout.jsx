import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { refreshAccessToken } from "../../lib/http/refreshToken";
import { logOut, setAccessToken } from "../../redux/features/authSlice";
import { useEffect } from "react";

const ProfileLayout = () => {
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
        <div>
            <Outlet />
        </div>
    );
};

export default ProfileLayout;