import React from 'react'
import products from '../../assets/products'

const categoryMeta = {
  runner: {
    title: 'Runner Rugs',
    description: 'Slim, durable rugs for hallways, galleries, and narrow interiors that need warmth without crowding the space.',
    tone: 'Terracotta weave',
  },
  area: {
    title: 'Area Rugs',
    description: 'Statement pieces that anchor living rooms and bedrooms with richer texture, pattern, and scale.',
    tone: 'Soft foundation',
  },
  flatweave: {
    title: 'Flatweave Rugs',
    description: 'Lightweight layers with low pile profiles for high-traffic rooms and easy seasonal styling.',
    tone: 'Easy to layer',
  },
  custom: {
    title: 'Custom Rugs',
    description: 'Made-to-order pieces tailored by size, palette, and weave so the rug fits the room instead of the other way around.',
    tone: 'Bespoke finish',
  },
}

const categoryOrder = ['runner', 'area', 'flatweave', 'custom']

const featuredCategories = categoryOrder
  .map((key) => {
    const items = products.filter((product) => product.category === key)
    if (!items.length) return null

    return {
      key,
      ...categoryMeta[key],
      count: items.length,
      product: items[0],
    }
  })
  .filter(Boolean)

const highlights = [
  { value: '100%', label: 'Hand-finished detail' },
  { value: '4', label: 'Core rug families' },
  { value: '24h', label: 'Support response' },
]

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="home-eyebrow">Curated rug studio</span>
          <h1>Rugs that shape a room before the furniture does.</h1>
          <p className="home-lead">
            Ritsa Rugs brings together woven texture, modern color stories, and practical formats for every room in the home.
            Start with a style family, then narrow by scale, pattern, and weave.
          </p>

          <div className="home-actions">
            <a className="home-primary-action" href="#/shop">Browse rugs</a>
            <a className="home-secondary-action" href="#/collections">View collections</a>
          </div>

          <div className="home-highlights" aria-label="Store highlights">
            {highlights.map((item) => (
              <article key={item.label} className="home-highlight-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="home-hero-visual" aria-hidden="true">
          <div className="home-visual-card home-visual-large">
            <span className="home-visual-kicker">Featured weave</span>
            <h2>Warm, layered, and built for everyday use.</h2>
            <p>
              The collection balances traditional craftsmanship with cleaner silhouettes, so each rug can work in both classic and contemporary spaces.
            </p>
          </div>
          <div className="home-visual-stack">
            {featuredCategories.slice(0, 3).map((category, index) => (
              <div key={category.key} className={`home-visual-card home-visual-tile tone-${index + 1}`}>
                <span>{category.count} styles</span>
                <strong>{category.title}</strong>
                <p>{category.tone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <span className="home-eyebrow">Shop by category</span>
          <h2>Choose the rug family that fits the room.</h2>
          <p>
            Each category below highlights a different use case, so customers can quickly understand what belongs where.
          </p>
        </div>

        <div className="home-category-grid">
          {featuredCategories.map((category) => (
            <a key={category.key} href="#/shop" className="home-category-card">
              <span className="home-category-badge">{category.tone}</span>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <div className="home-category-footer">
                <span>{category.count} product{category.count > 1 ? 's' : ''}</span>
                <strong>Explore</strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="home-section home-story-strip">
        <div>
          <span className="home-eyebrow">Why Ritsa Rugs</span>
          <h2>Designed to feel editorial, but practical enough for real homes.</h2>
        </div>
        <p>
          The landing page now leads with a clear story, then breaks the collection into readable rug families so the site feels finished instead of placeholder-driven.
        </p>
      </section>
    </div>
  )
}
