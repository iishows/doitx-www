// Full-page copy for the Grok Bot comparison page.
//
// Only English and Chinese are translated; other locales fall back to English. Text uses the
// lightweight markup understood by `Prose`: [label](href), `code`, **bold**.
import type { Locale } from "./locales";

export type GrokFigureCopy = { alt: string; caption: string };

export type GrokOtherCard = {
  href: string;
  label: string;
  /** Markdown links allowed. */
  note: string;
  image?: { file: string; alt: string };
};

export type GrokPageCopy = {
  title: string;
  description: string;
  h1: string;
  updated: string;
  intro: readonly string[];
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
  compare: {
    heading: string;
    topic: string;
    caption: string;
    note: string;
    rows: readonly { aspect: string; rakazo: string; grok: string }[];
  };
  selfHost: { heading: string; lead: string; after: readonly string[]; docs: string; github: string };
  sources: readonly { label: string; href: string }[];
  other: { heading: string; lead: string; cards: readonly GrokOtherCard[] };
  faq: { heading: string; items: readonly { question: string; answer: string }[] };
  figures: { chat: GrokFigureCopy; routine: GrokFigureCopy; models: GrokFigureCopy };
  vsRakazo: string;
  vsOther: string;
};

const EN: GrokPageCopy = {
  title: "Open Source Grok Bot Alternative (Self-Hosted) – Doitx",
  description:
    "Doitx is an open source, self-hosted Grok Bot alternative. Run persistent AI teammates on your machine, with your model keys, under the Apache-2.0 license.",
  h1: "Open source, self-hosted Grok Bot alternative",
  updated: "October 12, 2026",
  intro: [
    "Doitx is just chat. You create a bot and manage it from that conversation. Routines, memory, and approval boundaries stay with the bot.",
    "Grok Bot is xAI's hosted product for that kind of work: named bots, a computer they can use, routines, and approvals. Doitx is the version you can run yourself. The source is Apache-2.0, the server is yours, and you bring the model key.",
  ],
  sections: [
    {
      heading: "What Grok Bot is",
      paragraphs: [
        "Grok Bot is xAI's hosted product for persistent bots. The public docs describe named bots, a computer they can use, routines, and approvals. The computer in the default setup is a cloud computer on your account. Bots on that account share it, including files and logins. An optional local computer can run approved commands on the machine in front of you. That local computer is not the same thing as installing the Grok Bot service on a server you operate. The docs do not describe that install.",
        "The model comes with the plan. The Grok Bot docs do not describe connecting OpenAI, Anthropic, a custom server, or a local model. Training opt-out follows the Cursor account settings. Desktop apps exist for macOS, Windows, and Linux, plus iOS and Android.",
        "Price follows the plan, not a separate Grok Bot seat. The docs and pricing page used here say Grok Bot is included with paid individual Cursor plans, Cursor Teams, and SuperGrok subscriptions. SuperGrok is listed at $30 a month and includes Grok Bot access. Plans include weekly usage, and extra usage can be billed. The free plan on the pricing page does not list Grok Bot.",
        "Two other xAI releases are easy to mix up with the bot. Grok Build, the coding-agent CLI, is Apache-2.0. The older Grok-1 model weights were released under Apache-2.0. Neither of those is the Grok Bot service, and neither one is a self-hosted Grok Bot.",
      ],
    },
    {
      heading: "What Doitx keeps from that shape",
      paragraphs: [
        "Doitx is an open source AI agent for persistent teammates, and a self-hosted AI assistant. It is in beta. Each bot keeps conversations, memory, routines, and history. It can use a browser, a terminal, files, and a graphical desktop, and it can hand work to another bot or a short-lived subagent. The clients are the web app, the Electron desktop app, and the Expo mobile app.",
        "Like Grok Bot, Doitx is just chat once it is running. You set up the bot and manage it from that chat. A new bot interviews you about the work. Routines are readable Markdown and can run on a schedule. A bot can pause for approval when a task crosses a boundary you set, and actions are recorded in an audit log. Optional connectors can attach Slack, WhatsApp, Telegram, iMessage via Sendblue, and Feishu/Lark. They are not required.",
        "The parts that are not Grok Bot are the ones you operate. The license is Apache-2.0. You self-host with published Docker images or from source. Hosted Doitx Cloud is in beta. Connect the Doitx router or a local OpenAI-compatible endpoint the operator runs, with your own key. Doitx does not pay the model bill. Each bot can use a different model. Connector credentials are encrypted on your server and are not returned by the API.",
        "Computers are separate from the chat product. Local Docker is the default. E2B, Daytona, CreateOS, and Boat are optional remote computers. An explicit desktop provider can run on the host, and it is not the default. Team computers are shared. Private computers are isolated. That split is the opposite of Grok Bot's shared cloud computer for every bot on the account.",
      ],
    },
    {
      heading: "Setup, then the chat",
      paragraphs: [
        "Published images need Docker Engine 26 or newer, the Compose plugin, curl, and OpenSSL. You do not need Node.js for that path. A source checkout needs a supported Node.js line and pnpm, plus Docker. The desktop app can install the published images on this computer, or connect to an instance you already run.",
        "On this computer, open the local web app, create an account, and connect a model. The first registered user becomes the deployment owner. Local Docker computers are on by default. From there the product is the chat. You do not keep a gateway process running, and you do not edit a config file to change the bot's routines.",
        "On a server, the installer can stop before startup so you can set the public HTTPS origin and create the owner account before anyone else can reach it. The self-hosting guide covers backups, upgrades, secrets, and restricted networks. Voice, if you want it, uses a key you bring for ElevenLabs, OpenAI, Cartesia, or Fish Audio.",
        "The [self-hosted AI agent](/self-hosted-ai-agent/) page is that install. [How to self-host an AI agent](/blog/self-host-an-ai-agent/) walks through the published images.",
      ],
    },
  ],
  compare: {
    heading: "How they compare",
    topic: "Topic",
    caption: "Doitx compared with Grok Bot",
    note: "The Grok Bot column follows xAI's public Grok Bot docs and pricing page.",
    rows: [
      {
        aspect: "Source",
        rakazo: "Apache-2.0. The application source is on GitHub.",
        grok: "The Grok Bot app does not publish source you can run. Grok Build and the Grok-1 weights are separate open-source releases.",
      },
      {
        aspect: "Self-hosting",
        rakazo: "Docker Compose images, or a source checkout, on a machine you control.",
        grok: "A cloud computer on your account. An optional local computer can run approved commands. The docs do not describe deploying the service yourself.",
      },
      {
        aspect: "Data and computers",
        rakazo:
          "You run the deployment. Team computers are shared; private computers are isolated. Connector credentials are encrypted on your server and are never returned by the API.",
        grok: "Requires cloud data storage. Bots on one account share one cloud computer, including files and logins. Training opt-out follows the Cursor account settings.",
      },
      {
        aspect: "Model",
        rakazo:
          "The Doitx router, or a local OpenAI-compatible server the operator runs. Each person connects their own key, and each bot can use a different model. Doitx does not pay the model bill.",
        grok: "Included with paid Cursor plans and SuperGrok subscriptions. The Grok Bot docs do not describe connecting your own model provider.",
      },
      {
        aspect: "Price",
        rakazo:
          "No license fee to self-host. You pay your model provider and the computer you run. Hosted Doitx Cloud is in beta.",
        grok: "Included with paid individual Cursor plans, Cursor Teams, and SuperGrok subscriptions. SuperGrok is listed at $30/month and includes Grok Bot access. Plans include weekly usage; extra usage can be billed. The free plan on the pricing page does not list Grok Bot.",
      },
      {
        aspect: "Apps",
        rakazo: "Web, Electron desktop, and Expo mobile.",
        grok: "Desktop apps for macOS, Windows, and Linux, plus iOS and Android.",
      },
    ],
  },
  selfHost: {
    heading: "Self-host Doitx",
    lead: "Published images need Docker Engine 26+ (API 1.45+ for bot home volume subpaths), the Compose plugin, curl, and OpenSSL.",
    after: [
      "On this computer, open http://127.0.0.1:5173, create an account, and connect a model. That address is only on the machine running Doitx. Local Docker computers are on by default.",
    ],
    docs: "Read the docs",
    github: "View on GitHub",
  },
  sources: [
    { label: "Grok Bot overview", href: "https://docs.x.ai/grok-bot/overview" },
    { label: "Grok Bot FAQ", href: "https://docs.x.ai/grok-bot/faq" },
    { label: "xAI pricing", href: "https://x.ai/pricing" },
    { label: "Grok Build source", href: "https://github.com/xai-org/grok-build" },
    { label: "Grok-1 weights", href: "https://github.com/xai-org/grok-1" },
    { label: "OpenMausBot", href: "https://www.openmausbot.com/" },
    { label: "OpenMausBot docs", href: "https://docs.openmausbot.com/docs" },
    { label: "OpenMausBot providers", href: "https://docs.openmausbot.com/docs/providers" },
    { label: "OpenMausBot source", href: "https://github.com/milind-soni/OpenMausBot" },
    { label: "OpenMuse", href: "https://www.copilotkit.ai/openmuse" },
    { label: "OpenMuse source", href: "https://github.com/CopilotKit/openmuse" },
  ],
  other: {
    heading: "Other alternatives",
    lead: "Hosted assistants and open source agents are both on the [alternatives roundup](/alternatives/). [OpenClaw vs Hermes Agent vs Doitx](/blog/openclaw-vs-hermes-vs-doitx/) compares the three you run yourself, and [best open source AI agents in 2026](/blog/best-open-source-ai-agents-2026/) includes libraries as well as apps.",
    cards: [
      {
        href: "/muse-alternative/",
        label: "Meta Muse",
        note: "Meta's hosted agent, introduced September 8, 2026, on a virtual machine Meta operates. You talk to it in the Muse app or WhatsApp.",
        image: { file: "muse", alt: "Meta Muse homepage" },
      },
      {
        href: "/dots-alternative/",
        label: "OpenAI Dots",
        note: "Always-on agents on eligible ChatGPT plans, announced September 29, 2026. OpenAI says each dot has its own cloud computer.",
        image: { file: "dots", alt: "OpenAI Dots" },
      },
      {
        href: "/instinct-alternative/",
        label: "Instinct",
        note: "The hosted assistant at instinct.com that you text or call. Spear Street Technology, Inc. operates it.",
        image: { file: "instinct", alt: "Instinct homepage" },
      },
      {
        href: "/claude-duet-alternative/",
        label: "Claude Duet",
        note: "Anthropic's proactive personal agent, released as a research preview on October 21, 2026. It runs on a cloud computer Anthropic operates and comes with Claude Pro and Max in the US.",
        image: { file: "claude-duet", alt: "Claude Duet" },
      },
      {
        href: "/hark-alternative/",
        label: "Hark Pro",
        note: "The hosted personal agent at hark.com, launched October 6, 2026, with a free tier. $20 a month is twice the usage, and $100 a month is ten times the usage.",
        image: { file: "hark", alt: "Hark Pro" },
      },
      {
        href: "/openclaw-alternative/",
        label: "OpenClaw",
        note: "An MIT-licensed agent you run yourself. The docs add a Gateway and a config file.",
        image: { file: "openclaw", alt: "OpenClaw homepage" },
      },
      {
        href: "/hermes-alternative/",
        label: "Hermes Agent",
        note: "Nous Research's MIT-licensed agent, with a desktop app and a separate messaging gateway.",
        image: { file: "hermes", alt: "Hermes Agent homepage" },
      },
      {
        href: "https://www.openmausbot.com/",
        label: "OpenMausBot",
        note: "An Apache-2.0 desktop app for macOS, Windows, and Ubuntu. Its [docs](https://docs.openmausbot.com/docs/providers) say bots can run a signed-in agent CLI, or Mistral from an API key with no CLI, and that application data stays on your machine.",
        image: { file: "openmausbot", alt: "OpenMausBot homepage" },
      },
      {
        href: "https://www.copilotkit.ai/openmuse",
        label: "OpenMuse",
        note: "CopilotKit's MIT-licensed personal agent, with a chat, a persistent browser, and an optional Linux terminal. The project site says those surfaces run in the alpha.",
        image: { file: "openmuse", alt: "OpenMuse homepage" },
      },
      {
        href: "/alternatives/",
        label: "All comparisons",
        note: "The 2026 roundup, with the license, price, and setup table.",
      },
    ],
  },
  faq: {
    heading: "FAQ",
    items: [
      {
        question: "How is Doitx different from Grok Bot?",
        answer:
          "Both are persistent bots that can use a computer, sign in to tools, keep context, and run routines. Grok Bot hosts that computer for you and comes with paid Cursor plans and SuperGrok subscriptions. Doitx is open source: you host it or use Doitx Cloud, in beta, you choose the model, and team computers and private computers stay separate.",
      },
      {
        question: "Is Doitx just chat, like Grok Bot?",
        answer:
          "After the install, yes. You create an account, connect a model, and manage the bot from that chat. A new bot interviews you. Routines, memory, and approval boundaries stay with the bot. Doitx is that chat plus the computer you run. Grok Bot is also a chat for named bots. The difference is who hosts the service and who picks the model.",
      },
      {
        question: "Can I use my Claude Pro/Max or ChatGPT Plus/Pro subscription?",
        answer:
          "No. A deployment offers two model providers: the Doitx router at router.doitx.ai, and a local OpenAI-compatible server the operator runs. Each person connects their own key for either one. Doitx does not pay the model bill.",
      },
      {
        question: "What are the other alternatives?",
        answer:
          "Meta Muse, OpenAI Dots, Instinct, Claude Duet, and Hark Pro are hosted assistants. OpenClaw and Hermes Agent are open source agents you can run yourself, with a gateway and a config file in their docs. OpenMausBot is an Apache-2.0 desktop app; its docs say bots can run a signed-in agent CLI, or Mistral from an API key with no CLI, and that application data stays on your machine. OpenMuse is CopilotKit's MIT-licensed personal agent, with a chat, a persistent browser, and an optional Linux terminal, and those surfaces run in the alpha. The comparisons page lists licenses, prices, and setup side by side. None of them imports a Grok Bot account.",
      },
    ],
  },
  figures: {
    chat: {
      alt: "Doitx chat with the Inbox bot. The sidebar lists Inbox, Chief, and Sales. The message asks the bot to file demo mail and not send anything.",
      caption: "The chat. The roster is the sidebar, and you manage the bot from this conversation.",
    },
    routine: {
      alt: "A routine editor for a weekday inbox check, with the instruction written as text and a weekday 8:00 AM schedule.",
      caption: "A routine is the instruction and the schedule.",
    },
    models: {
      alt: "Doitx model settings with the Doitx Router selected, a model from its list, and a field for a personal key. A second provider is the operator's local endpoint.",
      caption: "Connect the Doitx Router or a local endpoint with your own key.",
    },
  },
  vsRakazo: "Doitx",
  vsOther: "Grok Bot",
};

