import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const interBold = readFileSync(
  join(process.cwd(), "src/assets/fonts/Inter-Bold.ttf"),
);

interface OgImageOptions {
  title: string;
  description?: string;
  siteName: string;
}

export async function generateOgImage({
  title,
  description,
  siteName,
}: OgImageOptions): Promise<Buffer> {
  const markup = html`<div
    style="display: flex; flex-direction: column; width: 100%; height: 100%; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%); padding: 60px;"
  >
    <div
      style="display: flex; flex-direction: column; justify-content: center; flex: 1; gap: 24px;"
    >
      <div
        style="display: flex; font-size: 28px; color: #94a3b8; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;"
      >
        ${siteName}
      </div>
      <div
        style="display: flex; font-size: ${title.length > 60 ? 48 : 56}px; color: #f8fafc; font-weight: 700; line-height: 1.2; max-width: 900px;"
      >
        ${title}
      </div>
      ${description
        ? `<div style="display: flex; font-size: 24px; color: #94a3b8; line-height: 1.4; max-width: 800px;">${description.length > 120 ? description.slice(0, 117) + "..." : description}</div>`
        : ""}
    </div>
  </div>`;

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: interBold,
        weight: 700,
        style: "normal",
      },
    ],
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
}
