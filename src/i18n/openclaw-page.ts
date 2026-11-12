// Full-page copy for the OpenClaw comparison page.
//
// Only English and Chinese are translated; other locales fall back to English. Text uses the
// lightweight markup understood by `Prose`: [label](href), `code`, **bold**.
import type { Locale } from "./locales";

export type OpenClawPageCopy = {
  title: string;
  description: string;
  h1: string;
  updated: string;
  intro: readonly string[];
  setup: { heading: string; paragraphs: readonly string[] };
  dayToDay: { heading: string; paragraphs: readonly string[] };
  comparison: {
    heading: string;
    caption: string;
    topic: string;
    rakazo: string;
    other: string;
    rows: readonly { aspect: string; rakazo: string; openclaw: string }[];
  };
  differences: {
    heading: string;
    teammateTitle: string;
    teammate: readonly string[];
    computerTitle: string;
    computer: readonly string[];
    modelsTitle: string;
    models: readonly string[];
    licenseTitle: string;
    license: string;
  };
  fits: {
    heading: string;
    rakazoTitle: string;
    rakazo: string;
    otherTitle: string;
    other: string;
  };
  sources: {
    heading: string;
    links: readonly { label: string; href: string }[];
  };
  related: {
    heading: string;
    home: string;
    selfHost: string;
  };
  getStarted: {
    heading: string;
    body: string;
    selfHostGuide: string;
    cloud: string;
    github: string;
  };
  faqs: readonly { question: string; answer: string }[];
  vsRakazo: string;
  vsOther: string;
};

const LINK = {
  gettingStarted: "https://docs.openclaw.ai/start/getting-started",
  docs: "https://docs.openclaw.ai/",
  features: "https://docs.openclaw.ai/concepts/features",
  sandbox: "https://docs.openclaw.ai/gateway/sandboxing",
  source: "https://docs.openclaw.ai/",
  selfHost: "/self-hosted-ai-agent/",
  downloads: "/downloads",
  github: "",
};

