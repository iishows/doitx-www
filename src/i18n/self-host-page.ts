// Full-page copy for the self-hosted guide.
//
// Only English and Chinese are translated. Every other locale falls back to English, per the
// product decision to ship en + zh first. Text uses lightweight markup understood by the
// `Prose` component: [label](href) for links, `code` for inline code, **bold** for emphasis.
import type { Locale } from "./locales";

export type SelfHostPageCopy = {
  title: string;
  description: string;
  h1: string;
  intro: readonly string[];
  gives: {
    heading: string;
    dataOwnership: { title: string; body: string };
    modelChoice: { title: string; body: string };
    costControl: { title: string; body: string };
  };
  only: {
    heading: string;
    intro: string;
    items: readonly string[];
    trail: string;
  };
  requirements: {
    heading: string;
    images: string;
    source: string;
  };
  install: {
    heading: string;
    intro: string;
    afterInstall: string;
    open: string;
  };
  server: {
    heading: string;
    body: string;
    envBody: string;
    caddyBody: string;
    blocked: string;
  };
  source: {
    heading: string;
    intro: string;
    secretsBody: string;
    loopbackBody: string;
    composeBody: string;
  };
  clients: {
    heading: string;
    existing: string;
    mac: string;
    mobile: string;
  };
  reference: {
    heading: string;
    guide: string;
    secrets: string;
    restricted: string;
    prompt: string;
    source: string;
  };
  related: {
    heading: string;
    home: string;
    openclaw: string;
  };
  getStarted: {
    heading: string;
    body: string;
    cloud: string;
    github: string;
  };
  figureCreateBot: { alt: string; caption: string };
  figureModel: { alt: string; caption: string };
  figureRoutine: { alt: string; caption: string };
  figureApproval: { alt: string; caption: string };
  setupPromptNote: string;
  faqs: readonly { question: string; answer: string }[];
};

