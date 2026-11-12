// Full-page copy for the on-premise deployment guide.
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
  title: "On-Premise AI Agent Deployment – Doitx",
  description:
    "Run a full-featured AI agent on your own server: data stays on your infrastructure, you choose models and providers, and you control costs. Step-by-step deployment guide, system requirements, configuration reference, and FAQ.",
  h1: "Doitx On-Premise AI Agent Deployment Guide",
  intro: [
    "Doitx can run entirely on your own server. This page covers how to deploy the AI agent software on-premise, from container setup to connecting the web, desktop, and mobile clients.",
  ],
  gives: {
    heading: "What you get with on-premise deployment",
    dataOwnership: {
      title: "Data ownership",
      body: "Doitx agents work directly on your files and tools. Chat logs, files, and agent memory are stored on your own infrastructure, not in a third-party cloud.",
    },
    modelChoice: {
      title: "Model choice",
      body: "OpenAI, Anthropic, Google, Ollama, and other providers are supported. Local, hybrid, or proprietary models — you decide what runs on your deployment.",
    },
    costControl: {
      title: "Cost control",
      body: "The Doitx desktop and mobile apps connect to your server as a client. Bring your own model keys and pay only what your deployment actually uses.",
    },
  },
  only: {
    heading: "A Doitx deployment is not just OpenClaw",
    intro: "Doitx includes all OpenClaw core features plus",
    items: [
      "Built-in visual programming — design agents visually instead of writing config files.",
      "Multi-channel gateway — connect the same agent to web, desktop, mobile, and browser.",
      "Routine builder with scheduling and event triggers.",
      "Approval and audit trail for sensitive operations.",
      "Role-based permissions across team members.",
    ],
    trail: "Plus more coming in upcoming versions.",
  },
  requirements: {
    heading: "Requirements",
    images: "Server-side: one Docker image with all services. macOS client only; no local daemon required.",
    source:
      "Container images are provided in the [release downloads](/downloads). The macOS desktop app is available for download in the release assets.",
  },
  install: {
    heading: "Installation",
    intro:
      "The deployment is a single Docker image containing the agent runtime, Caddy reverse proxy, and database. The steps below walk through a standard setup.",
    afterInstall:
      "After installation, the server runs on port 80 (HTTP) with a built-in Caddy reverse proxy. A web UI is available at http://<server>:3000.",
    open:
      "Once the server is running, open the web UI in a browser or connect a desktop or mobile client to it.",
  },
  server: {
    heading: "Server",
    body: "Run the Doitx server image on your infrastructure. All runtime services are bundled in a single container.",
    envBody: "Environment variables control model provider, API keys, and networking. See the configuration reference for the full list.",
    caddyBody: "Caddy is included in the image and serves the web UI and API on port 80. Modify the Caddyfile to serve over HTTPS.",
    blocked:
      "If port 80 or 3000 is blocked by a firewall, add the relevant rule before starting the service.",
  },
  source: {
    heading: "Configuration",
    intro: "The server configuration is driven by environment variables and a Caddyfile mounted into the container.",
    secretsBody:
      "Store model API keys in environment variables or a mounted secrets file. Do not commit keys into version control.",
    loopbackBody:
      "Local development can point the server at a local model provider (e.g. Ollama on localhost) instead of an external API.",
    composeBody:
      "For production deployments, a docker-compose file with Caddy, the Doitx server, and a database is provided in the release assets.",
  },
  clients: {
    heading: "Clients",
    existing: "The web UI is served by the server itself. No additional client installation is required for browser access.",
    mac: "The macOS desktop app is available as a separate download. It connects to your server and does not run a local agent.",
    mobile: "A mobile app is available. It pairs with the server over the internet and works like the desktop app — a thin client, no local agent.",
  },
  reference: {
    heading: "Reference",
    guide: "Full deployment and operations guide.",
    secrets: "Secrets and key management reference.",
    restricted: "Restricted network environments: deploying behind a firewall or in an air-gapped setup.",
    prompt: "Custom prompt and agent behaviour reference.",
    source: "Configuration reference: all environment variables and Caddyfile options.",
  },
  related: {
    heading: "Related resources",
    home: "Back to the Doitx home page",
    openclaw: "Compare Doitx with OpenClaw →",
  },
  getStarted: {
    heading: "Get started",
    body: "Ready to run Doitx on your own infrastructure? Deploy the server or connect a client.",
    cloud: "Prefer a managed deployment? Explore the Doitx cloud service.",
    github: "Browse the release assets on the Doitx website.",
  },
  figureCreateBot: {
    alt: "Creating a bot in the Doitx desktop app",
    caption: "Creating a bot in the desktop app",
  },
  figureModel: {
    alt: "Selecting a model provider in the Doitx desktop app",
    caption: "Choosing a model provider",
  },
  figureRoutine: {
    alt: "Routine builder in the Doitx desktop app",
    caption: "Routine builder with scheduling",
  },
  figureApproval: {
    alt: "Approval trail in the Doitx desktop app",
    caption: "Approval and audit trail",
  },
  setupPromptNote:
    "You can customize the agent's behaviour with a custom prompt. See the configuration reference for details.",
  faqs: [
    {
      question: "What hardware does the server need?",
      answer:
        "A single Linux machine with Docker installed is sufficient for a standard deployment. Requirements scale with the number of concurrent agents and users.",
    },
    {
      question: "Can I run models locally?",
      answer:
        "Yes. Point the server at a local model provider such as Ollama running on the same machine or the local network. No external API key is required.",
    },
    {
      question: "How do I connect the mobile app?",
      answer:
        "The mobile app connects to your server over the internet. It works as a thin client — all agent logic runs on the server, not on the phone.",
    },
    {
      question: "Is there a docker-compose file?",
      answer:
        "Yes. A docker-compose file bundling Caddy, the Doitx server, and a database is included in the release assets for production deployments.",
    },
  ],
};

