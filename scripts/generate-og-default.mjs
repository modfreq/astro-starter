import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, "..", "public", "og-default.png");

const width = 1200;
const height = 630;

// Simple branded OG placeholder with SVG text overlay
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a" />
      <stop offset="100%" style="stop-color:#1e293b" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <text x="50%" y="45%" font-family="system-ui, sans-serif" font-size="64" font-weight="700" fill="#f8fafc" text-anchor="middle" dominant-baseline="middle">Astro Starter</text>
  <text x="50%" y="60%" font-family="system-ui, sans-serif" font-size="28" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">Content-focused, SEO-optimized sites</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(outputPath);
console.log(`Generated ${outputPath}`);
