# Car Photo Assets

This directory contains real car photos for the Wales Wrap visualizer.

## File Naming
Each car photo must be named by its **car ID** from `src/data.js`:
- `corolla.png` → Toyota Corolla
- `elantra.png` → Hyundai Elantra
- `civic.png` → Honda Civic
- `hilux.png` → Toyota Hilux
- `prado.png` → Toyota Prado
- `fortuner.png` → Toyota Fortuner

## Image Specifications

### Required Format
- **Format**: PNG (required)
- **Color space**: sRGB
- **Transparency**: No alpha channel needed (opaque background OK)

### Recommended Dimensions
- **Width**: 1600–2400px
- **Height**: 900–1200px
- **Aspect ratio**: ~16:9 or 4:3
- **File size**: < 500 KB each (optimize for web)

### Photography Guidelines
1. **Angle**: 3/4 front view (driver side visible)
   - Shows front, side, and wheel profile
   - Similar to product photography angle
   
2. **Background**: 
   - Clean, neutral background (white, grey, or studio)
   - Or plain outdoor setting (no clutter)
   - Background will be partially masked with wrap color overlay

3. **Lighting**:
   - Soft, even lighting across the vehicle
   - Avoid harsh shadows or blown highlights
   - Natural or studio lighting both work

4. **Car Condition**:
   - Clean vehicle (washed, no visible dirt)
   - Stock or wrapped (either works)
   - Wheels visible and in focus

5. **Framing**:
   - Entire car visible (no cropping of bumpers/wheels)
   - Centered in frame with breathing room
   - Ground/shadow visible for context

## How the Visualizer Uses Photos

When a car photo exists at `/cars/{id}.png`:
- The real photo displays instead of the SVG placeholder
- A semi-transparent color overlay applies the selected wrap color
- Filter adjusts for Brillante (glossy) vs Mate finish

If the photo is missing:
- Visualizer falls back to the SVG car silhouette
- Placeholder message: "📸 Espacio para foto real del {car}"

## Adding New Photos

1. Name the file exactly as the car `id` in `src/data.js`
2. Optimize the PNG (use tools like `pngquant` or `imageoptim`)
3. Place in `public/cars/`
4. Deploy — the visualizer auto-detects and switches to real photo

No code changes needed when adding photos.
