// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// --- Adapter selection (runs before astro:env) ---
const adapterName = process.env.ADAPTER ?? "cloudflare";

async function loadAdapter() {
  switch (adapterName) {
    case "cloudflare": {
      const { default: cloudflare } = await import("@astrojs/cloudflare");
      return cloudflare({ platformProxy: { enabled: true } });
    }
    case "node": {
      const { default: node } = await import("@astrojs/node");
      return node({ mode: "standalone" });
    }
    default:
      throw new Error(
        `Unknown ADAPTER: "${adapterName}". Use "cloudflare" or "node".`,
      );
  }
}

const adapter = await loadAdapter();

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || "https://example.com",
  output: "server",
  adapter,
  integrations: [react(), sitemap(), mdx()],
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  env: {
    schema: {
      PUBLIC_PLAUSIBLE_DOMAIN: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_PLAUSIBLE_SCRIPT_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://plausible.io/js/script.js",
      }),
      PUBLIC_UMAMI_WEBSITE_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_UMAMI_SCRIPT_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://cloud.umami.is/script.js",
      }),
    },
  },
});
