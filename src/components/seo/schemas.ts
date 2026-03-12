import { siteConfig } from "@/config/site";

interface SiteConfig {
  siteName: string;
  siteUrl: string;
  siteDescription: string;
}

interface BlogPostAuthor {
  name: string;
  url?: string | undefined;
  sameAs?: string[] | undefined;
}

interface BlogPostInput {
  title: string;
  description: string;
  date: Date;
  updatedDate?: Date | undefined;
  heroImage?: string | undefined;
  slug: string;
  author?: string | BlogPostAuthor | undefined;
  category?: string | undefined;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface OrganizationInput {
  name: string;
  url: string;
  logo?: string | undefined;
  description?: string | undefined;
  sameAs?: string[] | undefined;
}

export function websiteSchema(config: SiteConfig): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.siteName,
    url: config.siteUrl,
    description: config.siteDescription,
  };
}

export function blogPostingSchema(
  post: BlogPostInput,
  siteUrl: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date.toISOString(),
    ...(post.updatedDate && {
      dateModified: post.updatedDate.toISOString(),
    }),
    ...(post.heroImage && { image: `${siteUrl}${post.heroImage}` }),
    url: `${siteUrl}/blog/${post.slug}/`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}/`,
    },
    ...(post.category && { articleSection: post.category }),
    author: (() => {
      if (typeof post.author === "object" && post.author) {
        return {
          "@type": "Person" as const,
          name: post.author.name,
          ...(post.author.url && { url: post.author.url }),
          ...(post.author.sameAs?.length && { sameAs: post.author.sameAs }),
        };
      }
      return {
        "@type": "Person" as const,
        name: (post.author as string | undefined) ?? siteConfig.author,
      };
    })(),
  };
}

export function breadcrumbSchema(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: FAQItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

interface PersonInput {
  name: string;
  url: string;
  description?: string | undefined;
  image?: string | undefined;
  sameAs?: string[] | undefined;
}

export function personSchema(person: PersonInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: person.url,
    ...(person.description && { description: person.description }),
    ...(person.image && { image: person.image }),
    ...(person.sameAs?.length && { sameAs: person.sameAs }),
  };
}

export function organizationSchema(
  org: OrganizationInput,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    url: org.url,
    ...(org.logo && { logo: org.logo }),
    ...(org.description && { description: org.description }),
    ...(org.sameAs && { sameAs: org.sameAs }),
  };
}