const EN: OpenClawPageCopy = {
  title: "OpenClaw Alternative – Doitx",
  description:
    "Compare Doitx and OpenClaw: setup, what runs on your machine, day-to-day operations, model providers, and licensing.",
  h1: "OpenClaw alternative",
  updated: "October 7, 2026",
  intro: [
    `The main difference is simplicity. Like Grok Bot, Doitx is just chat: you set up the bot and manage it from that chat. OpenClaw also runs on your own infrastructure. Its [getting-started guide](${LINK.gettingStarted}) is a longer path: a CLI installer, an onboarding wizard, a Gateway you run in the terminal or install as a background service, and a config file.`,
    `They are not the same product, and Doitx does not import an OpenClaw setup. OpenClaw details below follow [OpenClaw's documentation](${LINK.docs}). Doitx details follow this project. Both change. The linked docs are the place to confirm a detail.`,
  ],
  setup: {
    heading: "Setup",
    paragraphs: [
      "Doitx's private deployment path is the published Docker installer, or the desktop app starting that stack on this computer. You create an account and connect a model. From there it is just chat, on the web, desktop, and mobile apps. A new bot interviews you about the work, and you manage the bot from that chat. Routines are readable Markdown.",
      "OpenClaw's getting-started guide installs the CLI, then runs a wizard. Quick start is the short path when a Claude Code or Codex login, or an API key, is already on the machine. Custom setup walks through the full flow, and `openclaw onboard --classic` is the step-by-step wizard. Quick start leaves the Gateway in that terminal until you stop it, so you can chat before installing a service. `openclaw gateway install` is the later step that keeps it in the background: a LaunchAgent on macOS, a systemd user unit on Linux, or a Scheduled Task on Windows. You check `openclaw gateway status` (the guide says port 18789) and open `openclaw dashboard`. Messaging from a phone, such as Telegram, is a separate Channels step.",
    ],
  },
  dayToDay: {
    heading: "Day-to-day management",
    paragraphs: [
      "Day to day, you manage Doitx from the same chat. Schedules, memory, and approval boundaries stay with that bot, on the web, desktop, and mobile apps. Optional connectors can attach Slack, WhatsApp, Telegram, iMessage via Sendblue, and Feishu/Lark. They are not required to use the product.",
      "OpenClaw's docs send later changes through `openclaw configure` and a JSON config file, `~/.openclaw/openclaw.json` unless you override the path. `openclaw doctor` and `openclaw triage` diagnose the install. The Gateway is the process you keep running, in a terminal or as the installed background service, and chat apps are the main way you message the assistant, alongside the Control UI.",
    ],
  },
  comparison: {
    heading: "Comparison",
    caption: "Doitx and OpenClaw, from each project's public documentation.",
    topic: "Topic",
    rakazo: "Doitx",
    other: "OpenClaw",
    rows: [
      {
        aspect: "Setup",
        rakazo:
          "Docker installer or the desktop app's local stack, then an account and a model. After that Doitx is just chat: a new bot interviews you, and you manage it from the chat.",
        openclaw:
          "CLI install, then Quick start or Custom setup. The Gateway can stay in that terminal for a first chat. `openclaw gateway install` is the background service (LaunchAgent, systemd user unit, or Windows Scheduled Task). Then `openclaw gateway status` and `openclaw dashboard`. A phone channel is a separate step.",
      },
      {
        aspect: "Day-to-day management",
        rakazo:
          "You manage the bot from the same chat on the web, desktop, and mobile apps. Routines are readable Markdown and can run on a schedule. A bot can pause for approval at a boundary you set.",
        openclaw:
          "Later changes go through `openclaw configure` and `~/.openclaw/openclaw.json`. `openclaw doctor` and `openclaw triage` diagnose the install. The Gateway stays running in a terminal or as the installed background service.",
      },
      {
        aspect: "What it is",
        rakazo:
          "A private platform for persistent AI teammates. Bots keep conversations, memory, routines, and history, and can use a browser, shell, and desktop.",
        openclaw:
          "A gateway that connects chat apps to an AI assistant on your machine. The project describes one Gateway for the channels you already use.",
      },
      {
        aspect: "License",
        rakazo: "Apache-2.0. Maintained in the open by Inbox Zero Inc.",
        openclaw: "MIT. Stewarded by the OpenClaw Foundation, an independent 501(c)(3).",
      },
      {
        aspect: "Where it runs",
        rakazo:
          "You deploy on your own infrastructure with published Docker images or from source. Web, desktop, and mobile apps are clients of that API. Hosted Doitx Cloud is in beta.",
        openclaw:
          "You run the Gateway on your own computer or a server. The docs say there is no hosted service in the middle. Interfaces include a browser Control UI, companion apps, and iOS and Android nodes.",
      },
      {
        aspect: "How you talk to it",
        rakazo:
          "The Doitx web app, Electron desktop app, and Expo mobile app. Optional connectors can attach Slack, WhatsApp, Telegram, iMessage via Sendblue, and Feishu/Lark.",
        openclaw:
          "Chat apps are the primary surface. Documented channels include Discord, Google Chat, iMessage, Matrix, Microsoft Teams, Signal, Slack, Telegram, WhatsApp, Zalo, and others via plugins, plus WebChat.",
      },
      {
        aspect: "Models",
        rakazo:
          "The Doitx router, plus a local OpenAI-compatible endpoint the operator runs. Each person connects their own key, and each bot can use a different model.",
        openclaw:
          "Many providers, including Anthropic, OpenAI, and Google, plus OAuth for some subscriptions such as OpenAI Codex. Endpoints include vLLM, SGLang, Ollama, llama.cpp, LM Studio, and other OpenAI-compatible or Anthropic-compatible servers, with failover.",
      },
      {
        aspect: "Computers and tools",
        rakazo:
          "Browser, terminal, files, and a graphical desktop. The default computer is local Docker. Optional remote computers are E2B, Daytona, CreateOS, and Boat. An explicit desktop provider can run on the host; it is not the default.",
        openclaw:
          "Tools include browser automation and exec. Sandboxing is off by default. When enabled, documented backends include Docker, Podman, SSH, OpenShell, and Crabbox. The Gateway process stays on the host.",
      },
      {
        aspect: "Routines and memory",
        rakazo:
          "Routines are saved as readable Markdown. Memory, schedules, an audit log, and approval boundaries are part of the product.",
        openclaw:
          "Sessions, memory, skills, cron, hooks, and plugins. Direct chats can share a main session. Group chats are isolated by default.",
      },
      {
        aspect: "Integrations",
        rakazo: "Optional Composio or Pipedream catalogs, plus MCP servers, Treg, and OpenAPI tools you add.",
        openclaw: "Channel plugins, skills, a plugin SDK, and web search through several providers.",
      },
      {
        aspect: "More than one agent",
        rakazo: "Bots can delegate to peer bots or short-lived subagents.",
        openclaw: "Multi-agent routing with isolated sessions per agent, workspace, or sender.",
      },
      {
        aspect: "Software cost",
        rakazo: "No seat fee for the software. You pay the models and infrastructure you use.",
        openclaw: "The docs say there is no paid tier. You pay the models and the machine you run.",
      },
    ],
  },
  differences: {
    heading: "Key differences",
    teammateTitle: "Teammates in an app, or an assistant in your chats",
    teammate: [
      "Doitx is a web, desktop, and mobile app. A bot has a job, a computer, and routines saved as Markdown you can read and edit. OpenClaw is a Gateway you message from the chat apps you already use, with a browser Control UI and mobile nodes around that gateway.",
      "Doitx can attach optional Slack, WhatsApp, Telegram, iMessage (Sendblue), and Feishu/Lark connectors. Those are extras. Chat apps are OpenClaw's main surface, including Discord, Signal, iMessage, Slack, Telegram, WhatsApp, and other channel plugins.",
    ],
    computerTitle: "Where the computer runs",
    computer: [
      "Doitx runs browser and shell work on a computer. Local Docker is the default. E2B, Daytona, CreateOS, and Boat are optional remote computers. An explicit desktop provider can run on the host, and it is not the default.",
      "OpenClaw can sandbox tool execution. Its docs say sandboxing is off by default, and that the Gateway process stays on the host. Documented sandbox backends include Docker, Podman, SSH, OpenShell, and Crabbox.",
    ],
    modelsTitle: "Models and what you pay",
    models: [
      "Both let you bring a model provider, including a server you host. Doitx connects the Doitx router or a local OpenAI-compatible server the operator runs, and each bot can use a different model. OpenClaw documents Anthropic, OpenAI, Google, and others, including OpenAI-compatible and Anthropic-compatible endpoints, with failover.",
      "Neither project charges a seat fee for the software. OpenClaw's docs say it has no paid tier and no hosted service. Doitx is free to deploy on your own infrastructure. Hosted Doitx Cloud is in beta. You pay for the models, machines, and optional computer providers you use.",
    ],
    licenseTitle: "License",
    license:
      "Doitx is Apache-2.0, maintained by Inbox Zero Inc. OpenClaw is MIT, stewarded by the OpenClaw Foundation, which the project describes as an independent 501(c)(3).",
  },
  fits: {
    heading: "Which shape fits",
    rakazoTitle: "Doitx",
    rakazo: `Repeated browser and shell work, scheduled operational routines, an audit log, and approval boundaries, with the same bots on the web, desktop, and mobile clients. [Deploy it from the guide](${LINK.selfHost}).`,
    otherTitle: "OpenClaw",
    other: `An assistant that lives in chat apps you already use, with channel plugins, skills, and a gateway on your machine. Start from the [OpenClaw docs](${LINK.docs}).`,
  },
  sources: {
    heading: "Sources",
    links: [
      { label: "OpenClaw docs", href: LINK.docs },
      { label: "OpenClaw getting started", href: LINK.gettingStarted },
      { label: "OpenClaw features", href: LINK.features },
      { label: "OpenClaw sandboxing", href: LINK.sandbox },
      { label: "OpenClaw source", href: LINK.source },
      { label: "Doitx deployment guide", href: LINK.selfHost },
    ],
  },
  related: { heading: "Related", home: "Doitx home", selfHost: "AI agent deployment guide" },
  getStarted: {
    heading: "Get started",
    body: "Deploy Doitx on your own machine, or start on Doitx Cloud.",
    selfHostGuide: "Deployment guide",
    cloud: "Doitx Cloud",
    github: "Download Doitx",
  },
  faqs: [
    {
      question: "Is Doitx simpler to set up than OpenClaw?",
      answer:
        "The documented paths are different. Doitx's deployment guide is a Docker installer, or the desktop app starting that stack, then an account and a model. After that Doitx is just chat, and you manage the bot from that chat. OpenClaw's getting-started guide is an installer and a wizard (Quick start or Custom setup). You can chat while the Gateway runs in that terminal. `openclaw gateway install` keeps it running in the background, then `openclaw gateway status` and `openclaw dashboard`. Connecting a chat app is another step. OpenClaw can be short when a model login is already detected. The ongoing surface is still the Gateway and the config file.",
    },
    {
      question: "Can I run Doitx on my own machine?",
      answer:
        "Yes. The published Docker images run on a single machine. The desktop app can start that stack locally, or connect to a server you already run.",
    },
    {
      question: "What model do the bots use?",
      answer:
        "You choose. Doitx's router gives you access to a set of models; a local OpenAI-compatible endpoint is also supported. Each person connects their own key.",
    },
    {
      question: "What do I control?",
      answer:
        "Your model keys, your browser sessions, and the deployment infrastructure. Routines are readable Markdown; you can set where a bot pauses for approval.",
    },
    {
      question: "Is it free?",
      answer:
        "The source is Apache-2.0. You pay for your model usage and infrastructure. Doitx Cloud is a hosted option in beta."
    },
  ],
  vsRakazo: "Doitx",
  vsOther: "OpenClaw",
};

