import React from 'react'

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy">
          <span className="about-eyebrow">About Ritsa Rugs</span>
          <h1>We design rugs as the foundation of a room, not the afterthought.</h1>
          <p>
            Our collections bring together artisan weaving, durable fibers, and a modern buying experience so each rug feels beautiful in the space and practical in daily life.
          </p>

          <div className="about-actions">
            <a href="#/collections" className="about-primary-action">Explore collections</a>
            <a href="#/contact" className="about-secondary-action">Talk to us</a>
          </div>
        </div>

        <div className="about-hero-panel">
          <span className="about-panel-label">Studio values</span>
          <div className="about-value-grid">
            <article>
              <strong>Ethical</strong>
              <p>Responsible sourcing and long-life materials.</p>
            </article>
            <article>
              <strong>Handmade</strong>
              <p>Craft-led techniques with visible texture and character.</p>
            </article>
            <article>
              <strong>Flexible</strong>
              <p>Custom sizing and collection-based styling for different rooms.</p>
            </article>
            <article>
              <strong>Modern</strong>
              <p>Clean presentation, easier discovery, and design that feels current.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-heading">
          <span className="about-eyebrow">Our story</span>
          <h2>Built around craft, but shaped for how people shop now.</h2>
          <p>
            We work with artisans to create rugs that hold up to everyday use while still bringing warmth, texture, and detail to contemporary interiors.
          </p>
        </div>

        <div className="about-story-grid">
          <article className="about-story-card">
            <span>01</span>
            <h3>Curated materials</h3>
            <p>We focus on durable fibers, tactile finishes, and palettes that work across modern and classic rooms.</p>
          </article>
          <article className="about-story-card">
            <span>02</span>
            <h3>Made with intention</h3>
            <p>Every rug is selected to balance form, function, and the way a real home changes through the day.</p>
          </article>
          <article className="about-story-card">
            <span>03</span>
            <h3>Designed to last</h3>
            <p>Our aim is long-term use, timeless character, and a stronger connection between product and room.</p>
          </article>
        </div>
      </section>

      <section className="about-section about-process">
        <div className="about-process-copy">
          <span className="about-eyebrow">How we work</span>
          <h2>A simple process from inspiration to installation.</h2>
        </div>

        <div className="about-process-list">
          <article>
            <strong>Discovery</strong>
            <p>We review room size, color direction, and the feel you want the rug to bring into the space.</p>
          </article>
          <article>
            <strong>Selection</strong>
            <p>We narrow to the right collection, weave, and material so the design decision stays manageable.</p>
          </article>
          <article>
            <strong>Delivery</strong>
            <p>We help finish the purchase flow with clarity, from standard rugs to custom-sized requests.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
