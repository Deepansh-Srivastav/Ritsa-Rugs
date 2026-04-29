import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import Hero from '@/components/Hero/Hero';
import './Home.scss';

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <Hero />

            {/* Categories Section */}
            <section className="categories">
                <div className="page-wrapper">
                    <h2>Shop by Category</h2>
                    <div className="categories__grid">
                        <Link to="/products?category=living" className="category-card">
                            <div className="category-card__image">Living Room</div>
                            <h3>Living Room</h3>
                        </Link>
                        <Link to="/products?category=bedroom" className="category-card">
                            <div className="category-card__image">Bedroom</div>
                            <h3>Bedroom</h3>
                        </Link>
                        <Link to="/products?category=dining" className="category-card">
                            <div className="category-card__image">Dining Room</div>
                            <h3>Dining Room</h3>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products - Will be populated by API */}
            <section className="featured">
                <div className="page-wrapper">
                    <h2>Featured Collection</h2>
                    <p>Explore our most beloved rugs</p>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter">
                <div className="page-wrapper">
                    <h2>Stay Updated</h2>
                    <form className="newsletter__form">
                        <input type="email" placeholder="Enter your email" required />
                        <Button variant="primary">Subscribe</Button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;