const ZH: OpenClawPageCopy = {
  title: "OpenClaw 替代品 – Doitx",
  description: "对比 Doitx 和 OpenClaw：安装、机器上运行什么、日常操作、模型提供商和许可证。",
  h1: "OpenClaw 替代品",
  updated: "2026 年 10 月 7 日",
  intro: [
    `主要差异在于简洁。和 Grok Bot 一样，Doitx 就是聊天：你设置好机器人，然后通过聊天管理它。OpenClaw 也是在自有基础设施上运行的。它的[入门指南](${LINK.gettingStarted})路径更长：一个命令行安装器、一个引导向导、一个需要在终端运行或安装成后台服务的 Gateway，以及一份配置文件。`,
    `两者并非同一产品，Doitx 也不会导入 OpenClaw 的配置。下文关于 OpenClaw 的细节来自 [OpenClaw 官方文档](${LINK.docs})，Doitx 的细节来自本项目。两者都在变化，确认细节请以链接的文档为准。`,
  ],
  setup: {
    heading: "安装",
    paragraphs: [
      "Doitx 的私有部署路径是已发布的 Docker 安装程序，或由桌面应用在本机启动同一套服务。你创建账号、连接模型，之后就是聊天：在网页版、桌面版和移动端应用中，新机器人会先和你聊聊这项工作，之后你就在同一个聊天里管理它。例行任务是可读的 Markdown。",
      "OpenClaw 的入门指南会先安装命令行工具，然后运行向导。如果机器上已有 Claude Code 或 Codex 登录，或已有 API 密钥，Quick start 是更短的路径；Custom setup 会走完整流程，`openclaw onboard --classic` 是分步向导。Quick start 会让 Gateway 一直停在该终端里，直到你手动停止，因此你可以在安装服务之前先聊天。`openclaw gateway install` 是后续把 Gateway 常驻后台的步骤：macOS 上是 LaunchAgent，Linux 上是 systemd 用户单元，Windows 上是计划任务。你可以用 `openclaw gateway status` 查看状态（指南说端口是 18789），并打开 `openclaw dashboard`。从手机发消息（例如 Telegram）是单独的 Channels 步骤。",
    ],
  },
  dayToDay: {
    heading: "日常管理",
    paragraphs: [
      "日常使用中，你在同一个聊天里管理 Doitx。排程、记忆和审批边界都跟着那个机器人，网页版、桌面版和移动端一致。可选的连接器可以接入 Slack、WhatsApp、Telegram、通过 Sendblue 的 iMessage，以及飞书/Lark，但使用产品本身并不需要它们。",
      "OpenClaw 的文档说明，后续变更通过 `openclaw configure` 和一份 JSON 配置文件完成（默认是 `~/.openclaw/openclaw.json`，除非你改了路径）。`openclaw doctor` 和 `openclaw triage` 用于诊断安装问题。Gateway 是你需要一直保持运行的进程，可以在终端里跑，也可以装成后台服务；除了 Control UI，聊天应用是你与助手交流的主要方式。",
    ],
  },
  comparison: {
    heading: "对比",
    caption: "Doitx 与 OpenClaw，依据各自项目的公开文档。",
    topic: "主题",
    rakazo: "Doitx",
    other: "OpenClaw",
    rows: [
      {
        aspect: "安装",
        rakazo:
          "Docker 安装程序，或桌面应用在本机启动的本地服务，然后创建账号并连接模型。之后 Doitx 就是聊天：新机器人先和你聊，之后你在聊天里管理它。",
        openclaw:
          "安装命令行工具，然后走 Quick start 或 Custom setup。第一次聊天时 Gateway 可以停在该终端里。`openclaw gateway install` 会装成后台服务（LaunchAgent、systemd 用户单元或 Windows 计划任务），之后用 `openclaw gateway status` 和 `openclaw dashboard`。接入手机端渠道是另外一步。",
      },
      {
        aspect: "日常管理",
        rakazo:
          "在网页版、桌面版和移动端的同一个聊天里管理机器人。例行任务是可读的 Markdown，可以按排程运行。机器人可以在你设定的边界处暂停等待批准。",
        openclaw:
          "后续变更通过 `openclaw configure` 和 `~/.openclaw/openclaw.json` 完成。`openclaw doctor` 和 `openclaw triage` 诊断安装问题。Gateway 一直运行在终端里或作为已安装的后台服务。",
      },
      {
        aspect: "产品定位",
        rakazo:
          "面向持久型 AI 队友的私有平台。机器人保留对话、记忆、例行任务和历史，并能使用浏览器、终端和桌面。",
        openclaw:
          "一个网关，把聊天应用连接到你自己机器上的 AI 助手。项目把它描述为面向你已在使用的各个渠道的单一 Gateway。",
      },
      {
        aspect: "许可证",
        rakazo: "Apache-2.0，由 Inbox Zero Inc. 公开维护。",
        openclaw: "MIT，由 OpenClaw Foundation 托管，项目称其为独立的 501(c)(3) 组织。",
      },
      {
        aspect: "运行位置",
        rakazo:
          "你可以用已发布的 Docker 镜像或源码在自有基础设施上部署。网页版、桌面版和移动端应用都是该 API 的客户端。托管的 Doitx Cloud 处于 beta 阶段。",
        openclaw:
          "你在自己的电脑或服务器上运行 Gateway。文档称中间没有托管服务。界面包括浏览器 Control UI、配套应用，以及 iOS 和 Android 节点。",
      },
      {
        aspect: "交互方式",
        rakazo:
          "Doitx 网页版、Electron 桌面应用和 Expo 移动应用。可选连接器可接入 Slack、WhatsApp、Telegram、通过 Sendblue 的 iMessage，以及飞书/Lark。",
        openclaw:
          "聊天应用是主要界面。文档列出的渠道包括 Discord、Google Chat、iMessage、Matrix、Microsoft Teams、Signal、Slack、Telegram、WhatsApp、Zalo 等（通过插件），以及 WebChat。",
      },
      {
        aspect: "模型",
        rakazo:
          "Doitx 路由器，加上运维方运行的本地 OpenAI 兼容端点。每个人连接自己的密钥，每个机器人可以使用不同的模型。",
        openclaw:
          "支持多家提供商，包括 Anthropic、OpenAI 和 Google，部分订阅（如 OpenAI Codex）支持 OAuth。私有部署端点包括 vLLM、SGLang、Ollama、llama.cpp、LM Studio 以及其他 OpenAI 兼容或 Anthropic 兼容服务器，并支持故障转移。",
      },
      {
        aspect: "算力与工具",
        rakazo:
          "浏览器、终端、文件和图形桌面。默认算力是本地 Docker。可选的远程算力有 E2B、Daytona、CreateOS 和 Boat。也可以显式选择桌面算力在主机上运行，但它不是默认项。",
        openclaw:
          "工具包括浏览器自动化和 exec。沙箱默认关闭。启用后，文档列出的后端包括 Docker、Podman、SSH、OpenShell 和 Crabbox。Gateway 进程始终留在主机上。",
      },
      {
        aspect: "例行任务与记忆",
        rakazo: "例行任务保存为可读的 Markdown。记忆、排程、审计日志和审批边界都是产品的一部分。",
        openclaw: "会话、记忆、技能、cron、hooks 和插件。私聊可以共享一个主会话，群聊默认相互隔离。",
      },
      {
        aspect: "集成",
        rakazo: "可选的 Composio 或 Pipedream 目录，加上你添加的 MCP 服务器、Treg 和 OpenAPI 工具。",
        openclaw: "渠道插件、技能、插件 SDK，以及通过多家提供商进行的网页搜索。",
      },
      {
        aspect: "多智能体",
        rakazo: "机器人可以把工作委派给同级机器人或短生命周期的子智能体。",
        openclaw: "多智能体路由，按智能体、工作区或发送者隔离会话。",
      },
      {
        aspect: "软件费用",
        rakazo: "软件不收席位费。你只需为使用的模型和基础设施付费。",
        openclaw: "文档称没有付费档位。你只需为模型和你运行的机器付费。",
      },
    ],
  },
  differences: {
    heading: "关键差异",
    teammateTitle: "应用里的队友，还是聊天里的助手",
    teammate: [
      "Doitx 是一个网页版、桌面版和移动端应用。机器人有工作、有算力，例行任务保存为你能读懂、能编辑的 Markdown。OpenClaw 是一个 Gateway，你从已在使用的聊天应用给它发消息，围绕这个网关还有浏览器 Control UI 和移动节点。",
      "Doitx 可选接入 Slack、WhatsApp、Telegram、iMessage（Sendblue）和飞书/Lark 连接器，这些只是附加项。聊天应用才是 OpenClaw 的主要界面，包括 Discord、Signal、iMessage、Slack、Telegram、WhatsApp 等渠道插件。",
    ],
    computerTitle: "算力运行在哪里",
    computer: [
      "Doitx 在一台算力上执行浏览器和终端操作。默认是本地 Docker；E2B、Daytona、CreateOS 和 Boat 是可选的远程算力。也可以显式选择桌面算力在主机上运行，但它不是默认项。",
      "OpenClaw 可以对工具执行做沙箱隔离。其文档称沙箱默认关闭，Gateway 进程留在主机上。文档列出的沙箱后端包括 Docker、Podman、SSH、OpenShell 和 Crabbox。",
    ],
    modelsTitle: "模型与费用",
    models: [
      "两者都允许自带模型提供商，包括你自有的服务器。Doitx 连接 Doitx 路由器或运维方运行的本地 OpenAI 兼容服务器，每个机器人可以使用不同的模型。OpenClaw 文档列出 Anthropic、OpenAI、Google 等，包括 OpenAI 兼容和 Anthropic 兼容端点，并支持故障转移。",
      "两个项目都不对软件收席位费。OpenClaw 文档称没有付费档位、也没有托管服务。Doitx 在自有基础设施上部署免费，托管的 Doitx Cloud 处于 beta 阶段。你只需为使用的模型、机器和可选算力提供商付费。",
    ],
    licenseTitle: "许可证",
    license:
      "Doitx 采用 Apache-2.0，由 Inbox Zero Inc. 维护。OpenClaw 采用 MIT，由 OpenClaw Foundation 托管，项目称其为独立的 501(c)(3) 组织。",
  },
  fits: {
    heading: "哪种形态适合你",
    rakazoTitle: "Doitx",
    rakazo: `重复的浏览器和终端工作、按排程运行的操作例行任务、审计日志和审批边界，并且在网页版、桌面版和移动端使用同一批机器人。[按指南部署](${LINK.selfHost})。`,
    otherTitle: "OpenClaw",
    other: `一个住进你已在使用的聊天应用里的助手，带渠道插件、技能和你机器上的网关。请从 [OpenClaw 文档](${LINK.docs})开始。`,
  },
  sources: {
    heading: "资料来源",
    links: [
      { label: "OpenClaw 文档", href: LINK.docs },
      { label: "OpenClaw 入门指南", href: LINK.gettingStarted },
      { label: "OpenClaw 功能", href: LINK.features },
      { label: "OpenClaw 沙箱", href: LINK.sandbox },
      { label: "OpenClaw 源码", href: LINK.source },
      { label: "Doitx 部署指南", href: LINK.selfHost },
    ],
  },
  related: { heading: "相关内容", home: "Doitx 首页", selfHost: "AI 智能体部署指南" },
  getStarted: {
    heading: "开始使用",
    body: "在自有机器上部署 Doitx，或从 Doitx Cloud 开始。",
    selfHostGuide: "部署指南",
    cloud: "Doitx Cloud",
    github: "下载 Doitx",
  },
  faqs: [
    {
      question: "Doitx 的安装比 OpenClaw 更简单吗？",
      answer:
        "文档描述的路径不同。Doitx 的部署指南是一个 Docker 安装程序，或桌面应用启动同一套服务，然后创建账号、连接模型。之后 Doitx 就是聊天，你在聊天里管理机器人。OpenClaw 的入门指南是安装器加向导（Quick start 或 Custom setup），Gateway 在该终端运行时就能聊天。`openclaw gateway install` 让它常驻后台，之后用 `openclaw gateway status` 和 `openclaw dashboard`。接入聊天应用是另一步。当已检测到模型登录时，OpenClaw 也可以很短。长期要面对的仍然是 Gateway 和配置文件。",
    },
    {
      question: "我能在自己的机器上运行 Doitx 吗？",
      answer: "可以。已发布的 Docker 镜像可在单台机器上运行。桌面应用可以在本地启动这套服务，也可以连接你已在运行的服务器。",
    },
    {
      question: "机器人使用什么模型？",
      answer: "由你决定。Doitx 路由器提供一组模型；也支持本地 OpenAI 兼容端点。每个人连接自己的密钥。",
    },
    {
      question: "我能掌控哪些东西？",
      answer: "你的模型密钥、浏览器会话和部署基础设施。例行任务是可读的 Markdown；你可以设定机器人在哪里暂停等待批准。",
    },
    {
      question: "免费吗？",
      answer: "源码采用 Apache-2.0。你只需为模型用量和基础设施付费。Doitx Cloud 是处于 beta 阶段的托管选项。",
    },
  ],
  vsRakazo: "Doitx",
  vsOther: "OpenClaw",
};

const COPY: Partial<Record<Locale, OpenClawPageCopy>> = { en: EN, zh: ZH };

/** en + zh are translated; every other locale falls back to English. */
export function getOpenClawPageCopy(locale: Locale): OpenClawPageCopy {
  return COPY[locale] ?? EN;
}
