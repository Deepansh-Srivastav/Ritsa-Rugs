import React, { useEffect, useState } from 'react'
import '../../styles/navbar.css'

export default function Navbar({ cartCount = 0 }) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [active, setActive] = useState(() => (window.location.hash || '#/').replace('#', '') || '/')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleOpen = () => setOpen((s) => !s)

  useEffect(() => {
    const onHash = () => setActive((window.location.hash || '#/').replace('#', '') || '/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const normalize = (href) => {
    if (!href) return '/'
    const p = href.replace('#', '')
    return p === '' ? '/' : p
  }

  const isActive = (href) => {
    const n = normalize(href)
    if (n === '/') return active === '/'
    // treat product pages as part of shop
    if (n === '/shop') return active.startsWith('/shop') || active.startsWith('/product')
    return active === n || active.startsWith(n + '/')
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="rr-navbar" role="banner">
        <div className="rr-navbar-inner">
          <a href="#/" className={`rr-brand ${isActive('#/') ? 'active' : ''}`}>
            <span className="rr-brand-mark">RR</span>
            <span className="rr-brand-copy">
              <strong>Ritsa Rugs</strong>
              <small>Handwoven interiors</small>
            </span>
          </a>

          <nav id="main-nav" className={`rr-nav ${open ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
            <ul className="rr-nav-list">
              <li><a href="#/" className={isActive('#/') ? 'active' : ''}>Home</a></li>
              <li className="has-dropdown">
                <button className={`rr-link-button ${isActive('#/shop') ? 'active' : ''}`} aria-haspopup="true" aria-expanded="false">Shop</button>
                <ul className="rr-dropdown" aria-label="Shop submenu">
                  <li><a href="#/shop" className={isActive('#/shop') ? 'active' : ''}>Shop All</a></li>
                  <li><a href="#/shop" className={isActive('#/shop') ? 'active' : ''}>New Arrivals</a></li>
                  <li><a href="#/collections" className={isActive('#/collections') ? 'active' : ''}>Collections</a></li>
                  <li><a href="#/custom" className={isActive('#/custom') ? 'active' : ''}>Custom Rugs</a></li>
                </ul>
              </li>
              <li><a href="#/collections" className={isActive('#/collections') ? 'active' : ''}>Collections</a></li>
              <li><a href="#/about" className={isActive('#/about') ? 'active' : ''}>About</a></li>
              <li><a href="#/contact" className={isActive('#/contact') ? 'active' : ''}>Contact</a></li>
              <li className="rr-search">
                <label className="visually-hidden" htmlFor="nav-search">Search</label>
                <input id="nav-search" type="search" placeholder="Search rugs, patterns..." aria-label="Search rugs" />
              </li>
            </ul>
          </nav>

          <div className="rr-actions">
            <button className="rr-theme-toggle" onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} aria-label="Toggle theme">
              <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
            </button>

            <a href="#/account" className={`rr-icon ${isActive('#/account') ? 'active' : ''}`} aria-label="Account">Account</a>
            <a href="#/cart" className={`rr-icon rr-cart ${isActive('#/cart') ? 'active' : ''}`} aria-label="Cart">Cart <span className="rr-cart-count">{cartCount}</span></a>

            <button className={`rr-hamburger ${open ? 'is-active' : ''}`} aria-controls="main-nav" aria-expanded={open} onClick={toggleOpen} aria-label="Toggle navigation">
              <span className="rr-hamburger-box"><span className="rr-hamburger-inner" /></span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
