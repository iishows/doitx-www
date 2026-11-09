// Translated copy for the about, self-hosted, and openclaw-alternative pages.
import type { Locale } from "./locales";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type SelfHostCopy = {
  title: string;
  description: string;
  installHead: string;
  installIntro: string;
  startHead: string;
  startIntro: string;
  faqs: readonly { question: string; answer: string }[];
};

export type OpenClawCopy = {
  h1: string;
  title: string;
  updated: string;
  description: string;
  intro: readonly string[];
  faqs: readonly { question: string; answer: string }[];
};

export type AboutCopy = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  whyHeading: string;
  whyBody: string;
  openHeading: string;
  openBody: string;
};

/* ─── English (verbatim source) ─────────────────────────────────────────── */

const EN_SELF_HOST: SelfHostCopy = {
  title: "Self-Hosted AI Agent (Open Source) – Doitx",
  description:
    "Run Doitx yourself: an open source AI agent with your data, your model, and your costs. Requirements and the setup steps for Docker or a source checkout.",
  installHead: "Install and sign in",
  installIntro:
    "On a Mac or other computer, run this one command and sign in with your phone. The Doitx desktop app does the installation on that machine:",
  startHead: "Starting the Doitx server",
  startIntro:
    "On a host, sign in, then open the web or desktop app on that host.",
  faqs: [
    {
      question: "Where does my model key go?",
      answer:
        "The key you add stays in that deployment's secret store, encrypted. It is not sent to Inbox Zero, and it is not returned by the API.",
    },
    {
      question: "Do Doitx bots talk to xAI or Grok?",
      answer:
        "No. Doitx is a separate product. Use Doitx's router or an OpenAI-compatible model the operator runs; each person connects their own key.",
    },
    {
      question: "What can a bot do without approval?",
      answer:
        "You set the boundary. Routines can pause for approval at a step you choose. Every action is recorded in an audit log.",
    },
    {
      question: "Can two people share one deployment?",
      answer:
        "Yes. Each person signs in with their own account, and the operator controls who can connect. Bots and routines are per user.",
    },
    {
      question: "Can I run the whole stack on one machine?",
      answer:
        "Yes. The published Docker images run on a single machine. You can also connect to a server you already run.",
    },
    {
      question: "What if I am behind a restricted network?",
      answer:
        "A self-hosted Doitx deployment can run a local model endpoint instead of calling an external model API. See the restricted-networks guide in the docs.",
    },
  ],
};

const EN_OPENCLAW: OpenClawCopy = {
  h1: "Open source OpenClaw alternative",
  title: "Open Source OpenClaw Alternative – Doitx",
  updated: "October 7, 2026",
  description:
    "Compare Doitx and OpenClaw: setup, what runs on your machine, day-to-day operations, model providers, and the open source license.",
  intro: [
    "The main difference is simplicity. Like Grok Bot, Doitx is just chat: you set up the bot and manage it from that chat. OpenClaw is also open source and self-hosted. Its getting-started guide is a longer path: a CLI installer, an onboarding wizard, a Gateway you run in the terminal or install as a background service, and a config file.",
    "They are not the same product, and Doitx does not import an OpenClaw setup. This comparison follows OpenClaw's documentation and this repository. Details change. Those docs are the full source for OpenClaw.",
  ],
  faqs: [
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
        "The source is Apache-2.0 and public on GitHub. You pay for your model usage and infrastructure. Doitx Cloud is a hosted option in beta.",
    },
  ],
};

const EN_ABOUT: AboutCopy = {
  title: "About · Doitx",
  description:
    "How Doitx is building an open source Grok Bot alternative that people can understand and control.",
  h1: "About Doitx",
  intro:
    "Doitx is an open source Grok Bot alternative for persistent AI teammates: bots that can use a browser and shell, remember the work around a job, run routines on a schedule, and ask for approval when they reach a boundary. It is designed for practical operational work rather than one-off chat.",
  whyHeading: "Why we are building it",
  whyBody:
    "Useful agents should be understandable and controllable by the people who run them. Doitx keeps routines in readable Markdown, offers two model providers: the Doitx router and a local endpoint, records actions in an audit log, and lets operators keep model keys, browser sessions, and deployment infrastructure under their own control. The same bots and routines work across the web, desktop, and mobile clients.",
  openHeading: "Open by default",
  openBody:
    "Doitx is maintained by Inbox Zero Inc. and released under the Apache-2.0 license. The project accepts public issues and contributions on GitHub. To run Doitx on your own infrastructure, start with the self-hosting guide. For product or account help, email hello@doitx.ai.",
};

/* ─── German ─────────────────────────────────────────────────────────────── */

const DE_SELF_HOST: SelfHostCopy = {
  title: "Self-Hosted AI-Agent (Open Source) – Doitx",
  description:
    "Betreiben Sie Doitx selbst: ein Open-Source-KI-Agent mit Ihren Daten, Ihrem Modell und Ihren Kosten. Voraussetzungen und Einrichtungsschritte für Docker oder einen Source-Checkout.",
  installHead: "Installation und Anmeldung",
  installIntro:
    "Führen Sie auf einem Mac oder einem anderen Computer diesen einen Befehl aus und melden Sie sich mit Ihrem Telefon an. Die Doitx-Desktop-App führt die Installation auf dieser Maschine durch:",
  startHead: "Doitx-Server starten",
  startIntro:
    "Melden Sie sich auf dem Host an und öffnen Sie anschließend die Web- oder Desktop-App auf diesem Host.",
  faqs: [
    {
      question: "Wohin wird mein Modell-Key gesendet?",
      answer:
        "Der Key, den Sie hinzufügen, bleibt im Secret Store dieser Installation, verschlüsselt. Er wird nicht an Inbox Zero gesendet und nicht von der API zurückgegeben.",
    },
    {
      question: "Kommunizieren Doitx-Bots mit xAI oder Grok?",
      answer:
        "Nein. Doitx ist ein eigenständiges Produkt. Verwenden Sie den Doitx-Router oder ein vom Betreiber betriebenes OpenAI-kompatibles Modell; jeder verbindet seinen eigenen Key.",
    },
    {
      question: "Was kann ein Bot ohne Genehmigung tun?",
      answer:
        "Sie legen die Grenze fest. Routines können an einem von Ihnen gewählten Schritt auf Freigabe warten. Jede Aktion wird in einem Audit-Log protokolliert.",
    },
    {
      question: "Können zwei Personen eine Installation teilen?",
      answer:
        "Ja. Jeder meldet sich mit seinem eigenen Konto an, und der Betreiber steuert, wer sich verbinden kann. Bots und Routines sind pro Benutzer.",
    },
    {
      question: "Kann ich den gesamten Stack auf einer Maschine betreiben?",
      answer:
        "Ja. Die veröffentlichten Docker-Images laufen auf einer einzelnen Maschine. Sie können sich auch mit einem bereits laufenden Server verbinden.",
    },
    {
      question: "Was, wenn ich mich in einem eingeschränkten Netz befinde?",
      answer:
        "Eine selbst gehostete Doitx-Installation kann stattdessen einen lokalen Modell-Endpunkt betreiben. Siehe den Leitfaden für eingeschränkte Netzwerke in der Dokumentation.",
    },
  ],
};

const DE_OPENCLAW: OpenClawCopy = {
  h1: "Open-Source-Alternative zu OpenClaw",
  title: "Open-Source-OpenClaw-Alternative – Doitx",
  updated: "7. Oktober 2026",
  description:
    "Vergleichen Sie Doitx und OpenClaw: Einrichtung, was auf Ihrem Rechner läuft, täglicher Betrieb, Modell-Provider und die Open-Source-Lizenz.",
  intro: [
    "Der Hauptunterschied liegt in der Einfachheit. Wie Grok Bot ist Doitx nur Chat: Sie richten den Bot ein und verwalten ihn über diesen Chat. OpenClaw ist ebenfalls Open Source und self-hosted. Seine Getting-Started-Anleitung ist ein längerer Weg: ein CLI-Installer, ein Onboarding-Assistent, ein Gateway, das Sie im Terminal ausführen oder als Hintergrunddienst installieren, sowie eine Konfigurationsdatei.",
    "Es handelt sich nicht um dasselbe Produkt, und Doitx importiert keine OpenClaw-Einrichtung. Dieser Vergleich folgt der OpenClaw-Dokumentation und diesem Repository. Details ändern sich. Diese Dokumentation ist die vollständige Quelle für OpenClaw.",
  ],
  faqs: [
    {
      question: "Kann ich Doitx auf meinem eigenen Rechner betreiben?",
      answer:
        "Ja. Die veröffentlichten Docker-Images laufen auf einer einzelnen Maschine. Die Desktop-App kann diesen Stack lokal starten oder mit einem bereits laufenden Server verbinden.",
    },
    {
      question: "Welches Modell verwenden die Bots?",
      answer:
        "Sie entscheiden. Der Doitx-Router gibt Ihnen Zugriff auf eine Reihe von Modellen; ein lokaler OpenAI-kompatibler Endpunkt wird ebenfalls unterstützt. Jeder verbindet seinen eigenen Key.",
    },
    {
      question: "Was kontrolliere ich?",
      answer:
        "Ihre Modell-Keys, Ihre Browser-Sitzungen und die Infrastruktur. Routines sind lesbare Markdown-Dateien; Sie können festlegen, wo ein Bot auf Freigabe wartet.",
    },
    {
      question: "Ist es kostenlos?",
      answer:
        "Der Quellcode steht unter Apache-2.0 und ist öffentlich auf GitHub. Sie zahlen für Ihre Modell-Nutzung und Infrastruktur. Doitx Cloud ist eine in Beta befindliche gehostete Option.",
    },
  ],
};

const DE_ABOUT: AboutCopy = {
  title: "Über · Doitx",
  description:
    "Wie Doitx eine Open-Source-Alternative zu Grok Bot entwickelt, die Menschen verstehen und kontrollieren können.",
  h1: "Über Doitx",
  intro:
    "Doitx ist eine Open-Source-Alternative zu Grok Bot für persistente KI-Teamkollegen: Bots, die einen Browser und eine Shell nutzen, die Arbeit um eine Aufgabe herum erinnern, Routines nach Zeitplan ausführen und an einer Grenze nach Freigabe bitten. Es ist für praktische Betriebsarbeit und nicht für Einmal-Chats konzipiert.",
  whyHeading: "Warum wir es bauen",
  whyBody:
    "Nützliche Agenten sollten für die Menschen, die sie betreiben, verständlich und kontrollierbar sein. Doitx hält Routines in lesbarem Markdown, bietet zwei Modellanbieter – den Doitx-Router und einen lokalen Endpunkt –, protokolliert Aktionen in einem Audit-Log und lässt Betreiber Modellschlüssel, Browsersitzungen und Deployment-Infrastruktur selbst kontrollieren. Dieselben Bots und Routines funktionieren in Web-, Desktop- und mobilen Clients.",
  openHeading: "Standardmäßig offen",
  openBody:
    "Doitx wird von Inbox Zero Inc. betreut und unter der Apache-2.0-Lizenz veröffentlicht. Das Projekt nimmt öffentliche Issues und Beiträge auf GitHub an. Um Doitx auf Ihrer eigenen Infrastruktur zu betreiben, beginnen Sie mit dem Self-Hosting-Leitfaden. Für Produkt- oder Kontohilfe schreiben Sie an hello@doitx.ai.",
};