const EN: SelfHostPageCopy = {
  title: "Self-Hosted AI Agent (Open Source) – Doitx",
  description:
    "Run Doitx yourself: an open source AI agent with your data, your model, and your costs. Requirements and the setup steps for Docker or a source checkout.",
  h1: "Self-hosted AI agent",
  intro: [
    "Doitx is an open source AI agent for persistent teammates. Each bot can use a browser and a shell, keep routines as Markdown, and pause for approval when work crosses a boundary you set. Self-hosting means that stack runs on a machine you control.",
    "The software is [Apache-2.0](https://github.com/iishows/doitx/blob/main/LICENSE). Hosted Doitx Cloud is in beta. This page is the setup you need to run it. The [full self-hosting guide](https://github.com/iishows/doitx/blob/main/docs/self-hosted-ai-agent.md) on GitHub covers backups, upgrades, secrets, restricted networks, and production Compose.",
  ],
  gives: {
    heading: "What self-hosting gives you",
    dataOwnership: {
      title: "Data ownership",
      body: "Postgres, bot files, browser profiles, and the audit log stay on the deployment you run. Content you send to a model provider is processed by that provider under its terms. You choose the provider and the keys.",
    },
    modelChoice: {
      title: "Model choice",
      body: "Connect the Doitx router, or a local OpenAI-compatible server the operator runs. Each person brings their own key, and each bot can use a different model.",
    },
    costControl: {
      title: "Cost control",
      body: "There is no seat fee for the open source software. You pay the model provider you connect and any remote computer provider you choose. Local Docker computers are the default, so a single machine does not need an E2B, Daytona, CreateOS, or Boat account.",
    },
  },
  only: {
    heading: "Self-host only, for now",
    intro: "These work on your own deployment and are not yet on Doitx Cloud. Each turns on from `.env`.",
    items: [
      "**Telegram, WhatsApp, iMessage and SMS, Feishu and Lark.** Add the platform's credentials: `TELEGRAM_BOT_TOKEN`, `WHATSAPP_*`, `SENDBLUE_*` (iMessage and SMS), or `LARK_*`.",
      "**Image and video generation.** `MEDIA_GENERATION_PROVIDER=fal`, `MEDIA_GENERATION_API_KEY`, and an image or video model (`MEDIA_GENERATION_IMAGE_MODEL`, `MEDIA_GENERATION_VIDEO_MODEL`).",
      "**Purchases with Stripe Link.** `PAYMENT_WALLET_PROVIDER=link`. Each purchase waits for your approval in Link.",
      "**Cursor cloud agents.** `CLOUD_AGENT_PROVIDER=cursor`, `CURSOR_API_KEY`, and `CLOUD_AGENT_SPACE_ID`.",
      "**Ticket board.** `TICKET_BOARD_ENABLED=true`.",
      "**Local models and local MCP servers.** `RAKAZO_LOCAL_MODELS`, and `MCP_STDIO_ENABLED` with `MCP_STDIO_ALLOWED_COMMANDS`.",
    ],
    trail: "The [full guide](https://github.com/iishows/doitx/blob/main/docs/self-hosted-ai-agent.md) lists every setting for each one.",
  },
  requirements: {
    heading: "Requirements",
    images:
      "**Published images.** Docker Engine 26 or newer (API 1.45 or newer, for bot home volume subpaths), the Compose plugin, curl, and OpenSSL. No Node.js install.",
    source:
      "**Source checkout.** Node.js 22.22.2 or newer on the 22.x line, Node.js 24.x, or Node.js 26 or newer, plus pnpm 9 and Docker. Node.js 23.x and 25.x are not supported.",
  },
  install: {
    heading: "Install with published images",
    intro: "From an empty directory on the machine that should run Doitx:",
    afterInstall:
      "The installer downloads the Compose file and `.env.images.example`, creates `.env` with random secrets, and starts Doitx. It keeps an existing `.env` when you run it again. The default image tag is `edge` (builds from the main branch, `linux/amd64` and `linux/arm64`).",
    open: "Open [http://127.0.0.1:5173](http://127.0.0.1:5173) and create an account. The first registered user becomes the deployment owner. Connect a model in the app, or set `RAKAZO_DOITX_API_KEY` before startup. Local Docker computers are on by default.",
  },
  server: {
    heading: "Run it on a server",
    body: "Use the same installer on a VPS when bots should stay running. Images Compose binds the web app to loopback `127.0.0.1:5173`. Terminate TLS on the host and proxy there. Do not publish port 3100. The web server proxies `/api`.",
    envBody:
      "Before the second command, set `RAKAZO_HOST` to the hostname and set `BETTER_AUTH_URL`, `WEB_ORIGIN`, and `API_URL` to that same `https://` origin. For a remote computer instead of local Docker, set `SANDBOX_PROVIDER` to `e2b`, `daytona`, `createos`, or `boat` and add that provider's API key.",
    caddyBody:
      "Replace `app.example.com` with your host. Desktop clients should use **Existing instance** with the `https://` address. The [public single-VM section](https://github.com/iishows/doitx/blob/main/docs/self-hosted-ai-agent.md#public-single-vm-deployment) covers production Compose, host hardening, signup allowlists, and SMTP.",
    blocked:
      "If downloads are blocked, use the [restricted-network guide](https://github.com/iishows/doitx/blob/main/docs/restricted-networks.md). Secret names and recovery are in the [secrets checklist](https://github.com/iishows/doitx/blob/main/docs/secrets.md).",
  },
  source: {
    heading: "Install from source",
    intro: "Use this path to develop Doitx. The published images above are enough to run it.",
    secretsBody:
      "Set `POSTGRES_PASSWORD` and `POSTGRES_APP_PASSWORD` to two URI-safe random values (for example `openssl rand -hex 16`) and put them in `DATABASE_MIGRATION_URL` and `DATABASE_URL`. Set `BETTER_AUTH_SECRET`, `ENCRYPTION_KEY`, and `SCREEN_PROXY_SECRET` to independent long random values. Docker sandboxes also need a dedicated `SANDBOX_SUPERVISOR_TOKEN`. Keep these in `.env`, not in git.",
    loopbackBody:
      "For host-side development with Docker Desktop, set `SANDBOX_CONTROL_VIA_LOOPBACK=true` in `.env`. The supervisor then publishes its control service on a loopback port, because Docker Desktop container addresses are not reachable from the host. Leave this unset when the supervisor runs inside Compose.",
    composeBody:
      "The Postgres overlay publishes loopback `127.0.0.1:5433` for host-side tools. Open [http://127.0.0.1:5173](http://127.0.0.1:5173). `docker compose down -v` deletes Postgres data.",
  },
  clients: {
    heading: "Desktop and mobile",
    existing:
      "With a server already running, the Electron app's **Existing instance** option takes its `https://` address. HTTP is accepted only for loopback and private LAN addresses. **This computer** installs the published images with Docker Compose on that machine.",
    mac: "Run on your Mac with the desktop app. This computer installs Doitx on that Mac. A Mac Mini can stay on as the always-on box.",
    mobile:
      "In the mobile app, tap **Use a custom server** on the sign-in screen and enter the same HTTPS origin as `WEB_ORIGIN`.",
  },
  reference: {
    heading: "Full reference",
    guide: "Self-hosting guide",
    secrets: "Secrets checklist",
    restricted: "Restricted networks",
    prompt: "Setup prompt",
    source: "Source",
  },
  related: {
    heading: "Related",
    home: "Doitx home",
    openclaw: "OpenClaw comparison",
  },
  getStarted: {
    heading: "Get started",
    body: "Self-host with the steps above, or start on Doitx Cloud.",
    cloud: "Doitx Cloud",
    github: "View on GitHub",
  },
  figureCreateBot: {
    alt: "The new bot form in Doitx, filled with a demo bot named Inbox.",
    caption: "Creating a bot in the Doitx app. The name, title, and description here are demo data.",
  },
  figureModel: {
    alt: "Bot settings with the model menu open on a demo Inbox bot.",
    caption:
      "Each bot can use a different model. This menu lists models for the credentials connected on that deployment.",
  },
  figureRoutine: {
    alt: "A routine editor for a weekday inbox check, with the instruction written as text.",
    caption: "A routine is readable text with a schedule. You can edit it in the app.",
  },
  figureApproval: {
    alt: "An approval card asking whether a demo bot may send an email, with allow once, always allow, and deny.",
    caption:
      "When work crosses a boundary you set, the bot stops on an approval card. The action is also written to the audit log.",
  },
  setupPromptNote: "For an agent-assisted install, use the [setup prompt](https://github.com/iishows/doitx/blob/main/SETUP_PROMPT.md).",
  faqs: [
    {
      question: "What do I need to self-host Doitx?",
      answer:
        "Published images need Docker Engine 26 or newer, the Compose plugin, curl, and OpenSSL. You do not need Node.js for that path. A source checkout needs Node.js 22.22.2 or newer on the 22.x line, Node.js 24.x, or Node.js 26 or newer, plus pnpm 9 and Docker. Node.js 23.x and 25.x are not supported.",
    },
    {
      question: "Where does my data live?",
      answer:
        "Postgres, bot files, browser profiles, and the audit log stay on the deployment you run. Content you send to a model provider is processed by that provider under its terms. You choose the provider and the keys.",
    },
    {
      question: "How do model choice and cost work?",
      answer:
        "Each person connects their own key for one of the deployment's two model providers: the Doitx router or a local endpoint the operator runs. You can pick a different model per bot. The open source software has no seat fee. You pay the model and computer providers you use. Local Docker computers are the default and do not need a hosted sandbox account.",
    },
    {
      question: "Is hosted Doitx available?",
      answer: "Yes. Doitx Cloud is in beta at app.doitx.ai. Self-hosting is available too.",
    },
    {
      question: "How does this compare with OpenClaw?",
      answer:
        "Both are open source and run on hardware you control. After a Docker or desktop install, Doitx is a chat for persistent teammates. OpenClaw's getting-started guide adds a wizard, a Gateway you run in the terminal or install as a background service, and a separate step to connect a chat app.",
    },
  ],
};

