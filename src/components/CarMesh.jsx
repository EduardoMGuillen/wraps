import { RoundedBox } from '@react-three/drei'
import { paintProps } from '../data'

function Paint({ color, finish }) {
  return <meshPhysicalMaterial {...paintProps(color.hex, finish, color.metallic)} />
}

function Wheel({ radius, width, x, z }) {
  return (
    <group position={[x, radius, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[radius, radius, width, 48]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.95} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.68, radius * 0.68, width + 0.04, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.82} roughness={0.28} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.22, radius * 0.22, width + 0.05, 16]} />
        <meshStandardMaterial color="#111" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  )
}

function Wheels({ car }) {
  const z = car.width / 2 + 0.04
  return (
    <>
      <Wheel radius={car.wheelRadius} width={car.wheelWidth} x={car.axles[0]} z={z} />
      <Wheel radius={car.wheelRadius} width={car.wheelWidth} x={car.axles[0]} z={-z} />
      <Wheel radius={car.wheelRadius} width={car.wheelWidth} x={car.axles[1]} z={z} />
      <Wheel radius={car.wheelRadius} width={car.wheelWidth} x={car.axles[1]} z={-z} />
    </>
  )
}

function Lights({ front, rear, width, y }) {
  const z = width * 0.32
  return (
    <>
      <mesh position={[front, y, z]}>
        <boxGeometry args={[0.08, 0.12, 0.32]} />
        <meshStandardMaterial color="#f4f7ff" emissive="#eef3ff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[front, y, -z]}>
        <boxGeometry args={[0.08, 0.12, 0.32]} />
        <meshStandardMaterial color="#f4f7ff" emissive="#eef3ff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[rear, y, z]}>
        <boxGeometry args={[0.06, 0.1, 0.28]} />
        <meshStandardMaterial color="#ff2a2a" emissive="#ff1d1d" emissiveIntensity={1.1} />
      </mesh>
      <mesh position={[rear, y, -z]}>
        <boxGeometry args={[0.06, 0.1, 0.28]} />
        <meshStandardMaterial color="#ff2a2a" emissive="#ff1d1d" emissiveIntensity={1.1} />
      </mesh>
    </>
  )
}

function CabinGlass({ position, size }) {
  return (
    <RoundedBox args={size} radius={0.06} smoothness={4} position={position}>
      <meshPhysicalMaterial color="#071018" roughness={0.08} metalness={0.25} transparent opacity={0.55} />
    </RoundedBox>
  )
}

function Sedan({ car, color, finish, fastback }) {
  const w = car.width
  const y = car.wheelRadius + 0.08
  return (
    <group>
      <RoundedBox args={[4.4, 0.58, w * 0.92]} radius={0.1} smoothness={5} position={[0.02, y + 0.16, 0]} castShadow>
        <Paint color={color} finish={finish} />
      </RoundedBox>
      <RoundedBox
        args={[fastback ? 2.45 : 2.2, 0.62, w * 0.84]}
        radius={0.1}
        smoothness={5}
        position={[fastback ? -0.05 : -0.2, y + 0.72, 0]}
        castShadow
      >
        <Paint color={color} finish={finish} />
      </RoundedBox>
      <CabinGlass position={[fastback ? -0.05 : -0.2, y + 0.78, 0]} size={[fastback ? 2.28 : 2.05, 0.42, w * 0.85]} />
      <mesh position={[1.22, y + 0.4, 0]} rotation={[0, 0, -0.16]} castShadow>
        <boxGeometry args={[1.35, 0.12, w * 0.88]} />
        <Paint color={color} finish={finish} />
      </mesh>
      {!fastback && (
        <mesh position={[-1.55, y + 0.38, 0]} rotation={[0, 0, 0.08]} castShadow>
          <boxGeometry args={[0.9, 0.1, w * 0.96]} />
          <Paint color={color} finish={finish} />
        </mesh>
      )}
      <Lights front={2.18} rear={-2.16} width={w} y={y + 0.16} />
      <Wheels car={car} />
    </group>
  )
}

