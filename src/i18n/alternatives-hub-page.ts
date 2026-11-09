// Full-page copy for the alternatives roundup.
//
// Only English and Chinese are translated; other locales fall back to English. Text uses the
// lightweight markup understood by `Prose`: [label](href), `code`, **bold**.
import type { Locale } from "./locales";

export type HubRow = {
  product: string;
  href: string;
  license: string;
  selfHost: string;
  model: string;
  price: string;
  setup: string;
  chat: string;
};

export type HubCard = {
  name: string;
  href: string;
  heading: string;
  paragraphs: readonly string[];
};

export type AlternativesHubPageCopy = {
  title: string;
  description: string;
  h1: string;
  updated: string;
  changelog: readonly string[];
  tldrHeading: string;
  tldr: readonly string[];
  comparisonHeading: string;
  caption: string;
  productLabel: string;
  columns: readonly string[];
  rows: readonly HubRow[];
  agentsHeading: string;
  cards: readonly HubCard[];
  timelineHeading: string;
  timeline: readonly { when: string; what: string }[];
  howtoHeading: string;
  howto: readonly string[];
  faqHeading: string;
  faq: readonly { question: string; answer: string }[];
  getStarted: { heading: string; body: string; docs: string; github: string };
};

const EN: AlternativesHubPageCopy = {
  title: "Personal AI Agents 2026: Doitx vs OpenClaw, Hermes, Grok Bot & More",
  description:
    "Compare Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro, and Claude Duet in 2026, covering self-hosting, licenses, memory, and pricing.",
  h1: "Best Personal AI Agents in 2026: Grok Bot, Muse, Dots, Instinct, Hark Pro & Open Source Alternatives",
  updated: "Updated October 24, 2026.",
  changelog: [
    "Added Claude Duet.",
    "Added Hark Pro and the August 5 Handoff date.",
    "Added Instinct and Hermes Agent beside Muse, Dots, Grok Bot, and OpenClaw.",
    "Named Meta Muse, OpenAI Dots, Instinct AI, and Hermes Agent in the comparison titles.",
  ],
  tldrHeading: "TL;DR",
  tldr: [
    "Doitx is a self-hosted AI agent platform for people and teams that want AI teammates on infrastructure they control. Pick the tool that matches how you will operate it:",
    "Doitx is the open source option you run yourself. Like Grok Bot, it is just chat once it is running: you set up a bot and manage it from that chat. You bring the model key. The license is Apache-2.0, and there is no seat fee.",
    "Grok Bot, Meta Muse, OpenAI Dots, Instinct, Claude Duet, and Hark Pro are hosted. You do not install their service. Grok Bot comes with paid Cursor plans and SuperGrok. Muse runs on a virtual machine Meta operates. Dots sit on eligible ChatGPT plans. Instinct is the assistant you text or call. Hark Pro has a free tier, with $20 and $100 monthly tiers for more usage.",
    "OpenClaw and Hermes Agent are also open source and self-hosted. Their docs describe installers, config files, and a gateway. Hermes Desktop can reach a first chat without the command line. OpenClaw can chat while its Gateway runs in the terminal.",
  ],
  comparisonHeading: "Comparison",
  caption: "Personal AI agents compared from public descriptions",
  productLabel: "Product",
  columns: ["License", "Self-host", "Your model", "Price", "Setup", "Managed from chat"],
  rows: [
    {
      product: "Doitx",
      href: "/",
      license: "Apache-2.0",
      selfHost: "Yes. Docker images or a source checkout.",
      model: "Yes. Your key, including a local server.",
      price: "No seat fee. You pay the model and computer.",
      setup: "Docker or the desktop app, then an account and a model.",
      chat: "Yes. You manage the bot from the chat.",
    },
    {
      product: "Grok Bot",
      href: "/grok-bot-alternative/",
      license: "Hosted. No source for the bot service.",
      selfHost: "No. Cloud computer. Optional local commands.",
      model: "No. Included with the plan.",
      price: "Paid Cursor plans and SuperGrok at $30 a month.",
      setup: "Install the app. The service stays hosted.",
      chat: "Yes. Named bots, routines, and approvals.",
    },
    {
      product: "Meta Muse",
      href: "/muse-alternative/",
      license: "Hosted service from Meta.",
      selfHost: "No. Muse Secure VM is Meta's cloud machine.",
      model: "No. The launch post names Muse Spark.",
      price: "The Muse posts used here do not list a price.",
      setup: "Muse app or WhatsApp, in the US and Canada.",
      chat: "Yes, in the app or WhatsApp.",
    },
    {
      product: "OpenAI Dots",
      href: "/dots-alternative/",
      license: "Hosted product from OpenAI.",
      selfHost: "No. Each dot has a cloud computer OpenAI runs.",
      model: "No. The announcement names GPT-6 Astra.",
      price: "Eligible Pro, Business Premium, and Enterprise plans.",
      setup: "A ChatGPT plan that includes Dots. Not under 18.",
      chat: "Yes. A dot can keep working after you leave.",
    },
    {
      product: "Instinct",
      href: "/instinct-alternative/",
      license: "Hosted. The cited pages do not publish source.",
      selfHost: "No install is described.",
      model: "No public model is named. Safety review can still train.",
      price: "The cited pages do not list a price.",
      setup: "Text or call. The policy also names apps.",
      chat: "Yes. You text or call.",
    },
    {
      product: "Claude Duet",
      href: "/claude-duet-alternative/",
      license: "Hosted service from Anthropic.",
      selfHost: "No. A cloud computer Anthropic runs.",
      model: "No. Claude Opus 5.5.",
      price: "Included with Pro at $20 a month and Max from $100.",
      setup: "Waitlist, US only. iOS, Android, and claude.ai.",
      chat: "Yes. One ongoing thread with a morning brief.",
    },
    {
      product: "Hark Pro",
      href: "/hark-alternative/",
      license: "Hosted. The terms restrict reverse engineering.",
      selfHost: "No install is described.",
      model: "No. Hark trains its own models.",
      price: "Free. $20 a month is 2×. $100 a month is 10×.",
      setup: "Web, iOS, or Android app.",
      chat: "Yes. Projects are separate chats.",
    },
    {
      product: "OpenClaw",
      href: "/openclaw-alternative/",
      license: "MIT",
      selfHost: "Yes. You run the Gateway.",
      model: "Yes, including a server you host.",
      price: "No software fee. You pay models and the machine.",
      setup: "CLI installer and a wizard.",
      chat: "Chat apps and a Control UI, plus a config file.",
    },
    {
      product: "Hermes Agent",
      href: "/hermes-alternative/",
      license: "MIT",
      selfHost: "Yes. It defaults to the machine you install it on.",
      model: "Yes, including local. 64,000 token minimum.",
      price: "MIT software. Optional Nous Portal credits.",
      setup: "Desktop onboarding, or a CLI wizard.",
      chat: "Desktop is a chat. Messaging needs a gateway.",
    },
  ],
  agentsHeading: "The agents",
  cards: [
    {
      name: "Grok Bot",
      href: "/grok-bot-alternative/",
      heading: "Open source, self-hosted Grok Bot alternative",
      paragraphs: [
        "Grok Bot is xAI's hosted product for named bots that can use a computer, keep routines, and pause for approval. The docs describe a cloud computer on your account, shared by the bots on that account. They do not describe installing the service yourself or connecting your own model provider. Grok Build and the older Grok-1 weights are separate open source releases, not this service. Grok Bot is included with paid Cursor plans and SuperGrok, listed at $30 a month. The free plan on the pricing page does not list it. Doitx is this shape you host, with a model key you bring.",
      ],
    },
    {
      name: "Meta Muse",
      href: "/muse-alternative/",
      heading: "",
      paragraphs: [
        "Meta introduced Muse on September 8, 2026. You talk to it in the Muse app or on WhatsApp, and Meta says it keeps working after you close the app. The computer is Muse Secure VM, a cloud machine Meta operates. The launch post names Muse Spark, so you do not bring a model key. Meta says it checks before sensitive actions such as sending email or paying, and that you can opt out of using interactions to train Meta's models. The posts used here do not list a price. Doitx is the opposite on hosting: you run the stack, and you pick the model.",
      ],
    },
    {
      name: "OpenAI Dots",
      href: "/dots-alternative/",
      heading: "",
      paragraphs: [
        "OpenAI announced Dots on September 29, 2026. A dot is an always-on agent with its own cloud computer, and OpenAI says it uses GPT-6 Astra. The first dot is included with eligible Pro and Business Premium plans. Enterprise is in the rollout. Dots are not available under 18. A rules list says what the dot may do, must ask about, or must not do, and Custom Rules cannot turn off core safety checks. Changing a password or transferring money requires you to take over. Doitx does not include a dot. OpenAI is one model connection you can choose.",
      ],
    },
    {
      name: "Instinct",
      href: "/instinct-alternative/",
      heading: "",
      paragraphs: [
        "Instinct, on this page, is the personal assistant at instinct.com that you text or call. The homepage describes it using your phone and computer the way a person would, with examples such as a bill, gifts, or a trip. The privacy policy and terms were revised August 26, 2026. They do not name a public model. They say Instinct may train on what you submit unless you opt out, and that material flagged for safety review can still be used. Vault materials and Google Workspace data are excluded. Terms let it act in connected services, including a payment method. Doitx does not text, call, or buy things that way.",
      ],
    },
    {
      name: "Claude Duet",
      href: "/claude-duet-alternative/",
      heading: "",
      paragraphs: [
        "Anthropic released Claude Duet as a research preview on October 21, 2026. It is a standalone app you message like a person, with one ongoing thread. Each morning it reviews your email and calendar, then checks connected accounts at intervals and stays quiet until something needs you. It works on a cloud computer Anthropic runs, uses Claude Opus 5.5, and you cannot choose a model. It asks before it sends a message, pays, signs, or deletes, and it will not trade securities or move money between accounts. Duet is included with Claude Pro and Max in the US, from a waitlist, and uses the plan's limits. Doitx runs on its deployment's model providers — the Doitx router or a local endpoint — on a computer you run, with as many bots as you set up.",
      ],
    },
    {
      name: "Hark Pro",
      href: "/hark-alternative/",
      heading: "",
      paragraphs: [
        "Hark Pro is the personal agent at hark.com, launched October 6, 2026. It is a hosted web, iOS, and Android app. Every feature in that article stays free. Twenty dollars a month is twice the usage, and one hundred dollars a month is ten times. The article describes a messaging-style app. Projects are dedicated chats with their own threads, and Home, Action Buttons, and Panels sit beside that. Hark introduced Handoff on August 5, 2026. It is a virtual computer with a browser, files, and a terminal. The October 6 article says it can run up to six browsers at once, and Hark operates that computer. Training opt-out has exceptions for feedback and safety review. Doitx uses a computer you run, and you bring the model.",
      ],
    },
    {
      name: "Hermes Agent",
      href: "/hermes-alternative/",
      heading: "",
      paragraphs: [
        "Hermes Agent is Nous Research's MIT-licensed agent, and you can run it on your own machine. The desktop app shares config, keys, sessions, and memory with the command-line install. First-run onboarding can reach a first message without the CLI. The app starts its own local backend. Telegram, Discord, and Slack use a gateway process you start separately. The quickstart says a model needs at least 64,000 tokens of context. Like Grok Bot, Doitx's ongoing management stays in the chat.",
      ],
    },
    {
      name: "Doitx",
      href: "/self-hosted-ai-agent/",
      heading: "Open source AI agent you run yourself",
      paragraphs: [
        "Doitx is an open source AI agent for persistent teammates. It is in beta. The clients are the web app, the Electron desktop app, and the Expo mobile app. You bring a model key, including a local server, and each bot can use a different model. The default computer is local Docker. Optional computers include E2B, Daytona, CreateOS, Boat, and a trusted local computer. Like Grok Bot, Doitx is just chat once it is running: a new bot interviews you, and you manage schedules, memory, and approvals from that chat. Routines are readable Markdown. There is no seat fee. Hosted Doitx Cloud is in beta.",
      ],
    },
    {
      name: "OpenClaw",
      href: "/openclaw-alternative/",
      heading: "Open source OpenClaw alternative",
      paragraphs: [
        "OpenClaw is an MIT-licensed agent you run yourself, stewarded by the OpenClaw Foundation. The getting-started guide installs a CLI and runs a wizard. The Gateway can stay in that terminal so you can chat before openclaw gateway install, the later background service. Later changes go through openclaw configure and a JSON config file. Chat apps are the main surface, alongside the Control UI. After Docker or the desktop app, Doitx is just chat, managed from that chat, like Grok Bot.",
      ],
    },
  ],
  timelineHeading: "Launch timeline",
  timeline: [
    { when: "August 5, 2026", what: "Hark introduced Handoff, the computer-use agent that later sits inside Hark Pro." },
    {
      when: "August 26, 2026",
      what: "Instinct revised its privacy policy and terms. Those pages do not give a product launch date. This roundup does not invent one.",
    },
    { when: "September 8, 2026", what: "Meta introduced Muse, a personal agent on a virtual machine Meta operates." },
    {
      when: "September 23, 2026",
      what: "Meta's Connect recap added Muse for Mac, which can drive apps on that Mac with permission.",
    },
    {
      when: "September 29, 2026",
      what: "OpenAI introduced Dots. Meta also posted about Muse for small businesses. The Muse posts used here still do not list a price.",
    },
    {
      when: "October 6, 2026",
      what: "Hark launched Hark Pro: a hosted web, iOS, and Android app, free, with $20 and $100 usage tiers.",
    },
    {
      when: "October 7, 2026",
      what: "The first version of this roundup. OpenClaw and Hermes Agent are ongoing open source projects. Their docs do not give a single launch day, so they are not pinned to one.",
    },
    {
      when: "October 21, 2026",
      what: "Anthropic released Claude Duet as a research preview for Pro and Max in the US.",
    },
  ],
  howtoHeading: "How to choose",
  howto: [
    "Choose Doitx when the agent should live on hardware you control, the model key should be one you bring, and the daily surface should stay a chat. That is the Grok Bot shape without the hosted service. The cost is the install: Docker or the desktop app, then an account and a model. After that, routines, memory, and approvals stay in the chat.",
    "Choose Grok Bot when you already pay for Cursor or SuperGrok and you want xAI to host the computer. Choose Meta Muse for Meta's agent in the Muse app or WhatsApp, on a VM Meta runs. Choose OpenAI Dots when the agent should sit on an eligible ChatGPT plan and follow OpenAI's rules for what it may do alone. Choose Instinct when you want to text or call a hosted assistant. Choose Claude Duet when you already pay for Claude Pro or Max, live in the US, and want Anthropic to watch your inbox and calendar on a computer it runs. Choose Hark Pro for a hosted conversation with a free tier and a cloud computer Hark operates.",
    "Choose OpenClaw when the assistant should live in chat apps you already use, and you are willing to run a Gateway and a config file. Choose Hermes Agent for MIT-licensed software and a desktop app that can reach a first message without the CLI. Messaging apps on Hermes still need a separate gateway. Doitx does not import a Grok Bot account, a Muse VM, a dot, an Instinct thread, a Claude Duet thread, or a Hark vault. OpenClaw documents a Hermes migration for config, memory, skills, and, if you accept it, credentials. Read the linked page before you rely on a price, a country, or a connector.",
  ],
  faqHeading: "FAQ",
  faq: [
    {
      question: "Which of these can I self-host?",
      answer:
        "Doitx, OpenClaw, and Hermes Agent. Doitx publishes Docker images and a source checkout. OpenClaw's guide has you run the Gateway. Hermes installs on your machine, and the desktop app can start its own local backend. Grok Bot, Muse, Dots, Instinct, Claude Duet, and Hark Pro are hosted. Their pages do not describe installing the service yourself. Doitx also offers a hosted beta, Doitx Cloud.",
    },
    {
      question: "Which let me bring my own model?",
      answer:
        "Doitx, OpenClaw, and Hermes Agent, including a local or compatible server. Grok Bot's docs do not describe your own provider. Muse's launch post names Muse Spark. Dots use GPT-6 Astra. Instinct's privacy policy and terms do not name a public model. Claude Duet uses Claude Opus 5.5, and you cannot choose a model. Hark says it trains its own models and prioritizes them.",
    },
    {
      question: "Is Doitx just chat, like Grok Bot?",
      answer:
        "Yes, after it is running. You install with Docker or the desktop app, create an account, and connect a model. A new bot interviews you, and you manage it from that chat. Grok Bot is also a chat for named bots. OpenClaw adds a command-line setup and a Gateway. Hermes Desktop can reach a first message without the CLI, and messaging apps use a separate gateway. Claude Duet, Hark Pro, Muse, Dots, and Instinct are conversations too, on services you do not host.",
    },
    {
      question: "Is this a ranking?",
      answer:
        "No. The title lists the agents people compare in 2026. The table and the cards use each project's public description. They do not measure quality, speed, or how often a task succeeds. Where a price cell says the cited pages do not list one, that is the claim. Check the linked source before you rely on a detail.",
    },
    {
      question: "Where do the dates come from?",
      answer:
        "Muse's launch post is September 8, 2026, and the Connect recap is September 23, 2026. Dots were announced September 29, 2026. Hark introduced Handoff on August 5, 2026, and launched Hark Pro on October 6, 2026. Anthropic released Claude Duet on October 21, 2026. Instinct's privacy policy and terms were revised August 26, 2026, which is not a launch date. Grok Bot, OpenClaw, and Hermes Agent are compared from their current docs without a single launch day.",
    },
  ],
  getStarted: {
    heading: "Start Doitx",
    body: "Connect a model or use the built-in gateway, add the tools a bot may touch, and invite people by email.",
    docs: "Read the docs",
    github: "View on GitHub",
  },
};

