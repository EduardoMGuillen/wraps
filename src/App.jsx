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
              {['Corolla', 'Elantra', 'Civic', 'Hilux', 'Prado', 'Fortuner', 'Glossy', 'Mate', 'Wales Wrap', 'Honduras'].map(
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
            Mándanos el modelo, el color y si lo quieres glossy o mate. Te cotizamos con el vinilo que usamos en taller, no con un render inventado.
          </p>
          <a className="btn btn-wa" href={defaultLink} target="_blank" rel="noreferrer">
            Escribir a {BRAND.whatsappLabel}
          </a>
        </div>
      </section>

      <footer className="footer wrap">
        <span>© {new Date().getFullYear()} Wales Wrap · {BRAND.city}</span>
        <span>{BRAND.hours}</span>
      </footer>
    </>
  )
}