const ZH: SelfHostPageCopy = {
  title: "私有部署 AI 智能体 – Doitx",
  description:
    "在自己的服务器上运行完整的 AI 智能体：数据保留在自有基础设施中，自由选择模型和供应商，完全掌控成本。分步部署指南、系统要求、配置参考和常见问题。",
  h1: "Doitx 私有部署 AI 智能体指南",
  intro: [
    "Doitx 可以完全运行在您自己的服务器上。本页介绍如何在本机构建部署 AI 智能体，从容器设置到连接 Web、桌面和移动客户端。",
  ],
  gives: {
    heading: "私有部署的优势",
    dataOwnership: {
      title: "数据归属",
      body: "Doitx 智能体直接操作您的文件与工具。聊天记录、文件和智能体记忆全部存储在您的基础设施上，而非第三方云端。",
    },
    modelChoice: {
      title: "模型选择",
      body: "支持 OpenAI、Anthropic、Google、Ollama 等供应商。本地模型、混合方案或专有模型——由您决定在部署中运行什么。",
    },
    costControl: {
      title: "成本控制",
      body: "Doitx 桌面端和移动端以客户端形式连接您的服务器。使用自己的模型密钥，只为实际使用的量付费。",
    },
  },
  only: {
    heading: "Doitx 部署远不止 OpenClaw",
    intro: "Doitx 包含 OpenClaw 全部核心功能，并额外提供",
    items: [
      "内置可视化编程——无需编写配置文件，拖拽设计智能体。",
      "多渠道网关——同一个智能体可连接 Web、桌面、移动和浏览器。",
      "带调度和事件触发器的任务构建器。",
      "敏感操作的审批与审计日志。",
      "跨团队成员的角色权限管理。",
    ],
    trail: "更多功能将在后续版本中推出。",
  },
  requirements: {
    heading: "系统要求",
    images: "服务端：单个 Docker 镜像包含所有服务。仅 macOS 客户端；无需本地守护进程。",
    source:
      "容器镜像已在[发布下载页面](/downloads)提供。macOS 桌面应用可在发布资源中下载。",
  },
  install: {
    heading: "安装",
    intro: "部署为单个 Docker 镜像，包含智能体运行时、Caddy 反向代理和数据库。以下步骤为标准安装流程。",
    afterInstall:
      "安装完成后，服务默认监听 80 端口（HTTP），内置 Caddy 反向代理。Web 界面可在 http://<服务器地址>:3000 访问。",
    open: "服务启动后，在浏览器中打开 Web 界面，或连接桌面/移动客户端。",
  },
  server: {
    heading: "服务端",
    body: "在您的基础设施上运行 Doitx 服务端镜像。所有运行时服务打包在单个容器中。",
    envBody: "通过环境变量控制模型供应商、API 密钥和网络配置。完整列表请参阅配置参考。",
    caddyBody: "Caddy 已包含在镜像中，在 80 端口提供 Web 界面和 API。修改 Caddyfile 以启用 HTTPS。",
    blocked: "如果防火墙屏蔽了 80 或 3000 端口，请在启动服务前添加相应的放行规则。",
  },
  source: {
    heading: "配置",
    intro: "服务端配置通过环境变量和挂载到容器的 Caddyfile 驱动。",
    secretsBody: "将模型 API 密钥存储在环境变量或挂载的密钥文件中。请勿将密钥提交到版本控制。",
    loopbackBody: "本地开发可将服务端指向本地模型供应商（如 localhost 上的 Ollama），无需外部 API。",
    composeBody: "生产环境部署可参考发布资源中提供的 docker-compose 文件，包含 Caddy、Doitx 服务端和数据库。",
  },
  clients: {
    heading: "客户端",
    existing: "Web 界面由服务端直接提供，浏览器访问无需额外安装客户端。",
    mac: "macOS 桌面应用作为单独下载提供。它连接您的服务器，不运行本地智能体。",
    mobile: "移动端应用已上线。通过互联网与服务器配对，与桌面端一样是轻量客户端，无需本地智能体。",
  },
  reference: {
    heading: "参考资料",
    guide: "完整部署与运维指南。",
    secrets: "密钥与密钥管理参考。",
    restricted: "受限网络环境：在防火墙后或隔离网络中部署。",
    prompt: "自定义提示词与智能体行为参考。",
    source: "配置参考：所有环境变量与 Caddyfile 选项。",
  },
  related: {
    heading: "相关资源",
    home: "返回 Doitx 首页",
    openclaw: "对比 Doitx 与 OpenClaw →",
  },
  getStarted: {
    heading: "快速开始",
    body: "准备在自己的基础设施上运行 Doitx？部署服务端或连接客户端。",
    cloud: "更喜欢托管服务？了解 Doitx 云服务。",
    github: "在 Doitx 官网查看发布资源。",
  },
  figureCreateBot: {
    alt: "在 Doitx 桌面应用中创建机器人",
    caption: "在桌面应用中创建机器人",
  },
  figureModel: {
    alt: "在 Doitx 桌面应用中选择模型供应商",
    caption: "选择模型供应商",
  },
  figureRoutine: {
    alt: "Doitx 桌面应用的任务构建器",
    caption: "带调度的任务构建器",
  },
  figureApproval: {
    alt: "Doitx 桌面应用的审批日志",
    caption: "审批与审计日志",
  },
  setupPromptNote: "可通过自定义提示词调整智能体行为，详情请参阅配置参考。",
  faqs: [
    {
      question: "服务端需要什么硬件？",
      answer: "一台安装了 Docker 的 Linux 机器即可满足标准部署需求。资源需求随并发智能体数和用户数增长。",
    },
    {
      question: "能否运行本地模型？",
      answer:
        "可以。将服务端指向本地模型供应商（如同机器或本地网络上的 Ollama），无需外部 API 密钥。",
    },
    {
      question: "如何连接移动端应用？",
      answer: "移动端应用通过互联网连接您的服务器。它是轻量客户端——所有智能体逻辑在服务端运行，而非手机上。",
    },
    {
      question: "有 docker-compose 文件吗？",
      answer: "有。发布资源中包含 Caddy、Doitx 服务端和数据库的 docker-compose 文件，适用于生产环境部署。",
    },
  ],
};

export function getSelfHostPageCopy(locale: Locale): SelfHostPageCopy {
  return locale === "zh" ? ZH : EN;
}
