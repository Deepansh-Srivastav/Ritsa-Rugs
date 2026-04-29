import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { ritsaRugsLogo } from '@/shared/images/images';
import styles from './Navbar.module.scss';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/products' },
  {
    label: 'Categories',
    path: '/products',
    children: [
      { label: 'Living Room', path: '/products?category=living' },
      { label: 'Bedroom', path: '/products?category=bedroom' },
      { label: 'Dining Room', path: '/products?category=dining' },
      { label: 'Outdoor', path: '/products?category=outdoor' },
      { label: 'Kids Room', path: '/products?category=kids' },
    ],
  },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const CART_COUNT = 0;

export const Navbar = () => {
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const categoryRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setMobileCategoryOpen(false);
  }, [location.pathname]);

  // Detect scroll for shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Auto-focus mobile search
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}
      id="main-navbar"
    >
      <div className={styles.container}>
        {/* ── Logo ── */}
        <Link to="/" className={styles.logo} id="navbar-logo">
          <img src={ritsaRugsLogo} alt="Ritsa Rugs" className={styles.logoImg} />
          {/* <span className={styles.logoText}>Ritsa Rugs</span> */}
        </Link>

        {/* ── Center Nav (desktop) ── */}
        <ul className={styles.nav}>
          {NAV_LINKS.map((link) =>
            link.children ? (
              <li key={link.label} className={styles.navItem} ref={categoryRef}>
                <button
                  type="button"
                  className={`${styles.navLink} ${categoryOpen ? styles.navLinkActive : ''}`}
                  onClick={() => setCategoryOpen((p) => !p)}
                  aria-expanded={categoryOpen}
                  aria-haspopup="true"
                  id="navbar-categories-toggle"
                >
                  {link.label}
                  {categoryOpen
                    ? <FiChevronUp className={styles.chevron} />
                    : <FiChevronDown className={styles.chevron} />
                  }
                </button>

                <ul
                  className={`${styles.dropdown} ${categoryOpen ? styles.dropdownOpen : ''}`}
                  role="menu"
                >
                  {link.children.map((child) => (
                    <li key={child.label} role="menuitem">
                      <Link
                        to={child.path}
                        className={styles.dropdownItem}
                        onClick={() => setCategoryOpen(false)}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.label} className={styles.navItem}>
                <Link
                  to={link.path}
                  className={`${styles.navLink} ${isActive(link.path) ? styles.navLinkActive : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* ── Right Actions ── */}
        <div className={styles.actions}>
          {/* Desktop search */}
          <form onSubmit={handleSearchSubmit} className={styles.search} id="navbar-search-desktop">
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search rugs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </form>

          {/* Mobile search toggle */}
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.actionBtnSearchMobile}`}
            onClick={() => setSearchOpen((p) => !p)}
            aria-label="Toggle search"
            id="navbar-search-toggle"
          >
            <FiSearch />
          </button>

          {/* Cart */}
          <Link to="/cart" className={styles.actionBtn} aria-label="Cart" id="navbar-cart">
            <FiShoppingCart />
            {CART_COUNT > 0 && <span className={styles.badge}>{CART_COUNT}</span>}
          </Link>

          {/* User */}
          <Link to="/auth/login" className={styles.actionBtn} aria-label="User account" id="navbar-user">
            <FiUser />
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            id="navbar-hamburger"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* ── Mobile Search ── */}
      <div className={`${styles.mobileSearch} ${searchOpen ? styles.mobileSearchOpen : ''}`}>
        <form onSubmit={handleSearchSubmit} className={styles.mobileSearchForm}>
          <FiSearch className={styles.mobileSearchIcon} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search rugs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.mobileSearchInput}
          />
        </form>
      </div>

      {/* ── Overlay ── */}
      <div
        className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayVisible : ''}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer ── */}
      <aside
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        id="navbar-mobile-menu"
      >
        <ul className={styles.mobileNav}>
          {NAV_LINKS.map((link) =>
            link.children ? (
              <li key={link.label} className={styles.mobileNavItem}>
                <button
                  type="button"
                  className={styles.mobileNavLink}
                  onClick={() => setMobileCategoryOpen((p) => !p)}
                >
                  {link.label}
                  {mobileCategoryOpen
                    ? <FiChevronUp className={styles.chevron} />
                    : <FiChevronDown className={styles.chevron} />
                  }
                </button>

                <ul className={`${styles.mobileDropdown} ${mobileCategoryOpen ? styles.mobileDropdownOpen : ''}`}>
                  {link.children.map((child) => (
                    <li key={child.label}>
                      <Link to={child.path} className={styles.mobileDropdownItem} onClick={closeMobile}>
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.label} className={styles.mobileNavItem}>
                <Link
                  to={link.path}
                  className={`${styles.mobileNavLink} ${isActive(link.path) ? styles.mobileNavLinkActive : ''}`}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </aside>
    </nav>
  );
};
