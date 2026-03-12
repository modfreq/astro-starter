import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "@/config/site";
import { resolveAuthor } from "@/lib/authors";

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const authorIds = [...new Set(posts.map((p) => p.data.author))];
  const authorEntries = await Promise.all(
    authorIds.map((id) => resolveAuthor(id)),
  );
  const authorMap = new Map(authorIds.map((id, i) => [id, authorEntries[i]]));

  return rss({
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    site: context.site!.toString(),
    items: posts.map((post) => {
      const author = authorMap.get(post.data.author);
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/blog/${post.id}/`,
        ...(author ? { author: author.name } : {}),
      };
    }),
  });
}
