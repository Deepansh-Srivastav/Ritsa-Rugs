import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import './Navbar.scss';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const cartCount = useCartStore((state) => state.getItemCount());
    const wishlistCount = useWishlistStore((state) => state.getItemCount());

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setIsSearchOpen(false);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                {/* Logo */}
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-text">Ritsa Rugs</span>
                </Link>

                {/* Search Bar (Desktop) */}
                <form onSubmit={handleSearch} className="navbar__search">
                    <input
                        type="text"
                        placeholder="Search rugs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="navbar__search-input"
                    />
                    <button type="submit" className="navbar__search-btn">
                        <FiSearch />
                    </button>
                </form>

                {/* Right Actions */}
                <div className="navbar__actions">
                    {/* Search Mobile */}
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="navbar__action-btn navbar__action-btn--search"
                        aria-label="Search"
                    >
                        <FiSearch />
                    </button>

                    {/* Wishlist */}
                    <Link
                        to="/wishlist"
                        className="navbar__action-btn navbar__action-btn--wishlist"
                        aria-label="Wishlist"
                    >
                        <FiHeart />
                        {wishlistCount > 0 && <span className="navbar__badge">{wishlistCount}</span>}
                    </Link>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="navbar__action-btn navbar__action-btn--cart"
                        aria-label="Cart"
                    >
                        <FiShoppingCart />
                        {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
                    </Link>

                    {/* User Menu */}
                    {user ? (
                        <div className="navbar__user-menu">
                            <button className="navbar__action-btn" aria-label="User menu">
                                <FiUser />
                            </button>
                            <div className="navbar__dropdown">
                                <Link to="/profile" className="navbar__dropdown-item">
                                    My Profile
                                </Link>
                                <Link to="/orders" className="navbar__dropdown-item">
                                    Orders
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="navbar__dropdown-item navbar__dropdown-item--logout"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/auth/login" className="navbar__action-btn">
                            <FiUser />
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="navbar__menu-btn"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Search */}
            {isSearchOpen && (
                <form onSubmit={handleSearch} className="navbar__mobile-search">
                    <input
                        type="text"
                        placeholder="Search rugs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                        className="navbar__mobile-search-input"
                    />
                    <button type="submit" className="navbar__mobile-search-btn">
                        <FiSearch />
                    </button>
                </form>
            )}

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="navbar__mobile-menu">
                    <Link to="/products" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>
                        Shop All Rugs
                    </Link>
                    <Link to="/products?category=living" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>
                        Living Room
                    </Link>
                    <Link to="/products?category=bedroom" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>
                        Bedroom
                    </Link>
                    <Link to="/products?category=dining" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>
                        Dining Room
                    </Link>
                    {!user && (
                        <>
                            <Link to="/auth/login" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to="/auth/register" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};
