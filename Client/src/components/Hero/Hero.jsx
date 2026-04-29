import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './Hero.module.scss';

import heroRug1 from '@/assets/images/hero/hero-rug-1.png';
import heroRug2 from '@/assets/images/hero/hero-rug-2.png';
import heroRug3 from '@/assets/images/hero/hero-rug-3.png';
import heroRug4 from '@/assets/images/hero/hero-rug-4.png';

const HERO_IMAGES = [
  { src: heroRug1, alt: 'Persian rug in elegant living room' },
  { src: heroRug2, alt: 'Modern geometric rug in bedroom' },
  { src: heroRug3, alt: 'Bohemian rug in cozy reading nook' },
  { src: heroRug4, alt: 'Turkish rug in dining room' },
];

const FEATURES = [
  { icon: '✦', title: 'Premium Quality', desc: 'Materials' },
  { icon: '✋', title: 'Handcrafted', desc: 'Designs' },
  { icon: '🛡', title: 'Durable &', desc: 'Long Lasting' },
  { icon: '★', title: 'Trusted by', desc: 'Thousands' },
];

const Hero = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.hero} id="hero-section">
      <div className={styles.container}>
        {/* ── Text block ── */}
        <div className={styles.content}>
          <span className={styles.badge}>Handmade & Premium</span>

          <h1 className={styles.heading}>
            Transform Your Space with{' '}
            <span className={styles.headingAccent}>Timeless Rugs</span>
          </h1>

          <p className={styles.subheading}>
            Discover our curated collection of handcrafted rugs — woven with
            tradition, designed for modern living. Each piece tells a story of
            artistry and heritage.
          </p>

          <div className={styles.ctas}>
            <Link to="/products" className={styles.ctaPrimary}>
              Explore Collection
              <FiArrowRight className={styles.ctaIcon} />
            </Link>
            <Link to="/about" className={styles.ctaSecondary}>
              Our Story
            </Link>
          </div>

          {/* ── Feature points ── */}
          <ul className={styles.features}>
            {FEATURES.map((f) => (
              <li key={f.title} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <div>
                  <span className={styles.featureTitle}>{f.title}</span>
                  <span className={styles.featureDesc}>{f.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Image gallery ── */}
        <div className={styles.gallery}>
          <div className={styles.galleryTrack} ref={scrollRef}>
            {HERO_IMAGES.map((img, i) => (
              <div
                key={i}
                className={`${styles.card} ${i === 1 ? styles.cardFocus : ''}`}
              >
                <img src={img.src} alt={img.alt} className={styles.cardImg} />
              </div>
            ))}
          </div>

          {/* Scroll arrows */}
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
