export const BRAND = {
  name: 'Wales Wrap',
  city: 'San Pedro Sula',
  tagline: 'Míralo en tu coche.',
  whatsapp: '504XXXXXXXX', // TODO: Replace with real WhatsApp number before launch
  whatsappLabel: '+504 XXXX-XXXX',
  instagram: '', // TODO: Add Instagram handle when available (e.g. 'waleswrap')
  hours: 'Lun–Sáb · 8:00 a 6:00',
}

export const COLORS = [
  { id: 'negro', name: 'Negro piano', hex: '#1A1A1A' },
  { id: 'blanco', name: 'Blanco alpino', hex: '#F2F0E8' },
  { id: 'nardo', name: 'Gris nardo', hex: '#5B6168' },
  { id: 'plata', name: 'Plata', hex: '#C4C8CE', metallic: true },
  { id: 'wales', name: 'Lime Wales', hex: '#C8FF00' },
  { id: 'rojo', name: 'Rojo caliente', hex: '#C8102E' },
  { id: 'azul', name: 'Azul medianoche', hex: '#0A1C38' },
  { id: 'verde', name: 'Verde militar', hex: '#3C4C2E' },
  { id: 'naranja', name: 'Naranja fuego', hex: '#FF4A00' },
  { id: 'amarillo', name: 'Amarillo racing', hex: '#FFD000' },
  { id: 'morado', name: 'Morado deep', hex: '#2A103F' },
  { id: 'teal', name: 'Teal océano', hex: '#0C6B6B' },
  { id: 'cafe', name: 'Café espresso', hex: '#3A2416' },
  { id: 'gold', name: 'Oro satinado', hex: '#C9A227', metallic: true },
  { id: 'hielo', name: 'Azul hielo', hex: '#9BB5C4' },
  { id: 'cromo', name: 'Cromo', hex: '#DEDEE2', metallic: true },
]

export const CARS = [
  {
    id: 'corolla',
    name: 'Corolla',
    make: 'Toyota',
    kind: 'sedan',
    note: 'El más común en la ciudad',
    width: 1.72,
    wheelRadius: 0.38,
    wheelWidth: 0.22,
    axles: [1.38, -1.32],
    profile: [
      [2.18, 0.3],
      [2.3, 0.4],
      [2.26, 0.54],
      [2.12, 0.62],
      [1.02, 0.7],
      [0.36, 1.24],
      [-0.92, 1.28],
      [-1.48, 0.9],
      [-2.02, 0.8],
      [-2.18, 0.66],
      [-2.22, 0.46],
      [-2.12, 0.3],
    ],
    glass: { pos: [0.68, 0.98, 0], rake: -0.62, w: 1.38, h: 0.58 },
    rearGlass: { pos: [-1.22, 1.06, 0], rake: 0.55, w: 1.38, h: 0.42 },
  },
  {
    id: 'elantra',
    name: 'Elantra',
    make: 'Hyundai',
    kind: 'fastback',
    note: 'Línea cupé, techo largo',
    width: 1.78,
    wheelRadius: 0.38,
    wheelWidth: 0.22,
    axles: [1.42, -1.38],
    profile: [
      [2.24, 0.28],
      [2.36, 0.4],
      [2.28, 0.54],
      [2.08, 0.6],
      [0.98, 0.66],
      [0.28, 1.2],
      [-0.62, 1.24],
      [-1.72, 0.98],
      [-2.2, 0.72],
      [-2.28, 0.46],
      [-2.18, 0.28],
    ],
    glass: { pos: [0.62, 0.94, 0], rake: -0.68, w: 1.42, h: 0.56 },
    rearGlass: { pos: [-1.18, 1.08, 0], rake: 0.72, w: 1.4, h: 0.48 },
  },
  {
    id: 'civic',
    name: 'Civic',
    make: 'Honda',
    kind: 'sedan',
    note: 'Frente agresivo, cola corta',
    width: 1.74,
    wheelRadius: 0.385,
    wheelWidth: 0.23,
    axles: [1.34, -1.28],
    profile: [
      [2.16, 0.28],
      [2.32, 0.46],
      [2.14, 0.56],
      [0.92, 0.64],
      [0.2, 1.18],
      [-0.82, 1.2],
      [-1.36, 0.84],
      [-2.04, 0.7],
      [-2.12, 0.42],
      [-2.02, 0.28],
    ],
    glass: { pos: [0.54, 0.92, 0], rake: -0.7, w: 1.4, h: 0.55 },
    rearGlass: { pos: [-1.1, 1.0, 0], rake: 0.5, w: 1.38, h: 0.4 },
  },
  {
    id: 'hilux',
    name: 'Hilux',
    make: 'Toyota',
    kind: 'pickup',
    note: 'La reina del país',
    width: 1.82,
    wheelRadius: 0.46,
    wheelWidth: 0.26,
    axles: [1.52, -1.48],
    profile: [
      [2.52, 0.42],
      [2.66, 0.56],
      [2.52, 0.74],
      [2.34, 0.84],
      [1.12, 0.9],
      [0.52, 1.58],
      [-0.58, 1.62],
      [-0.92, 1.52],
      [-1.08, 1.14],
      [-1.14, 1.04],
      [-2.58, 1.04],
      [-2.68, 0.98],
      [-2.68, 0.42],
    ],
    glass: { pos: [0.78, 1.22, 0], rake: -0.72, w: 1.48, h: 0.62 },
    rearGlass: { pos: [-0.82, 1.34, 0], rake: 0.15, w: 1.48, h: 0.5 },
    bed: true,
  },
  {
    id: 'prado',
    name: 'Prado',
    make: 'Toyota',
    kind: 'suvBox',
    note: 'Alto, cuadrado, llanta atrás',
    width: 1.86,
    wheelRadius: 0.44,
    wheelWidth: 0.26,
    axles: [1.36, -1.4],
    profile: [
      [2.28, 0.42],
      [2.42, 0.58],
      [2.3, 0.82],
      [1.28, 0.96],
      [0.78, 1.72],
      [-1.12, 1.8],
      [-1.48, 1.72],
      [-1.78, 1.16],
      [-2.12, 1.1],
      [-2.2, 0.42],
    ],
    glass: { pos: [1.0, 1.32, 0], rake: -0.82, w: 1.52, h: 0.7 },
    rearGlass: { pos: [-1.62, 1.42, 0], rake: 0.12, w: 1.52, h: 0.62 },
    spare: true,
    rails: true,
  },
  {
    id: 'fortuner',
    name: 'Fortuner',
    make: 'Toyota',
    kind: 'suvSlope',
    note: 'SUV familiar, cola caída',
    width: 1.84,
    wheelRadius: 0.43,
    wheelWidth: 0.25,
    axles: [1.38, -1.36],
    profile: [
      [2.26, 0.4],
      [2.4, 0.54],
      [2.26, 0.78],
      [1.16, 0.88],
      [0.58, 1.64],
      [-0.9, 1.7],
      [-1.5, 1.38],
      [-2.1, 1.12],
      [-2.22, 0.4],
    ],
    glass: { pos: [0.84, 1.24, 0], rake: -0.78, w: 1.5, h: 0.66 },
    rearGlass: { pos: [-1.28, 1.38, 0], rake: 0.55, w: 1.48, h: 0.55 },
    rails: true,
  },
]

