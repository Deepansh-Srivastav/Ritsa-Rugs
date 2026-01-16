// src/shared/components/Navbar/Navbar.jsx
import { useState } from "react";
import "./Navbar.css";
import { GiHamburgerMenu, IoMdClose, BsCart2 } from "../../icons/icons.js";
import { ritsaRugsLogo } from "../../images/images.js";
import { useNavigate } from "react-router-dom";
import { BREAKPOINTS } from "../../constants/breakpoints.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const isDesktop = useMediaQuery(BREAKPOINTS.desktop);

    return (
        <nav className="navbar">

            <div className="nc">

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
                        <div
                            className="navbar__menu-btn close_menu_button"
                            onClick={() => setIsOpen(false)}
                        >
                            <IoMdClose />
                        </div>
                        <ul className="navbar__menu">
                            <li>Home</li>
                            <li>Rugs</li>
                            <li>Cart</li>
                            <li>Profile</li>
                        </ul>
                    </aside>

                </>
            )}

        </nav >
    );
};

export default Navbar;
