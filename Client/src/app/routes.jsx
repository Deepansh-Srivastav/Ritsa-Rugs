import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import ProfileLayout from "./layouts/ProfileLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            { index: true, element: <h1 id="X">Home Page</h1> },

            { path: "about", element: <h1>About Page</h1> },

            { path: "contact", element: <h1>Contact Page</h1> },

            { path: "rugs", element: <h1>Rugs List Page</h1> },

            { path: "rugs/:rugId", element: <h1>Rug Details Page</h1> },

            { path: "cart", element: <h1>Cart Page</h1> },

            { path: "orders", element: <h1>Orders Page</h1> },

            { path: "login", element: <h1>Login Page</h1> },

            { path: "register", element: <h1>Register Page</h1> },

            { path: "*", element: <h1>This page does not exist</h1> },
        ],
    },

    {
        path: "/profile",
        element: <ProfileLayout />,
        children: [
            { index: true, element: <h1>Profile Page</h1> },

            { path: "address", element: <h1>Address Page</h1> },

            { path: "orders", element: <h1>Profile Orders Page</h1> },

            { path: "*", element: <h1>This page does not exist</h1> },
        ],
    },
]);

export default router;