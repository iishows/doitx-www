import type { PluginCategory } from "@rakazo/core";
import type { Locale } from "./locales";

export type IntegrationsLocale = "zh" | "en";

/** Integrations home for any site locale. Only Chinese and English pages exist. */
export function integrationsHomePath(locale: Locale): string {
  return locale === "zh" || locale === "zh-tw" ? "/integrations/" : "/en/integrations/";
}

export type IntegrationsCopy = {
  title: (count: string) => string;
  description: (count: string) => string;
  heading: (count: string) => string;
  titleEmpty: string;
  descriptionEmpty: string;
  headingEmpty: string;
  searchLabel: string;
  searchPlaceholder: string;
  categoryLabel: string;
  all: string;
  popular: string;
  allApps: string;
  empty: string;
  catalogUnavailable: string;
  submitPlugin: string;
  categories: Record<PluginCategory | "other", string>;
  breadcrumb: string;
  detailTitle: (name: string) => string;
  detailDescription: (name: string, actions: number) => string;
  actions: (count: number) => string;
  connect: (name: string) => string;
  auth: {
    oauth: (name: string) => string;
    key: string;
    none: string;
  };
  capabilities: (name: string) => string;
  looksUp: string;
  takesAction: string;
  showMore: (count: number) => string;
  moreApps: (category: string) => string;
  markdown: {
    integrationsTitle: string;
    integrationsIntro: (count: number) => string;
    categoryLine: (category: string, actions: number) => string;
    detailCategory: (category: string, url: string) => string;
    actionsTitle: string;
    readOnly: string;
  };
};

const INTEGRATIONS_COPY: Record<IntegrationsLocale, IntegrationsCopy> = {
  zh: {
    title: (count) => `Doitx 集成：把 ${count} 个应用接给 Bot`,
    description: (count) => `Gmail、Slack、Notion、GitHub、HubSpot 以及另外 ${count} 个应用，你的 Doitx Bot 都能读取并操作。`,
    heading: (count) => `把你的 Bot 接到 ${count} 个应用`,
    titleEmpty: "Doitx 集成：把你的应用接给 Bot",
    descriptionEmpty: "Gmail、Slack、Notion、GitHub、HubSpot 等应用，你的 Doitx Bot 都能读取并操作。",
    headingEmpty: "把你的 Bot 接到你已经在用的应用",
    searchLabel: "搜索应用",
    searchPlaceholder: "搜索应用",
    categoryLabel: "分类",
    all: "全部",
    popular: "热门",
    allApps: "全部应用",
    empty: "没有匹配的应用。",
    catalogUnavailable: "集成目录暂时不可用，请稍后再试。",
    submitPlugin: "提交插件",
    categories: {
      productivity: "效率工具",
      communication: "沟通协作",
      sales: "销售与 CRM",
      marketing: "营销",
      finance: "财务",
      people: "招聘与人事",
      design: "设计",
      code: "开发者",
      data: "数据",
      ops: "安全与运维",
      other: "其他",
    },
    breadcrumb: "集成",
    detailTitle: (name) => `${name} AI 智能体：把 ${name} 接到 Doitx`,
    detailDescription: (name, actions) => `让你的 Doitx Bot 在 ${name} 中工作。${actions} 个操作，一步连接。`,
    actions: (count) => `${count} 个操作`,
    connect: (name) => `连接 ${name}`,
    auth: {
      oauth: (name) => `使用 ${name} 登录`,
      key: "API 密钥",
      none: "无需账号",
    },
    capabilities: (name) => `你的 Bot 在 ${name} 里能做什么`,
    looksUp: "查询",
    takesAction: "执行操作",
    showMore: (count) => `展开其余 ${count} 个`,
    moreApps: (category) => `更多${category}应用`,
    markdown: {
      integrationsTitle: "Doitx 集成",
      integrationsIntro: (count) => `Doitx 的 Bot 可以连接 ${count} 个应用。让 Bot 自己连接，并批准它发来的登录请求。`,
      categoryLine: (category, actions) => `${category}，${actions} 个操作`,
      detailCategory: (category, url) => `分类：${category}。在任意 Doitx Bot 中连接：${url}`,
      actionsTitle: "操作",
      readOnly: "只读",
    },
  },
  en: {
    title: (count) => `Doitx integrations: connect your AI bots to ${count} apps`,
    description: (count) => `Gmail, Slack, Notion, GitHub, HubSpot and ${count} more apps your Doitx bots can read and act in.`,
    heading: (count) => `Connect your bots to ${count} apps`,
    titleEmpty: "Doitx integrations: connect your AI bots to the apps you use",
    descriptionEmpty: "Gmail, Slack, Notion, GitHub, HubSpot and more apps your Doitx bots can read and act in.",
    headingEmpty: "Connect your bots to the apps you already use",
    searchLabel: "Search apps",
    searchPlaceholder: "Search apps",
    categoryLabel: "Category",
    all: "All",
    popular: "Popular",
    allApps: "All apps",
    empty: "No apps match that search.",
    catalogUnavailable: "The integrations catalog is unavailable right now. Try again later.",
    submitPlugin: "Submit a plugin",
    categories: {
      productivity: "Productivity",
      communication: "Communication",
      sales: "Sales & CRM",
      marketing: "Marketing",
      finance: "Finance",
      people: "Recruiting & HR",
      design: "Design",
      code: "Developer",
      data: "Data",
      ops: "Security & Ops",
      other: "Other",
    },
    breadcrumb: "Integrations",
    detailTitle: (name) => `${name} AI agent: connect ${name} to Doitx`,
    detailDescription: (name, actions) => `Let your Doitx bots work in ${name}. ${actions} actions, connected in one step.`,
    actions: (count) => `${count} actions`,
    connect: (name) => `Connect ${name}`,
    auth: {
      oauth: (name) => `Sign in with ${name}`,
      key: "API key",
      none: "No account needed",
    },
    capabilities: (name) => `What your bot can do in ${name}`,
    looksUp: "Looks up",
    takesAction: "Takes action",
    showMore: (count) => `Show ${count} more`,
    moreApps: (category) => `More ${category.toLowerCase()} apps`,
    markdown: {
      integrationsTitle: "Doitx integrations",
      integrationsIntro: (count) => `Doitx bots can connect to ${count} apps. Ask a bot to connect one and approve the sign-in it sends.`,
      categoryLine: (category, actions) => `${category}, ${actions} actions`,
      detailCategory: (category, url) => `Category: ${category}. Connect from any Doitx bot at ${url}`,
      actionsTitle: "Actions",
      readOnly: "read-only",
    },
  },
};

export function getIntegrationsCopy(locale: IntegrationsLocale): IntegrationsCopy {
  return INTEGRATIONS_COPY[locale];
}
