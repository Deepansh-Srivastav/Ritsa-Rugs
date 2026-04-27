import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from 'react-icons/fi';
import { useState } from 'react';
import './Footer.scss';

export const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribeMessage, setSubscribeMessage] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribeMessage('Thanks for subscribing!');
            setEmail('');
            setTimeout(() => setSubscribeMessage(''), 3000);
        }
    };

    return (
        <footer className="footer">
            <div className="footer__container">
                {/* Brand Section */}
                <div className="footer__section">
                    <h3 className="footer__title">Ritsa Rugs</h3>
                    <p className="footer__description">
                        Handcrafted rugs that bring warmth, style, and culture to your home.
                    </p>
                    <div className="footer__social">
                        <a href="#" aria-label="Facebook" title="Facebook">
                            <FiFacebook />
                        </a>
                        <a href="#" aria-label="Instagram" title="Instagram">
                            <FiInstagram />
                        </a>
                        <a href="#" aria-label="Twitter" title="Twitter">
                            <FiTwitter />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer__section">
                    <h4 className="footer__heading">Shop</h4>
                    <ul className="footer__links">
                        <li>
                            <Link to="/products">All Rugs</Link>
                        </li>
                        <li>
                            <Link to="/products?category=living">Living Room</Link>
                        </li>
                        <li>
                            <Link to="/products?category=bedroom">Bedroom</Link>
                        </li>
                        <li>
                            <Link to="/products?category=dining">Dining Room</Link>
                        </li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="footer__section">
                    <h4 className="footer__heading">Support</h4>
                    <ul className="footer__links">
                        <li>
                            <a href="#contact">Contact Us</a>
                        </li>
                        <li>
                            <a href="#faq">FAQ</a>
                        </li>
                        <li>
                            <a href="#shipping">Shipping Info</a>
                        </li>
                        <li>
                            <a href="#returns">Returns & Exchanges</a>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="footer__section">
                    <h4 className="footer__heading">Stay Updated</h4>
                    <p className="footer__newsletter-desc">Get the latest updates on new collections and offers.</p>
                    <form onSubmit={handleSubscribe} className="footer__newsletter">
                        <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="footer__newsletter-input"
                            required
                        />
                        <button type="submit" className="footer__newsletter-btn" aria-label="Subscribe">
                            <FiMail />
                        </button>
                    </form>
                    {subscribeMessage && <p className="footer__message">{subscribeMessage}</p>}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footer__bottom">
                <p>&copy; 2024 Ritsa Rugs. All rights reserved.</p>
                <div className="footer__legal">
                    <a href="#privacy">Privacy Policy</a>
                    <span className="footer__divider">|</span>
                    <a href="#terms">Terms of Service</a>
                    <span className="footer__divider">|</span>
                    <a href="#cookies">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
};
