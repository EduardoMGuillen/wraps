import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, OrbitControls, ContactShadows } from '@react-three/drei'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function LogoPlaque() {
  const texture = useTexture('/logo.png')
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.35}>
      <group>
        <mesh>
          <boxGeometry args={[2.42, 2.42, 0.24]} />
          <meshStandardMaterial attach="material-0" color="#c8ff00" emissive="#c8ff00" emissiveIntensity={0.7} />
          <meshStandardMaterial attach="material-1" color="#c8ff00" emissive="#c8ff00" emissiveIntensity={0.7} />
          <meshStandardMaterial attach="material-2" color="#c8ff00" emissive="#c8ff00" emissiveIntensity={0.7} />
          <meshStandardMaterial attach="material-3" color="#c8ff00" emissive="#c8ff00" emissiveIntensity={0.7} />
          <meshStandardMaterial attach="material-4" map={texture} roughness={0.35} metalness={0.12} />
          <meshStandardMaterial attach="material-5" map={texture} roughness={0.35} metalness={0.12} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.92, 0.016, 12, 80]} />
          <meshStandardMaterial color="#c8ff00" emissive="#c8ff00" emissiveIntensity={1.35} />
        </mesh>
        <mesh rotation={[0.18, 0.35, 0.1]}>
          <torusGeometry args={[2.08, 0.01, 8, 80]} />
          <meshStandardMaterial color="#c8ff00" emissive="#8fb800" emissiveIntensity={0.55} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  )
}

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-canvas">
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.15, 5.1], fov: 32 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.55} />
          <spotLight position={[5, 6, 4]} intensity={60} color="#c8ff00" angle={0.5} penumbra={0.8} />
          <spotLight position={[-5, 3, 5]} intensity={35} color="#ffffff" angle={0.6} penumbra={1} />
          <Suspense fallback={null}>
            <LogoPlaque />
            <Environment preset="night" />
          </Suspense>
          <ContactShadows position={[0, -1.55, 0]} opacity={0.45} scale={8} blur={2.6} far={3} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1.35}
            minPolarAngle={Math.PI / 2.7}
            maxPolarAngle={Math.PI / 1.7}
          />
        </Canvas>
      </div>
      <div className="hero-copy">
        <p className="hero-kicker">Honduras · Wraps automotrices</p>
        <h1 className="display">
          Wales <span>Wrap</span>
        </h1>
        <p>Elige el carro que ya tienes. Prueba el color. Brillo o mate. Lo que ves es lo que instalamos.</p>
        <div className="hero-actions">
          <a className="btn" href="#visualizador">
            Míralo en tu coche
          </a>
          <a className="btn btn-ghost" href="#contacto">
            Cotizar
          </a>
        </div>
        <p className="hero-hint">Arrastra el logo · gira en 3D</p>
      </div>
    </header>
  )
}
