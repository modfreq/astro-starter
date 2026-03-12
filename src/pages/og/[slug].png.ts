import type { GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "@/lib/og-image";
import { siteConfig } from "@/config/site";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, description: post.data.description },
  }));
};

export async function GET({ props }: { props: { title: string; description: string } }) {
  const png = await generateOgImage({
    title: props.title,
    description: props.description,
    siteName: siteConfig.siteName,
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
