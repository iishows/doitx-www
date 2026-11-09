// UI copy for the blog index, post pages, and category pages.
// Only English and Chinese are translated; other locales fall back to English.
import type { Locale } from "./locales";
import { rootSlug } from "./locales";

export type BlogUiCopy = {
  blogTitle: string;
  blogDescription: string;
  indexHeading: string;
  categoriesLabel: string;
  categoryLabels: Record<"comparisons" | "guides" | "roundups" | "product", string>;
  crumbBlog: string;
  published: string;
  updated: string;
  tldr: string;
  contents: string;
  comparison: string;
  sources: string;
  related: string;
  faq: string;
  categoryTitle: (label: string) => string;
  categoryDescription: (label: string) => string;
  /** BCP 47 tag for date formatting. */
  dateLocale: string;
};

/** Locale-aware blog root: "/" for the default locale, "/{locale}/" otherwise. */
export function blogPathFor(locale: string, path: string): string {
  const base = rootSlug(locale);
  return `${base === "" ? "" : base}${path}`;
}

const EN: BlogUiCopy = {
  blogTitle: "Blog – Doitx",
  blogDescription:
    "Notes on running an open source AI agent yourself, including setup and how Doitx compares with other projects.",
  indexHeading: "Blog",
  categoriesLabel: "Categories",
  categoryLabels: {
    comparisons: "Comparisons",
    guides: "Guides",
    roundups: "Roundups",
    product: "Product",
  },
  crumbBlog: "Blog",
  published: "Published",
  updated: "Updated",
  tldr: "TL;DR",
  contents: "Contents",
  comparison: "Comparison",
  sources: "Sources",
  related: "Related",
  faq: "FAQ",
  categoryTitle: (label) => `${label} – Doitx blog`,
  categoryDescription: (label) => `${label} from the Doitx blog.`,
  dateLocale: "en-US",
};

const ZH: BlogUiCopy = {
  blogTitle: "博客 – Doitx",
  blogDescription: "关于自己运行开源 AI 智能体的笔记，包括安装步骤，以及 Doitx 与其他项目的对比。",
  indexHeading: "博客",
  categoriesLabel: "分类",
  categoryLabels: {
    comparisons: "对比",
    guides: "指南",
    roundups: "汇总",
    product: "产品",
  },
  crumbBlog: "博客",
  published: "发布于",
  updated: "更新于",
  tldr: "太长不看",
  contents: "目录",
  comparison: "对比",
  sources: "资料来源",
  related: "相关内容",
  faq: "常见问题",
  categoryTitle: (label) => `${label} – Doitx 博客`,
  categoryDescription: (label) => `Doitx 博客的${label}。`,
  dateLocale: "zh-CN",
};

const COPY: Partial<Record<Locale, BlogUiCopy>> = { en: EN, zh: ZH };

/** en + zh are translated; every other locale falls back to English. */
export function getBlogUiCopy(locale: Locale): BlogUiCopy {
  return COPY[locale] ?? EN;
}