function Pickup({ car, color, finish }) {
  const w = car.width
  const y = car.wheelRadius + 0.1
  return (
    <group>
      <RoundedBox args={[5.15, 0.56, w * 0.9]} radius={0.08} smoothness={5} position={[0.05, y + 0.14, 0]} castShadow>
        <Paint color={color} finish={finish} />
      </RoundedBox>
      <RoundedBox args={[1.85, 0.92, w * 0.86]} radius={0.1} smoothness={5} position={[0.72, y + 0.78, 0]} castShadow>
        <Paint color={color} finish={finish} />
      </RoundedBox>
      <CabinGlass position={[0.68, y + 0.88, 0]} size={[1.62, 0.52, w * 0.87]} />
      <mesh position={[1.72, y + 0.44, 0]} rotation={[0, 0, -0.12]} castShadow>
        <boxGeometry args={[1.15, 0.14, w * 0.86]} />
        <Paint color={color} finish={finish} />
      </mesh>
      <RoundedBox args={[2.15, 0.07, w * 0.82]} radius={0.02} smoothness={3} position={[-1.28, y + 0.36, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[2.15, 0.5, 0.08]} radius={0.02} smoothness={3} position={[-1.28, y + 0.58, w * 0.4]} castShadow>
        <Paint color={color} finish={finish} />
      </RoundedBox>
      <RoundedBox args={[2.15, 0.5, 0.08]} radius={0.02} smoothness={3} position={[-1.28, y + 0.58, -w * 0.4]} castShadow>
        <Paint color={color} finish={finish} />
      </RoundedBox>
      <RoundedBox args={[0.08, 0.5, w * 0.82]} radius={0.02} smoothness={3} position={[-2.34, y + 0.58, 0]} castShadow>
        <Paint color={color} finish={finish} />
      </RoundedBox>
      <Lights front={2.58} rear={-2.5} width={w} y={y + 0.14} />
      <Wheels car={car} />
    </group>
  )
}

function Suv({ car, color, finish, boxy }) {
  const w = car.width
  const y = car.wheelRadius + 0.1
  const cabinLen = boxy ? 3.15 : 2.85
  const cabinH = boxy ? 1.12 : 0.95
  return (
    <group>
      <RoundedBox args={[4.45, 0.62, w * 0.9]} radius={0.09} smoothness={5} position={[0.02, y + 0.16, 0]} castShadow>
        <Paint color={color} finish={finish} />
      </RoundedBox>
      <RoundedBox
        args={[cabinLen, cabinH, w * 0.86]}
        radius={0.1}
        smoothness={5}
        position={[boxy ? -0.18 : -0.08, y + 0.86, 0]}
        castShadow
      >
        <Paint color={color} finish={finish} />
      </RoundedBox>
      <CabinGlass
        position={[boxy ? -0.18 : -0.08, y + 0.98, 0]}
        size={[cabinLen - 0.28, cabinH * 0.52, w * 0.87]}
      />
      <mesh position={[1.35, y + 0.46, 0]} rotation={[0, 0, boxy ? -0.08 : -0.12]} castShadow>
        <boxGeometry args={[1.2, 0.14, w * 0.86]} />
        <Paint color={color} finish={finish} />
      </mesh>
      {car.rails && (
        <>
          <mesh position={[-0.2, y + 1.42, 0.42]}>
            <boxGeometry args={[2.4, 0.04, 0.04]} />
            <meshStandardMaterial color="#222" metalness={0.65} roughness={0.3} />
          </mesh>
          <mesh position={[-0.2, y + 1.42, -0.42]}>
            <boxGeometry args={[2.4, 0.04, 0.04]} />
            <meshStandardMaterial color="#222" metalness={0.65} roughness={0.3} />
          </mesh>
        </>
      )}
      {car.spare && (
        <group position={[-2.28, y + 0.55, 0]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.34, 0.09, 14, 28]} />
            <Paint color={color} finish={finish} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <circleGeometry args={[0.28, 28]} />
            <Paint color={color} finish={finish} />
          </mesh>
        </group>
      )}
      <Lights front={2.22} rear={-2.2} width={w} y={y + 0.16} />
      <Wheels car={car} />
    </group>
  )
}

export default function CarMesh({ car, color, finish }) {
  if (car.kind === 'pickup') return <Pickup car={car} color={color} finish={finish} />
  if (car.kind === 'suvBox') return <Suv car={car} color={color} finish={finish} boxy />
  if (car.kind === 'suvSlope') return <Suv car={car} color={color} finish={finish} />
  return <Sedan car={car} color={color} finish={finish} fastback={car.kind === 'fastback'} />
}