export const SERVICES = [
  {
    title: 'Wrap completo',
    text: 'Carrocería entera, huecos, manijas y detalles. Sale otro carro.',
  },
  {
    title: 'Techo, espejos y acentos',
    text: 'El cambio que se nota sin cubrir todo. Negro techo + color de fábrica pega duro.',
  },
  {
    title: 'Chrome delete',
    text: 'Se acaba el cromo de agencia. Negro piano o color de carrocería.',
  },
  {
    title: 'PPF / protección',
    text: 'Película transparente en frente, capó y espejos. La pintura queda debajo.',
  },
  {
    title: 'Rotulado comercial',
    text: 'Flotas, logos y publicidad que se instala tenso y se ve de agencia.',
  },
  {
    title: 'Mate o brillante, tú mandas',
    text: 'Mismo color, dos personalidades. Lo pruebas arriba, en tu modelo.',
  },
]

export const STEPS = [
  { n: '01', title: 'Elige el carro', text: 'Corolla, Elantra, Hilux, Prado… el que ves todos los días.' },
  { n: '02', title: 'Color y acabado', text: 'Gira el modelo. Brillante para showroom, mate para stealth.' },
  { n: '03', title: 'WhatsApp', text: 'Te llega la combo lista: modelo, color y acabado. Cotizamos en el día.' },
  { n: '04', title: 'Instalación', text: 'Agenda, wrap en cabina y salís con el carro como lo viste en pantalla.' },
]

export const FAQS = [
  {
    q: '¿Se daña la pintura de fábrica?',
    a: 'No. El vinilo se instala sobre la pintura y se puede retirar. De hecho la protege del sol y de rayones leves.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'Un wrap completo de sedán anda entre 2 y 4 días. Hilux y Prado, un poco más por los huecos y la caja.',
  },
  {
    q: '¿El visualizador es el color exacto?',
    a: 'Es una guía fiel del tono y del acabado. El vinilo real se confirma en taller con muestras físicas a la luz de Honduras.',
  },
  {
    q: '¿Puedo volver al color original?',
    a: 'Sí. Un wrap bien instalado se retira. Por eso mucha gente prueba un mate un par de años y después cambia.',
  },
]

export function paintProps(hex, finish, metallic = false) {
  const glossy = finish === 'glossy'
  return {
    color: hex,
    metalness: metallic ? (glossy ? 0.92 : 0.62) : glossy ? 0.32 : 0.05,
    roughness: glossy ? (metallic ? 0.08 : 0.14) : metallic ? 0.55 : 0.84,
    clearcoat: glossy ? 1 : 0,
    clearcoatRoughness: glossy ? 0.04 : 1,
    envMapIntensity: glossy ? 2.1 : 0.28,
  }
}

export function whatsappLink({ car, color, finish }) {
  const acabado = finish === 'glossy' ? 'brillante' : 'mate'
  const text = `Hola Wales Wrap, quiero un wrap en ${car.make} ${car.name}, color ${color.name}, acabado ${acabado}.`
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`
}