/* ─── Korean ─────────────────────────────────────────────────────────────── */

const KO_SELF_HOST: SelfHostCopy = {
  title: "Self-Hosted AI 에이전트 (오픈소스) – Doitx",
  description:
    "Doitx를 직접 실행하세요: 내 데이터, 내 모델, 내 비용을 사용하는 오픈소스 AI 에이전트입니다. Docker 또는 소스 체크아웃을 위한 요구 사항 및 설정 단계를 안내합니다.",
  installHead: "설치 및 로그인",
  installIntro:
    "Mac 또는 다른 컴퓨터에서 이 하나의 명령어를 실행한 후 휴대폰으로 로그인하세요. Doitx 데스크톱 앱이 해당 기기에서 설치를 수행합니다:",
  startHead: "Doitx 서버 시작",
  startIntro:
    "호스트에 로그인한 후 해당 호스트에서 웹 또는 데스크톱 앱을 여세요.",
  faqs: [
    {
      question: "내 모델 키는 어디로 가나요?",
      answer:
        "추가한 키는 해당 배포의 시크릿 스토어에 암호화되어 저장됩니다. Inbox Zero로 전송되지 않으며 API로 반환되지도 않습니다.",
    },
    {
      question: "Doitx 봇은 xAI나 Grok과 통신하나요?",
      answer:
        "아니요. Doitx는 별도 제품입니다. Doitx 라우터 또는 운영자가 실행하는 OpenAI 호환 모델을 사용하며 각 사용자는 자신의 키를 연결합니다.",
    },
    {
      question: "봇은 승인 없이 무엇을 할 수 있나요?",
      answer:
        "경계를 직접 설정합니다. 루틴은 선택한 단계에서 승인을 기다릴 수 있습니다. 모든 작업은 감사 로그에 기록됩니다.",
    },
    {
      question: "두 사람이 한 배포를 공유할 수 있나요?",
      answer:
        "네. 각자는 자신의 계정으로 로그인하고 운영자가 접속을 제어합니다. 봇과 루틴은 사용자별입니다.",
    },
    {
      question: "전체 스택을 한 대의 기기에 실행할 수 있나요?",
      answer:
        "네. 공개된 Docker 이미지는 단일 기기에서 실행됩니다. 이미 실행 중인 서버에도 연결할 수 있습니다.",
    },
    {
      question: "제한된 네트워크 환경에서는요?",
      answer:
        "Self-hosted Doitx 배포는 외부 모델 API 대신 로컬 모델 엔드포인트를 실행할 수 있습니다. 문서의 제한 네트워크 가이드를 참조하세요.",
    },
  ],
};

const KO_OPENCLAW: OpenClawCopy = {
  h1: "오픈소스 OpenClaw 대안",
  title: "오픈소스 OpenClaw 대안 – Doitx",
  updated: "2026년 10월 7일",
  description:
    "Doitx와 OpenClaw 비교: 설정, 내 기기에서 실행되는 것, 일상 운영, 모델 공급자, 오픈소스 라이선스.",
  intro: [
    "주요 차이는 단순함입니다. Grok Bot과 마찬가지로 Doitx는 단순한 채팅입니다: 봇을 설정하고 그 채팅에서 관리합니다. OpenClaw도 오픈소스, self-hosted입니다. 그 getting-started 가이드는 더 긴 경로입니다: CLI 설치기, 온보딩 위자드, 터미널에서 실행하거나 백그라운드 서비스로 설치하는 Gateway, 그리고 설정 파일.",
    "둘은 동일한 제품이 아니며, Doitx는 OpenClaw 설정을 가져오지 않습니다. 이 비교는 OpenClaw 문서와 이 저장소를 따릅니다. 세부 사항은 변경될 수 있습니다. 해당 문서가 OpenClaw의 완전한 출처입니다.",
  ],
  faqs: [
    {
      question: "내 자신의 기기에서 Doitx를 실행할 수 있나요?",
      answer:
        "네. 공개된 Docker 이미지는 단일 기기에서 실행됩니다. 데스크톱 앱으로 로컬에서 이 스택을 시작하거나 이미 실행 중인 서버에 연결할 수 있습니다.",
    },
    {
      question: "봇은 어떤 모델을 사용하나요?",
      answer:
        "사용자가 선택합니다. Doitx 라우터로 여러 모델에 접근할 수 있으며, 로컬 OpenAI 호환 엔드포인트도 지원합니다. 각자가 자신의 키를 연결합니다.",
    },
    {
      question: "무엇을 제어할 수 있나요?",
      answer:
        "모델 키, 브라우저 세션, 배포 인프라를 제어합니다. 루틴은 읽기 쉬운 마크다운이며 봇이 승인을 기다릴 위치를 설정할 수 있습니다.",
    },
    {
      question: "무료인가요?",
      answer:
        "소스는 Apache-2.0 라이선스로 GitHub에 공개되어 있습니다. 모델 사용량과 인프라 비용만 지불합니다. Doitx Cloud는 베타 상태의 호스팅 옵션입니다.",
    },
  ],
};

const KO_ABOUT: AboutCopy = {
  title: "소개 · Doitx",
  description:
    "사람들이 이해하고 제어할 수 있는 오픈소스 Grok Bot 대안을 개발하는 Doitx의 방식.",
  h1: "Doitx 소개",
  intro:
    "Doitx는 영속적인 AI 팀원용 오픈소스 Grok Bot 대안입니다: 브라우저와 셸을 사용하고, 작업 주위 일을 기억하며, 일정대로 루틴을 실행하고, 경계에서 승인을 요청하는 봇입니다. 일회성 챗이 아닌 실용적인 운영 작업을 위해 설계되었습니다.",
  whyHeading: "왜 만들까",
  whyBody:
    "쓸모 있는 에이전트는 그것을 운영하는 사람이 이해하고 제어할 수 있어야 합니다. Doitx는 루틴을 읽기 쉬운 마크다운으로 유지하고, Doitx 라우터와 로컬 엔드포인트라는 두 가지 모델 제공자를 지원하며, 모든 작업을 감사 로그에 기록하고, 운영자가 모델 키와 브라우저 세션, 배포 인프라를 직접 관리하도록 합니다. 같은 봇과 루틴이 웹, 데스크톱, 모바일 클라이언트에서 모두 작동합니다.",
  openHeading: "기본적으로 오픈",
  openBody:
    "Doitx는 Inbox Zero Inc.가 유지보수하며 Apache-2.0 라이선스로 배포됩니다. 프로젝트는 GitHub에서 공개 이슈와 기여를 환영합니다. 내 인프라에서 Doitx를 실행하려면 self-hosting 가이드로 시작하세요. 제품이나 계정 관련 도움이 필요하면 hello@doitx.ai로 이메일을 보내세요.",
};

/* ─── Chinese (Simplified) ───────────────────────────────────────────────── */

const ZH_SELF_HOST: SelfHostCopy = {
  title: "自托管 AI 智能体（开源）– Doitx",
  description:
    "自行运行 Doitx：使用你的数据、你的模型、你的成本——一个开源 AI 智能体。了解 Docker 或源码部署的要求与设置步骤。",
  installHead: "安装与登录",
  installIntro:
    "在 Mac 或其他电脑上运行这一条命令，然后用手机登录。Doitx 桌面应用会在该机器上完成安装：",
  startHead: "启动 Doitx 服务器",
  startIntro: "在服务器上登录，然后在该服务器上打开网页版或桌面版。",
  faqs: [
    {
      question: "我的模型密钥会去哪里？",
      answer:
        "你添加的密钥会保存在该部署的密钥库中，已加密。不会发送到 Inbox Zero，也不会通过 API 返回。",
    },
    {
      question: "Doitx 机器人会与 xAI 或 Grok 通信吗？",
      answer:
        "不会。Doitx 是独立产品。使用 Doitx 路由器或运维方自建的 OpenAI 兼容模型；每个人连接自己的密钥。",
    },
    {
      question: "机器人未经批准能做什么？",
      answer:
        "你来设定边界。例行任务可以在你选择的步骤暂停等待批准。所有操作都会记录在审计日志中。",
    },
    {
      question: "两个人能共用一个部署吗？",
      answer:
        "可以。每个人用自己的账号登录，运维方控制谁能连接。机器人和例行任务是按用户划分的。",
    },
    {
      question: "整套系统能在一台机器上运行吗？",
      answer:
        "可以。公开的 Docker 镜像可在单台机器上运行。也可以连接你已经在运行的服务器。",
    },
    {
      question: "受限网络环境下怎么办？",
      answer:
        "自托管的 Doitx 部署可以运行本地模型端点，替代调用外部模型 API。详见文档中的受限网络指南。",
    },
  ],
};

const ZH_OPENCLAW: OpenClawCopy = {
  h1: "开源 OpenClaw 替代品",
  title: "开源 OpenClaw 替代品 – Doitx",
  updated: "2026年10月7日",
  description:
    "对比 Doitx 和 OpenClaw：安装、机器上运行什么、日常操作、模型提供商、开源许可证。",
  intro: [
    "主要差异在于简洁。和 Grok Bot 一样，Doitx 就是聊天：你设置机器人，然后通过聊天管理它。OpenClaw 也是开源、自托管的。它的入门指南路径更长：一个 CLI 安装器、一个引导向导、一个在终端运行或作为后台服务安装的 Gateway，以及一个配置文件。",
    "两者并非同一产品，Doitx 也不导入 OpenClaw 配置。本对比遵循 OpenClaw 的文档和本仓库。细节会变化。那些文档是 OpenClaw 的完整信息来源。",
  ],
  faqs: [
    {
      question: "我能在自己的机器上运行 Doitx 吗？",
      answer:
        "可以。公开的 Docker 镜像可在单台机器上运行。桌面应用可以本地启动整套系统，也可以连接你已经在运行的服务器。",
    },
    {
      question: "机器人使用什么模型？",
      answer:
        "你来选。Doitx 路由器让你访问一系列模型；也支持本地 OpenAI 兼容端点。每个人连接自己的密钥。",
    },
    {
      question: "我能控制什么？",
      answer:
        "你的模型密钥、浏览器会话、部署基础设施。例行任务是可读的 Markdown 文件；你可以设置机器人在哪里暂停等待批准。",
    },
    {
      question: "免费吗？",
      answer:
        "源码在 GitHub 上以 Apache-2.0 许可证公开。你只需为模型使用量和基础设施付费。Doitx Cloud 是 beta 版的托管选项。",
    },
  ],
};

