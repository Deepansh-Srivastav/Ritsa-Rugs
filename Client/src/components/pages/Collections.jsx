import React from 'react'
import products from '../../assets/products'

const collectionMeta = {
  'Persian Classics': {
    title: 'Persian Classics',
    description: 'Traditional motifs, warmer tones, and detailed borders for rooms that need a timeless anchor.',
    tag: 'Heritage weave',
    idealFor: 'Formal living rooms, entryways, and layered interiors',
  },
  'Modern Vintage': {
    title: 'Modern Vintage',
    description: 'Soft worn-in texture with a contemporary palette for spaces that want character without heaviness.',
    tag: 'Refined patina',
    idealFor: 'Lounge areas, apartments, and relaxed sitting rooms',
  },
  'Boho Mix': {
    title: 'Boho Mix',
    description: 'Lightweight and expressive flatweaves designed to add movement, texture, and casual warmth.',
    tag: 'Easy layering',
    idealFor: 'Bedrooms, studios, and high-traffic everyday spaces',
  },
  Bespoke: {
    title: 'Bespoke',
    description: 'Custom-sized designs tailored to fit the room layout, color palette, and pile preference.',
    tag: 'Made to order',
    idealFor: 'Project work, large rooms, and unique layouts',
  },
}

export default function Collections() {
  const collections = Array.from(new Set(products.map((p) => p.collection))).map((name) => {
    const items = products.filter((product) => product.collection === name)
    const prices = items.map((item) => item.price)
    const details = collectionMeta[name] || {
      title: name,
      description: 'Curated rug selection for the collection.',
      tag: 'Selected styles',
      idealFor: 'Everyday interiors',
    }

    return {
      name,
      items,
      count: items.length,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      featuredProduct: items[0],
      ...details,
    }
  })

  const featuredCollection = collections[0]

  return (
    <div className="collections-page">
      <section className="collections-hero">
        <div className="collections-hero-copy">
          <span className="collections-eyebrow">Collections</span>
          <h1>Shop by collection, not just by product.</h1>
          <p>
            Each collection is arranged like a small storefront: style direction, key details, price range, and the spaces it works best in.
          </p>

          <div className="collections-hero-actions">
            <a href="#/shop" className="collections-primary-action">Browse all rugs</a>
            <a href="#/contact" className="collections-secondary-action">Request a custom size</a>
          </div>

          <div className="collections-stats">
            <article>
              <strong>{collections.length}</strong>
              <span>Curated collections</span>
            </article>
            <article>
              <strong>{products.length}</strong>
              <span>Rugs in catalog</span>
            </article>
            <article>
              <strong>{featuredCollection?.name || 'New'}</strong>
              <span>Featured collection</span>
            </article>
          </div>
        </div>

        <div className="collections-hero-panel">
          <span className="collections-panel-label">Spotlight</span>
          <h2>{featuredCollection?.title}</h2>
          <p>{featuredCollection?.description}</p>
          <div className="collections-panel-grid">
            <div>
              <span>Price range</span>
              <strong>${featuredCollection?.minPrice.toFixed(2)} - ${featuredCollection?.maxPrice.toFixed(2)}</strong>
            </div>
            <div>
              <span>Best for</span>
              <strong>{featuredCollection?.idealFor}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="collections-section">
        <div className="collections-section-heading">
          <span className="collections-eyebrow">Collection details</span>
          <h2>Browse the store by collection family.</h2>
          <p>Each card uses real product data so the page feels like an ecommerce collection hub, not a generic gallery.</p>
        </div>

        <div className="collections-grid">
          {collections.map((collection) => (
            <a key={collection.name} href={`#/collections/${encodeURIComponent(collection.name)}`} className="collection-card">
              <div className="collection-card-media">
                <img src={collection.featuredProduct.image} alt={collection.featuredProduct.name} />
                <span className="collection-tag">{collection.tag}</span>
              </div>

              <div className="collection-card-body">
                <div className="collection-card-topline">
                  <h3>{collection.title}</h3>
                  <span>{collection.count} item{collection.count > 1 ? 's' : ''}</span>
                </div>

                <p>{collection.description}</p>

                <div className="collection-card-meta">
                  <div>
                    <span>Starts at</span>
                    <strong>${collection.minPrice.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span>Style</span>
                    <strong>{collection.featuredProduct.category}</strong>
                  </div>
                </div>

                <div className="collection-card-footnote">
                  <span>{collection.idealFor}</span>
                  <strong>Shop collection</strong>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="collections-section collections-story-bar">
        <div>
          <span className="collections-eyebrow">Editor’s note</span>
          <h2>Designed to support filtering, storytelling, and buying intent in one view.</h2>
        </div>
        <p>
          The layout combines commercial clarity with a softer editorial finish, so visitors can compare collections quickly while still feeling the brand.
        </p>
      </section>
    </div>
  )
}
