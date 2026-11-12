import type { DocsLocale, DocsSlug } from "../docs";

export type DocsCopy = {
  /** Document title suffix, e.g. "Doitx docs". */
  titleSuffix: string;
  /** Page description around the page title. */
  description: (title: string) => string;
  navLabel: string;
  sections: Record<string, string>;
  pages: Record<DocsSlug, string>;
  reference: string;
  integrations: string;
  previous: string;
  next: string;
  onThisPage: string;
  editOnGitHub: string;
};

const DOCS_COPY: Record<DocsLocale, DocsCopy> = {
  zh: {
    titleSuffix: "Doitx 文档",
    description: (title) => `${title} — Doitx 文档。`,
    navLabel: "文档",
    sections: {
      start: "快速开始",
      using: "使用 Doitx",
      "self-host": "部署",
    },
    pages: {
      "getting-started": "快速开始",
      "bot-secrets": "可复用凭据",
      "fleet-management": "管理 Bot 的 Bot",
      "import-an-agent": "导入智能体",
      "self-host": "概览",
      "self-host-secrets": "密钥",
      "self-host-sandbox-providers": "计算机提供商",
      "self-host-restricted-network": "受限网络",
      "computer-runtime": "计算机运行时",
    },
    reference: "参考",
    integrations: "集成",
    previous: "上一篇",
    next: "下一篇",
    onThisPage: "本页内容",
    editOnGitHub: "在 GitHub 上编辑",
  },
  en: {
    titleSuffix: "Doitx docs",
    description: (title) => `${title} in the Doitx documentation.`,
    navLabel: "Docs",
    sections: {
      start: "Get started",
      using: "Using Doitx",
      "self-host": "Deployment",
    },
    pages: {
      "getting-started": "Getting started",
      "bot-secrets": "Reusable credentials",
      "fleet-management": "Bots that manage bots",
      "import-an-agent": "Import an agent",
      "self-host": "Overview",
      "self-host-secrets": "Secrets",
      "self-host-sandbox-providers": "Computer providers",
      "self-host-restricted-network": "Restricted networks",
      "computer-runtime": "Computer runtime",
    },
    reference: "Reference",
    integrations: "Integrations",
    previous: "Previous",
    next: "Next",
    onThisPage: "On this page",
    editOnGitHub: "Edit on GitHub",
  },
};

export function getDocsCopy(locale: DocsLocale): DocsCopy {
  return DOCS_COPY[locale];
}
