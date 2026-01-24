import {
    IoHomeOutline,
    RiShoppingBag2Line,
    IoCallOutline,
    IoPersonAddOutline,
    CgProfile,
    GoPerson,
    CiLogout,
} from "../icons/icons.js";
import logoutService from "../../services/logoutService.js";

export const authOptions = {
    both: "both",
    auth: "auth",
    guest: "guest",

};

export const MENU_ITEMS = [
    {
        id: "home",
        label: "Home",
        icon: IoHomeOutline,
        path: "/",
        auth: authOptions?.both,
    },
    {
        id: "shop",
        label: "Shop Now",
        icon: RiShoppingBag2Line,
        path: "/shop",
        auth: authOptions?.both,
    },
    {
        id: "contact",
        label: "Contact us",
        icon: IoCallOutline,
        path: "/contact",
        auth: authOptions?.both,
    },
    {
        id: "signup",
        label: "Create Account",
        icon: CgProfile,
        path: "/register",
        auth: authOptions?.guest,
    },
    {
        id: "login",
        label: "Login",
        icon: IoPersonAddOutline,
        path: "/login",
        auth: authOptions?.guest,
    },

    {
        id: "profile",
        label: "Profile",
        icon: GoPerson,
        path: "/profile",
        auth: authOptions?.auth,
    },

    {
        id: "logout",
        label: "Log Out",
        icon: CiLogout,
        path: "",
        auth: authOptions?.auth,
        action: () => { logoutService() }
    },
];