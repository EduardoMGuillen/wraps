# Wales Wrap - Configurador de Wraps Automotrices

Sitio web y configurador interactivo para Wales Wrap, taller de wraps automotrices en San Pedro Sula, Honduras.

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 16+ y npm

### Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en http://localhost:5173/
```

### Build para Producción

```bash
# Compilar para producción
npm run build

# Preview del build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
wraps/
├── public/              # Assets estáticos
│   ├── favicon.png      # Favicon (comprimido: 7.9KB)
│   └── logo.png         # Logo principal (comprimido: 317KB)
├── src/
│   ├── components/
│   │   ├── Hero.jsx           # Hero con logo 3D (con fallback para móviles)
│   │   ├── PngVisualizer.jsx  # Configurador PNG/SVG (principal)
│   │   ├── Visualizer.jsx     # Configurador 3D (legacy, no en uso)
│   │   └── CarMesh.jsx        # Modelos 3D de carros (no en uso)
│   ├── App.jsx          # Componente principal
│   ├── data.js          # Configuración (carros, colores, marca)
│   ├── index.css        # Estilos globales
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## ⚙️ Configuración

### Actualizar Información de Contacto

Editar `/src/data.js`:

```javascript
export const BRAND = {
  name: 'Wales Wrap',
  city: 'San Pedro Sula',
  whatsapp: '504XXXXXXXX',     // ⚠️ Reemplazar con número real
  whatsappLabel: '+504 XXXX-XXXX',
  instagram: '',                 // Agregar handle de Instagram
  hours: 'Lun–Sáb · 8:00 a 6:00',
}
```

### Agregar/Modificar Colores de Wrap

En `/src/data.js`, agregar al array `COLORS`:

```javascript
{
  id: 'identificador',
  name: 'Nombre del Color',
  hex: '#HEXCODE',
  metallic: true  // opcional, para colores metálicos
}
```

### Agregar/Modificar Modelos de Carros

En `/src/data.js`, agregar al array `CARS`:

```javascript
{
  id: 'id-del-carro',
  name: 'Nombre',
  make: 'Marca',
  kind: 'sedan',  // 'sedan', 'fastback', 'pickup', 'suvBox', 'suvSlope'
  note: 'Descripción corta',
  width: 1.72,
  wheelRadius: 0.38,
  wheelWidth: 0.22,
  axles: [1.38, -1.32],
  // Agregar propiedades adicionales según el tipo:
  spare: true,     // para SUVs con llanta de repuesto
  rails: true,     // para SUVs con rieles de techo
}
```

## 🎨 Personalización Visual

### Colores del Tema

Editar variables CSS en `/src/index.css`:

```css
:root {
  --lime: #c8ff00;        /* Color principal de marca */
  --lime-2: #9adf00;      /* Variante más oscura */
  --black: #050505;       /* Fondo principal */
  --panel: #101010;       /* Fondo de paneles */
  --text: #f4f4f4;        /* Texto principal */
  --muted: #9b9b9b;       /* Texto secundario */
}
```

## 📸 Assets Faltantes (Opcional)

Para mejorar el visualizador, se pueden agregar fotos reales de los carros:

### Especificaciones de Fotos

- **Formato:** PNG con fondo transparente o blanco
- **Resolución:** 1600x800px mínimo
- **Vista:** 3/4 lateral
- **Color del carro:** Preferiblemente blanco o gris claro para overlays
- **Ubicación:** `/public/cars/`
- **Nombres de archivo:**
  - `corolla.png`
  - `elantra.png`
  - `civic.png`
  - `hilux.png`
  - `prado.png`
  - `fortuner.png`

### Implementar Fotos Reales

En `/src/components/PngVisualizer.jsx`, reemplazar el SVG placeholder con:

```jsx
<img 
  src={`/cars/${car.id}.png`} 
  alt={`${car.make} ${car.name}`}
  style={{
    width: '100%',
    height: 'auto',
    filter: `drop-shadow(0 10px 25px rgba(0,0,0,0.5))`,
  }}
/>
```

## 🔧 Stack Tecnológico

- **Framework:** React 18.3
- **Build Tool:** Vite 5.4
- **3D (Hero):** Three.js + React Three Fiber (con fallback para móviles)
- **Visualizador:** SVG + CSS (PNG-based approach)
- **Estilos:** CSS vanilla con custom properties

## 🌐 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Build Manual

```bash
npm run build
# Subir carpeta `dist/` a cualquier hosting estático
```

## 📱 Optimizaciones Mobile

- **WebGL condicional:** Hero 3D se desactiva automáticamente en móviles para ahorrar recursos
- **Visualizador PNG:** No requiere WebGL, funciona en cualquier dispositivo
- **Assets optimizados:** Logo comprimido de 4.3MB a 317KB
- **Touch targets:** Swatches de color con mínimo 44x44px en móviles
- **Responsive:** Breakpoints en 900px y 560px
- **prefers-reduced-motion:** Respeta preferencias de accesibilidad del usuario

## 🐛 Troubleshooting

### El servidor no inicia
```bash
# Limpiar node_modules e instalar de nuevo
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Logo 3D no se ve (Hero)
- Es normal en móviles (muestra fallback CSS automáticamente)
- En desktop, verificar soporte de WebGL en el navegador
- El fallback CSS siempre está disponible

### Colores no se ven correctamente
- Verificar formato hex en `data.js`
- Para colores metálicos, agregar `metallic: true`

## 📞 Soporte

Para reportar problemas o solicitar features, contactar al equipo de desarrollo.

## 📄 Licencia

Propietario - Wales Wrap © 2026