const ZH_ABOUT: AboutCopy = {
  title: "关于 · Doitx",
  description: "Doitx 如何打造一个人们能理解、能掌控的开源 Grok Bot 替代品。",
  h1: "关于 Doitx",
  intro:
    "Doitx 是一个开源的 Grok Bot 替代品，面向持久型 AI 队友：能够使用浏览器和终端、记住工作上下文、按计划运行例行任务、在触及边界时请求批准的机器人。它面向实际运营工作，而非一次性对话。",
  whyHeading: "我们为什么做这件事",
  whyBody:
    "有用的智能体应当可以被使用它的人理解和掌控。Doitx 把例行任务保存为可读的 Markdown，提供两种模型来源——Doitx 路由器和本地端点，把每一步操作记入审计日志，并让运维方自己掌控模型密钥、浏览器会话和部署基础设施。同一批机器人和例行任务在网页版、桌面版和移动端都能使用。",
  openHeading: "默认开放",
  openBody:
    "Doitx 由 Inbox Zero Inc. 维护，以 Apache-2.0 许可证发布。项目在 GitHub 上接受公开的 issue 和贡献。要在自己的基础设施上运行 Doitx，请从自托管指南开始。产品或账号问题请联系 hello@doitx.ai。",
};

/* ─── Japanese ───────────────────────────────────────────────────────────── */

const JA_SELF_HOST: SelfHostCopy = {
  title: "セルフホスト AI エージェント（オープンソース）– Doitx",
  description:
    "Doitx を自分で実行します：あなたのデータ、あなたのモデル、あなたのコスト——オープンソースの AI エージェント。Docker またはソースチェックアウトの要件とセットアップ手順。",
  installHead: "インストールとサインイン",
  installIntro:
    "Mac または他のコンピュータでこの 1 コマンドを実行し、スマホでサインインしてください。Doitx デスクトップアプリがそのマシンにインストールします：",
  startHead: "Doitx サーバーの起動",
  startIntro: "ホストでサインインし、そのホストで Web またはデスクトップアプリを開きます。",
  faqs: [
    {
      question: "モデルのキーはどこにいきますか？",
      answer:
        "追加したキーは、そのデプロイのシークレットストアに暗号化され保存されます。Inbox Zero に送信されることも、API によって返されることもありません。",
    },
    {
      question: "Doitx のボットは xAI や Grok と通信しますか？",
      answer:
        "いいえ。Doitx は独立した製品です。Doitx のルーターまたはオペレーターが実行する OpenAI 互換モデルを使用し、各自が自分のキーを接続します。",
    },
    {
      question: "ボットは承認なしに何をできますか？",
      answer:
        "境界をあなたが設定します。ルーティンが選択したステップで承認を待てます。すべての操作は監査ログに記録されます。",
    },
    {
      question: "2 人が 1 デプロイを共有できますか？",
      answer:
        "はい。各自が自分のアカウントでサインインし、オペレーターが接続可能な人を制御します。ボットとルーティンはユーザー単位です。",
    },
    {
      question: "スタック全体を 1 台のマシンで実行できますか？",
      answer:
        "はい。公開されている Docker イメージは単一マシンで動作します。既に実行しているサーバーに接続することも可能です。",
    },
    {
      question: "制限付きネットワークの場合は？",
      answer:
        "セルフホストされた Doitx デプロイでは、外部モデル API ではなくローカルモデルエンドポイントを実行できます。文書の制限ネットワークガイドを参照してください。",
    },
  ],
};

const JA_OPENCLAW: OpenClawCopy = {
  h1: "オープンソースの OpenClaw 代替",
  title: "オープンソース OpenClaw 代替 – Doitx",
  updated: "2026年10月7日",
  description:
    "Doitx と OpenClaw の比較：セットアップ、自分のマシンで動作するもの、日常運用、モデルプロバイダー、オープンソースライセンス。",
  intro: [
    "主な違いはシンプルさです。Grok Bot と同じく、Doitx はチャットのみです：ボットを設定し、そのチャットで管理します。OpenClaw もオープンソース、セルフホストです。そのガイドはより長いパスです：CLI インストーラー、オンボーディングウィザード、ターミナルで実行またはバックグラウンドサービスとしてインストールする Gateway、設定ファイル。",
    "2 つは同じ製品ではなく、Doitx は OpenClaw の設定をインポートしません。この比較は OpenClaw のドキュメントとこのリポジトリに基づいています。詳細は変わり得ます。そのドキュメントが OpenClaw の完全な情報源です。",
  ],
  faqs: [
    {
      question: "自分のマシンで Doitx を実行できますか？",
      answer:
        "はい。公開されている Docker イメージは単一マシンで動作します。デスクトップアプリでローカルにスタックを起動するか、既に実行しているサーバーに接続できます。",
    },
    {
      question: "ボットはどのモデルを使いますか？",
      answer:
        "選択します。Doitx ルーターで複数のモデルにアクセスでき、ローカル OpenAI 互換エンドポイントにも対応。各自が自分のキーを接続します。",
    },
    {
      question: "何を制御できますか？",
      answer:
        "モデルキー、ブラウザセッション、デプロイインフラストラクチャ。ルーティンは読みやすい Markdown で、ボットが承認を待つ場所を設定できます。",
    },
    {
      question: "無料ですか？",
      answer:
        "ソースは Apache-2.0 で GitHub に公開されています。モデル使用量とインフラ費用のみを支払います。Doitx Cloud はベータ版のホスティングオプションです。",
    },
  ],
};

const JA_ABOUT: AboutCopy = {
  title: "概要 · Doitx",
  description: "Doitx が、人々が理解し制御できるオープンソースの Grok Bot 代替をどのように開発しているか。",
  h1: "Doitx について",
  intro:
    "Doitx は、永続的な AI チームメイトのためのオープンソースの Grok Bot 代替です：ブラウザとシェルを使い、タスクの経緯を記憶し、スケジュールでルーティンを実行し、境界に触れたら承認を依頼するボット。一回きりのチャットではなく、実務的なオペレーション業務向けに設計されています。",
  whyHeading: "なぜ作っているか",
  whyBody:
    "有用なエージェントは、それを運用する人が理解し制御できるべきです。Doitx はルーティンを読みやすい Markdown で保ち、Doitx ルーターとローカルエンドポイントという 2 つのモデル提供元に対応し、すべての操作を監査ログに記録し、モデルキー・ブラウザセッション・デプロイ基盤を運用者自身の管理下に置きます。同じボットとルーティンが Web・デスクトップ・モバイルの各クライアントで動作します。",
  openHeading: "デフォルトでオープン",
  openBody:
    "Doitx は Inbox Zero Inc. が維持し、Apache-2.0 ライセンスで公開されています。プロジェクトは GitHub で公開の issue とコントリビューションを受け入れています。自分のインフラで Doitx を実行するには、セルフホスティングガイドから始めてください。製品またはアカウントのサポートは hello@doitx.ai まで。",
};

/* ─── Spanish ───────────────────────────────────────────────────────────── */

const ES_SELF_HOST: SelfHostCopy = {
  title: "Agente de IA Autoalojado (Código Abierto) – Doitx",
  description:
    "Ejecute Doitx usted mismo: un agente de IA de código abierto con sus datos, su modelo y sus costos. Requisitos y pasos de configuración para Docker o un checkout de fuentes.",
  installHead: "Instalación e inicio de sesión",
  installIntro:
    "En un Mac u otro equipo, ejecute este único comando e inicie sesión con su teléfono. La aplicación de escritorio de Doitx realiza la instalación en esa máquina:",
  startHead: "Iniciando el servidor de Doitx",
  startIntro:
    "Inicie sesión en el host y abra la aplicación web o de escritorio en ese host.",
  faqs: [
    {
      question: "¿A dónde va mi clave de modelo?",
      answer:
        "La clave que añada permanece en el almacén de secretos de esa implementación, cifrada. No se envía a Inbox Zero ni se devuelve por la API.",
    },
    {
      question: "¿Los bots de Doitx hablan con xAI o Grok?",
      answer:
        "No. Doitx es un producto independiente. Utilice el enrutador de Doitx o un modelo compatible con OpenAI que ejecute el operador; cada persona conecta su propia clave.",
    },
    {
      question: "¿Qué puede hacer un bot sin aprobación?",
      answer:
        "Usted marca el límite. Las rutinas pueden pausarse para aprobación en el paso que elija. Cada acción queda registrada en un registro de auditoría.",
    },
    {
      question: "¿Dos personas pueden compartir una implementación?",
      answer:
        "Sí. Cada una inicia sesión con su propia cuenta y el operador controla quién puede conectarse. Los bots y rutinas son por usuario.",
    },
    {
      question: "¿Puedo ejecutar el stack completo en un solo equipo?",
      answer:
        "Sí. Las imágenes Docker publicadas se ejecutan en una sola máquina. También puede conectarse a un servidor que ya esté en marcha.",
    },
    {
      question: "¿Y si estoy en una red restringida?",
      answer:
        "Una implementación autoalojada de Doitx puede ejecutar un punto de modelo local en lugar de llamar a una API externa. Consulte la guía de redes restringidas en la documentación.",
    },
  ],
};

const ES_OPENCLAW: OpenClawCopy = {
  h1: "Alternativa de código abierto a OpenClaw",
  title: "Alternativa de Código Abierto a OpenClaw – Doitx",
  updated: "7 de octubre de 2026",
  description:
    "Compare Doitx y OpenClaw: configuración, qué se ejecuta en su máquina, operaciones diarias, proveedores de modelo y la licencia de código abierto.",
  intro: [
    "La diferencia principal es la simplicidad. Al igual que Grok Bot, Doitx es solo chat: configura el bot y lo gestiona desde ese chat. OpenClaw también es de código abierto y autoalojado. Su guía de inicio es un camino más largo: un instalador CLI, un asistente de incorporación, una puerta de enlace que ejecuta en la terminal o instala como servicio en segundo plano, y un archivo de configuración.",
    "No son el mismo producto y Doitx no importa una configuración de OpenClaw. Esta comparación sigue la documentación de OpenClaw y este repositorio. Los detalles cambian. Esos documentos son la fuente completa para OpenClaw.",
  ],
  faqs: [
    {
      question: "¿Puedo ejecutar Doitx en mi propia máquina?",
      answer:
        "Sí. Las imágenes Docker publicadas se ejecutan en una sola máquina. La aplicación de escritorio puede iniciar ese stack localmente o conectarse a un servidor que ya esté en marcha.",
    },
    {
      question: "¿Qué modelo usan los bots?",
      answer:
        "Usted elige. El enrutador de Doitx le da acceso a una serie de modelos; también se admite un punto de OpenAI compatible local. Cada persona conecta su propia clave.",
    },
    {
      question: "¿Qué controlo?",
      answer:
        "Sus claves de modelo, sus sesiones de navegador y la infraestructura de implementación. Las rutinas son Markdown legible; puede fijar dónde un bot espera aprobación.",
    },
    {
      question: "¿Es gratis?",
      answer:
        "El código fuente es Apache-2.0 y está publicado en GitHub. Usted paga por el uso de modelo y la infraestructura. Doitx Cloud es una opción alojada en beta.",
    },
  ],
};

