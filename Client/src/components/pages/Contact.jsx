import React from 'react'

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
    window.alert('Thanks for reaching out. This contact form is a demo.')
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-copy">
          <span className="contact-eyebrow">Contact</span>
          <h1>Need help choosing the right rug or planning a custom size?</h1>
          <p>
            Send us the room dimensions, your preferred style, and the kind of atmosphere you want. We’ll help narrow the choices and guide the next step.
          </p>

          <div className="contact-info-grid">
            <article>
              <span>Email</span>
              <strong><a href="mailto:hello@ritsa-rugs.example">hello@ritsa-rugs.example</a></strong>
            </article>
            <article>
              <span>Phone</span>
              <strong>+1 (555) 014-2026</strong>
            </article>
            <article>
              <span>Hours</span>
              <strong>Mon - Fri, 9am - 6pm</strong>
            </article>
          </div>
        </div>

        <div className="contact-hero-panel">
          <span className="contact-panel-label">Quick help</span>
          <h2>Tell us about the room, and we’ll respond with a tighter shortlist.</h2>
          <ul className="contact-quick-list">
            <li>Share size, style, and budget</li>
            <li>Ask about material or pile height</li>
            <li>Request a custom-made option</li>
            <li>Get help choosing between collections</li>
          </ul>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-section-heading">
          <span className="contact-eyebrow">Send a message</span>
          <h2>Use the form for project questions or product support.</h2>
          <p>Keep it short or detailed. A few room notes are enough for us to respond with something useful.</p>
        </div>

        <div className="contact-layout">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field-grid">
              <label>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
            </div>

            <label>
              <span>Subject</span>
              <input type="text" name="subject" placeholder="Custom rug, collection question, or order support" required />
            </label>

            <label>
              <span>Message</span>
              <textarea name="message" rows={7} placeholder="Tell us about the room size, style preference, and anything specific you need." required />
            </label>

            <button type="submit" className="contact-submit">Send message</button>
          </form>

          <aside className="contact-sidebar">
            <article>
              <strong>What to include</strong>
              <p>Room dimensions, preferred collection, color palette, and any timing constraints.</p>
            </article>
            <article>
              <strong>Fastest response</strong>
              <p>Email is best for custom requests and anything that needs product references or images.</p>
            </article>
            <article>
              <strong>Shopping help</strong>
              <p>If you are unsure where to start, we can compare collections and suggest the most suitable weave.</p>
            </article>
          </aside>
        </div>
      </section>
    </div>
  )
}
