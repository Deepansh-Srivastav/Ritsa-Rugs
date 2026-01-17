import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/navbar/Navbar";

const PublicLayout = () => {
    return (
        <main style={{ maxHeight: "100vh" }}>
            <Navbar />
            <Outlet />
            {/* <Footer /> */}
        </main>
    );
};

export default PublicLayout;