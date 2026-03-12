import type { APIRoute } from "astro";
import { seoConfig } from "@/config/seo";

export const prerender = true;

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${seoConfig.siteUrl}/sitemap-index.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
