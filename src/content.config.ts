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
    }),
});

export const collections = { blog };