const ES_ABOUT: AboutCopy = {
  title: "Acerca de · Doitx",
  description:
    "Cómo Doitx está construyendo una alternativa de código abierto a Grok Bot que la gente pueda comprender y controlar.",
  h1: "Sobre Doitx",
  intro:
    "Doitx es una alternativa de código abierto a Grok Bot para compañeros de IA persistentes: bots que pueden usar un navegador y una consola, recordar el trabajo de una tarea, ejecutar rutinas según un horario y pedir aprobación al llegar a un límite. Está diseñado para trabajo operativo práctico, no para un chat puntual.",
  whyHeading: "Por qué lo estamos construyendo",
  whyBody:
    "Los agentes útiles deben ser comprensibles y controlables por quienes los operan. Doitx mantiene las rutinas en Markdown legible, ofrece dos proveedores de modelos —el router de Doitx y un endpoint local—, registra cada acción en un registro de auditoría y permite que los operadores mantengan bajo su control las claves de modelo, las sesiones de navegador y la infraestructura de despliegue. Los mismos bots y rutinas funcionan en los clientes web, de escritorio y móvil.",
  openHeading: "Abierto por defecto",
  openBody:
    "Doitx es mantenido por Inbox Zero Inc. y publicado bajo la licencia Apache-2.0. El proyecto acepta issues y contribuciones públicas en GitHub. Para ejecutar Doitx en su propia infraestructura, comience por la guía de autoalojamiento. Para ayuda con el producto o la cuenta, escriba a hello@doitx.ai.",
};

/* ─── French ─────────────────────────────────────────────────────────────── */

const FR_SELF_HOST: SelfHostCopy = {
  title: "Agent IA auto-hébergé (open source) – Doitx",
  description:
    "Exécutez Doitx vous-même : un agent IA open source avec vos données, votre modèle et vos coûts. Exigences et étapes de configuration pour Docker ou une copie source.",
  installHead: "Installation et connexion",
  installIntro:
    "Sur un Mac ou un autre ordinateur, exécutez cette unique commande et connectez-vous avec votre téléphone. L'application desktop Doitx effectue l'installation sur cette machine :",
  startHead: "Démarrage du serveur Doitx",
  startIntro:
    "Connectez-vous sur l'hôte, puis ouvrez l'application web ou desktop sur cet hôte.",
  faqs: [
    {
      question: "Où va ma clé de modèle ?",
      answer:
        "La clé que vous ajoutez reste dans le coffre de secrets de ce déploiement, chiffrée. Elle n'est pas envoyée à Inbox Zero et n'est pas retournée par l'API.",
    },
    {
      question: "Les bots Doitx parlent-ils à xAI ou Grok ?",
      answer:
        "Non. Doitx est un produit distinct. Utilisez le routeur Doitx ou un modèle compatible OpenAI exécuté par l'opérateur ; chacun connecte sa propre clé.",
    },
    {
      question: "Que peut faire un bot sans approbation ?",
      answer:
        "Vous fixez la limite. Les routines peuvent se mettre en pause pour approbation à l'étape de votre choix. Chaque action est consignée dans un journal d'audit.",
    },
    {
      question: "Deux personnes peuvent-elles partager un déploiement ?",
      answer:
        "Oui. Chacune se connecte avec son propre compte et l'opérateur contrôle qui peut se connecter. Les bots et routines sont par utilisateur.",
    },
    {
      question: "Puis-je exécuter toute la pile sur une seule machine ?",
      answer:
        "Oui. Les images Docker publiées tournent sur une seule machine. Vous pouvez aussi vous connecter à un serveur que vous exécutez déjà.",
    },
    {
      question: "Et derrière un réseau restreint ?",
      answer:
        "Un déploiement auto-hébergé de Doitx peut faire tourner un point d'accès modèle local plutôt que d'appeler une API externe. Consultez le guide réseaux restreints dans la documentation.",
    },
  ],
};

const FR_OPENCLAW: OpenClawCopy = {
  h1: "Alternative open source à OpenClaw",
  title: "Alternative Open Source à OpenClaw – Doitx",
  updated: "7 octobre 2026",
  description:
    "Comparez Doitx et OpenClaw : installation, ce qui tourne sur votre machine, opérations au quotidien, fournisseurs de modèles et licence open source.",
  intro: [
    "La différence principale est la simplicité. Comme Grok Bot, Doitx c'est du chat : vous configurez le bot et le pilotez depuis ce chat. OpenClaw est aussi open source et auto-hébergé. Son guide de démarrage est un chemin plus long : un installateur CLI, un assistant d'accueil, une passerelle à lancer dans le terminal ou installer comme service en arrière-plan, et un fichier de configuration.",
    "Ce ne sont pas le même produit, et Doitx n'importe pas une configuration OpenClaw. Cette comparaison suit la documentation OpenClaw et ce dépôt. Les détails changent. Ces documents sont la source complète pour OpenClaw.",
  ],
  faqs: [
    {
      question: "Puis-je exécuter Doitx sur ma propre machine ?",
      answer:
        "Oui. Les images Docker publiées tournent sur une seule machine. L'app desktop peut démarrer cette pile localement ou se connecter à un serveur que vous exécutez déjà.",
    },
    {
      question: "Quel modèle utilisent les bots ?",
      answer:
        "Vous choisissez. Le routeur Doitx donne accès à une série de modèles ; un point local compatible OpenAI est aussi pris en charge. Chacun connecte sa propre clé.",
    },
    {
      question: "Que contrôle-je ?",
      answer:
        "Vos clés de modèle, vos sessions navigateur et l'infrastructure de déploiement. Les routines sont du Markdown lisible ; vous pouvez fixer où un bot attend l'approbation.",
    },
    {
      question: "C'est gratuit ?",
      answer:
        "Le code source est Apache-2.0 et public sur GitHub. Vous payez votre usage modèle et l'infrastructure. Doitx Cloud est une option hébergée en bêta.",
    },
  ],
};

const FR_ABOUT: AboutCopy = {
  title: "À propos · Doitx",
  description:
    "Comment Doitx construit une alternative open source à Grok Bot que les gens peuvent comprendre et contrôler.",
  h1: "À propos de Doitx",
  intro:
    "Doitx est une alternative open source à Grok Bot pour des coéquipiers IA persistants : des bots qui utilisent un navigateur et un shell, se souviennent du contexte d'une tâche, exécutent des routines sur un planning et demandent approbation en atteignant une limite. Conçu pour un travail opérationnel concret, pas un chat ponctuel.",
  whyHeading: "Pourquoi nous le faisons",
  whyBody:
    "Des agents utiles doivent être compréhensibles et contrôlables par ceux qui les exploitent. Doitx garde les routines dans un Markdown lisible, propose deux fournisseurs de modèles — le routeur Doitx et un point de terminaison local —, consigne chaque action dans un journal d'audit et laisse les opérateurs maîtres de leurs clés de modèle, sessions de navigateur et infrastructure de déploiement. Les mêmes bots et routines fonctionnent sur les clients web, desktop et mobile.",
  openHeading: "Ouvert par défaut",
  openBody:
    "Doitx est maintenu par Inbox Zero Inc. et publié sous licence Apache-2.0. Le projet accepte issues et contributions publiques sur GitHub. Pour exécuter Doitx sur votre propre infrastructure, commencez par le guide auto-hébergement. Pour une aide produit ou compte, écrivez à hello@doitx.ai.",
};

/* ─── Portuguese (Brazil) ───────────────────────────────────────────────── */

const PTER_SELF_HOST: SelfHostCopy = {
  title: "Agente de IA Auto-Hospedado (Código Aberto) – Doitx",
  description:
    "Rode a Doitx você mesmo: um agente de IA de código aberto com seus dados, seu modelo e seus custos. Requisitos e etapas de configuração para Docker ou um checkout de fontes.",
  installHead: "Instalação e login",
  installIntro:
    "Em um Mac ou outro computador, execute este único comando e faça login com seu telefone. O app desktop da Doitx instala tudo naquela máquina:",
  startHead: "Iniciando o servidor Doitx",
  startIntro: "Faça login no host e abra o app web ou desktop nele.",
  faqs: [
    {
      question: "Para onde vai a minha chave de modelo?",
      answer:
        "A chave que você adiciona fica no cofre de segredos desse deploy, criptografada. Não é enviada à Inbox Zero e não é retornada pela API.",
    },
    {
      question: "Os bots da Doitx conversam com a xAI ou o Grok?",
      answer:
        "Não. A Doitx é um produto separado. Use o roteador da Doitx ou um modelo compatível com OpenAI executado pelo operador; cada pessoa conecta a própria chave.",
    },
    {
      question: "O que um bot pode fazer sem aprovação?",
      answer:
        "Você define o limite. Rotinas podem pausar para aprovação no passo que você escolher. Toda ação é registrada em um log de auditoria.",
    },
    {
      question: "Duas pessoas podem compartilhar um deploy?",
      answer:
        "Sim. Cada uma faz login com a própria conta e o operador controla quem pode conectar. Bots e rotinas são por usuário.",
    },
    {
      question: "Posso rodar a pilha inteira em uma máquina?",
      answer:
        "Sim. As imagens Docker publicadas rodam em uma única máquina. Você também pode conectar a um servidor que já roda.",
    },
    {
      question: "E se eu estiver em uma rede restrita?",
      answer:
        "Um deploy self-hosted da Doitx pode rodar um endpoint de modelo local em vez de chamar uma API externa. Veja o guia de redes restritas na documentação.",
    },
  ],
};

