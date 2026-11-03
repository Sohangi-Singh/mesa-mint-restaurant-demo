// Downloads the photography listed in image-manifest.json from the Unsplash CDN
// and writes web-optimised JPEGs to src/assets/images.
//
// Usage: npm run images              (processes only missing files)
//        npm run images -- --force   (re-encodes everything from the local cache)
//        npm run images -- --refetch (re-downloads and re-encodes everything)
//
// Food and drink photography ("dish-*" / "drink-*") receives a shared house
// grade — slightly warmer, softer whites — so photos from different
// photographers read as one cohesive set. Per-image `brightness` tames
// photos shot on bright white surfaces.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  await fs.readFile(path.join(root, "scripts/image-manifest.json"), "utf8"),
);
const cacheDir = path.join(root, ".image-cache");
const outDir = path.join(root, "src/assets/images");
const refetch = process.argv.includes("--refetch");
const force = refetch || process.argv.includes("--force");

await fs.mkdir(cacheDir, { recursive: true });
await fs.mkdir(outDir, { recursive: true });

const exists = (p) =>
  fs.access(p).then(
    () => true,
    () => false,
  );

const isFood = (file) => file.startsWith("dish-") || file.startsWith("drink-");

let processed = 0;
for (const image of manifest.images) {
  const rawPath = path.join(cacheDir, `${image.file}.jpg`);
  const outPath = path.join(outDir, `${image.file}.jpg`);

  if (!force && (await exists(outPath))) continue;

  if (refetch || !(await exists(rawPath))) {
    // Request a generous source size; sharp performs the final resize.
    const url = `https://images.unsplash.com/photo-${image.id}?w=${image.width + 400}&q=90&fm=jpg`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Download failed (${res.status}) for ${image.file}`);
    await fs.writeFile(rawPath, Buffer.from(await res.arrayBuffer()));
  }

  let pipeline = sharp(rawPath).rotate().resize({ width: image.width, withoutEnlargement: true });

  if (isFood(image.file)) {
    pipeline = pipeline
      .modulate({ brightness: image.brightness ?? 0.96, saturation: 0.92 })
      .linear([1.04, 1.0, 0.9], [-4, -3, 0]); // gentle warm shift
  }

  await pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(outPath);

  const { size } = await fs.stat(outPath);
  console.log(`✓ ${image.file}.jpg  ${(size / 1024).toFixed(0)} KB`);
  processed++;
}

console.log(processed ? `Optimised ${processed} image(s).` : "All images up to date.");
