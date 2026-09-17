import { useMemo, useState, useEffect } from 'react'
import { CARS, COLORS, whatsappLink } from '../data.js'

export default function PngVisualizer() {
  const [carId, setCarId] = useState('hilux')
  const [colorId, setColorId] = useState('wales')
  const [finish, setFinish] = useState('glossy')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imagePath, setImagePath] = useState('')
  const [searchText, setSearchText] = useState('')
  const [brandFilter, setBrandFilter] = useState('all')

  const car = useMemo(() => CARS.find((c) => c.id === carId), [carId])
  const color = useMemo(() => COLORS.find((c) => c.id === colorId), [colorId])
  const link = whatsappLink({ car, color, finish })
  const acabado = finish === 'glossy' ? 'Brillante' : 'Mate'

  // Get unique makes for brand filter
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(CARS.map(c => c.make))].sort()
    return uniqueBrands
  }, [])

  // Filter cars based on search and brand
  const filteredCars = useMemo(() => {
    return CARS.filter(car => {
      const matchesSearch = searchText === '' || 
        car.name.toLowerCase().includes(searchText.toLowerCase()) ||
        car.make.toLowerCase().includes(searchText.toLowerCase()) ||
        car.note.toLowerCase().includes(searchText.toLowerCase())
      
      const matchesBrand = brandFilter === 'all' || car.make === brandFilter
      
      return matchesSearch && matchesBrand
    })
  }, [searchText, brandFilter])

  useEffect(() => {
    setImageLoaded(false)
    const path = `/cars/${carId}/${colorId}.png`
    const img = new Image()
    img.onload = () => {
      setImagePath(path)
      setImageLoaded(true)
    }
    img.onerror = () => {
      // Fallback to base car image if color-specific doesn't exist
      const fallbackPath = `/cars/${carId}.png`
      const fallbackImg = new Image()
      fallbackImg.onload = () => {
        setImagePath(fallbackPath)
        setImageLoaded(true)
      }
      fallbackImg.onerror = () => {
        setImageLoaded(false)
      }
      fallbackImg.src = fallbackPath
    }
    img.src = path
  }, [carId, colorId])

  return (
    <section className="section visualizer" id="visualizador">
      <div className="wrap">
        <p className="section-kicker">Configurador</p>
        <h2 className="display">Míralo en tu coche</h2>
        <p className="lede">
          Modelos que se ven todos los días en San Pedro Sula. Gira el carro, cambia el vinilo, elige brillo o mate y mándanos la combo por WhatsApp.
        </p>

        <div className="viz-grid">
          <div className="viz-stage-png">
            <div className="viz-badge">Visualizador</div>
            
            {/* PNG-based car visualization */}
            <div className="png-car-display">
              {imageLoaded ? (
                <div className="real-car-photo">
                  <img 
                    src={imagePath}
                    alt={`${car.make} ${car.name} - ${color.name}`}
                    className="car-base-photo"
                  />
                  {/* Light finish overlay: brightness adjustment only */}
                  <div 
                    className="finish-overlay"
                    style={{
                      filter: finish === 'glossy' 
                        ? 'brightness(1.08) contrast(1.02)' 
                        : 'brightness(0.92) contrast(0.98)',
                      mixBlendMode: finish === 'glossy' ? 'screen' : 'multiply',
                      opacity: finish === 'glossy' ? 0.15 : 0.12
                    }}
                  />
                </div>
              ) : (
                <div className="loading-placeholder">
                  <div className="loading-spinner"></div>
                </div>
              )}
            </div>

            <div className="viz-caption">
              <div>
                <strong>
                  {car.make} {car.name}
                </strong>
                <div>
                  <span>
                    {color.name} · {acabado}
                  </span>
                </div>
              </div>
              <span>{car.note}</span>
            </div>
          </div>

          <aside className="panel">
            <div className="panel-scroll">
              <h3>Modelo</h3>
              
              {/* Car filters */}
              <div className="car-filters">
                <input
                  type="text"
                  className="car-search"
                  placeholder="Buscar modelo..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  aria-label="Buscar por nombre o marca"
                />
                <select
                  className="brand-filter"
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  aria-label="Filtrar por marca"
                >
                  <option value="all">Todas las marcas</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="car-list">
                {filteredCars.length > 0 ? (
                  filteredCars.map((item) => (
                    <button
                      key={item.id}
                      className={`car-chip ${item.id === carId ? 'active' : ''}`}
                      onClick={() => setCarId(item.id)}
                      type="button"
                    >
                      {item.make} {item.name}
                      <small>{item.note}</small>
                    </button>
                  ))
                ) : (
                  <p className="no-results">No se encontraron modelos</p>
                )}
              </div>

              <h3>Color del wrap</h3>
              <div className="swatches">
                {COLORS.map((item) => (
                  <button
                    key={item.id}
                    className={`swatch ${item.id === colorId ? 'active' : ''}`}
                    style={{ background: item.hex }}
                    onClick={() => setColorId(item.id)}
                    type="button"
                    title={item.name}
                    aria-label={item.name}
                  />
                ))}
              </div>
              <p className="swatch-name">{color.name}</p>

              <h3>Acabado</h3>
              <div className="finish">
                <button
                  type="button"
                  className={`finish-btn ${finish === 'glossy' ? 'active' : ''}`}
                  onClick={() => setFinish('glossy')}
                >
                  <div className="finish-orb gloss" style={{ '--orb': color.hex }} />
                  <strong>Brillante</strong>
                  <span>Brillo tipo showroom. Refleja todo.</span>
                </button>
                <button
                  type="button"
                  className={`finish-btn ${finish === 'matte' ? 'active' : ''}`}
                  onClick={() => setFinish('matte')}
                >
                  <div className="finish-orb matte" style={{ '--orb': color.hex }} />
                  <strong>Mate</strong>
                  <span>Stealth. Se come la luz.</span>
                </button>
              </div>
            </div>

            <div className="quote">
              <a className="btn btn-wa" href={link} target="_blank" rel="noreferrer">
                Cotizar esta combo por WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