const PTER_OPENCLAW: OpenClawCopy = {
  h1: "Alternativa de código aberto ao OpenClaw",
  title: "Alternativa de Código Aberto ao OpenClaw – Doitx",
  updated: "7 de outubro de 2026",
  description:
    "Compare Doitx e OpenClaw: configuração, o que roda na sua máquina, operações diárias, provedores de modelo e a licença de código aberto.",
  intro: [
    "A diferença principal é a simplicidade. Assim como o Grok Bot, a Doitx é só chat: você configura o bot e o gerencia por esse chat. O OpenClaw também é de código aberto e auto-hospedado. Seu guia de início é um caminho mais longo: um instalador CLI, um assistente de onboarding, um Gateway que você executa no terminal ou instala como serviço em segundo plano, e um arquivo de configuração.",
    "Não são o mesmo produto, e a Doitx não importa uma configuração do OpenClaw. Esta comparação segue a documentação do OpenClaw e este repositório. Detalhes mudam. Esses documentos são a fonte completa para o OpenClaw.",
  ],
  faqs: [
    {
      question: "Posso rodar a Doitx na minha máquina?",
      answer:
        "Sim. As imagens Docker publicadas rodam em uma única máquina. O app desktop pode iniciar essa pilha localmente ou conectar a um servidor que você já executa.",
    },
    {
      question: "Qual modelo os bots usam?",
      answer:
        "Você escolhe. O roteador da Doitx dá acesso a uma série de modelos; um endpoint local compatível com OpenAI também é suportado. Cada pessoa conecta a própria chave.",
    },
    {
      question: "O que eu controlo?",
      answer:
        "Suas chaves de modelo, suas sessões de navegador e a infraestrutura de deploy. As rotinas são Markdown legível; você pode definir onde um bot pausa para aprovação.",
    },
    {
      question: "É grátis?",
      answer:
        "O código-fonte é Apache-2.0 e está público no GitHub. Você paga pelo uso de modelo e pela infraestrutura. A Doitx Cloud é uma opção hospedada em beta.",
    },
  ],
};

const PTER_ABOUT: AboutCopy = {
  title: "Sobre · Doitx",
  description:
    "Como a Doitx está construindo uma alternativa de código aberto ao Grok Bot que as pessoas podem entender e controlar.",
  h1: "Sobre a Doitx",
  intro:
    "A Doitx é uma alternativa de código aberto ao Grok Bot para colegas de IA persistentes: bots que usam navegador e shell, lembram do trabalho de uma tarefa, executam rotinas em cronograma e pedem aprovação ao chegar a uma fronteira. Projetada para trabalho operacional prático, não para chat pontual.",
  whyHeading: "Por que estamos construindo isso",
  whyBody:
    "Agentes úteis devem ser compreensíveis e controláveis por quem os opera. A Doitx mantém as rotinas em Markdown legível, oferece dois provedores de modelo — o roteador Doitx e um endpoint local —, registra cada ação em um log de auditoria e deixa os operadores no controle das chaves de modelo, sessões de navegador e infraestrutura de implantação. Os mesmos bots e rotinas funcionam nos clientes web, desktop e mobile.",
  openHeading: "Aberto por padrão",
  openBody:
    "A Doitx é mantida pela Inbox Zero Inc. e divulgada sob a licença Apache-2.0. O projeto aceita issues e contribuições públicas no GitHub. Para rodar a Doitx em sua própria infraestrutura, comece pelo guia de auto-hospedagem. Para ajuda com produto ou conta, envie e-mail para hello@doitx.ai.",
};

/* ─── Dutch ──────────────────────────────────────────────────────────────── */

const NL_SELF_HOST: SelfHostCopy = {
  title: "Self-gehoste AI-agent (Open Source) – Doitx",
  description:
    "Uitvoeren van Doitx zelf: een open source AI-agent met uw gegevens, uw model en uw kosten. Vereisten en opstellingsschappen voor Docker of een source checkout.",
  installHead: "Installeren en aanmelden",
  installIntro:
    "Voer op een Mac of een andere computer dit ene commando uit en meld u aan met uw telefoon. De Doitx desktop-app doet de installatie op die machine:",
  startHead: "De Doitx-server starten",
  startIntro:
    "Meld u aan op de host en open de web- of desktop-app op die host.",
  faqs: [
    {
      question: "Waar komt mijn modelkey terecht?",
      answer:
        "De key die u toevoegt, blijft in de secret store van die deploy, versleuteld. Die wordt niet naar Inbox Zero gestuurd en niet door de API teruggegeven.",
    },
    {
      question: "Praaten Doitx-bots met xAI of Grok?",
      answer:
        "Nee. Doitx is een apart product. Gebruik de Doitx-router of een OpenAI-compatibel model dat de operator draait; ieder verbindt eigen key.",
    },
    {
      question: "Wat kan een bot doen zonder goedkeuring?",
      answer:
        "U zet de grens. Routines kunnen pauzeren voor goedkeuring op een door u gekozen stap. Elke actie wordt vastgelegd in een auditlog.",
    },
    {
      question: "Kunnen twee personen één deploy delen?",
      answer:
        "Ja. Ieder meldt zich aan met eigen account en de operator bepaalt wie zich kan verbinden. Bots en routines zijn per gebruiker.",
    },
    {
      question: "Kan ik de hele stack op één machine draaien?",
      answer:
        "Ja. De gepubliceerde Docker-images draaien op één machine. U kunt ook verbinden met een server die u al draait.",
    },
    {
      question: "Wat als ik in een beperkt netwerk zit?",
      answer:
        "Een self-gehoste Doitx-deploy kan een lokaal model-eindpunt draaien in plaats van een externe model-API te roepen. Zie de restricted-networks guide in de docs.",
    },
  ],
};

const NL_OPENCLAW: OpenClawCopy = {
  h1: "Open source-alternatief voor OpenClaw",
  title: "Open Source OpenClaw-alternatief – Doitx",
  updated: "7 oktober 2026",
  description:
    "Vergelijk Doitx en OpenClaw: opstelling, wat op uw machine draait, dagelijkse operatie, modelleveranciers en de open source-licentie.",
  intro: [
    "Het grote verschil is eenvoud. Net als Grok Bot is Doitx puur chat: u stelt de bot in en beheert die via die chat. OpenClaw is ook open source en self-gehost. Die getting-started guide is een langere route: een CLI-installer, een onboarding wizard, een Gateway die u in de terminal draait of als background service installeert, plus een config-bestand.",
    "Het is niet hetzelfde product en Doitx importeert geen OpenClaw-configuratie. Deze vergelijking volgt de OpenClaw-documentatie en deze repository. Details veranderen. Die docs zijn de volledige bron voor OpenClaw.",
  ],
  faqs: [
    {
      question: "Kan ik Doitx op mijn eigen machine draaien?",
      answer:
        "Ja. De gepubliceerde Docker-images draaien op één machine. De desktop-app start die stack lokaal of verbindt met een server die u al draait.",
    },
    {
      question: "Welk model gebruiken de bots?",
      answer:
        "U kiest. De Doitx-router geeft toegang tot een reeks modellen; een lokaal OpenAI-compatibel eindpunt wordt ook ondersteund. Ieder verbindt eigen key.",
    },
    {
      question: "Wat controleer ik?",
      answer:
        "Uw modelkeys, uw browsersessies en de deploy-infrastructuur. Routines zijn leesbaar Markdown; u kunt vaststellen waar een bot pauzeert voor goedkeuring.",
    },
    {
      question: "Is het gratis?",
      answer:
        "De broncode is Apache-2.0 en open op GitHub. U betaalt voor modelgebruik en infrastructuur. Doitx Cloud is een beta-hosteren optie.",
    },
  ],
};

const NL_ABOUT: AboutCopy = {
  title: "Over · Doitx",
  description:
    "Hoe Doitx een open source Grok Bot-alternatief bouwt dat mensen kunnen begrijpen en controleren.",
  h1: "Over Doitx",
  intro:
    "Doitx is een open source Grok Bot-alternatief voor persistente AI-teamgenoten: bots die browser en shell gebruiken, de context van een taak onthouden, routines volgens een schema draaien, en om goedkeuring vragen bij een grens. Het is ontworpen voor praktische operationele taken, niet voor eenmalige chat.",
  whyHeading: "Waarom wij het bouwen",
  whyBody:
    "Nuttige agents moeten begrijpelijk en bestuurbaar zijn voor de mensen die ze draaien. Doitx houdt routines in leesbare Markdown, biedt twee modelaanbieders — de Doitx-router en een lokaal endpoint —, legt elke actie vast in een auditlog en laat operators model sleutels, browsersessies en deployment-infrastructuur zelf beheren. Dezelfde bots en routines werken op web-, desktop- en mobiele clients.",
  openHeading: "Standaard open",
  openBody:
    "Doitx wordt onderhouden door Inbox Zero Inc. en vrijgegeven onder de Apache-2.0-licentie. Het project accepteert publieke issues en bijdragen op GitHub. Om Doitx op uw eigen infrastructuur te draaien, begin bij de self-hosting guide. Voor product- of accountvragen mail naar hello@doitx.ai.",
};

/* ─── Russian ────────────────────────────────────────────────────────────── */

const RU_SELF_HOST: SelfHostCopy = {
  title: "Самохостинг AI-агента (open source) – Doitx",
  description:
    "Запустите Doitx самостоятельно: open source AI-агент с вашими данными, вашей моделью и вашими расходами. Требования и шаги настройки для Docker или исходного кода.",
  installHead: "Установка и вход",
  installIntro:
    "На Mac или другом компьютере выполните эту единственную команду и войдите со своего телефона. Desktop-приложение Doitx выполнит установку на этой машине:",
  startHead: "Запуск сервера Doitx",
  startIntro: "Войдите на хосте, затем откройте веб- или desktop-приложение на этом хосте.",
  faqs: [
    {
      question: "Куда уходит мой ключ модели?",
      answer:
        "Ключ, который вы добавите, остаётся в хранилище секретов этого развёртывания, зашифрованным. Он не отправляется в Inbox Zero и не возвращается через API.",
    },
    {
      question: "Общаются ли боты Doitx с xAI или Grok?",
      answer:
        "Нет. Doitx — отдельный продукт. Используйте маршрутизатор Doitx или OpenAI-совместимую модель, запущенную оператором; каждый подключает свой ключ.",
    },
    {
      question: "Что бот может делать без подтверждения?",
      answer:
        "Границу устанавливаете вы. Рутинные задачи могут останавливаться для подтверждения на выбранном вами шаге. Каждое действие записывается в аудиторский журнал.",
    },
    {
      question: "Можут ли два человека пользоваться одним развёртыванием?",
      answer:
        "Да. Каждый входит со своим аккаунтом, а оператор контролирует, кто может подключиться. Боты и рутинные задачи привязаны к пользователю.",
    },
    {
      question: "Весь стек можно запустить на одной машине?",
      answer:
        "Да. Опубликованные Docker-образы работают на одной машине. Также можно подключиться к уже запущенному серверу.",
    },
    {
      question: "А если в ограниченной сети?",
      answer:
        "Самохостингуемое развёртывание Doitx может запускать локальный эндпоинт модели вместо вызова внешнего API. См. руководство по ограниченным сетям в документации.",
    },
  ],
};

