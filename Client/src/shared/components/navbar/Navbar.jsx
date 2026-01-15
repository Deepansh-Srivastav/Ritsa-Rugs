// src/shared/components/Navbar/Navbar.jsx
import { useState } from "react";
import "./Navbar.css";
import { GiHamburgerMenu, IoMdClose } from "../../icons/icons.js";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">

            <button
                className="navbar__menu-btn"
                onClick={() => setIsOpen(true)}
                aria-label="Toggle menu"
            >
                <GiHamburgerMenu />
            </button>

            <div className="navbar__container">
                <div className="navbar__logo">LOGO</div>

            </div>


            <aside className={`navbar__menu__container ${isOpen && "show_profile"} `}>
                <button
                    className="navbar__menu-btn close_menu_button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Toggle menu"
                >
                    <IoMdClose />
                </button>
                <ul className="navbar__menu">
                    <li>Home</li>
                    <li>Rugs</li>
                    <li>Cart</li>
                    <li>Profile</li>
                </ul>
            </aside>

        </nav >
    );
};

export default Navbar;
