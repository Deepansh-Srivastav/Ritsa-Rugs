import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetail, resetUserDetail } from "../redux/features/userDetailSlice";
import { setAccessToken, logOut } from "../redux/features/authSlice";
import { refreshAccessToken } from "../lib/http/refreshToken";

const App = () => {
  const dispatch = useDispatch();

  async function handleRefresh() {

    const accessToken = await refreshAccessToken();

    console.log("Access token is ", accessToken);


    if (accessToken) {
      return dispatch(setAccessToken(accessToken));
    }

    dispatch(logOut());
  };

  useEffect(() => {
    handleRefresh();
  }, [])

  return null;
};

export default App;