const RU_OPENCLAW: OpenClawCopy = {
  h1: "Open source альтернатива OpenClaw",
  title: "Open Source Альтернатива OpenClaw – Doitx",
  updated: "7 октября 2026",
  description:
    "Сравнение Doitx и OpenClaw: настройка, что работает на вашей машине, повседневная эксплуатация, провайдеры моделей и open source лицензия.",
  intro: [
    "Главное отличие — простота. Как и Grok Bot, Doitx — это просто чат: вы настраиваете бота и управляете им через этот чат. OpenClaw тоже open source и самохостингуется. Его guide — более длинный путь: CLI-установщик, мастер онбординга, Gateway, который запускается в терминале или устанавливается как фоновая служба, и файл конфигурации.",
    "Это не один и тот же продукт, и Doitx не импортирует конфигурацию OpenClaw. Это сравнение следует документации OpenClaw и этому репозиторию. Детали меняются. Эти документы — полный источник для OpenClaw.",
  ],
  faqs: [
    {
      question: "Можно ли запустить Doitx на своей машине?",
      answer:
        "Да. Опубликованные Docker-образы работают на одной машине. Desktop-приложение может запустить этот стек локально или подключиться к уже работающему серверу.",
    },
    {
      question: "Какие модели используют боты?",
      answer:
        "Выбираете вы. Маршрутизатор Doitx даёт доступ к набору моделей; поддерживается и локальный OpenAI-совместимый эндпоинт. Каждый подключает свой ключ.",
    },
    {
      question: "Что я контролирую?",
      answer:
        "Свои ключи моделей, сессии браузера и инфраструктуру развёртывания. Рутинные задачи — читаемый Markdown; вы задаёте, где бот ждёт подтверждения.",
    },
    {
      question: "Это бесплатно?",
      answer:
        "Исходный код — Apache-2.0, открыт на GitHub. Вы платите за использование моделей и инфраструктуру. Doitx Cloud — хостинг-опция в бете.",
    },
  ],
};

const RU_ABOUT: AboutCopy = {
  title: "О нас · Doitx",
  description:
    "Как Doitx создаёт open source альтернативу Grok Bot, которую люди могут понимать и контролировать.",
  h1: "О Doitx",
  intro:
    "Doitx — open source альтернатива Grok Bot для постоянных ИИ-сотрудников: боты, умеющие работать с браузером и shell, помнить контекст задачи, запускать рутинные задачи по расписанию и запрашивать подтверждение при достижении границы. Рассчитан на практичные операционные задачи, а не на разовый чат.",
  whyHeading: "Почему мы это делаем",
  whyBody:
    "Полезные агенты должны быть понятны и подконтрольны тем, кто их эксплуатирует. Doitx хранит рутины в читаемом Markdown, предлагает двух поставщиков моделей — роутер Doitx и локальный endpoint —, записывает каждое действие в журнал аудита и оставляет операторам контроль над ключами моделей, сессиями браузера и инфраструктурой развёртывания. Одни и те же боты и рутины работают в веб-, десктопном и мобильном клиентах.",
  openHeading: "Открытость по умолчанию",
  openBody:
    "Doitx поддерживается Inbox Zero Inc. и выпущен под лицензией Apache-2.0. Проект принимает публичные issue и вклады на GitHub. Чтобы запустить Doitx на своей инфраструктуре, начните с руководства по самохостингу. По продукту или аккаунту пишите на hello@doitx.ai.",
};

/* ─── Turkish ────────────────────────────────────────────────────────────── */

const TR_SELF_HOST: SelfHostCopy = {
  title: "Kendi Barındırmalı AI Ajansı (Açık Kaynak) – Doitx",
  description:
    "Doitx'i kendiniz çalıştırın: verileriniz, modeliniz ve maliyetlerinizle açık kaynak AI ajansı. Docker veya kaynak kontrolü için gereksinimler ve kurulum adımları.",
  installHead: "Kurulum ve oturum açma",
  installIntro:
    "Bir Mac veya başka bilgisayarda bu tek komutu çalıştırın ve telefonunuzla oturum açın. Doitx masaüstü uygulaması kurulumu o makinede yapar:",
  startHead: "Doitx sunucusunu başlatma",
  startIntro: "Ana makinede oturum açın, ardından o ana makinede web veya masaüstü uygulamasını açın.",
  faqs: [
    {
      question: "Model anahtarım nereye gidiyor?",
      answer:
        "Eklediğiniz anahtar, bu dağıtımın gizli depolama alanında şifreli olarak kalır. Inbox Zero'ya gönderilmez ve API tarafından döndürülmez.",
    },
    {
      question: "Doitx ajanları xAI veya Grok ile konuşuyor mu?",
      answer:
        "Hayır. Doitx ayrı bir ürün. Doitx yönlendiricisini veya operatörün çalıştırdığı OpenAI uyumlu modeli kullanın; herkes kendi anahtarını bağlar.",
    },
    {
      question: "Onay beklenmeden bir ajan ne yapabilir?",
      answer:
        "Sınırları siz çizersiniz. Rutinler seçtiğiniz bir adımda onay için duraklayabilir. Her eylem denetim günlüğünde kaydedilir.",
    },
    {
      question: "İki kişi bir dağıtımı paylaşabilir mi?",
      answer:
        "Evet. Herkes kendi hesabıyla oturum açar ve operatör kimin bağlanabileceğini kontrol eder. Ajanlar ve rutinler kullanıcı başınadır.",
    },
    {
      question: "Tüm yığını tek bir makinede çalıştırabilir miyim?",
      answer:
        "Evet. Yayımlanan Docker görüntüleri tek makinede çalışır. Zaten çalıştırdığınız bir sunucuya da bağlanabilirsiniz.",
    },
    {
      question: "Kısıtlı bir ağda ne olur?",
      answer:
        "Kendi barındırmalı bir Doitx dağıtımı, harici bir model API'si çağırmak yerine yerel bir model ucu çalıştırabilir. Sınırlı ağlar kılavuzu için dokümantasyona bakın.",
    },
  ],
};

const TR_OPENCLAW: OpenClawCopy = {
  h1: "Açık kaynak OpenClaw alternatifi",
  title: "Açık Kaynak OpenClaw Alternatifi – Doitx",
  updated: "7 Ekim 2026",
  description:
    "Doitx ve OpenClaw karşılaştırması: kurulum, makinenizde ne çalışır, günlük operasyonlar, model sağlayıcıları ve açık kaynak lisansı.",
  intro: [
    "Ana fark sadeliktir. Grok Bot gibi Doitx de sadece sohbet: ajanı kurar ve o sohbette yönetirsiniz. OpenClaw da açık kaynak ve kendi barındırılmadır. Başlangıç kılavuzu daha uzun bir yol: bir CLI kurucu, bir oryantasyon sihirbazı, terminalde çalıştırdığınız veya arka plan hizmeti olarak kurduğunuz bir Gateway ve bir yapılandırma dosyası.",
    "Aynı ürün değiller ve Doitx bir OpenClaw kurulumu içe aktarmaz. Bu karşılaştırma OpenClaw belgelerini ve bu depoyu izler. Detaylar değişebilir. O belgeler OpenClaw için tam kaynaktır.",
  ],
  faqs: [
    {
      question: "Doitx'i kendi makinemde çalıştırabilir miyim?",
      answer:
        "Evet. Yayımlanan Docker görüntüleri tek makinede çalışır. Masaüstü uygulaması bu yığını yerel olarak başlatabilir veya zaten çalıştırdığınız bir sunucuya bağlanabilir.",
    },
    {
      question: "Ajanlar hangi modeli kullanıyor?",
      answer:
        "Siz seçersiniz. Doitx yönlendiricisi bir dizi modele erişim verir; yerel OpenAI uyumlu bir uc da desteklenir. Herkes kendi anahtarını bağlar.",
    },
    {
      question: "Ne kontrol ediyorum?",
      answer:
        "Model anahtarlarınızı, tarayıcı oturumlarınızı ve dağıtım altyapınızı. Rutinler okunabilir Markdown'dır; bir ajanın onay için duracağı yeri belirleyebilirsiniz.",
    },
    {
      question: "Ücretsiz mi?",
      answer:
        "Kaynak kod Apache-2.0 lisansı ile GitHub'da halka açıktır. Model kullanımınızı ve altyapınızı ödersiniz. Doitx Cloud, beta aşamasındaki barındırma seçeneğidir.",
    },
  ],
};

const TR_ABOUT: AboutCopy = {
  title: "Hakkında · Doitx",
  description:
    "Doitx'in insanların anlayabileceği ve kontrol edebileceği açık kaynak bir Grok Bot alternatifi inşa edişini anlatır.",
  h1: "Doitx Hakkında",
  intro:
    "Doitx, kalıcı AI ekip arkadaşları için açık kaynak bir Grok Bot alternatividir: tarayıcı ve kabuk kullanabilen, bir işin etrafındaki çalışmayı hatırlayan, rutinleri programda çalıştıran ve bir sınırı aşınca onay isteyen ajanlar. Günlük operasyonel işler için tasarlanmıştır, tek seferlik sohbet için değil.",
  whyHeading: "Neden bunu geliştiriyoruz",
  whyBody:
    "Kullanışlı ajanlar, onları işleten kişilerce anlaşılabilir ve kontrol edilebilir olmalıdır. Doitx rutinleri okunabilir Markdown olarak tutar, iki model sağlayıcı sunar — Doitx yönlendiricisi ve yerel bir uç nokta —, her eylemi bir denetim günlüğüne kaydeder ve operatörlerin model anahtarlarını, tarayıcı oturumlarını ve dağıtım altyapısını kendi kontrollerinde tutmasına izin verir. Aynı botlar ve rutinler web, masaüstü ve mobil istemcilerde çalışır.",
  openHeading: "Varsayılan olarak açık",
  openBody:
    "Doitx, Inbox Zero Inc. tarafından geliştirilir ve Apache-2.0 lisansı ile yayınlanır. Proje, GitHub üzerinden herkese açık sorun ve katkıları kabul eder. Doitx'i kendi altyapınızda çalıştırmak için kendi barındırma kılavuzuyla başlayın. Ürün veya hesap yardımı için hello@doitx.ai adresine e-posta atın.",
};

/* ─── Hebrew ─────────────────────────────────────────────────────────────── */