const ZH: GrokPageCopy = {
  title: "开源 Grok Bot 替代品（自托管）– Doitx",
  description:
    "Doitx 是一个开源、可自托管的 Grok Bot 替代品。在你自己的机器上运行持久型 AI 队友，使用你自己的模型密钥，采用 Apache-2.0 许可证。",
  h1: "开源、可自托管的 Grok Bot 替代品",
  updated: "2026 年 10 月 12 日",
  intro: [
    "Doitx 就是聊天。你创建一个机器人，然后在那个对话里管理它。例行任务、记忆和审批边界都跟着这个机器人。",
    "Grok Bot 是 xAI 面向这类工作的托管产品：具名机器人、它们可以使用的算力、例行任务和审批。Doitx 是你可以自己运行的版本。源码采用 Apache-2.0，服务器归你所有，模型密钥也由你提供。",
  ],
  sections: [
    {
      heading: "Grok Bot 是什么",
      paragraphs: [
        "Grok Bot 是 xAI 面向持久型机器人的托管产品。公开文档描述了具名机器人、它们可以使用的算力、例行任务和审批。默认设置中的算力是你账号下的云端算力。该账号下的机器人共用它，包括文件和登录状态。可选的本地算力可以在你面前的这台机器上执行经批准的命令。这个本地算力与在你运维的服务器上安装 Grok Bot 服务并不是一回事，文档并没有描述那种安装方式。",
        "模型随套餐提供。Grok Bot 文档没有描述如何连接 OpenAI、Anthropic、自建服务器或本地模型。训练数据的选择退出跟随 Cursor 账号设置。桌面应用支持 macOS、Windows 和 Linux，另有 iOS 和 Android。",
        "价格随套餐而定，而不是单独的 Grok Bot 席位。此处引用的文档和定价页称，Grok Bot 包含在付费的个人 Cursor 套餐、Cursor Teams 和 SuperGrok 订阅中。SuperGrok 标价为每月 30 美元，包含 Grok Bot 访问权限。套餐包含每周用量，超出部分可能计费。定价页上的免费套餐没有列出 Grok Bot。",
        "xAI 还有两个发布容易和这个机器人混淆。编码智能体命令行工具 Grok Build 采用 Apache-2.0。较早的 Grok-1 模型权重也以 Apache-2.0 发布。这两者都不是 Grok Bot 服务，也都不是自托管的 Grok Bot。",
      ],
    },
    {
      heading: "Doitx 保留了这个形态的哪些部分",
      paragraphs: [
        "Doitx 是一个面向持久型队友的开源 AI 智能体，也是一个自托管的 AI 助手，目前处于 beta 阶段。每个机器人保留对话、记忆、例行任务和历史。它能使用浏览器、终端、文件和图形桌面，也能把工作交给另一个机器人或短生命周期的子智能体。客户端包括网页版应用、Electron 桌面应用和 Expo 移动应用。",
        "和 Grok Bot 一样，一旦运行起来，Doitx 就是聊天。你设置好机器人，然后在那个聊天里管理它。新机器人会先和你聊聊这项工作。例行任务是可读的 Markdown，可以按排程运行。当任务触及你设定的边界时，机器人可以暂停等待批准，所有操作都会记入审计日志。可选连接器可以接入 Slack、WhatsApp、Telegram、通过 Sendblue 的 iMessage，以及飞书/Lark，但并非必需。",
        "与 Grok Bot 不同的部分由你来运维。许可证是 Apache-2.0。你用已发布的 Docker 镜像或源码自托管。托管的 Doitx Cloud 处于 beta 阶段。连接 Doitx 路由器或运维方运行的本地 OpenAI 兼容端点，使用你自己的密钥。Doitx 不支付模型账单。每个机器人可以使用不同的模型。连接器凭据在你的服务器上加密，且不会通过 API 返回。",
        "算力与聊天产品是分开的。默认是本地 Docker。E2B、Daytona、CreateOS 和 Boat 是可选的远程算力。也可以显式选择桌面算力在主机上运行，但它不是默认项。团队算力是共享的，私有算力是隔离的。这种划分与 Grok Bot 为账号下每个机器人共用一台云端算力正好相反。",
      ],
    },
    {
      heading: "先安装，再聊天",
      paragraphs: [
        "已发布的镜像需要 Docker Engine 26 或更高版本、Compose 插件、curl 和 OpenSSL，这条路径无需 Node.js。源码检出需要受支持的 Node.js 版本线和 pnpm，外加 Docker。桌面应用可以在本机安装已发布的镜像，也可以连接你已在运行的实例。",
        "在这台机器上打开本地网页版应用，创建账号并连接模型。第一个注册的用户成为部署所有者。本地 Docker 算力默认开启。之后产品就是聊天：你不需要一直运行网关进程，也不需要编辑配置文件来修改机器人的例行任务。",
        "在服务器上，安装程序可以在启动前停下，让你先设置公网 HTTPS 源并创建所有者账号，然后再让别人访问。自托管指南涵盖备份、升级、密钥和受限网络。语音功能（如果你需要）使用你自备的 ElevenLabs、OpenAI、Cartesia 或 Fish Audio 密钥。",
        "[自托管 AI 智能体](/self-hosted-ai-agent/)页面讲的就是这次安装。[如何自托管一个 AI 智能体](/blog/self-host-an-ai-agent/)则逐步演示已发布的镜像。",
      ],
    },
  ],
  compare: {
    heading: "两者对比",
    topic: "主题",
    caption: "Doitx 与 Grok Bot 对比",
    note: "Grok Bot 一列依据 xAI 公开的 Grok Bot 文档和定价页。",
    rows: [
      {
        aspect: "源码",
        rakazo: "Apache-2.0。应用源码在 GitHub 上。",
        grok: "Grok Bot 应用不公开可运行的源码。Grok Build 和 Grok-1 权重是另外的开源发布。",
      },
      {
        aspect: "自托管",
        rakazo: "在你掌控的机器上使用 Docker Compose 镜像，或源码检出。",
        grok: "你账号下的云端算力。可选本地算力可执行经批准的命令。文档没有描述由你自己部署该服务。",
      },
      {
        aspect: "数据与算力",
        rakazo: "部署由你运行。团队算力共享，私有算力隔离。连接器凭据在你的服务器上加密，且永不经 API 返回。",
        grok: "需要云端数据存储。同一账号下的机器人共用一台云端算力，包括文件和登录状态。训练数据的选择退出跟随 Cursor 账号设置。",
      },
      {
        aspect: "模型",
        rakazo:
          "Doitx 路由器，或运维方运行的本地 OpenAI 兼容服务器。每个人连接自己的密钥，每个机器人可以使用不同的模型。Doitx 不支付模型账单。",
        grok: "包含在付费 Cursor 套餐和 SuperGrok 订阅中。Grok Bot 文档没有描述如何连接你自己的模型提供商。",
      },
      {
        aspect: "价格",
        rakazo: "自托管不收许可费。你只需为模型提供商和你运行的算力付费。托管的 Doitx Cloud 处于 beta 阶段。",
        grok: "包含在付费的个人 Cursor 套餐、Cursor Teams 和 SuperGrok 订阅中。SuperGrok 标价为每月 30 美元，包含 Grok Bot 访问权限。套餐包含每周用量，超出部分可能计费。定价页上的免费套餐没有列出 Grok Bot。",
      },
      {
        aspect: "应用",
        rakazo: "网页版、Electron 桌面版和 Expo 移动版。",
        grok: "macOS、Windows 和 Linux 的桌面应用，另有 iOS 和 Android。",
      },
    ],
  },
  selfHost: {
    heading: "自托管 Doitx",
    lead: "已发布的镜像需要 Docker Engine 26 或更高版本（机器人主目录卷子路径需要 API 1.45 或更高）、Compose 插件、curl 和 OpenSSL。",
    after: [
      "在这台机器上打开 http://127.0.0.1:5173，创建账号并连接模型。该地址只在运行 Doitx 的机器上可用。本地 Docker 算力默认开启。",
    ],
    docs: "阅读文档",
    github: "在 GitHub 查看",
  },
  sources: [
    { label: "Grok Bot 概览", href: "https://docs.x.ai/grok-bot/overview" },
    { label: "Grok Bot 常见问题", href: "https://docs.x.ai/grok-bot/faq" },
    { label: "xAI 定价", href: "https://x.ai/pricing" },
    { label: "Grok Build 源码", href: "https://github.com/xai-org/grok-build" },
    { label: "Grok-1 权重", href: "https://github.com/xai-org/grok-1" },
    { label: "OpenMausBot", href: "https://www.openmausbot.com/" },
    { label: "OpenMausBot 文档", href: "https://docs.openmausbot.com/docs" },
    { label: "OpenMausBot 提供商", href: "https://docs.openmausbot.com/docs/providers" },
    { label: "OpenMausBot 源码", href: "https://github.com/milind-soni/OpenMausBot" },
    { label: "OpenMuse", href: "https://www.copilotkit.ai/openmuse" },
    { label: "OpenMuse 源码", href: "https://github.com/CopilotKit/openmuse" },
  ],
  other: {
    heading: "其他替代品",
    lead: "托管助手和开源智能体都收录在[替代品汇总](/alternatives/)中。[OpenClaw vs Hermes Agent vs Doitx](/blog/openclaw-vs-hermes-vs-doitx/)对比了你自己运行的三个方案，[2026 年最佳开源 AI 智能体](/blog/best-open-source-ai-agents-2026/)则同时涵盖库和应用。",
    cards: [
      {
        href: "/muse-alternative/",
        label: "Meta Muse",
        note: "Meta 的托管智能体，2026 年 9 月 8 日公布，运行在 Meta 操作的虚拟机上。你可以在 Muse 应用或 WhatsApp 中与它交谈。",
        image: { file: "muse", alt: "Meta Muse 首页" },
      },
      {
        href: "/dots-alternative/",
        label: "OpenAI Dots",
        note: "面向符合条件的 ChatGPT 套餐的常驻智能体，2026 年 9 月 29 日宣布。OpenAI 称每个 Dots 都有自己的云端算力。",
        image: { file: "dots", alt: "OpenAI Dots" },
      },
      {
        href: "/instinct-alternative/",
        label: "Instinct",
        note: "instinct.com 上的托管助手，你可以发短信或打电话给它。由 Spear Street Technology, Inc. 运营。",
        image: { file: "instinct", alt: "Instinct 首页" },
      },
      {
        href: "/claude-duet-alternative/",
        label: "Claude Duet",
        note: "Anthropic 的主动式个人智能体，2026 年 10 月 21 日作为研究预览发布。它运行在 Anthropic 操作的云端算力上，在美国随 Claude Pro 和 Max 提供。",
        image: { file: "claude-duet", alt: "Claude Duet" },
      },
      {
        href: "/hark-alternative/",
        label: "Hark Pro",
        note: "hark.com 上的托管个人智能体，2026 年 10 月 6 日上线，提供免费档位。每月 20 美元是两倍用量，每月 100 美元是十倍用量。",
        image: { file: "hark", alt: "Hark Pro" },
      },
      {
        href: "/openclaw-alternative/",
        label: "OpenClaw",
        note: "一个 MIT 协议的智能体，由你自己运行。文档还涉及一个 Gateway 和一份配置文件。",
        image: { file: "openclaw", alt: "OpenClaw 首页" },
      },
      {
        href: "/hermes-alternative/",
        label: "Hermes Agent",
        note: "Nous Research 的 MIT 协议智能体，带桌面应用和独立的通讯网关。",
        image: { file: "hermes", alt: "Hermes Agent 首页" },
      },
      {
        href: "https://www.openmausbot.com/",
        label: "OpenMausBot",
        note: "面向 macOS、Windows 和 Ubuntu 的 Apache-2.0 桌面应用。其[文档](https://docs.openmausbot.com/docs/providers)称机器人可以运行已登录的智能体命令行工具，或仅凭 API 密钥使用 Mistral 而无需命令行，应用数据留在你的机器上。",
        image: { file: "openmausbot", alt: "OpenMausBot 首页" },
      },
      {
        href: "https://www.copilotkit.ai/openmuse",
        label: "OpenMuse",
        note: "CopilotKit 的 MIT 协议个人智能体，带聊天、持久浏览器和可选的 Linux 终端。项目站点称这些界面在 alpha 阶段运行。",
        image: { file: "openmuse", alt: "OpenMuse 首页" },
      },
      {
        href: "/alternatives/",
        label: "全部对比",
        note: "2026 年汇总，附带许可证、价格和安装对比表。",
      },
    ],
  },
  faq: {
    heading: "常见问题",
    items: [
      {
        question: "Doitx 和 Grok Bot 有什么不同？",
        answer:
          "两者都是持久型机器人，能使用算力、登录工具、保留上下文并运行例行任务。Grok Bot 替你托管那台算力，随付费 Cursor 套餐和 SuperGrok 订阅提供。Doitx 是开源的：你可以自托管或使用处于 beta 的 Doitx Cloud，模型由你选择，团队算力和私有算力相互隔离。",
      },
      {
        question: "Doitx 也像 Grok Bot 一样只是聊天吗？",
        answer:
          "安装完成之后是的。你创建账号、连接模型，然后在那个聊天里管理机器人。新机器人会先和你聊。例行任务、记忆和审批边界都跟着机器人。Doitx 是这个聊天加上你自己运行的算力。Grok Bot 同样是一个管理具名机器人的聊天，差别在于谁托管服务、谁选择模型。",
      },
      {
        question: "我能用我的 Claude Pro/Max 或 ChatGPT Plus/Pro 订阅吗？",
        answer:
          "不能。一个部署提供两种模型来源：router.doitx.ai 上的 Doitx 路由器，以及运维方运行的本地 OpenAI 兼容服务器。每个人为其中之一连接自己的密钥。Doitx 不支付模型账单。",
      },
      {
        question: "还有哪些替代品？",
        answer:
          "Meta Muse、OpenAI Dots、Instinct、Claude Duet 和 Hark Pro 是托管助手。OpenClaw 和 Hermes Agent 是你可以自己运行的开源智能体，文档里涉及网关和配置文件。OpenMausBot 是一个 Apache-2.0 桌面应用；其文档称机器人可以运行已登录的智能体命令行工具，或仅凭 API 密钥使用 Mistral 而无需命令行，应用数据留在你的机器上。OpenMuse 是 CopilotKit 的 MIT 协议个人智能体，带聊天、持久浏览器和可选的 Linux 终端，这些界面在 alpha 阶段运行。对比页并排列出许可证、价格和安装方式。它们都不会导入 Grok Bot 账号。",
      },
    ],
  },
  figures: {
    chat: {
      alt: "Doitx 与 Inbox 机器人的聊天。侧边栏列出 Inbox、Chief 和 Sales。消息要求机器人归档示例邮件且不发送任何内容。",
      caption: "聊天界面。名单在侧边栏，你在这个对话里管理机器人。",
    },
    routine: {
      alt: "用于工作日收件箱检查的例行任务编辑器，指令以文本书写，排程为工作日早上 8:00。",
      caption: "例行任务就是指令加排程。",
    },
    models: {
      alt: "Doitx 模型设置，选中 Doitx 路由器，从其列表中选择一个模型，并有个人密钥输入框。第二个提供商是运维方的本地端点。",
      caption: "连接 Doitx 路由器，或用你自己的密钥连接本地端点。",
    },
  },
  vsRakazo: "Doitx",
  vsOther: "Grok Bot",
};

const COPY: Partial<Record<Locale, GrokPageCopy>> = { en: EN, zh: ZH };

/** en + zh are translated; every other locale falls back to English. */
export function getGrokPageCopy(locale: Locale): GrokPageCopy {
  return COPY[locale] ?? EN;
}
