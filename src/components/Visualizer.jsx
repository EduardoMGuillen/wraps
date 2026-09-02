import { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { CARS, COLORS, whatsappLink } from '../data'
import CarMesh from './CarMesh'

function Studio({ car, color, finish }) {
  return (
    <>
      <hemisphereLight args={['#e8f0ff', '#121212', 0.55]} />
      <ambientLight intensity={0.35} />
      <spotLight position={[7, 9, 5]} intensity={90} color="#ffffff" angle={0.42} penumbra={0.85} castShadow />
      <spotLight position={[-7, 3.2, 2]} intensity={40} color="#c8ff00" angle={0.7} penumbra={1} />
      <directionalLight position={[2, 3, 8]} intensity={1.15} />
      <group rotation={[0, -0.72, 0]}>
        <CarMesh car={car} color={color} finish={finish} />
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[7, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.92} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[2.55, 2.62, 64]} />
        <meshStandardMaterial color="#c8ff00" emissive="#c8ff00" emissiveIntensity={0.85} />
      </mesh>
      <ContactShadows position={[0, 0.01, 0]} opacity={0.62} scale={12} blur={2.4} far={5} />
      <Environment preset="city" />
    </>
  )
}

export default function Visualizer() {
  const [carId, setCarId] = useState('hilux')
  const [colorId, setColorId] = useState('wales')
  const [finish, setFinish] = useState('glossy')

  const car = useMemo(() => CARS.find((c) => c.id === carId), [carId])
  const color = useMemo(() => COLORS.find((c) => c.id === colorId), [colorId])
  const link = whatsappLink({ car, color, finish })
  const acabado = finish === 'glossy' ? 'Glossy' : 'Mate'

  return (
    <section className="section visualizer" id="visualizador">
      <div className="wrap">
        <p className="section-kicker">Configurador</p>
        <h2 className="display">Míralo en tu coche</h2>
        <p className="lede">
          Modelos que se ven todos los días en Honduras. Gira el carro, cambia el vinilo, elige brillo o mate y mándanos la combo por WhatsApp.
        </p>

        <div className="viz-grid">
          <div className="viz-stage">
            <div className="viz-badge">360° · arrastra</div>
            <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 1.05, 9.2], fov: 36 }}>
              <color attach="background" args={['#050505']} />
              <Suspense fallback={null}>
                <Studio car={car} color={color} finish={finish} />
              </Suspense>
              <OrbitControls
                makeDefault
                enablePan={false}
                minDistance={7.5}
                maxDistance={14}
                minPolarAngle={1.35}
                maxPolarAngle={1.42}
                target={[0, 0.55, 0]}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
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
                  <strong>Glossy</strong>
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