const ZH: SelfHostPageCopy = {
  title: "自托管 AI 智能体（开源）– Doitx",
  description:
    "自行运行 Doitx：使用你的数据、你的模型、你的成本——一个开源 AI 智能体。了解 Docker 或源码部署的要求与设置步骤。",
  h1: "自托管 AI 智能体",
  intro: [
    "Doitx 是一个面向持久型队友的开源 AI 智能体。每个机器人都能使用浏览器和终端、把例行任务保存为 Markdown，并在工作触及你设定的边界时暂停等待批准。自托管意味着这套系统运行在你自己的机器上。",
    "软件以 [Apache-2.0](https://github.com/iishows/doitx/blob/main/LICENSE) 许可证发布。托管的 Doitx Cloud 处于 beta 阶段。这一页是运行它所需的设置步骤。GitHub 上的[完整自托管指南](https://github.com/iishows/doitx/blob/main/docs/self-hosted-ai-agent.md)还涵盖备份、升级、密钥、受限网络和生产环境 Compose。",
  ],
  gives: {
    heading: "自托管给你带来什么",
    dataOwnership: {
      title: "数据归属",
      body: "Postgres、机器人文件、浏览器配置和审计日志都留在你自己运行的部署上。你发送给模型提供商的内容由该提供商按其条款处理。提供商和密钥都由你选择。",
    },
    modelChoice: {
      title: "模型选择",
      body: "连接 Doitx 路由器，或运维方自建的 OpenAI 兼容服务器。每个人使用自己的密钥，每个机器人可以使用不同的模型。",
    },
    costControl: {
      title: "成本控制",
      body: "开源软件本身不收席位费。你只需为连接的模型提供商和你选择的远程算力提供商付费。默认使用本地 Docker 算力，因此单台机器不需要 E2B、Daytona、CreateOS 或 Boat 账号。",
    },
  },
  only: {
    heading: "目前仅限自托管",
    intro: "以下功能可在你自己的部署中启用，Doitx Cloud 尚未提供。每项都在 `.env` 中开启。",
    items: [
      "**Telegram、WhatsApp、iMessage 与短信、飞书与 Lark。** 填入对应平台的凭据：`TELEGRAM_BOT_TOKEN`、`WHATSAPP_*`、`SENDBLUE_*`（iMessage 与短信）或 `LARK_*`。",
      "**图像与视频生成。** `MEDIA_GENERATION_PROVIDER=fal`、`MEDIA_GENERATION_API_KEY`，以及图像或视频模型（`MEDIA_GENERATION_IMAGE_MODEL`、`MEDIA_GENERATION_VIDEO_MODEL`）。",
      "**使用 Stripe Link 付款。** `PAYMENT_WALLET_PROVIDER=link`。每笔付款都会在 Link 中等待你批准。",
      "**Cursor 云端智能体。** `CLOUD_AGENT_PROVIDER=cursor`、`CURSOR_API_KEY` 和 `CLOUD_AGENT_SPACE_ID`。",
      "**工单看板。** `TICKET_BOARD_ENABLED=true`。",
      "**本地模型与本地 MCP 服务器。** `RAKAZO_LOCAL_MODELS`，以及 `MCP_STDIO_ENABLED` 配合 `MCP_STDIO_ALLOWED_COMMANDS`。",
    ],
    trail: "[完整指南](https://github.com/iishows/doitx/blob/main/docs/self-hosted-ai-agent.md)列出了每一项的全部设置。",
  },
  requirements: {
    heading: "环境要求",
    images:
      "**使用已发布的镜像。** 需要 Docker Engine 26 或更高版本（API 1.45 或更高，用于机器人主目录卷子路径）、Compose 插件、curl 和 OpenSSL。无需安装 Node.js。",
    source:
      "**源码检出。** 需要 Node.js 22.x 系列的 22.22.2 或更高版本、Node.js 24.x，或 Node.js 26 及更高版本，加上 pnpm 9 和 Docker。不支持 Node.js 23.x 和 25.x。",
  },
  install: {
    heading: "用已发布的镜像安装",
    intro: "在应运行 Doitx 的机器上，从一个空目录开始：",
    afterInstall:
      "安装程序会下载 Compose 文件和 `.env.images.example`，生成带随机密钥的 `.env`，并启动 Doitx。再次运行时它会保留已有的 `.env`。默认镜像标签是 `edge`（从主分支构建，支持 `linux/amd64` 与 `linux/arm64`）。",
    open: "打开 [http://127.0.0.1:5173](http://127.0.0.1:5173) 并创建账号。第一个注册的用户成为部署所有者。在应用里连接模型，或在启动前设置 `RAKAZO_DOITX_API_KEY`。本地 Docker 算力默认开启。",
  },
  server: {
    heading: "在服务器上运行",
    body: "当机器人需要持续运行时，在 VPS 上使用同一个安装程序。镜像版 Compose 会把 Web 应用绑定到回环地址 `127.0.0.1:5173`。在主机上终止 TLS 并代理到该地址。不要对外发布 3100 端口。Web 服务器会代理 `/api`。",
    envBody:
      "在执行第二条命令前，把 `RAKAZO_HOST` 设为域名，并把 `BETTER_AUTH_URL`、`WEB_ORIGIN` 和 `API_URL` 设为同一个 `https://` 源。若要使用远程算力而非本地 Docker，把 `SANDBOX_PROVIDER` 设为 `e2b`、`daytona`、`createos` 或 `boat`，并填入该提供商的 API 密钥。",
    caddyBody:
      "把 `app.example.com` 换成你的域名。桌面客户端应使用 **现有实例** 选项并填入 `https://` 地址。[公网单机部署章节](https://github.com/iishows/doitx/blob/main/docs/self-hosted-ai-agent.md#public-single-vm-deployment)涵盖生产 Compose、主机加固、注册白名单和 SMTP。",
    blocked:
      "如果下载被阻断，请使用[受限网络指南](https://github.com/iishows/doitx/blob/main/docs/restricted-networks.md)。密钥名称与恢复方式见[密钥清单](https://github.com/iishows/doitx/blob/main/docs/secrets.md)。",
  },
  source: {
    heading: "从源码安装",
    intro: "这条路径用于开发 Doitx。仅运行的话，上面的已发布镜像就够了。",
    secretsBody:
      "把 `POSTGRES_PASSWORD` 和 `POSTGRES_APP_PASSWORD` 设为两个 URI 安全的随机值（例如 `openssl rand -hex 16`），并填入 `DATABASE_MIGRATION_URL` 和 `DATABASE_URL`。把 `BETTER_AUTH_SECRET`、`ENCRYPTION_KEY` 和 `SCREEN_PROXY_SECRET` 设为互不相同的长随机值。Docker 沙箱还需要专属的 `SANDBOX_SUPERVISOR_TOKEN`。这些值放在 `.env` 里，不要提交到 git。",
    loopbackBody:
      "使用 Docker Desktop 做主机侧开发时，在 `.env` 中设置 `SANDBOX_CONTROL_VIA_LOOPBACK=true`。这样 supervisor 会在回环端口上发布其控制服务，因为主机无法访问 Docker Desktop 的容器地址。当 supervisor 运行在 Compose 内时，不要设置它。",
    composeBody:
      "Postgres overlay 会为宿主机工具发布回环地址 `127.0.0.1:5433`。打开 [http://127.0.0.1:5173](http://127.0.0.1:5173)。`docker compose down -v` 会删除 Postgres 数据。",
  },
  clients: {
    heading: "桌面端与移动端",
    existing:
      "服务器已在运行时，Electron 应用的 **现有实例** 选项接收它的 `https://` 地址。HTTP 只对回环地址和私有局域网地址放行。**本机** 选项会用 Docker Compose 在该机器上安装已发布的镜像。",
    mac: "在 Mac 上用桌面应用运行。本机会把 Doitx 安装到那台 Mac 上。一台 Mac Mini 可以常开作为常驻主机。",
    mobile: "在移动应用中，于登录界面点击 **使用自定义服务器**，填入与 `WEB_ORIGIN` 相同的 HTTPS 源。",
  },
  reference: {
    heading: "完整参考",
    guide: "GitHub 上的自托管指南",
    secrets: "密钥清单",
    restricted: "受限网络",
    prompt: "安装提示词",
    source: "源码",
  },
  related: {
    heading: "相关内容",
    home: "Doitx 首页",
    openclaw: "OpenClaw 对比",
  },
  getStarted: {
    heading: "开始使用",
    body: "按上面的步骤自托管，或从 Doitx Cloud 开始。",
    cloud: "Doitx Cloud",
    github: "在 GitHub 查看",
  },
  figureCreateBot: {
    alt: "Doitx 中新建机器人的表单，填入了一个名为 Inbox 的示例机器人。",
    caption: "在 Doitx 应用中创建机器人。这里的名称、标题和描述都是示例数据。",
  },
  figureModel: {
    alt: "机器人设置中展开的模型菜单，作用于示例 Inbox 机器人。",
    caption: "每个机器人可以使用不同的模型。此菜单列出该部署已连接凭据可用的模型。",
  },
  figureRoutine: {
    alt: "用于工作日收件箱检查的例行任务编辑器，指令以文本形式书写。",
    caption: "例行任务就是带排程的可读文本，你可以在应用里编辑它。",
  },
  figureApproval: {
    alt: "一张审批卡片，询问示例机器人是否可以发送邮件，选项为允许一次、始终允许和拒绝。",
    caption: "当工作触及你设定的边界时，机器人会停在审批卡片上。该操作也会写入审计日志。",
  },
  setupPromptNote: "如需由智能体辅助安装，请使用[安装提示词](https://github.com/iishows/doitx/blob/main/SETUP_PROMPT.md)。",
  faqs: [
    {
      question: "自托管 Doitx 需要什么？",
      answer:
        "使用已发布的镜像需要 Docker Engine 26 或更高版本、Compose 插件、curl 和 OpenSSL，这条路径无需 Node.js。源码检出需要 Node.js 22.x 系列的 22.22.2 或更高版本、Node.js 24.x，或 Node.js 26 及更高版本，加上 pnpm 9 和 Docker。不支持 Node.js 23.x 和 25.x。",
    },
    {
      question: "我的数据存在哪里？",
      answer:
        "Postgres、机器人文件、浏览器配置和审计日志都留在你自己运行的部署上。你发送给模型提供商的内容由该提供商按其条款处理。提供商和密钥都由你选择。",
    },
    {
      question: "模型选择和费用怎么算？",
      answer:
        "每个人为自己连接部署两种模型来源之一——Doitx 路由器或由运维方运行的本地端点——的密钥。每个机器人可以选择不同的模型。开源软件本身不收席位费，你只需为使用的模型和算力提供商付费。本地 Docker 算力是默认选项，不需要托管沙箱账号。",
    },
    {
      question: "有托管的 Doitx 吗？",
      answer: "有。Doitx Cloud 正在 app.doitx.ai 进行 beta 测试，同时也支持自托管。",
    },
    {
      question: "和 OpenClaw 相比如何？",
      answer:
        "两者都是开源项目，都运行在你掌控的硬件上。完成 Docker 或桌面端安装后，Doitx 就是一个面向持久型队友的聊天界面。OpenClaw 的入门指南还要多出向导、一个在终端运行或作为后台服务安装的 Gateway，以及单独一步来连接聊天应用。",
    },
  ],
};

const COPY: Partial<Record<Locale, SelfHostPageCopy>> = { en: EN, zh: ZH };

/** en + zh are translated; every other locale falls back to English. */
export function getSelfHostPageCopy(locale: Locale): SelfHostPageCopy {
  return COPY[locale] ?? EN;
}
