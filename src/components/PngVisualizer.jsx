import { useMemo, useState, useEffect, useRef } from 'react'
import { CARS, COLORS, whatsappLink } from '../data.js'

export default function PngVisualizer() {
  const [carId, setCarId] = useState('hilux')
  const [colorId, setColorId] = useState('wales')
  const [finish, setFinish] = useState('glossy')
  const [hasRealPhoto, setHasRealPhoto] = useState(false)
  const canvasRef = useRef(null)
  const baseImageRef = useRef(null)

  const car = useMemo(() => CARS.find((c) => c.id === carId), [carId])
  const color = useMemo(() => COLORS.find((c) => c.id === colorId), [colorId])
  const link = whatsappLink({ car, color, finish })
  const acabado = finish === 'glossy' ? 'Brillante' : 'Mate'

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setHasRealPhoto(true)
      baseImageRef.current = img
    }
    img.onerror = () => setHasRealPhoto(false)
    img.src = `/cars/${carId}.png`
  }, [carId])

  useEffect(() => {
    if (!hasRealPhoto || !baseImageRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = baseImageRef.current

    canvas.width = img.width
    canvas.height = img.height

    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    }

    const wrapColor = hexToRgb(color.hex)
    const luminanceThreshold = 160
    const glossyIntensity = 0.5
    const matteIntensity = 0.65

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b

      if (luminance > luminanceThreshold) {
        const tintStrength = finish === 'glossy' ? glossyIntensity : matteIntensity
        const brightnessFactor = finish === 'glossy' ? 1.1 : 0.85
        
        data[i] = r * (1 - tintStrength) + wrapColor.r * tintStrength * brightnessFactor
        data[i + 1] = g * (1 - tintStrength) + wrapColor.g * tintStrength * brightnessFactor
        data[i + 2] = b * (1 - tintStrength) + wrapColor.b * tintStrength * brightnessFactor
      }
    }

    ctx.putImageData(imageData, 0, 0)
  }, [hasRealPhoto, color, finish])

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
              {hasRealPhoto ? (
                <div className="real-car-photo">
                  <canvas 
                    ref={canvasRef}
                    className="car-tinted-canvas"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              ) : (
                <div 
                  className="car-silhouette" 
                  data-car={car.id}
                  style={{
                    '--wrap-color': color.hex,
                    '--wrap-finish': finish === 'glossy' ? '1' : '0.3'
                  }}
                >
                  {/* SVG fallback when real photo not available */}
                  <div className="asset-placeholder">
                  <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id={`carGrad-${finish}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: color.hex, stopOpacity: finish === 'glossy' ? 1 : 0.9 }} />
                        <stop offset="100%" style={{ stopColor: color.hex, stopOpacity: finish === 'glossy' ? 0.85 : 0.75 }} />
                      </linearGradient>
                      <filter id="glossFilter">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
                        <feComponentTransfer>
                          <feFuncA type="discrete" tableValues="1" />
                        </feComponentTransfer>
                      </filter>
                    </defs>
                    
                    {/* Different car silhouettes based on type */}
                    {(car.kind === 'sedan' || car.kind === 'fastback') && (
                      <g>
                        {/* Sedan/Fastback silhouette */}
                        <ellipse cx="400" cy="350" rx="380" ry="30" fill="#0a0a0a" opacity="0.3" />
                        <path 
                          d="M 150 280 L 180 250 L 250 230 L 320 220 L 480 220 L 550 230 L 620 250 L 650 280 L 650 300 L 630 320 L 170 320 L 150 300 Z" 
                          fill={`url(#carGrad-${finish})`}
                          filter={finish === 'glossy' ? 'url(#glossFilter)' : ''}
                        />
                        <path 
                          d="M 270 230 L 290 200 L 350 185 L 450 185 L 510 200 L 530 230" 
                          fill={`url(#carGrad-${finish})`}
                          filter={finish === 'glossy' ? 'url(#glossFilter)' : ''}
                        />
                        <rect x="300" y="195" width="200" height="40" rx="5" fill="#1a2a3a" opacity="0.6" />
                        <circle cx="230" cy="310" r="35" fill="#111" />
                        <circle cx="230" cy="310" r="22" fill="#333" />
                        <circle cx="570" cy="310" r="35" fill="#111" />
                        <circle cx="570" cy="310" r="22" fill="#333" />
                        {finish === 'glossy' && (
                          <>
                            <ellipse cx="350" cy="250" rx="80" ry="30" fill="white" opacity="0.25" />
                            <ellipse cx="500" cy="235" rx="60" ry="25" fill="white" opacity="0.2" />
                          </>
                        )}
                      </g>
                    )}
                    
                    {car.kind === 'pickup' && (
                      <g>
                        {/* Pickup silhouette */}
                        <ellipse cx="400" cy="360" rx="400" ry="30" fill="#0a0a0a" opacity="0.3" />
                        <path 
                          d="M 120 290 L 150 260 L 220 240 L 300 230 L 420 230 L 480 240 L 580 260 L 680 290 L 680 310 L 650 330 L 150 330 L 120 310 Z" 
                          fill={`url(#carGrad-${finish})`}
                        />
                        <path 
                          d="M 420 240 L 440 195 L 500 175 L 580 175 L 640 195 L 660 240" 
                          fill={`url(#carGrad-${finish})`}
                        />
                        <rect x="470" y="190" width="150" height="55" rx="5" fill="#1a2a3a" opacity="0.6" />
                        <rect x="140" y="260" width="260" height="60" rx="3" fill={color.hex} opacity={finish === 'glossy' ? 0.85 : 0.7} />
                        <rect x="140" y="255" width="260" height="10" fill="#1a1a1a" />
                        <circle cx="250" cy="320" r="40" fill="#111" />
                        <circle cx="250" cy="320" r="25" fill="#333" />
                        <circle cx="620" cy="320" r="40" fill="#111" />
                        <circle cx="620" cy="320" r="25" fill="#333" />
                        {finish === 'glossy' && (
                          <ellipse cx="500" cy="220" rx="70" ry="25" fill="white" opacity="0.25" />
                        )}
                      </g>
                    )}
                    
                    {(car.kind === 'suvBox' || car.kind === 'suvSlope') && (
                      <g>
                        {/* SUV silhouette */}
                        <ellipse cx="400" cy="360" rx="390" ry="30" fill="#0a0a0a" opacity="0.3" />
                        <path 
                          d="M 140 285 L 170 255 L 240 235 L 320 225 L 480 225 L 560 235 L 630 255 L 660 285 L 660 310 L 640 330 L 160 330 L 140 310 Z" 
                          fill={`url(#carGrad-${finish})`}
                        />
                        <path 
                          d="M 260 235 L 280 180 L 340 160 L 460 160 L 520 180 L ${car.kind === 'suvBox' ? '540' : '535'} 235" 
                          fill={`url(#carGrad-${finish})`}
                        />
                        <rect x="290" y="175" width="220" height="65" rx="5" fill="#1a2a3a" opacity="0.6" />
                        {car.spare && (
                          <circle cx="140" cy="285" r="28" fill={color.hex} opacity="0.9" />
                        )}
                        {car.rails && (
                          <>
                            <rect x="280" y="155" width="240" height="3" rx="1.5" fill="#333" />
                          </>
                        )}
                        <circle cx="240" cy="320" r="42" fill="#111" />
                        <circle cx="240" cy="320" r="26" fill="#333" />
                        <circle cx="590" cy="320" r="42" fill="#111" />
                        <circle cx="590" cy="320" r="26" fill="#333" />
                        {finish === 'glossy' && (
                          <>
                            <ellipse cx="370" cy="210" rx="75" ry="30" fill="white" opacity="0.25" />
                            <ellipse cx="500" cy="270" rx="90" ry="35" fill="white" opacity="0.18" />
                          </>
                        )}
                      </g>
                    )}
                  </svg>
                  
                    <div className="asset-note">
                      📸 Espacio para foto real del {car.make} {car.name}
                    </div>
                  </div>
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
              <div className="car-list">
                {CARS.map((item) => (
                  <button
                    key={item.id}
                    className={`car-chip ${item.id === carId ? 'active' : ''}`}
                    onClick={() => setCarId(item.id)}
                    type="button"
                  >
                    {item.make} {item.name}
                    <small>{item.note}</small>
                  </button>
                ))}
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
