// Generates the Open Graph image and Apple touch icon from local assets.
// Usage: npm run brand-assets   (run after `npm run images`)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(root, "src/app");

const WIDTH = 1200;
const HEIGHT = 630;

const overlay = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0f0e0c" stop-opacity="0.92"/>
      <stop offset="0.6" stop-color="#0f0e0c" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#0f0e0c" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#fade)"/>
  <rect x="40" y="40" width="${WIDTH - 80}" height="${HEIGHT - 80}" fill="none" stroke="#f5f0e7" stroke-opacity="0.18"/>
  <text x="96" y="150" font-family="Helvetica, Arial, sans-serif" font-size="18" letter-spacing="6" fill="#a9aa8c">CONTEMPORARY DINING · BENGALURU</text>
  <text x="92" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="96" letter-spacing="10" fill="#f5f0e7">MESA <tspan font-style="italic" fill="#a9aa8c" letter-spacing="0">&amp;</tspan> MINT</text>
  <text x="96" y="380" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="44" fill="#f5f0e7" fill-opacity="0.9">A table worth returning to.</text>
  <rect x="96" y="470" width="64" height="1.5" fill="#a9aa8c"/>
  <text x="96" y="520" font-family="Helvetica, Arial, sans-serif" font-size="17" letter-spacing="3" fill="#b7b1a7">A FICTIONAL RESTAURANT CONCEPT</text>
</svg>`;

await sharp(path.join(root, "src/assets/images/interior-pendant-lights.jpg"))
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "center" })
  .modulate({ brightness: 0.85 })
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(appDir, "opengraph-image.jpg"));

await fs.writeFile(
  path.join(appDir, "opengraph-image.alt.txt"),
  "MESA & MINT — A table worth returning to. A fictional contemporary restaurant concept in Bengaluru.",
);

await sharp(path.join(appDir, "icon.svg"), { density: 400 })
  .resize(180, 180)
  .png()
  .toFile(path.join(appDir, "apple-icon.png"));

console.log("✓ opengraph-image.jpg, opengraph-image.alt.txt, apple-icon.png");
