import type { Locale } from "./i18n/locales";
import { SITE_URL } from "./site";

export const DOCS_PATH = "/docs/";

/** Languages the documentation is written in. Chinese is the default. */
export const DOCS_LOCALES = ["zh", "en"] as const;

export type DocsLocale = (typeof DOCS_LOCALES)[number];

export const DOCS_SLUGS = [
  "getting-started",
  "bot-secrets",
  "fleet-management",
  "import-an-agent",
  "self-host",
  "self-host-secrets",
  "self-host-sandbox-providers",
  "self-host-restricted-network",
  "computer-runtime",
] as const;

export type DocsSlug = (typeof DOCS_SLUGS)[number];

/** Section ids; labels come from src/i18n/docs.ts. */
export const DOCS_NAV: { id: string; pages: DocsSlug[] }[] = [
  { id: "start", pages: ["getting-started"] },
  {
    id: "using",
    pages: ["bot-secrets", "fleet-management", "import-an-agent"],
  },
  {
    id: "self-host",
    pages: [
      "self-host",
      "self-host-secrets",
      "self-host-sandbox-providers",
      "self-host-restricted-network",
      "computer-runtime",
    ],
  },
];

export function isDocsLocale(value: string): value is DocsLocale {
  return (DOCS_LOCALES as readonly string[]).includes(value);
}

export function isDocsSlug(value: string): value is DocsSlug {
  return (DOCS_SLUGS as readonly string[]).includes(value);
}

export function docsEntryId(locale: DocsLocale, slug: DocsSlug): string {
  return `${locale}/${slug}`;
}

export function docsSlugFromEntryId(id: string): string {
  return id.slice(id.indexOf("/") + 1);
}

export function docsPath(locale: DocsLocale, slug: string): string {
  const base = locale === "zh" ? DOCS_PATH : `/${locale}${DOCS_PATH}`;
  return slug === DOCS_SLUGS[0] ? base : `${base}${slug}/`;
}

export function docsMarkdownPath(locale: DocsLocale, slug: string): string {
  const base = locale === "zh" ? "/docs" : `/${locale}/docs`;
  return slug === DOCS_SLUGS[0] ? `${base}.md` : `${base}/${slug}.md`;
}

/**
 * Docs home for any site locale. Only Chinese and English docs exist, so
 * Chinese-reading locales get /docs/ and everyone else gets the English set.
 */
export function docsHomePath(locale: Locale): string {
  return locale === "zh" || locale === "zh-tw" ? DOCS_PATH : `/${docsLocale(locale)}${DOCS_PATH}`;
}

export function docsLocale(locale: Locale): DocsLocale {
  return locale === "zh" || locale === "zh-tw" ? "zh" : "en";
}

/** Absolute docs URL for a site locale, for links inside generated Markdown. */
export function docsUrl(locale: Locale, slug?: DocsSlug): string {
  return new URL(docsPath(docsLocale(locale), slug ?? DOCS_SLUGS[0]), SITE_URL).toString();
}
