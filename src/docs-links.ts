import { DOCS_SLUGS, docsPath, type DocsLocale } from "./docs";

const REPO = new URL("https://repo.invalid/");
const MARKDOWN_LINK = /(\]\()([^)\s]+)(\))/g;

/** Resolves a doc's relative links: published docs become site pages; any other file is left unchanged. */
export function rewriteDocsLinks(
  markdown: string,
  slug: string,
  locale: DocsLocale = "zh",
): string {
  const source = new URL(`docs/${slug}.md`, REPO);
  return markdown.replace(MARKDOWN_LINK, (match, open: string, href: string, close: string) => {
    if (/^(?:[a-z][a-z0-9+.-]*:|#|\/)/i.test(href)) return match;
    const target = new URL(href, source);
    if (target.origin !== REPO.origin) return match;
    const doc = /^\/docs\/([\w-]+)\.md$/.exec(target.pathname)?.[1];
    if (doc && (DOCS_SLUGS as readonly string[]).includes(doc)) {
      return `${open}${docsPath(locale, doc)}${target.hash}${close}`;
    }
    return match;
  });
}
