import { getEntry } from "astro:content";
import { seoConfig } from "@/config/seo";

export interface ResolvedAuthor {
  id: string;
  name: string;
  bio: string;
  avatar: ImageMetadata;
  social: {
    github: string;
    twitter: string;
    linkedin: string;
    mastodon: string;
    website: string;
  };
}

/**
 * Resolve an author by collection ID. Falls back to the default author,
 * then to a synthetic author from seoConfig if no collection entry exists.
 */
export async function resolveAuthor(
  id?: string,
): Promise<ResolvedAuthor> {
  const authorId = id || seoConfig.defaultAuthorId;

  const entry = await getEntry("authors", authorId);
  if (entry) {
    return {
      id: entry.id,
      name: entry.data.name,
      bio: entry.data.bio,
      avatar: entry.data.avatar,
      social: entry.data.social,
    };
  }

  // Fall back to default author entry
  if (authorId !== seoConfig.defaultAuthorId) {
    const defaultEntry = await getEntry("authors", seoConfig.defaultAuthorId);
    if (defaultEntry) {
      return {
        id: defaultEntry.id,
        name: defaultEntry.data.name,
        bio: defaultEntry.data.bio,
        avatar: defaultEntry.data.avatar,
        social: defaultEntry.data.social,
      };
    }
  }

  // Last resort: synthetic author from seoConfig (no avatar/social)
  const { default: fallbackAvatar } = await import(
    "@/assets/images/authors/default.png"
  );
  return {
    id: "default",
    name: seoConfig.author,
    bio: "",
    avatar: fallbackAvatar,
    social: {
      github: "",
      twitter: "",
      linkedin: "",
      mastodon: "",
      website: "",
    },
  };
}
