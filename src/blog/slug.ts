import type { CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/locales";

/**
 * A translated post's file is named `<slug>.zh.md`, so its collection id is
 * the stem with the locale appended (Astro's glob loader joins path segments
 * with no separator): `self-host-an-ai-agentzh`. English posts keep a
 * bare id. The shared slug is the id without a locale suffix.
 */
export function postSlug(post: CollectionEntry<"blog">): string {
  return post.id.replace(/\.(en|zh)$/, "").replace(/^(.+?)(en|zh)$/, "$1");
}

export function postLocale(post: CollectionEntry<"blog">): Locale {
  return (post.data.locale ?? "en") as Locale;
}
