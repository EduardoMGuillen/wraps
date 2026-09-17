import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COLORS = {
  negro: { hex: '#1A1A1A', name: 'Negro piano' },
  blanco: { hex: '#F2F0E8', name: 'Blanco alpino' },
  nardo: { hex: '#5B6168', name: 'Gris nardo' },
  plata: { hex: '#C4C8CE', name: 'Plata' },
  wales: { hex: '#C8FF00', name: 'Lime Wales' },
  rojo: { hex: '#C8102E', name: 'Rojo caliente' },
  azul: { hex: '#0A1C38', name: 'Azul medianoche' },
  verde: { hex: '#3C4C2E', name: 'Verde militar' },
  naranja: { hex: '#FF4A00', name: 'Naranja fuego' },
  amarillo: { hex: '#FFD000', name: 'Amarillo racing' },
  morado: { hex: '#2A103F', name: 'Morado deep' },
  teal: { hex: '#0C6B6B', name: 'Teal océano' },
  cafe: { hex: '#3A2416', name: 'Café espresso' },
  gold: { hex: '#C9A227', name: 'Oro satinado' },
  hielo: { hex: '#9BB5C4', name: 'Azul hielo' },
  cromo: { hex: '#DEDEE2', name: 'Cromo' }
};

const CARS = ['corolla', 'elantra', 'civic', 'hilux', 'prado', 'fortuner'];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

async function generateWrap(carId, colorId, colorHex) {
  const inputPath = path.join('cars', `${carId}.png`);
  const outputPath = path.join('public', 'cars', carId, `${colorId}.png`);
  
  const rgb = hexToRgb(colorHex);
  
  // Create a colored overlay
  // Strategy: Create a tint that colorizes the body while preserving details
  const img = sharp(inputPath);
  const metadata = await img.metadata();
  
  // Create solid color overlay
  const overlay = Buffer.from(
    `<svg width="${metadata.width}" height="${metadata.height}">
      <rect width="100%" height="100%" fill="${colorHex}"/>
    </svg>`
  );
  
  await img
    .composite([{
      input: overlay,
      blend: 'multiply',
      // Blend mode preserves luminosity while applying color
    }])
    // Enhance saturation and adjust brightness for wrap look
    .modulate({
      brightness: 1.05,
      saturation: 1.3
    })
    .toFile(outputPath);
}

async function main() {
  let count = 0;
  const total = CARS.length * Object.keys(COLORS).length;
  
  console.log(`Generating ${total} wrap images...\\n`);
  
  for (const carId of CARS) {
    console.log(`Processing ${carId}...`);
    
    // Ensure output directory exists
    const carDir = path.join('public', 'cars', carId);
    await fs.mkdir(carDir, { recursive: true });
    
    for (const [colorId, colorData] of Object.entries(COLORS)) {
      try {
        await generateWrap(carId, colorId, colorData.hex);
        count++;
        process.stdout.write(`\\r  ${count}/${total} images generated`);
      } catch (error) {
        console.error(`\\n  ✗ Failed ${carId}/${colorId}:`, error.message);
      }
    }
    console.log(`\\n  ✓ ${carId} complete\\n`);
  }
  
  console.log(`\\n✅ Generated ${count} wrap images!`);
}

main().catch(console.error);
