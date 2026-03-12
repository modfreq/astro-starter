export const siteConfig = {
  // SEO
  siteName: "Astro Starter",
  siteDescription:
    "A reusable Astro starter template for content-focused, SEO-optimized sites.",
  siteUrl: import.meta.env.SITE,
  defaultImage: "/og-default.png",
  locale: "en_US",
  author: "Astro Starter",
  defaultAuthorId: "default",

  // Navigation links rendered in Header
  navigation: [
    { label: "Blog", href: "/blog" },
    { label: "Search", href: "/search" },
  ],

  // Footer config
  footer: {
    links: [{ label: "RSS", href: "/rss.xml" }],
  },

  // Site-wide social links (only non-empty values are rendered)
  social: {
    github: "",
    twitter: "",
    linkedin: "",
    mastodon: "",
    bluesky: "",
    youtube: "",
    instagram: "",
    website: "",
  },
  // Pagination
  pageSize: 10,
} as const;