const HE_SELF_HOST: SelfHostCopy = {
  title: "סוכן AI Self-Hosted (קוד פתוח) – Doitx",
  description:
    "הרץ את Doitx בעצמך: סוכן AI בקוד פתוח עם הנתונים שלך, הדגם שלך והעלויות שלך. דרישות ושלבי הקמה ל־Docker או לקופיית מקור.",
  installHead: "התקנה וכניסה",
  installIntro:
    "ב־Mac או במחשב אחר, הרץ את הפקודה היחידה הזו והתחבר עם הטלפון שלך. אפליקציית דסקטופ של Doitx מבצעת את ההתקנה על המכונה הזו:",
  startHead: "הפעלת שרת Doitx",
  startIntro: "התחבר למארח, ואז פתח את האפליקציה בדפדפן או בדסקטופ על המארח.",
  faqs: [
    {
      question: "לאן נשלח המפתח של הדגם שלי?",
      answer:
        "המפתח שמוסיפים נשמר בספריית המטענים של ההצעה הזו, במצומצם. הוא לא נשלח ל־Inbox Zero ולא מוחזר על ידי ה־API.",
    },
    {
      question: "האם בוטי Doitx מתווכנים עם xAI או Grok?",
      answer:
        "לא. Doitx הוא מוצר בנפרד. השתמשו בראוטר של Doitx או בדגם תואם OpenAI שמפעילים; כל אדם מחבר את המפתח שלו.",
    },
    {
      question: "מה בוט יכול לעשות בלי אישור?",
      answer:
        "אתה קובע את הגבול. רובין פגה יכולה לעצור לאישור בשלב שבחרת. כל פעולה נרשמת ביומן בדיקה.",
    },
    {
      question: "האם שני אנשים יכולים לשתף הצעה אחת?",
      answer:
        "כן. כל אחד מתחבר עם החשבון שלו והמפעיל שולט ממי יכול להתחבר. הבוטים והרובינות הם לפי משתמש.",
    },
    {
      question: "האם ניתן להריץ את כל הערימה במכונה אחת?",
      answer:
        "כן. תמונות ה־Docker המפורסמות עובדות במכונה בודדת. אפשר גם להתחבר לשרת שכבר מופעל.",
    },
    {
      question: "מה אם אני ברשת מוגבלת?",
      answer:
        "הצעה self-hosted של Doitx יכולה להפעיל נקודת דגם מקומית במקום לקרוא ל־API חיצוני. ראו מדריך רשתות מוגבלות בתיעוד.",
    },
  ],
};

const HE_OPENCLAW: OpenClawCopy = {
  h1: "חלופה בקוד פתוח ל־OpenClaw",
  title: "חלופה Open Source ל־OpenClaw – Doitx",
  updated: "7 באוקטובר 2026",
  description:
    "השוואה בין Doitx ו־OpenClaw: הקמה, מה רץ על המכונה שלך, תפעול יומי, ספקי דגמים והרישיון בקוד פתוח.",
  intro: [
    "ההבדל המרכזי הוא פשטות. כמו Grok Bot, Doitx הוא רק צ'ט: אתה מציב את הבוט ומנהל אותו דרך אותו צ'ט. OpenClaw גם בקוד פתוח וגם self-hosted. מדריך ההתחלה שלו הוא מסלול ארוך יותר: מתקן CLI, אסיסטנט הנחיה, גייטווי שאתה מריץ במסוף או מתקין כשירות רקע, וקובץ הגדרה.",
    "אלה לא אותו מוצר, ו־Doitx לא ייבא הגדרה של OpenClaw. השוואה זו מנוסת על תיעוד ה־OpenClaw ועל מאגר זה. פרטים משתנים. התיעודים האלה הם המקור המלא ל־OpenClaw.",
  ],
  faqs: [
    {
      question: "האם אפשר להריץ את Doitx על המכונה שלי?",
      answer:
        "כן. תמונות ה־Docker המפורסמות רצות במכונה בודדת. אפליקציית הדסקטופ יכולה להפעיל את הערימה המקומית או להתחבר לשרת שכבר פועל.",
    },
    {
      question: "איזה דגם הבוטים משתמשים בו?",
      answer:
        "אתה בוחר. הרוטר של Doitx נותן גישה למספר דגמים; תומכים גם בנקודת OpenAI מקומית. כל אחד מחבר את המפתח שלו.",
    },
    {
      question: "מה אני שולט בו?",
      answer:
        "מפתחי הדגם שלך, סשני הדפדפן והתשתית. הרובינות הן Markdown קריא; אפשר להגדיר איפה בוט עוצר לאישור.",
    },
    {
      question: "זה חינם?",
      answer:
        "קוד המקור הוא Apache-2.0 ופורסם ב־GitHub. תשלם על שימוש בדגם ועל תשתית. Doitx Cloud הוא אפשרות מנוהלת בבטא.",
    },
  ],
};

const HE_ABOUT: AboutCopy = {
  title: "אודות · Doitx",
  description: "איך Doitx בונה חלופה בקוד פתוח ל־Grok Bot שאנשים יכולים להבין ולשלוט בה.",
  h1: "אודות Doitx",
  intro:
    "Doitx היא חלופה בקוד פתוח ל־Grok Bot לצוותני AI תצפיתיים: בוטים שיכולים להשתמש בדפדפן וב־shell, לזכור את העבודה סביב משימה, להריץ רובינות לפי לו״ז ולהבקש אישור כשמגיעים לגבול. תוכנן לעבודה תפעולית מעשית ולא לצ'ט חד־פעמי.",
  whyHeading: "למה אנחנו בונים את זה",
  whyBody:
    "סוכנים שימושיים צריכים להיות מובנים וניתנים לשליטה בידי מי שמפעיל אותם. Doitx שומר רובינות ב־Markdown קריא, מציע שני ספקי מודלים — ה־router של Doitx ונקודת קצה מקומית —, רושם כל פעולה ביומן ביקורת ומאפשר למפעילים לשמור על שליטה במפתחות מודל, הפעלות דפדפן ותשתית פריסה. אותם בוטים ורובינות עובדים בלקוחות האינטרנט, השולחן העבודה והנייד.",
  openHeading: "פתוח כברירת מחדל",
  openBody:
    "Doitx מנוהל ע״י Inbox Zero Inc. ומשווק תחת רישיון Apache-2.0. הפרויקט מקבל פרויקטים ותרומות פומביות ב־GitHub. כדי להריץ את Doitx על התשתית שלך, התחל ממדריך ה־self-hosting. לעזרה במוצר או בחשבון, שלח דוא״ל ל־hello@doitx.ai.",
};

/* ─── Hindi ──────────────────────────────────────────────────────────────── */

const HI_SELF_HOST: SelfHostCopy = {
  title: "स्व-होस्टेड AI एजेंट (ओपन स्रोत) – Doitx",
  description:
    "Doitx को स्वयं चलाएँ: आपके डेटा, आपके मॉडल, आपके खर्चों के साथ एक ओपन स्रोत AI एजेंट। Docker या स्रोत चेकआउट के लिए आवश्यकताएँ और सेटअप चरण।",
  installHead: "इंस्टॉल और साइन इन करें",
  installIntro:
    "Mac या किसी अन्य कंप्यूटर पर यह एक ही कमांड चलाएँ और अपने फोन से साइन इन करें। Doitx डेस्कटॉप ऐप उसी मशीन पर इंस्टॉलेशन करता है:",
  startHead: "Doitx सर्वर शुरू करना",
  startIntro: "होस्ट पर साइन इन करें, फिर उसी होस्ट पर वेब या डेस्कटॉप ऐप खोलें।",
  faqs: [
    {
      question: "मेरा मॉडल की कहाँ जाता है?",
      answer:
        "जो की आप जोड़ते हैं, वह उस डिप्लॉयमेंट की सीक्रेट स्टोर में एन्क्रिप्टेड रहती है। यह Inbox Zero को भेजी नहीं जाती और API द्वारा लौटाई नहीं जाती।",
    },
    {
      question: "क्या Doitx बॉट xAI या Grok से बात करते हैं?",
      answer:
        "नहीं। Doitx एक अलग प्रोडक्ट है। Doitx रूटर या ऑपरेटर द्वारा चलाने वाले OpenAI-संगत मॉडल का उपयोग करें; हर व्यक्ति अपना की जोड़ता है।",
    },
    {
      question: "बॉट अनुमोजन के बिना क्या कर सकता है?",
      answer:
        "सीमा आपसेट करते हैं। रूटीन आपके चुने कदम पर अनुमोजन हेतु रूक सकते हैं। हर कदम ऑडिट लॉग में दर्ज होता है।",
    },
    {
      question: "क्या दो लोग एक डिप्लॉयमेंट साझा कर सकते हैं?",
      answer:
        "हाँ। हर व्यक्ति अपने अकाउंट से साइन इन करता है और ऑपरेटर नियंत्रित करता है कि कौन कनेक्ट कर सकता है। बॉट और रूटीन उपयोगकर्ता-आधारित हैं।",
    },
    {
      question: "पूरा स्टैक एक मशीन पर चलाया जा सकता है?",
      answer:
        "हाँ। प्रकाशित Docker इमेज एक ही मशीन पर चलती हैं। आप पहले से चल रहे सर्वर से भी कनेक्ट कर सकते हैं।",
    },
    {
      question: "सीमित नेटवर्क में क्या होगा?",
      answer:
        "स्व-होस्टेड Doitx डिप्लॉयमेंट बाहरी मॉडल API के बजाय स्थानीय मॉडल एंडपॉइंट चला सकती है। दस्तावेज़ों में प्रतिबंधित-नेटवर्क गाइड देखें।",
    },
  ],
};

const HI_OPENCLAW: OpenClawCopy = {
  h1: "ओपन स्रोत OpenClaw विकल्प",
  title: "ओपन स्रोत OpenClaw विकल्प – Doitx",
  updated: "7 अक्टूबर 2026",
  description:
    "Doitx और OpenClaw का तुलना: सेटअप, आपकी मशीन पर क्या चलता है, रोज़मर्रा संचालन, मॉडल प्रदाता, ओपन स्रोत लाइसेंस।",
  intro: [
    "मुख्य अंतर सरलता है। Grok Bot की तरह, Doitx बस चैट है: आप बॉट का सेटअप करते हैं और उसी चैट से उसे प्रबंधित करते हैं। OpenClaw भी ओपन स्रोत और स्व-होस्टेड है। उसका getting-started गाइड लंबा रास्ता है: एक CLI इंस्टालर, एक ऑनबोर्डिंग विज़ार्ड, एक Gateway जिसे आप टर्मिनल में चलाते हैं या बैकग्राउंड सेवा के रूप में इंस्टॉल करते हैं, और एक कॉन्फ़िग फ़ाइल।",
    "वे समान प्रोडक्ट नहीं हैं, और Doitx OpenClaw सेटअप आयात नहीं करता। यह तुलना OpenClaw दस्तावेज़ों और इस रिपॉज़िटरी का पालन करती है। विवरण बदलते हैं। वे दस्तावेज़ OpenClaw का पूरा स्रोत हैं।",
  ],
  faqs: [
    {
      question: "क्या मैं Doitx को अपनी मशीन पर चला सकता हूँ?",
      answer:
        "हाँ। प्रकाशित Docker इमेज एक ही मशीन पर चलती हैं। डेस्कटॉप ऐप यह स्टैक स्थानीय रूप से शुरू कर सकती है या पहले से चल रहे सर्वर से कनेक्ट कर सकती है।",
    },
    {
      question: "बॉट किस मॉडल का उपयोग करते हैं?",
      answer:
        "आप चुनते हैं। Doitx रूटर से आप एक श्रृंखला मॉडल तक पहुँच पाते हैं; स्थानीय OpenAI-संगत एंडपॉइंट भी समर्थित है। हर व्यक्ति अपनी की जोड़ता है।",
    },
    {
      question: "मैं क्या नियंत्रित करता हूँ?",
      answer:
        "आपके मॉडल की, ब्राउज़र सत्र, डिप्लॉयमेंट इन्फ्रास्ट्रक्चर। रूटीन पढ़ने योग्य Markdown हैं; आप सट सकती हैं कि बॉट कहां अनुमोजन हेतु रूकेगा।",
    },
    {
      question: "क्या यह मुफ़्त है?",
      answer:
        "स्रोत कोड Apache-2.0 लाइसेंस के अधीन GitHub पर सार्वजनिक है। आप मॉडल उपयोग और इन्फ्रास्ट्रक्चर के लिए भुगतान करते हैं। Doitx Cloud बेटा अवस्था में होस्टेड विकल्प है।",
    },
  ],
};

