import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      heroImageAlt: z.string().default(""),
      tags: z.array(z.string()).default([]),
      category: z.string().optional(),
      canonical: z.string().url().optional(),
      draft: z.boolean().default(false),
      author: z.string().default("default"),
    }),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/authors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      avatar: image(),
      social: z
        .object({
          github: z.string().default(""),
          twitter: z.string().default(""),
          linkedin: z.string().default(""),
          mastodon: z.string().default(""),
          website: z.string().default(""),
        })
        .default({}),
    }),
});

export const collections = { blog, authors };
