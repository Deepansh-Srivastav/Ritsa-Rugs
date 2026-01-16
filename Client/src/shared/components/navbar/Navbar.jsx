import { useEffect, useState } from "react";
import "./Navbar.css";
import {
    GiHamburgerMenu,
    IoMdClose,
    BsCart2,
    FaIndianRupeeSign
} from "../../icons/icons.js";
import { ritsaRugsLogo } from "../../images/images.js";
import { useNavigate, useLocation } from "react-router-dom";
import { BREAKPOINTS } from "../../constants/breakpoints.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import { MENU_ITEMS, authOptions } from "../../config/menuConfig.js";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

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

    const visibleMenuOptions = MENU_ITEMS?.filter((item) => {
        const isUserAuthenticated = false;
        // const isUserAuthenticated = true;
        if (authOptions?.both === item?.auth) return true;
        if (authOptions?.guest === item?.auth) return !isUserAuthenticated;
        if (authOptions?.auth === item?.auth) return isUserAuthenticated;
    });

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

                {isDesktop && (
                    <div className="nav_desktop_options_container">
                        <ul className="nav_desktop_menu">
                            {visibleMenuOptions?.map((menuOption) => {
                                const { id, path, label } = menuOption;
                                const isActivePath = path === pathname;
                                return (
                                    <li key={id}
                                        onClick={() => {
                                            navigate(path)
                                        }}
                                        className={`${isActivePath ? "active" : ""}`}
                                        style={{ fontSize: "var(--fs-nav-md)" }}
                                    >
                                        <span>{label}</span>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                )}

                <button className="cart_button_container" onClick={()=>navigate("/cart")}>
                    <BsCart2 />
                    <span className="cart_item_counter">1</span>
                </button>

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
                            {visibleMenuOptions?.map((menuOption, index) => {
                                const { id, path, label, icon } = menuOption;
                                const Icon = icon;
                                const isLastElement = (index === (visibleMenuOptions?.length - 1));
                                return (
                                    <li key={id}
                                        onClick={() => {
                                            navigate(path)
                                            setIsOpen(false)
                                        }}
                                        className={`${!isLastElement ? "border-bottom" : ""}`}
                                        style={{ fontSize: "var(--fs-nav-sm)" }}
                                    >
                                        <Icon />
                                        <span>{label}</span>
                                    </li>
                                )
                            })}
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