const HI_ABOUT: AboutCopy = {
  title: "संबंधित · Doitx",
  description:
    "Doitx कैसे एक ओपन स्रोत Grok Bot विकल्प बना रहा है जिसे लोग समझ और नियंत्रित कर सकते हैं।",
  h1: "Doitx के बारे में",
  intro:
    "Doitx स्थायी AI साथियों के लिए एक ओपन स्रोत Grok Bot विकल्प है: बॉट जो ब्राउज़र और shell का उपयोग कर सकते हैं, कार्य के चारों ओर की कार्य याद रख सकते हैं, समय पर रूटीन चला सकते हैं, और सीमा पहुँचने पर अनुमोजन माँग सकते हैं। यह एक-लचका चैट के बजाय व्यावहारिक संचालन कार्य के लिए डिज़ाइन किया गया है।",
  whyHeading: "हम इसे क्यों बना रहे हैं",
  whyBody:
    "उपयोगी एजेंट उन्हें चलाने वाले लोगों द्वारा समझे और नियंत्रित किए जाने चाहिए। Doitx रूटीन को पठनीय Markdown में रखता है, दो मॉडल प्रदाता देता है — Doitx राउटर और एक स्थानीय एंडपॉइंट —, हर क्रिया को ऑडिट लॉग में दर्ज करता है, और ऑपरेटरों को मॉडल कुंजियाँ, ब्राउज़र सत्र और डिप्लॉयमेंट अधोसंरचना अपने नियंत्रण में रखने देता है। वही बॉट और रूटीन वेब, डेस्कटॉप और मोबाइल क्लाइंट पर काम करते हैं।",
  openHeading: "डिफ़ॉल्ट रूप से खुला",
  openBody:
    "Doitx का रखरखाव Inbox Zero Inc. करता है और यह Apache-2.0 लाइसेंस के तहत रिलीज़ किया गया है। परियोजना GitHub पर सार्वजनिक इश्यू और योगदान का स्वागत करती है। Doitx को अपने ढाँचे पर चलाने के लिए, self-hosting गाइड से शुरू करें। उत्पाद या अकाउंट सहायता हेतु hello@doitx.ai पर ईमेल करें।",
};

/* ─── Chinese (Traditional) ──────────────────────────────────────────────── */

const ZHTW_SELF_HOST: SelfHostCopy = {
  title: "自託管 AI 智能體（開源）– Doitx",
  description:
    "自行運行 Doitx：使用你的數據、你的模型、你的成本——一個開源 AI 智能體。了解 Docker 或原始碼部署的需求與設置步驟。",
  installHead: "安裝與登入",
  installIntro:
    "在 Mac 或其他電腦上執行這一條命令，然後用手機登入。Doitx 桌面應用會在那台機器上完成安裝：",
  startHead: "啟動 Doitx 伺服器",
  startIntro: "在伺服器上登入，然後在該伺服器上開啟網頁版或桌面版。",
  faqs: [
    {
      question: "我的模型金鑰會去哪裡？",
      answer:
        "你新增的金鑰會儲存在該部署的密鑰庫中，已加密。不會傳送到 Inbox Zero，也不會透過 API 回傳。",
    },
    {
      question: "Doitx 機器人會與 xAI 或 Grok 通訊嗎？",
      answer:
        "不會。Doitx 是獨立產品。使用 Doitx 路由器或維運方自建的 OpenAI 相容模型；每個人連接自己的金鑰。",
    },
    {
      question: "機器人未經核准能做什麼？",
      answer:
        "你來設定邊界。例行任務可以在你選擇的步驟暫停等待核准。所有操作都會記錄在稽核日誌中。",
    },
    {
      question: "兩個人能共用一個部署嗎？",
      answer:
        "可以。每個人用自己的帳號登入，維運方控制誰可以連接。機器人和例行任務是按使用者劃分的。",
    },
    {
      question: "整套系統能在一台機器上運行嗎？",
      answer:
        "可以。公開的 Docker 映像檔可在單台機器上運行。也可以連接你已經在運行的伺服器。",
    },
    {
      question: "受限網路環境下怎麼辦？",
      answer:
        "自託管的 Doitx 部署可以運行本地模型端點，取代呼叫外部模型 API。詳見文件中的受限網路指南。",
    },
  ],
};

const ZHTW_OPENCLAW: OpenClawCopy = {
  h1: "開源 OpenClaw 替代品",
  title: "開源 OpenClaw 替代品 – Doitx",
  updated: "2026年10月7日",
  description:
    "比較 Doitx 與 OpenClaw：安裝、機器上運行什麼、日常操作、模型供應商、開源授權條款。",
  intro: [
    "主要差異在於簡潔。和 Grok Bot 一樣，Doitx 就是聊天：你設定機器人，然後透過聊天管理它。OpenClaw 也是開源、自託管的。它的入門指南路徑較長：一個 CLI 安裝器、一個引導精靈、一個在終端運行或作為背景服務安裝的 Gateway，以及一個設定檔。",
    "兩者並非同一產品，Doitx 也不匯入 OpenClaw 設定。本比較遵循 OpenClaw 的文件和本程式庫。細節會變化。那些文件是 OpenClaw 的完整資訊來源。",
  ],
  faqs: [
    {
      question: "我能在自己的機器上運行 Doitx 嗎？",
      answer:
        "可以。公開的 Docker 映像檔可在單台機器上運行。桌面應用可以本地啟動整套系統，也可以連接你已經在運行的伺服器。",
    },
    {
      question: "機器人使用什麼模型？",
      answer:
        "由你選擇。Doitx 路由器讓你存取一系列模型；也支援本地 OpenAI 相容端點。每個人連接自己的金鑰。",
    },
    {
      question: "我能控制什麼？",
      answer:
        "你的模型金鑰、瀏覽器工作階段、部署基礎設施。例行任務是可讀取的 Markdown 檔案；你可以設定機器人在哪裡暫停等待核准。",
    },
    {
      question: "免費嗎？",
      answer:
        "原始碼在 GitHub 上以 Apache-2.0 授權條款公開。你只需為模型使用量和基礎設施付費。Doitx Cloud 是 beta 版的託管選項。",
    },
  ],
};

const ZHTW_ABOUT: AboutCopy = {
  title: "關於 · Doitx",
  description: "Doitx 如何打造一個人們能理解、能掌控的開源 Grok Bot 替代品。",
  h1: "關於 Doitx",
  intro:
    "Doitx 是一個開源的 Grok Bot 替代品，面向持久型 AI 隊友：能夠使用瀏覽器與終端、記住工作脈絡、依排程運行例行任務、在觸及邊界時請求核准的機器人。它面向實際營運工作，而非一次性對話。",
  whyHeading: "我們為什麼做這件事",
  whyBody:
    "有用的代理應該能被使用它的人理解與掌控。Doitx 將例行任務保存為可讀的 Markdown，提供兩種模型來源——Doitx 路由器與本機端點，把每個動作記入稽核日誌，並讓維運方自行掌控模型金鑰、瀏覽器工作階段與部署基礎設施。同一批機器人與例行任務在網頁版、桌面版與行動端都能使用。",
  openHeading: "預設開放",
  openBody:
    "Doitx 由 Inbox Zero Inc. 維護，以 Apache-2.0 授權條款發布。專案在 GitHub 上接受公開的 issue 和貢獻。要在自己的基礎設施上運行 Doitx，請從自託管指南開始。產品或帳號問題請聯絡 hello@doitx.ai。",
};

/* ─── Record + getters ───────────────────────────────────────────────────── */

export const SELF_HOST_COPY: Record<Locale, SelfHostCopy> = {
  en: EN_SELF_HOST,
  de: DE_SELF_HOST,
  ko: KO_SELF_HOST,
  zh: ZH_SELF_HOST,
  ja: JA_SELF_HOST,
  es: ES_SELF_HOST,
  fr: FR_SELF_HOST,
  "pt-br": PTER_SELF_HOST,
  nl: NL_SELF_HOST,
  ru: RU_SELF_HOST,
  tr: TR_SELF_HOST,
  he: HE_SELF_HOST,
  hi: HI_SELF_HOST,
  "zh-tw": ZHTW_SELF_HOST,
};

export const OPENCLAW_COPY: Record<Locale, OpenClawCopy> = {
  en: EN_OPENCLAW,
  de: DE_OPENCLAW,
  ko: KO_OPENCLAW,
  zh: ZH_OPENCLAW,
  ja: JA_OPENCLAW,
  es: ES_OPENCLAW,
  fr: FR_OPENCLAW,
  "pt-br": PTER_OPENCLAW,
  nl: NL_OPENCLAW,
  ru: RU_OPENCLAW,
  tr: TR_OPENCLAW,
  he: HE_OPENCLAW,
  hi: HI_OPENCLAW,
  "zh-tw": ZHTW_OPENCLAW,
};

export const ABOUT_COPY: Record<Locale, AboutCopy> = {
  en: EN_ABOUT,
  de: DE_ABOUT,
  ko: KO_ABOUT,
  zh: ZH_ABOUT,
  ja: JA_ABOUT,
  es: ES_ABOUT,
  fr: FR_ABOUT,
  "pt-br": PTER_ABOUT,
  nl: NL_ABOUT,
  ru: RU_ABOUT,
  tr: TR_ABOUT,
  he: HE_ABOUT,
  hi: HI_ABOUT,
  "zh-tw": ZHTW_ABOUT,
};

export function getSelfHostCopy(locale: Locale): SelfHostCopy {
  return SELF_HOST_COPY[locale];
}

export function getOpenClawCopy(locale: Locale): OpenClawCopy {
  return OPENCLAW_COPY[locale];
}

export function getAboutCopy(locale: Locale): AboutCopy {
  return ABOUT_COPY[locale];
}
