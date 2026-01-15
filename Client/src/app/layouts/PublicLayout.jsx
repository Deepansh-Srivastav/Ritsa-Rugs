import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/navbar/Navbar";

const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            {/* <Footer /> */}
        </>
    );
};

export default PublicLayout;