const ZH: AlternativesHubPageCopy = {
  title: "2026 个人 AI 智能体：Doitx 对比 OpenClaw、Hermes、Grok Bot 等",
  description:
    "2026 年对比 Doitx、OpenClaw、Hermes Agent、Grok Bot、Meta Muse、OpenAI Dots、Instinct、Hark Pro 与 Claude Duet，涵盖自托管、许可证、记忆与定价。",
  h1: "2026 年最佳个人 AI 智能体：Grok Bot、Muse、Dots、Instinct、Hark Pro 与开源替代品",
  updated: "更新于 2026 年 10 月 24 日。",
  changelog: [
    "新增 Claude Duet。",
    "新增 Hark Pro，以及 8 月 5 日的 Handoff 时间点。",
    "在 Muse、Dots、Grok Bot 和 OpenClaw 之外，新增 Instinct 和 Hermes Agent。",
    "在对比标题中列出 Meta Muse、OpenAI Dots、Instinct AI 和 Hermes Agent。",
  ],
  tldrHeading: "太长不看",
  tldr: [
    "Doitx 是面向希望在自己掌控的基础设施上运行 AI 队友的个人与团队的自托管 AI 智能体平台。选择与你的使用方式匹配的工具：",
    "Doitx 是你可以自己运行的开源选项。和 Grok Bot 一样，一旦运行起来它就是聊天：你设置好机器人，然后在那个聊天里管理它。模型密钥由你提供。许可证是 Apache-2.0，不收席位费。",
    "Grok Bot、Meta Muse、OpenAI Dots、Instinct、Claude Duet 和 Hark Pro 是托管产品，你不需要安装它们的服务。Grok Bot 随付费 Cursor 套餐和 SuperGrok 提供。Muse 运行在 Meta 操作的虚拟机上。Dots 面向符合条件的 ChatGPT 套餐。Instinct 是你可以发短信或打电话的助手。Hark Pro 有免费档位，另有每月 20 美元和 100 美元两档以提升用量。",
    "OpenClaw 和 Hermes Agent 同样是开源、自托管的。它们的文档涉及安装器、配置文件和网关。Hermes 桌面版无需命令行就能发出第一条消息。OpenClaw 可以在 Gateway 运行于终端时直接聊天。",
  ],
  comparisonHeading: "对比",
  caption: "依据公开描述对比个人 AI 智能体",
  productLabel: "产品",
  columns: ["许可证", "自托管", "自带模型", "价格", "安装", "从聊天管理"],
  rows: [
    {
      product: "Doitx",
      href: "/",
      license: "Apache-2.0",
      selfHost: "支持。Docker 镜像或源码检出。",
      model: "支持。你自己的密钥，包括本地服务器。",
      price: "不收席位费。你为模型和算力付费。",
      setup: "Docker 或桌面应用，然后创建账号并连接模型。",
      chat: "支持。你在聊天里管理机器人。",
    },
    {
      product: "Grok Bot",
      href: "/grok-bot-alternative/",
      license: "托管。机器人服务不公开源码。",
      selfHost: "不支持。云端算力，可选本地命令。",
      model: "不支持。随套餐提供。",
      price: "付费 Cursor 套餐，SuperGrok 每月 30 美元。",
      setup: "安装应用，服务仍由 xAI 托管。",
      chat: "支持。具名机器人、例行任务和审批。",
    },
    {
      product: "Meta Muse",
      href: "/muse-alternative/",
      license: "Meta 的托管服务。",
      selfHost: "不支持。Muse Secure VM 是 Meta 的云端机器。",
      model: "不支持。发布帖点名 Muse Spark。",
      price: "此处引用的 Muse 文章未标价。",
      setup: "Muse 应用或 WhatsApp，限美国和加拿大。",
      chat: "支持，在应用或 WhatsApp 中。",
    },
    {
      product: "OpenAI Dots",
      href: "/dots-alternative/",
      license: "OpenAI 的托管产品。",
      selfHost: "不支持。每个 Dots 都有一台 OpenAI 运行的云端算力。",
      model: "不支持。公告点名 GPT-6 Astra。",
      price: "符合条件的 Pro、Business Premium 和 Enterprise 套餐。",
      setup: "包含 Dots 的 ChatGPT 套餐。未满 18 岁不可用。",
      chat: "支持。你离开后 Dots 仍会继续工作。",
    },
    {
      product: "Instinct",
      href: "/instinct-alternative/",
      license: "托管。引用页面未公开源码。",
      selfHost: "未描述安装方式。",
      model: "未点名公开模型。安全审查仍可能用于训练。",
      price: "引用页面未标价。",
      setup: "发短信或打电话。政策也提到应用。",
      chat: "支持。你发短信或打电话。",
    },
    {
      product: "Claude Duet",
      href: "/claude-duet-alternative/",
      license: "Anthropic 的托管服务。",
      selfHost: "不支持。一台 Anthropic 运行的云端算力。",
      model: "不支持。Claude Opus 5.5。",
      price: "Pro 每月 20 美元起包含，Max 每月 100 美元起。",
      setup: "候补名单，仅限美国。iOS、Android 和 claude.ai。",
      chat: "支持。一个持续的对话线程，附每日晨报。",
    },
    {
      product: "Hark Pro",
      href: "/hark-alternative/",
      license: "托管。条款限制逆向工程。",
      selfHost: "未描述安装方式。",
      model: "不支持。Hark 训练自己的模型。",
      price: "免费。每月 20 美元为 2 倍，每月 100 美元为 10 倍。",
      setup: "网页版、iOS 或 Android 应用。",
      chat: "支持。项目之间是独立聊天。",
    },
    {
      product: "OpenClaw",
      href: "/openclaw-alternative/",
      license: "MIT",
      selfHost: "支持。你运行 Gateway。",
      model: "支持，包括你自己托管的服务器。",
      price: "不收软件费。你为模型和机器付费。",
      setup: "命令行安装器和向导。",
      chat: "聊天应用和 Control UI，外加一份配置文件。",
    },
    {
      product: "Hermes Agent",
      href: "/hermes-alternative/",
      license: "MIT",
      selfHost: "支持。默认装在你安装它的那台机器上。",
      model: "支持，包括本地。最少 64,000 token。",
      price: "MIT 软件。可选的 Nous Portal 额度。",
      setup: "桌面引导，或命令行向导。",
      chat: "桌面版就是聊天。消息应用需要单独的网关。",
    },
  ],
  agentsHeading: "各个智能体",
  cards: [
    {
      name: "Grok Bot",
      href: "/grok-bot-alternative/",
      heading: "开源、可自托管的 Grok Bot 替代品",
      paragraphs: [
        "Grok Bot 是 xAI 面向具名机器人的托管产品，这些机器人可以使用算力、保留例行任务并在审批处暂停。文档描述了运行在你账号下的云端算力，该账号下的机器人共用它。文档没有描述由你自己安装该服务，也没有描述连接你自己的模型提供商。Grok Build 和较早的 Grok-1 权重是另外的开源发布，不是这个服务。Grok Bot 随付费 Cursor 套餐和 SuperGrok 提供，后者标价每月 30 美元。定价页上的免费套餐没有列出它。Doitx 就是这种形态，但由你托管，模型密钥也由你提供。",
      ],
    },
    {
      name: "Meta Muse",
      href: "/muse-alternative/",
      heading: "",
      paragraphs: [
        "Meta 于 2026 年 9 月 8 日推出 Muse。你可以在 Muse 应用或 WhatsApp 中与它交谈，Meta 称关闭应用后它仍会继续工作。算力是 Muse Secure VM，一台 Meta 操作的云端机器。发布帖点名 Muse Spark，因此你不需要自带模型密钥。Meta 称它会在发送邮件或付款等敏感操作前检查，你可以选择不让交互数据用于训练 Meta 的模型。此处引用的文章未标价。Doitx 在托管上正好相反：你运行整套系统，模型由你选择。",
      ],
    },
    {
      name: "OpenAI Dots",
      href: "/dots-alternative/",
      heading: "",
      paragraphs: [
        "OpenAI 于 2026 年 9 月 29 日宣布 Dots。一个 dot 是常驻智能体，拥有自己的云端算力，OpenAI 称它使用 GPT-6 Astra。首个 dot 包含在符合条件的 Pro 和 Business Premium 套餐中，Enterprise 正在逐步推出。未满 18 岁不可用。一份规则清单说明 dot 可以做什么、必须征询什么、不能做什么，而自定义规则无法关闭核心安全检查。更改密码或转账需要你亲自接手。Doitx 不包含 dot，OpenAI 只是你可以选择的一种模型连接。",
      ],
    },
    {
      name: "Instinct",
      href: "/instinct-alternative/",
      heading: "",
      paragraphs: [
        "本页所说的 Instinct 是 instinct.com 上可以发短信或打电话的个人助手。首页描述它像人一样使用你的手机和电脑，举例包括缴费、送礼或旅行。其隐私政策和条款于 2026 年 8 月 26 日修订。它们没有点名公开模型。它们称 Instinct 可能用你提交的内容进行训练，除非你选择退出，而被标记为安全审查的材料仍可能被使用。Vault 材料和 Google Workspace 数据除外。条款允许它在已连接的服务中操作，包括支付方式。Doitx 不会以那种方式发短信、打电话或购物。",
      ],
    },
    {
      name: "Claude Duet",
      href: "/claude-duet-alternative/",
      heading: "",
      paragraphs: [
        "Anthropic 于 2026 年 10 月 21 日以研究预览形式发布 Claude Duet。它是一个独立应用，你像给人发消息一样与它交流，只有一个持续的对话线程。每天早上它会查看你的邮件和日历，之后按间隔检查已连接的账号，直到有事需要你才出声。它运行在 Anthropic 操作的云端算力上，使用 Claude Opus 5.5，你无法选择模型。它在发送消息、付款、签署或删除前会询问，且不会交易证券或在账户间转移资金。Duet 在美国随 Claude Pro 和 Max 提供，需从候补名单进入，并受套餐限制。Doitx 运行在部署的模型来源上——Doitx 路由器或本地端点——在你运行的算力上，机器人数量由你决定。",
      ],
    },
    {
      name: "Hark Pro",
      href: "/hark-alternative/",
      heading: "",
      paragraphs: [
        "Hark Pro 是 hark.com 上的个人智能体，于 2026 年 10 月 6 日上线。它是一个托管的网页版、iOS 和 Android 应用。该文章中的每项功能都免费。每月 20 美元是两倍用量，每月 100 美元是十倍。文章描述的是一个消息式应用。项目是带独立线程的专属聊天，旁边还有首页、操作按钮和面板。Hark 于 2026 年 8 月 5 日推出 Handoff，它是一台带浏览器、文件和终端的虚拟电脑。10 月 6 日的文章称它最多可同时运行六个浏览器，由 Hark 操作那台电脑。训练选择退出对反馈和安全审查有例外。Doitx 使用你运行的算力，模型也由你提供。",
      ],
    },
    {
      name: "Hermes Agent",
      href: "/hermes-alternative/",
      heading: "",
      paragraphs: [
        "Hermes Agent 是 Nous Research 的 MIT 协议智能体，你可以在自己的机器上运行它。桌面应用与命令行安装共享配置、密钥、会话和记忆。首次引导无需命令行就能发出第一条消息。应用会启动自己的本地后端。Telegram、Discord 和 Slack 使用你单独启动的网关进程。快速上手文档称模型至少需要 64,000 token 的上下文。和 Grok Bot 一样，Doitx 的日常管理都在聊天里进行。",
      ],
    },
    {
      name: "Doitx",
      href: "/self-hosted-ai-agent/",
      heading: "你自己运行的开源 AI 智能体",
      paragraphs: [
        "Doitx 是一个面向持久型队友的开源 AI 智能体，目前处于 beta 阶段。客户端包括网页版应用、Electron 桌面应用和 Expo 移动应用。你自带模型密钥，包括本地服务器，每个机器人可以使用不同的模型。默认算力是本地 Docker。可选算力包括 E2B、Daytona、CreateOS、Boat，以及你信任的本地算力。和 Grok Bot 一样，一旦运行起来 Doitx 就是聊天：新机器人会先和你聊，你在那个聊天里管理排程、记忆和审批。例行任务是可读的 Markdown。不收席位费。托管的 Doitx Cloud 处于 beta 阶段。",
      ],
    },
    {
      name: "OpenClaw",
      href: "/openclaw-alternative/",
      heading: "开源 OpenClaw 替代品",
      paragraphs: [
        "OpenClaw 是一个由你自己运行的 MIT 协议智能体，由 OpenClaw Foundation 托管。入门指南会安装命令行工具并运行向导。Gateway 可以停在该终端里，让你在 `openclaw gateway install`（后续的后台服务）之前就能聊天。后续变更通过 `openclaw configure` 和一份 JSON 配置文件完成。除 Control UI 外，聊天应用是主要界面。完成 Docker 或桌面应用安装后，Doitx 就是聊天，并在同一个聊天里管理，和 Grok Bot 一样。",
      ],
    },
  ],
  timelineHeading: "发布时间线",
  timeline: [
    { when: "2026 年 8 月 5 日", what: "Hark 推出 Handoff，这个计算机使用智能体后来进入 Hark Pro。" },
    {
      when: "2026 年 8 月 26 日",
      what: "Instinct 修订了隐私政策和条款。那些页面没有给出产品发布日，本汇总不会凭空编造。",
    },
    { when: "2026 年 9 月 8 日", what: "Meta 推出 Muse，一个运行在 Meta 操作的虚拟机上的个人智能体。" },
    { when: "2026 年 9 月 23 日", what: "Meta 的 Connect 回顾新增 Muse for Mac，经许可可以驱动那台 Mac 上的应用。" },
    {
      when: "2026 年 9 月 29 日",
      what: "OpenAI 推出 Dots。Meta 也发布了面向小企业的 Muse 内容。此处引用的 Muse 文章仍未标价。",
    },
    {
      when: "2026 年 10 月 6 日",
      what: "Hark 推出 Hark Pro：一个托管的网页版、iOS 和 Android 应用，免费，另有每月 20 美元和 100 美元的用量档位。",
    },
    {
      when: "2026 年 10 月 7 日",
      what: "本汇总的第一版。OpenClaw 和 Hermes Agent 是持续演进的开展源项目，其文档没有单一发布日，因此不锁定某一天。",
    },
    { when: "2026 年 10 月 21 日", what: "Anthropic 在美国面向 Pro 和 Max 以研究预览形式发布 Claude Duet。" },
  ],
  howtoHeading: "如何选择",
  howto: [
    "当智能体应运行在你掌控的硬件上、模型密钥由你提供、日常界面应保持为聊天时，选择 Doitx。这就是没有托管服务的 Grok Bot 形态。代价在安装：Docker 或桌面应用，然后创建账号并连接模型。之后，例行任务、记忆和审批都留在聊天里。",
    "当你已在为 Cursor 或 SuperGrok 付费、希望由 xAI 托管算力时，选择 Grok Bot。当你想要 Meta 在 Muse 应用或 WhatsApp 中的智能体、运行在 Meta 的虚拟机上时，选择 Meta Muse。当智能体应落在符合条件的 ChatGPT 套餐上、并遵循 OpenAI 关于它能独自做什么的规则时，选择 OpenAI Dots。当你想要一个可以发短信或打电话的托管助手时，选择 Instinct。当你已在为 Claude Pro 或 Max 付费、身在美国、并希望 Anthropic 在它运行的算力上照看你的收件箱和日历时，选择 Claude Duet。当你想要一个带免费档位、由 Hark 操作云端算力的托管对话时，选择 Hark Pro。",
    "当助手应住进你已在使用的聊天应用、且你愿意运行网关和配置文件时，选择 OpenClaw。当你想要 MIT 协议的软件和一个无需命令行就能发出第一条消息的桌面应用时，选择 Hermes Agent。Hermes 上的消息应用仍需单独的网关。Doitx 不会导入 Grok Bot 账号、Muse 虚拟机、dot、Instinct 线程、Claude Duet 线程或 Hark 保险库。OpenClaw 记录了从 Hermes 迁移配置、记忆、技能，以及（若你接受）凭据的方法。依赖某个价格、国家或连接器之前，请先阅读链接页面。",
  ],
  faqHeading: "常见问题",
  faq: [
    {
      question: "其中哪些可以自托管？",
      answer:
        "Doitx、OpenClaw 和 Hermes Agent。Doitx 发布 Docker 镜像和源码检出。OpenClaw 的指南让你运行 Gateway。Hermes 安装在你自己的机器上，桌面应用可以启动自己的本地后端。Grok Bot、Muse、Dots、Instinct、Claude Duet 和 Hark Pro 是托管产品，其页面没有描述由你自己安装该服务。Doitx 还提供托管的 beta——Doitx Cloud。",
    },
    {
      question: "哪些允许自带模型？",
      answer:
        "Doitx、OpenClaw 和 Hermes Agent，包括本地或兼容服务器。Grok Bot 的文档没有描述自带提供商。Muse 的发布帖点名 Muse Spark。Dots 使用 GPT-6 Astra。Instinct 的隐私政策和条款没有点名公开模型。Claude Duet 使用 Claude Opus 5.5，你无法选择模型。Hark 称它训练自己的模型并优先使用它们。",
    },
    {
      question: "Doitx 也像 Grok Bot 一样只是聊天吗？",
      answer:
        "运行起来之后是的。你用 Docker 或桌面应用安装、创建账号并连接模型。新机器人会先和你聊，你在那个聊天里管理它。Grok Bot 也是管理具名机器人的聊天。OpenClaw 多出命令行安装和 Gateway。Hermes 桌面版无需命令行就能发出第一条消息，消息应用则使用单独的网关。Claude Duet、Hark Pro、Muse、Dots 和 Instinct 同样是对话，只是运行在你不托管的服务上。",
    },
    {
      question: "这是一个排名吗？",
      answer:
        "不是。标题列出的是 2026 年人们会比较的智能体。表格和卡片采用各项目的公开描述，并不衡量质量、速度或任务成功率。当某个价格单元格写着引用页面未标价时，那就是结论。依赖某个细节前，请核对链接来源。",
    },
    {
      question: "这些日期从哪来？",
      answer:
        "Muse 的发布帖是 2026 年 9 月 8 日，Connect 回顾是 2026 年 9 月 23 日。Dots 于 2026 年 9 月 29 日宣布。Hark 于 2026 年 8 月 5 日推出 Handoff，于 2026 年 10 月 6 日推出 Hark Pro。Anthropic 于 2026 年 10 月 21 日发布 Claude Duet。Instinct 的隐私政策和条款于 2026 年 8 月 26 日修订，那不是发布日。Grok Bot、OpenClaw 和 Hermes Agent 依据各自当前文档对比，没有单一发布日。",
    },
  ],
  getStarted: {
    heading: "启动 Doitx",
    body: "连接一个模型或使用内置网关，添加机器人可以触及的工具，并通过电子邮件邀请成员。",
    docs: "阅读文档",
    github: "在 GitHub 查看",
  },
};

const COPY: Partial<Record<Locale, AlternativesHubPageCopy>> = { en: EN, zh: ZH };

/** en + zh are translated; every other locale falls back to English. */
export function getAlternativesHubPageCopy(locale: Locale): AlternativesHubPageCopy {
  return COPY[locale] ?? EN;
}
