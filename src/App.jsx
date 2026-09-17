import Hero from './components/Hero'
import PngVisualizer from './components/PngVisualizer'
import { BRAND, FAQS, SERVICES, STEPS, whatsappLink, CARS, COLORS } from './data'

const defaultLink = whatsappLink({
  car: CARS.find((c) => c.id === 'hilux'),
  color: COLORS.find((c) => c.id === 'wales'),
  finish: 'glossy',
})

function Nav() {
  return (
    <nav className="nav">
      <a className="nav-brand" href="#top">
        <img src="/logo.png" alt="Wales Wrap" />
        <span>
          WALES <em>WRAP</em>
        </span>
      </a>
      <div className="nav-links">
        <a href="#visualizador">Míralo en tu coche</a>
        <a href="#servicios">Servicios</a>
        <a href="#proceso">Proceso</a>
        {BRAND.instagram && (
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="nav-social" title="Síguenos en Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        )}
        <a className="btn" href={defaultLink} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <>
      <div className="grain" />
      <Nav />
      <Hero />

      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee">
          {Array.from({ length: 2 }).map((_, loop) => (
            <span key={loop} style={{ display: 'flex', gap: '2.2rem' }}>
              {['Corolla', 'Elantra', 'Civic', 'Hilux', 'Prado', 'Fortuner', 'Brillante', 'Mate', 'Wales Wrap', 'San Pedro Sula'].map(
                (item, i) => (
                  <span key={`${loop}-${i}`}>{item} ·</span>
                ),
              )}
            </span>
          ))}
        </div>
      </div>

      <PngVisualizer />

      <section className="section" id="servicios">
        <div className="wrap">
          <p className="section-kicker">Taller</p>
          <h2 className="display">Lo que hacemos</h2>
          <p className="lede">Vinilo, no pintura. Se instala, se ve, y si un día te cansas, se quita.</p>
          <div className="services">
            {SERVICES.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="proceso" style={{ background: '#080808' }}>
        <div className="wrap">
          <p className="section-kicker">Cómo va</p>
          <h2 className="display">De la pantalla al patio</h2>
          <div className="steps">
            {STEPS.map((item) => (
              <article className="step" key={item.n}>
                <div className="n">{item.n}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="section-kicker">Preguntas</p>
          <h2 className="display">Sin misterio</h2>
          <div className="faq">
            {FAQS.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta" id="contacto">
        <div className="wrap">
          <p className="section-kicker">{BRAND.city}</p>
          <h2 className="display">¿Ya lo viste en tu carro?</h2>
          <p>
            Mándanos el modelo, el color y si lo quieres brillante o mate. Te cotizamos con el vinilo que usamos en taller, no con un render inventado.
          </p>
          <a className="btn btn-wa" href={defaultLink} target="_blank" rel="noreferrer">
            Escribir a {BRAND.whatsappLabel}
          </a>
        </div>
      </section>

      <footer className="footer wrap">
        <div className="footer-info">
          <span>© {new Date().getFullYear()} Wales Wrap · {BRAND.city}</span>
          <span>{BRAND.hours}</span>
        </div>
        {BRAND.instagram && (
          <div className="footer-social">
            <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@{BRAND.instagram}</span>
            </a>
          </div>
        )}
      </footer>
    </>
  )
}
