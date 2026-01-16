// src/shared/components/Navbar/Navbar.jsx
import { useEffect, useState } from "react";
import "./Navbar.css";
import {
    GiHamburgerMenu,
    IoMdClose,
    BsCart2,
    IoHomeOutline,
    RiShoppingBag2Line,
    IoCallOutline,
    IoPersonAddOutline,
    CgProfile,
    GoPerson,
    FaIndianRupeeSign
} from "../../icons/icons.js";
import { ritsaRugsLogo } from "../../images/images.js";
import { useNavigate } from "react-router-dom";
import { BREAKPOINTS } from "../../constants/breakpoints.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const isDesktop = useMediaQuery(BREAKPOINTS.desktop);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isOpen]);

    return (
        <nav className="navbar">

            <div className="nav-body">

                {!isDesktop && (
                    <div
                        className="navbar__menu-btn"
                        onClick={() => setIsOpen(true)}
                    >
                        <GiHamburgerMenu />
                    </div>
                )}

                <div className="navbar__container">
                    <div className="navbar__logo" onClick={() => navigate("/")}>
                        <img src={ritsaRugsLogo} alt="Ritsa Rugs Logo" />
                    </div>
                </div>

                {!isDesktop && (
                    <div className="">
                        <BsCart2 />
                    </div>
                )}
            </div>

            {!isDesktop && (
                <>
                    <div
                        className={`backdrop ${isOpen ? "backdrop--visible" : ""}`}
                        onClick={() => setIsOpen(false)}
                    />
                    <aside className={`navbar__menu__container ${isOpen && "show_profile"} `}>
                        <div className="side_menu_header">
                            <h4>Menu</h4>
                            <div
                                className="navbar__menu-btn"
                                onClick={() => setIsOpen(false)}
                            >
                                <IoMdClose />
                            </div>

                        </div>

                        <ul className="navbar__menu">
                            <li className="border-bottom"><IoHomeOutline /> <span>Home</span></li>

                            <li className="border-bottom"><RiShoppingBag2Line /><span>Shop Now</span></li>

                            <li className="border-bottom"><IoCallOutline /><span>Contact us</span></li>

                            <li className="border-bottom"><CgProfile /><span>Login</span></li>

                            <li className=""> <IoPersonAddOutline /><span>Create Account</span></li>

                            <li className=""><GoPerson /><span>Profile</span></li>

                        </ul>

                        <div className="currency">
                            <h5>Currency</h5>
                        </div>

                        <ul className="navbar__menu">
                            <li><FaIndianRupeeSign />INR</li>
                        </ul>
                    </aside>

                </>
            )}

        </nav >
    );
};

export default Navbar;
