import { getEntry } from "astro:content";
import { siteConfig } from "@/config/site";

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
 * then to a synthetic author from siteConfig if no collection entry exists.
 */
export async function resolveAuthor(
  id?: string,
): Promise<ResolvedAuthor> {
  const authorId = id || siteConfig.defaultAuthorId;

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
  if (authorId !== siteConfig.defaultAuthorId) {
    const defaultEntry = await getEntry("authors", siteConfig.defaultAuthorId);
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

  // Last resort: synthetic author from siteConfig (no avatar/social)
  const { default: fallbackAvatar } = await import(
    "@/assets/images/authors/default.png"
  );
  return {
    id: "default",
    name: siteConfig.author,
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
