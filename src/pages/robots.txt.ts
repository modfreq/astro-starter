import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";

export const prerender = true;

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${siteConfig.siteUrl}/sitemap-index.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
