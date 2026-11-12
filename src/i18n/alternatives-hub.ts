// Marketing copy for the alternatives hub.
import type { Locale } from "./locales";
import { rootSlug } from "./locales";

export type AlternativesHubCopy = {
  title: string;
  hubLabel: string;
  metaDescription: string;
  h1: string;
  introLead: string;
  introTail: string;
  getStarted: {
    intro: string;
    stepHead: string;
    stepBody: string;
    startTitle: string;
    startBody: string;
    githubLabel: string;
  };
  openSourceReasons: string[];
  cards: readonly {
    slug: string;
    title: string;
    description: string;
  }[];
  roundupUpdated: string;
  /** Label for the "Updated {date}" line on the compare page. */
  updatedLabel: string;
  /** Column header for the "Topic" column in the compare table. */
  topicLabel: string;
  /** Heading for the reasons section on the compare page. */
  openSourceHeading: string;
  /** Heading for the sources list on the compare page. */
  sourcesHeading: string;
};

export const ALTERNATIVES_HUB_COPY: Record<Locale, AlternativesHubCopy> = {
  en: {
    title: "Personal AI Agents 2026: Doitx vs OpenClaw, Hermes, Grok Bot & More",
    hubLabel: "Alternatives",
    metaDescription:
      "Compare Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro, and Claude Duet in 2026, covering deployment options, licenses, memory, and pricing.",
    h1: "Best Personal AI Agents in 2026: Grok Bot, Muse, Dots, Instinct, Hark Pro & More",
    introLead:
      "Doitx is a private AI agent platform for people and teams that want AI teammates on infrastructure they control. Pick the tool that matches how you will operate it:",
    introTail:
      "Doitx, OpenClaw, and Hermes Agent run on your own infrastructure; Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro, and Claude Duet are hosted products.",
    getStarted: {
      intro: "Deployment starts with one command and one key.",
      stepHead: "Install and sign in",
      stepBody: "The installer pulls published images, starts the stack, and opens the browser.",
      startTitle: "Start Doitx",
      startBody:
        "Connect a model or use the built-in gateway, add the tools a bot may touch, and invite people by email.",
      githubLabel: "View on GitHub",
    },
    openSourceReasons: [
      "The whole source ships in one public repository.",
      "The license lets a business run, resell, and embed the product.",
      "No company or model vendor sits between you and the code.",
      "The server runs in Docker and connects to the model you already pay for.",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description: "xAI's hosted personal agent. Use a computer, run routines, and get approvals inside a paid plan.",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "Meta's hosted agent on a Meta-operated virtual machine, introduced September 8, 2026, reachable through the Muse app or WhatsApp.",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "Always-on personal agents on eligible ChatGPT plans, announced September 29, 2026. Each dot gets its own cloud computer.",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description: "The hosted assistant at instinct.com, operated by Spear Street Technology, Inc., that you text or call.",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "Nous Research's agent. A desktop app plus an optional standalone gateway, and every skill is an editable file.",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "Anthropic's proactive personal agent, released as a research preview on October 21, 2026. It runs on a cloud computer and ships with Claude Pro and Max in the US.",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "The hosted personal agent at hark.com, launched October 6, 2026. A free tier plus $20 or $100 monthly tiers that scale usage 2× or 10×.",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "A free agent you run yourself, with a browser, skills, and a Gateway in its docs. OpenClaw is not affiliated with Doitx.",
      },
    ],
    roundupUpdated: "November 3, 2026",
    updatedLabel: "Updated",
    topicLabel: "Topic",
    openSourceHeading: "Why a private deployment",
    sourcesHeading: "Sources",
  },
  de: {
    title: "Persönliche KI-Agenten 2026: Doitx vs. OpenClaw, Hermes, Grok Bot & mehr",
    hubLabel: "Alternativen",
    metaDescription:
      "Vergleiche 2026 Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro und Claude Duet — mit Fokus auf Deployment-Optionen, Lizenzen, Gedächtnis und Preise.",
    h1: "Die besten persönlichen KI-Agenten 2026: Grok Bot, Muse, Dots, Instinct, Hark Pro & mehr",
    introLead:
      "Doitx ist eine Plattform für private KI-Agenten, für Menschen und Teams, die KI-Teams auf eigener Infrastruktur wollen. Wählen Sie das Werkzeug, das zu Ihrer Arbeitsweise passt:",
    introTail:
      "Doitx, OpenClaw und Hermes Agent laufen auf eigener Infrastruktur; Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro und Claude Duet sind gehostete Produkte.",
    getStarted: {
      intro: "Der Start mit privater Installation besteht aus einem Befehl und einem Schlüssel.",
      stepHead: "Installieren und anmelden",
      stepBody: "Der Installer zieht veröffentlichte Images, startet den Stack und öffnet den Browser.",
      startTitle: "Doitx starten",
      startBody:
        "Verbinden Sie ein Modell oder nutzen Sie das integrierte Gateway, fügen Sie die Tools hinzu, die ein Bot nutzen darf, und laden Sie Personen per E-Mail ein.",
      githubLabel: "Auf GitHub ansehen",
    },
    openSourceReasons: [
      "Der gesamte Quellcode liegt in einem öffentlichen Repository.",
      "Die Lizenz erlaubt es Unternehmen, das Produkt zu betreiben, weiterzuverkaufen und einzubetten.",
      "Kein Unternehmen und kein Modell-Anbieter steht zwischen Ihnen und dem Code.",
      "Der Server läuft in Docker und verbindet sich mit dem Modell, für das Sie bereits zahlen.",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description: "Der gehostete persönliche Agent von xAI. Nutzt einen Computer, führt Routinen aus und holt Freigaben innerhalb eines kostenpflichtigen Plans ab.",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "Der gehostete Agent von Meta auf einer von Meta betriebenen Virtuellen Maschine, vorgestellt am 8. September 2026, erreichbar über die Muse-App oder WhatsApp.",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "Immer aktive persönliche Agenten für berechtigte ChatGPT-Pläne, angekündigt am 29. September 2026. Jeder Dot bekommt einen eigenen Cloud-Computer.",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description: "Der gehostete Assistent unter instinct.com, betrieben von Spear Street Technology, Inc., den man anrufen oder ihm per SMS schreiben kann.",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "Der Agent von Nous Research. Eine Desktop-App plus optionaler eigenständiger Gateway, und jede Fähigkeit ist eine editierbare Datei.",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "Der proaktive persönliche Agent von Anthropic, am 21. Oktober 2026 als Forschungs-Vorschau veröffentlicht. Er läuft auf einem Cloud-Computer und wird in den USA mit Claude Pro und Max ausgeliefert.",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "Der gehostete persönliche Agent unter hark.com, gestartet am 6. Oktober 2026. Ein kostenloser Tarif plus monatliche Tarife für 20 oder 100 US-Dollar, die den Verbrauch 2× bzw. 10× skalieren.",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "Ein kostenloser Agent, den Sie selbst betreiben, mit Browser, Fähigkeiten und einer Gateway in den Doku. OpenClaw ist nicht mit Doitx verbunden.",
      },
    ],
    roundupUpdated: "3. November 2026",
    updatedLabel: "Aktualisiert",
    topicLabel: "Thema",
    openSourceHeading: "Warum eine private Implementierung",
    sourcesHeading: "Quellen",
  },
  ko: {
    title: "개인 AI 에이전트 2026: Doitx vs OpenClaw, Hermes, Grok Bot 외",
    hubLabel: "대안",
    metaDescription:
      "2026년 Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro, Claude Duet를 비교합니다. 프라이빗 배포, 라이선스, 메모리, 가격을 다룹니다.",
    h1: "2026년 최고의 개인 AI 에이전트: Grok Bot, Muse, Dots, Instinct, Hark Pro & 그 외",
    introLead:
      "Doitx는 자신이 통제하는 인프라 위에서 AI 팀원을 쓰는 개인과 팀을 위한 프라이빗 AI 에이전트 플랫폼입니다. 운영 방식에 맞는 도구를 고르세요:",
    introTail:
      "Doitx, OpenClaw, Hermes Agent는 자체 인프라에서 실행됩니다. Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro, Claude Duet는 호스팅된 제품입니다.",
    getStarted: {
      intro: "프라이빗 배포 시작은 명령어 하나와 키 하나입니다.",
      stepHead: "설치하고 로그인",
      stepBody: "인스톨러가 공개된 이미지를 가져오고 스택을 시작하며 브라우저가 열립니다.",
      startTitle: "Doitx 시작하기",
      startBody:
        "모델을 연결하거나 내장 게이트웨이를 쓰고, 봇이 건드릴 도구를 추가하고, 이메일로 사람을 초대하세요.",
      githubLabel: "GitHub에서 보기",
    },
    openSourceReasons: [
      "모든 코드가 한 개의 공개 저장소에 담겨 있습니다.",
      "라이선스가 기업이 제품을 운영, 재판매, 임베딩할 수 있게 합니다.",
      "코드와 사이에서 회사나 모델 공급사가 끼지 않습니다.",
      "서버는 Docker에서 돌며 이미 내는 비용의 모델에 연결됩니다.",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description: "xAI의 호스팅된 개인 에이전트. 유료 플랜 안에서 컴퓨터를 쓰고, 루틴을 실행하고, 승인을 받습니다.",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "2026년 9월 8일 소개된 Meta가 운영하는 가상 머신 위의 호스팅된 에이전트. Muse 앱이나 WhatsApp으로 접근합니다.",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "2026년 9월 29일 발표한 대상 ChatGPT 플랜의 상시 개인 에이전트. 각 도트는 전용 클라우드 컴퓨터를 갖습니다.",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description: "Spear Street Technology, Inc.가 운영하는 instinct.com의 호스팅된 어시스턴트. 문자나 통화로 찾습니다.",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "Nous Research 에이전트. 데스크톱 앱과 선택 가능한 독립 게이트웨이가 있고, 모든 스킬은 편집 가능한 파일입니다.",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "2026년 10월 21일 리서치 프리뷰로 공개된 Anthropic의 프로액티브 개인 에이전트. 클라우드 컴퓨터에서 돌고 미국에서는 Claude Pro와 Max에 포함됩니다.",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "2026년 10월 6일 출시된 hark.com의 호스팅된 개인 에이전트. 무료 등급 외에 월 20/100달러 등급으로 사용량을 2배/10배로 올립니다.",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "브라우저, 스킬, 문서 속 게이트웨이를 갖춘 무료 에이전트로 직접 운영합니다. OpenClaw는 Doitx와 무관합니다.",
      },
    ],
    roundupUpdated: "2026년 11월 3일",
    updatedLabel: "갱신됨",
    topicLabel: "주제",
    openSourceHeading: "프라이빗 배포를 고르는 이유",
    sourcesHeading: "출처",
  },
  zh: {
    title: "2026 个人 AI 智能体：Doitx 对比 OpenClaw、Hermes、Grok Bot 等",
    hubLabel: "替代品",
    metaDescription:
      "2026 年对比 Doitx、OpenClaw、Hermes Agent、Grok Bot、Meta Muse、OpenAI Dots、Instinct、Hark Pro 与 Claude Duet，涵盖私有部署、许可证、记忆与定价。",
    h1: "2026 年最佳个人 AI 智能体：Grok Bot、Muse、Dots、Instinct、Hark Pro 等",
    introLead: "Doitx 是面向希望在自己掌控的基础设施上运行 AI 队友的个人与团队的私有 AI 智能体平台。选择与你的使用方式匹配的工具：",
    introTail:
      "Doitx、OpenClaw 和 Hermes Agent 运行在自有基础设施上；Grok Bot、Meta Muse、OpenAI Dots、Instinct、Hark Pro 和 Claude Duet 是托管产品。",
    getStarted: {
      intro: "私有部署的起步只是一条命令和一个密钥。",
      stepHead: "安装并登录",
      stepBody: "安装程序拉取已发布的镜像、启动整套服务并打开浏览器。",
      startTitle: "启动 Doitx",
      startBody: "连接一个模型或使用内置网关，添加工具、按电子邮件邀请成员。",
      githubLabel: "在 GitHub 查看",
    },
    openSourceReasons: [
      "全部源码都在一个公开仓库中。",
      "许可证允许企业运行、转售和嵌入该产品。",
      "你和代码之间没有任何公司或模型供应商。",
      "服务端跑在 Docker 中，连接你已在付费的模型。",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description: "xAI 的托管个人智能体。使用一台计算机、运行例行任务，并在付费计划中获取审批。",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "Meta 托管的智能体，运行在 Meta 操作的虚拟机上，2026 年 9 月 8 日公布，可通过 Muse 应用或 WhatsApp 联系。",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "2026 年 9 月 29 日宣布的面向符合条件 ChatGPT 套餐的常驻个人智能体。每个 Dots 都有自己的云端计算机。",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description: "instinct.com 的托管助手，由 Spear Street Technology, Inc. 运营，可通过短信或电话联系。",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description: "Nous Research 的智能体。桌面应用加可选的独立网关，且每个技能都是一个可编辑文件。",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "Anthropic 的主动式个人智能体，2026 年 10 月 21 日以研究预览发布。它运行在云端计算机上，在美国随 Claude Pro 和 Max 提供。",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "hark.com 的托管个人智能体，2026 年 10 月 6 日上线。提供免费档位，另加 20 或 100 美元月档，把使用量扩大 2 倍或 10 倍。",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "一个免费的智能体，由你自己运行，带浏览器、技能和文档中的网关。OpenClaw 与 Doitx 无关。",
      },
    ],
    roundupUpdated: "2026 年 11 月 3 日",
    updatedLabel: "更新于",
    topicLabel: "主题",
    openSourceHeading: "为什么选择私有部署",
    sourcesHeading: "资料来源",
  },
  ja: {
    title: "パーソナル AI エージェント 2026: Doitx vs OpenClaw, Hermes, Grok Bot など",
    hubLabel: "代替案",
    metaDescription:
      "2026年に Doitx、OpenClaw、Hermes Agent、Grok Bot、Meta Muse、OpenAI Dots、Instinct、Hark Pro、Claude Duet を比較。デプロイオプション、ライセンス、メモリ、価格を取り扱います。",
    h1: "2026 年おすすめのパーソナル AI エージェント: Grok Bot, Muse, Dots, Instinct, Hark Pro ほか",
    introLead:
      "Doitx は、自分たちが管理するインフラで AI チームメンバーを動かしたい個人やチームのためのプライベートな AI エージェント基盤です。運用方法に合うツールを選んでください:",
    introTail:
      "Doitx、OpenClaw、Hermes Agent は自社インフラで動作します。Grok Bot、Meta Muse、OpenAI Dots、Instinct、Hark Pro、Claude Duet はホスティング製品です。",
    getStarted: {
      intro: "プライベートデプロイの開始は、コマンドとキーが一つずつです。",
      stepHead: "インストールしてサインイン",
      stepBody: "インストーラーが公開されているイメージを取得し、スタックを起動してブラウザを開きます。",
      startTitle: "Doitx を開始",
      startBody:
        "モデルを接続するか組み込みのゲートウェイを使い、ボットが触れるツールを追加し、メールでメンバーを招待します。",
      githubLabel: "GitHub で見る",
    },
    openSourceReasons: [
      "すべてのソースコードが一つの公開リポジトリに入っています。",
      "ライセンスで企業は製品を運営、再販、組み込みできます。",
      "あなたとコードの間に、会社もモデルベンダーも挟まりません。",
      "サーバーは Docker で動き、すでに支払っているモデルに接続します。",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description: "xAI のホスティング型パーソナルエージェント。有料プラン内でコンピュータを使い、ルーティンを実行し、承認を取得します。",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "2026 年 9 月 8 日に発表された、Meta が運営する仮想マシン上の Meta のホスティング型エージェント。Muse アプリや WhatsApp から利用できます。",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "2026 年 9 月 29 日に発表された、対象 ChatGPT プラン向けの常時稼働パーソナルエージェント。各ドットは独自のクラウドコンピュータを持ちます。",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description:
          "Spear Street Technology, Inc. が運営する instinct.com のホスティング型アシスタント。テキストや通話で利用できます。",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "Nous Research 製エージェント。デスクトップアプリとオプションの独立ゲートウェイがあり、すべてのスキルは編集可能なファイルです。",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "2026 年 10 月 21日にリサーチプレビューとして公開された Anthropic のプロアクティブなパーソナルエージェント。クラウドコンピュータ上で動き、米国では Claude Pro と Max に付属します。",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "2026 年 10 月 6日にローンチされた hark.com のホスティング型パーソナルエージェント。無料プランのほか、月額 20/100 ドラールのプランで使用量を 2 倍/10 倍にします。",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "ブラウザ、スキル、ドキュメント内のゲートウェイを備えた無料で自分で運用するエージェント。OpenClaw は Doitx と関係ありません。",
      },
    ],
    roundupUpdated: "2026 年 11 月 3 日",
    updatedLabel: "更新",
    topicLabel: "項目",
    openSourceHeading: "プライベートデプロイメントの理由",
    sourcesHeading: "出典",
  },
  es: {
    title: "Agentes de IA personales 2026: Doitx frente a OpenClaw, Hermes, Grok Bot y más",
    hubLabel: "Alternativas",
    metaDescription:
      "Compara Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro y Claude Duet en 2026, cubriendo opciones de despliegue, licencias, memoria y precios.",
    h1:
      "Los mejores agentes de IA personales en 2026: Grok Bot, Muse, Dots, Instinct, Hark Pro y más",
    introLead:
      "Doitx es una plataforma de agentes de IA privados para personas y equipos que quieren compañeres de IA en infraestructura que controlen. Elige la herramienta que encaje con tu forma de operar:",
    introTail:
      "Doitx, OpenClaw y Hermes Agent se ejecutan en infraestructura propia; Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro y Claude Duet son productos alojados.",
    getStarted: {
      intro: "El arranque con instalación privada es un comando y una clave.",
      stepHead: "Instala y entra",
      stepBody: "El instalador descarga imágenes publicadas, arranca el conjunto y abre el navegador.",
      startTitle: "Arranca Doitx",
      startBody:
        "Conecta un modelo o usa el gateway incluido, añade las herramientas que puede usar un bot e invita personas por correo.",
      githubLabel: "Ver en GitHub",
    },
    openSourceReasons: [
      "Todo el código fuente se entrega en un repositorio público.",
      "La licencia permite a una empresa ejecutar, revender e integrar el producto.",
      "Ninguna empresa ni proveedor de modelos se interpone entre tú y el código.",
      "El servidor corre en Docker y se conecta al modelo que ya pagas.",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description:
          "El agente personal alojado de xAI. Usa un ordenador, ejecuta rutinas y obtiene aprobaciones dentro de un plan de pago.",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "El agente alojado de Meta en una máquina virtual gestionada por Meta, presentado el 8 de septiembre de 2026, al que puedes llegar por la app Muse o por WhatsApp.",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "Agentes personales siempre activos en planes de ChatGPT elegibles, anunciados el 29 de septiembre de 2026. Cada dot dispone de su propio ordenador en la nube.",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description:
          "El asistente alojado en instinct.com, operado por Spear Street Technology, Inc., al que escribes o llamas.",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "El agente de Nous Research. Una app de escritorio más una puerta de enlace opcional e independiente; cada habilidad es un archivo que puedes editar.",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "El agente personal proactivo de Anthropic, publicado el 21 de octubre de 2026 como vista previa de investigación. Corre en un ordenador en la nube y se incluye con Claude Pro y Max en Estados Unidos.",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "El agente personal alojado en hark.com, lanzado el 6 de octubre de 2026. Un nivel gratuito y otros de 20 o 100 dólares al mes que multiplican el uso por 2 o por 10.",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "Un agente gratuito que ejecutas tú, con un navegador, habilidades y una puerta de enlace en su documentación. OpenClaw no tiene relación con Doitx.",
      },
    ],
    roundupUpdated: "3 de noviembre de 2026",
    updatedLabel: "Actualizado",
    topicLabel: "Tema",
    openSourceHeading: "Por qué una implementación privada",
    sourcesHeading: "Fuentes",
  },
  fr: {
    title: "Agents IA personnels 2026 : Doitx face à OpenClaw, Hermes, Grok Bot et plus",
    hubLabel: "Alternatives",
    metaDescription:
      "Comparez Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro et Claude Duet en 2026, avec les options de déploiement, les licences, la mémoire et les prix.",
    h1:
      "Les meilleurs agents IA personnels en 2026 : Grok Bot, Muse, Dots, Instinct, Hark Pro et plus",
    introLead:
      "Doitx est une plateforme d'agents IA privés pour les personnes et les équipes qui veulent des coéquipiers IA sur des infrastructures qu'elles contrôlent. Choisissez l'outil qui correspond à votre façon de l'exploiter :",
    introTail:
      "Doitx, OpenClaw et Hermes Agent fonctionnent sur votre propre infrastructure ; Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro et Claude Duet sont des produits hébergés.",
    getStarted: {
      intro: "Le démarrage en déploiement privé tient dans une commande et une clé.",
      stepHead: "Installer et se connecter",
      stepBody:
        "L'installeur récupère les images publiées, démarre la pile et ouvre le navigateur.",
      startTitle: "Démarrer Doitx",
      startBody:
        "Connectez un modèle ou utilisez la passerelle intégrée, ajoutez les outils qu'un bot peut utiliser, et invitez des personnes par e-mail.",
      githubLabel: "Voir sur GitHub",
    },
    openSourceReasons: [
      "Toute la source est livrée dans un dépôt public.",
      "La licence permet à une entreprise de faire tourner, revendre et intégrer le produit.",
      "Aucune société ni aucun fournisseur de modèle ne se place entre vous et le code.",
      "Le serveur tourne dans Docker et se connecte au modèle que vous payez déjà.",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description:
          "L'agent personnel hébergé de xAI. Il utilise un ordinateur, exécute des routines et obtient des validations dans un abonnement payant.",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "L'agent hébergé de Meta, sur une machine virtuelle exploitée par Meta, présenté le 8 septembre 2026, accessible via l'application Muse ou WhatsApp.",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "Des agents personnels permanents sur les abonnements ChatGPT éligibles, annoncés le 29 septembre 2026. Chaque dot a son propre ordinateur dans le cloud.",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description:
          "L'assistant hébergé sur instinct.com, exploité par Spear Street Technology, Inc., que vous appelez ou à qui vous écrivez.",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "L'agent de Nous Research. Une application de bureau et une passerelle autonome optionnelle ; chaque compétence est un fichier modifiable.",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "L'agent personnel proactif d'Anthropic, publié en aperçu de recherche le 21 octobre 2026. Il tourne sur un ordinateur dans le cloud et est fourni avec Claude Pro et Max aux États-Unis.",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "L'agent personnel hébergé sur hark.com, lancé le 6 octobre 2026. Un niveau gratuit, plus des niveaux à 20 ou 100 dollars par mois qui multiplient l'usage par 2 ou par 10.",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "Un agent gratuit que vous exécutez vous-même, avec un navigateur, des compétences et une passerelle dans sa documentation. OpenClaw n'est pas affilié à Doitx.",
      },
    ],
    roundupUpdated: "3 novembre 2026",
    updatedLabel: "Mis à jour",
    topicLabel: "Sujet",
    openSourceHeading: "Pourquoi une déploiement privé",
    sourcesHeading: "Sources",
  },
  "pt-br": {
    title: "Agentes de IA pessoais 2026: Doitx vs OpenClaw, Hermes, Grok Bot e mais",
    hubLabel: "Alternativas",
    metaDescription:
      "Compare Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro e Claude Duet em 2026, cobrindo implantação privada, licencas, memoria e precos.",
    h1:
      "Os melhores agentes de IA pessoais em 2026: Grok Bot, Muse, Dots, Instinct, Hark Pro e alternativas de codigo aberto",
    introLead:
      "Doitx e uma plataforma de agentes de IA privados para pessoas e equipes que querem times de IA em infraestrutura que controlam. Escolha a ferramenta que combina com a forma como voce vai opera-la:",
    introTail:
      "Doitx, OpenClaw e Hermes Agent sao de codigo aberto; Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro e Claude Duet sao produtos hospedados.",
    getStarted: {
      intro: "O inicio com instalacao privada e um comando e uma chave.",
      stepHead: "Instale e faca login",
      stepBody:
        "O instalador baixa imagens publicadas, inicia a pilha e abre o navegador.",
      startTitle: "Comecar o Doitx",
      startBody:
        "Conecte um modelo ou use o gateway embutido, adicione as ferramentas que um bot pode usar e convide pessoas por e-mail.",
      githubLabel: "Ver no GitHub",
    },
    openSourceReasons: [
      "Todo o codigo-fonte vem em um repositorio publico.",
      "A licenca permite a um negocio executar, revender e incorporar o produto.",
      "Nenhuma empresa ou fornecedor de modelo fica entre voce e o codigo.",
      "O servidor roda em Docker e se conecta ao modelo que voce ja paga.",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description:
          "O agente pessoal hospedado da xAI. Usa um computador, executa rotinas e obtem aprovacoes dentro de um plano pago.",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "O agente hospedado da Meta, em uma maquina virtual operada pela Meta, apresentado em 8 de setembro de 2026, alcancavel pelo app Muse ou pelo WhatsApp.",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "Agentes pessoais sempre ativos em planos de ChatGPT elegiveis, anunciados em 29 de setembro de 2026. Cada dot tem seu proprio computador na nuvem.",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description:
          "O assistente hospedado em instinct.com, operado pela Spear Street Technology, Inc., com quem voce conversa por mensagem ou ligacao.",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "O agente da Nous Research. Um app de desktop mais um gateway independente opcional, e cada habilidade e um arquivo editavel.",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "O agente pessoal proativo da Anthropic, lançado em 21 de outubro de 2026 como pré-visualização de pesquisa. Roda em um computador na nuvem e acompanha o Claude Pro e Max nos EUA.",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "O agente pessoal hospedado em hark.com, lançado em 6 de outubro de 2026. Um nivel gratuito mais niveis mensais de 20 ou 100 dolares que multiplicam o uso por 2 ou por 10.",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "Um agente gratuito que voce executa, com navegador, habilidades e um gateway na documentacao. O OpenClaw nao tem relacao com o Doitx.",
      },
    ],
    roundupUpdated: "3 de novembro de 2026",
    updatedLabel: "Atualizado",
    topicLabel: "Tema",
    openSourceHeading: "Por que uma implementação privada",
    sourcesHeading: "Fontes",
  },
  nl: {
    title: "Persoonlijke AI-agenten 2026: Doitx vs. OpenClaw, Hermes, Grok Bot & meer",
    hubLabel: "Alternatieven",
    metaDescription:
      "Vergelijk in 2026 Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro en Claude Duet, over deployment-opties, licenties, geheugen en prijs.",
    h1:
      "De beste persoonlijke AI-agenten in 2026: Grok Bot, Muse, Dots, Instinct, Hark Pro & meer",
    introLead:
      "Doitx is een platform voor private AI-agenten voor mensen en teams die AI-teamgenoten willen op infrastructuur die zij controleren. Kies het tool dat past bij hoe je het gaat exploiteren:",
    introTail:
      "Doitx, OpenClaw en Hermes Agent draaien op jouw eigen infrastructuur; Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro en Claude Duet zijn gehoste producten.",
    getStarted: {
      intro: "De start met private installatie is één opdracht en één sleutel.",
      stepHead: "Installeren en aanmelden",
      stepBody:
        "De installatiehaal gehaalde images, start de stack en opent de browser.",
      startTitle: "Start Doitx",
      startBody:
        "Koppel een model of gebruik de ingebouwde gateway, voeg de tools toe die een bot mag raken en nodig mensen per e-mail uit.",
      githubLabel: "Bekijk op GitHub",
    },
    openSourceReasons: [
      "De volledige broncode zit in één openbare repository.",
      "De licentie staat een bedrijf toe het product te draaien, te herverkopen en in te embedden.",
      "Geen bedrijf of model-leverancier staat tussen jou en de code.",
      "De server draait in Docker en verbindt met het model waarvoor je al betaalt.",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description:
          "De gehoste persoonlijke agent van xAI. Gebruikt een computer, voert routines uit en haalt goedkeuringen binnen in een betaald plan.",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "De gehoste agent van Meta op een door Meta beheerde virtuele machine, gepresenteerd op 8 september 2026, bereikbaar via de Muse-app of WhatsApp.",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "Altijd-actieve persoonlijke agents op kwalificerende ChatGPT-plannen, aangekondigd op 29 september 2026. Elke dot krijgt zijn eigen cloudcomputer.",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description:
          "De gehoste assistent op instinct.com, gedraaid door Spear Street Technology, Inc., met wie je belt of SMS't.",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "De agent van Nous Research. Een desktopapp plus een optionele eigen gateway, en elke vaardigheid is een bewerkbaar bestand.",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "De proactieve persoonlijke agent van Anthropic, vrijgegeven als onderzoeksvoorbeeld op 21 oktober 2026. Hij draait op een cloudcomputer en is in de VS inbegrepen bij Claude Pro en Max.",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "De gehoste persoonlijke agent op hark.com, gelanceerd op 6 oktober 2026. Een gratis tier plus maandelijse tiers van $20 of $100 die het gebruik met 2× of 10× schalen.",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "Een gratis agent die je zelf draait, met een browser, skills en een Gateway in de documentatie. OpenClaw is niet gelieerd met Doitx.",
      },
    ],
    roundupUpdated: "3 november 2026",
    updatedLabel: "Bijgewerkt",
    topicLabel: "Onderwerp",
    openSourceHeading: "Waarom een private implementatie",
    sourcesHeading: "Bronnen",
  },
  ru: {
    title: "Персональные ИИ-агенты 2026: Doitx против OpenClaw, Hermes, Grok Bot и других",
    hubLabel: "Альтернативы",
    metaDescription:
      "Сравните в 2026 году Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro и Claude Duet: варианты развертывания, лицензии, память и цены.",
    h1:
      "Лучшие персональные ИИ-агенты 2026 года: Grok Bot, Muse, Dots, Instinct, Hark Pro и другие",
    introLead:
      "Doitx — это платформа частных ИИ-агентов, для людей и команд, которым нужны ИИ-напарники на инфраструктуре, которой они управляют. Выберите инструмент, который соответствует вашему способу работы:",
    introTail:
      "Doitx, OpenClaw и Hermes Agent работают на вашей собственной инфраструктуре; Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro и Claude Duet — хостинговые продукты.",
    getStarted: {
      intro: "Старт частного развертывания — одна команда и один ключ.",
      stepHead: "Установка и вход",
      stepBody:
        "Установщик скачивает опубликованные образы, запускает стек и открывает браузер.",
      startTitle: "Запуск Doitx",
      startBody:
        "Подключите модель или используйте встроенный шлюз, добавьте инструменты, с которыми может работать бот, и пригласите людей по электронной почте.",
      githubLabel: "Посмотреть на GitHub",
    },
    openSourceReasons: [
      "Весь исходный код публикуется в одном открытом репозитории.",
      "Лицензия позволяет компании запускать, перепродавать и встраивать продукт.",
      "Между вами и кодом нет ни компании, ни поставщика модели.",
      "Сервер работает в Docker и подключается к модели, за которую вы уже платите.",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description:
          "Хостинговый персональный агент от xAI. Использует компьютер, выполняет рутинные задачи и получает согласования в рамках платного плана.",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "Хостинговый агент от Meta на виртуальной машине, управляемой Meta, представленный 8 сентября 2026 года; доступен через приложение Muse или WhatsApp.",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "Всегда активные персональные агенты в доступных планах ChatGPT, анонсированные 29 сентября 2026 года. У каждого «дота» есть собственный облачный компьютер.",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description:
          "Хостинговый ассистент на instinct.com, которым управляет Spear Street Technology, Inc.; с ним можно переписываться или звонить.",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "Агент от Nous Research. Десктопное приложение плюс опциональный автономный шлюз, и каждый навык — редактируемый файл.",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "Проактивный персональный агент от Anthropic, выпущенный 21 октября 2026 года как исследовательский превью. Работает на облачном компьютере и входит в Claude Pro и Max в США.",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "Хостинговый персональный агент на hark.com, запущенный 6 октября 2026 года. Бесплатный тариф плюс ежемесячные тарифы за $20 или $100, увеличивающие объём в 2 или 10 раз.",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "Бесплатный агент, который вы запускаете сами; есть браузер, навыки и Gateway в документации. OpenClaw не связан с Doitx.",
      },
    ],
    roundupUpdated: "3 ноября 2026",
    updatedLabel: "Обновлено",
    topicLabel: "Тема",
    openSourceHeading: "Почему выбрать частное развёртывание",
    sourcesHeading: "Источники",
  },
  tr: {
    title: "2026'da kişisel AI ajanları: Doitx karşı OpenClaw, Hermes, Grok Bot ve daha fazlası",
    hubLabel: "Alternatifler",
    metaDescription:
      "Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro ve Claude Duet'yi 2026'da karşılaştırın; kendi barındırma, lisanslar, hafıza ve fiyatlandırma yer alır.",
    h1:
      "2026'da en iyi kişisel AI ajanları: Grok Bot, Muse, Dots, Instinct, Hark Pro ve özel dağıtım seçenekleri",
    introLead:
      "Doitx; kendi kontrol ettiği altyapıda AI ekip arkadaşları isteyen kişilere ve ekiplere yönelik, kendi barındırmalı bir AI ajan platformudur. İşletme şeklinize uyan aracı seçin:",
    introTail:
      "Doitx, OpenClaw ve Hermes Agent kendi altyapınızda çalışır; Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro ve Claude Duet barındırılan ürünlerdir.",
    getStarted: {
      intro: "Kendi barındırma başlangıcı tek komut ve tek anahtardır.",
      stepHead: "Yükle ve oturum aç",
      stepBody:
        "Kurucu, yayınlanan görüntüleri çeker, yığınını başlatır ve tarayıcıyı açar.",
      startTitle: "Doitx'i başlat",
      startBody:
        "Bir model bağlayın ya da yerleşik geçidi kullanın, bir botun dokunabileceği araçları ekleyin ve kişileri e-postayla davet edin.",
      githubLabel: "GitHub'da görüntüle",
    },
    openSourceReasons: [
      "Tüm kaynak kodu tek bir herkese açık deposunda yayımlanır.",
      "Lisans, bir işletmenin ürünü çalıştırmasına, yeniden satmasına ve gömmesine izin verir.",
      "Siz ile kodun arasında ne bir şirket ne de bir model sağlayıcı vardır.",
      "Sunucu Docker'da çalışır ve halihazırda ücretini ödediğiniz modele bağlanır.",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description:
          "xAI'ın barındırdığı kişisel ajan. Bir bilgisayar kullanır, rutinleri çalıştırır ve ücretli bir plan içinde onaylar alır.",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "8 Eylül 2026'da tanıtılan, Meta'nın işlettiği bir sanal makinede çalışan Meta'nın barındırdığı ajan; Muse uygulamasından ya da WhatsApp üzerinden erişilir.",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "29 Eylül 2026'da duyurulan, uygun ChatGPT planlarındaki sürekli aktif kişisel ajanlar. Her dot kendi bulut bilgisayarına sahip.",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description:
          "Spear Street Technology, Inc. tarafından işletilen instinct.com'daki barındırılan asistan; ona yazarsınız ya da ararsınız.",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "Nous Research ajanı. Masaüstü uygulama ve isteğe bağlı bağımsız bir geçit; becerilerin her biri düzenlenebilir bir dosya.",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "21 Ekim 2026'da araştırma önizlemesi olarak yayınlanan Anthropic'in proaktif kişisel ajanı. Bir bulut bilgisayarda çalışır ve ABD'de Claude Pro ve Max ile birlikte gelir.",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "6 Ekim 2026'da başlatılan hark.com'daki barındırılan kişisel ajan. Ücretsiz kademe yanında, kullanımı 2 kat ya da 10 kat artıran aylık 20 veya 100 dolar kademeler.",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "Kendiniz çalıştırdığınız ücretsiz ajan; tarayıcı, beceriler ve dokümantasyonunda bir geçit var. OpenClaw, Doitx ile ilişkilendirilmemiştir.",
      },
    ],
    roundupUpdated: "3 Kasım 2026",
    updatedLabel: "Güncellendi",
    topicLabel: "Konu",
    openSourceHeading: "Neden özel dağıtım seçilir",
    sourcesHeading: "Kaynaklar",
  },
  he: {
    title: "סוכני AI אישיים 2026: Doitx מול OpenClaw, Hermes, Grok Bot ועוד",
    hubLabel: "אלטרנטיבות",
    metaDescription:
      "השווה את Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro ו־Claude Duet ב־2026, כולל ארחות עצמית, רישויות, זיכרון ותמחור.",
    h1:
      "הסוכנים האישיים הטובים ביותר של AI ב־2026: Grok Bot, Muse, Dots, Instinct, Hark Pro וחלופות פיילוט פרטי",
    introLead:
      "Doitx היא פלטפורמת סוכני AI לארחות עצמית לאנשים ולצוותים שרוצים שותפי AI בתשתיות שהם שולטים בהן. בחרו בכלי שתואם את אופן ההפעלה שלכם:",
    introTail:
      "Doitx, OpenClaw ו־Hermes Agent פועלים באינפרה ייעודית; Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro ו־Claude Duet הם מוצרים מאוחסנים.",
    getStarted: {
      intro: "התחלה בארחות עצמית היא פקודה אחת ומפתח אחד.",
      stepHead: "התקנה וכניסה",
      stepBody: "המתקן מושך תמונות שפורסמו, מפעיל את המערכה ופותח את הדפדפן.",
      startTitle: "הפעלת Doitx",
      startBody:
        "חברו מודל או השתמשו בשער המובנה, הוסיפו כלים שבוט עשוי לגעת בהם והזמינו אנשים במייל.",
      githubLabel: "הצגה ב־GitHub",
    },
    openSourceReasons: [
      "כל קוד המקור מוצע במאגר ציבורי אחד.",
      "הרישיון מאפשר לחברה להפעיל, למכור מחדש ולהטמע את המוצר.",
      "לאף חברה ולאף ספק מודל אין תווך ביניכם לבין הקוד.",
      "השרת רץ בתוך Docker ומתחבר למודל שכבר משלמים עבורו.",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description:
          "הסוכן האישי המאוחסן של xAI. עושה שימוש במחשב, מריץ שגרות ומבקש אישורים במסגרת מנוי בתשלום.",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "הסוכן המאוחסן של Meta על מכונת וירטואלית שהופעלת על ידי Meta, שהוצגה ב־8 בספטמבר 2026, ונגיש דרך אפליקציית Muse או WhatsApp.",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "סוכנים אישיים פעילים תמיד במנויי ChatGPT הזכאים, שהוכרזו ב־29 בספטמבר 2026. לכל dot יש מחשב ענן משלו.",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description:
          "העוזר המאוחסן ב־instinct.com, שמופעל על ידי Spear Street Technology, Inc.; מפנים אליו הודעות או מקיימים עמו שיחת טלפון.",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "הסוכן של Nous Research. אפליקציית מחשב שולחן יחד עם שער עצמאי אופציונלי, וכל יכולת היא קובץ שניתן לערוך.",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "הסוכן האישי הנרתע של Anthropic, שהושק ב־21 באוקטובר 2026 כמראייה ראשונית. פועל על מחשב ענן ונכלל עם Claude Pro ו־Max בארצות הברית.",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "הסוכן האישי המאוחסן ב־hark.com, שהושק ב־6 באוקטובר 2026. מפלס חינמי, לצד מפלסים חודשיים של 20 או 100 דולר המכפילים את השימוש פי 2 או פי 10.",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "סוכן חינמי שהופעל על ידי עצמכם, עם דפדפן, יכולות ושער בתיעודו. OpenClaw אינו משויך ל־Doitx.",
      },
    ],
    roundupUpdated: "3 בנובמבר 2026",
    updatedLabel: "עודכן",
    topicLabel: "נושא",
    openSourceHeading: "למה פיילוט פרטי",
    sourcesHeading: "מקורות",
  },
  hi: {
    title: "2026 के व्यक़्तित AI एजैंट: Doitx बनाम OpenClaw, Hermes, Grok Bot और अनय",
    hubLabel: "वैकल्पिक",
    metaDescription:
      "2026 में Doitx, OpenClaw, Hermes Agent, Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro और Claude Duet की तुलना करें; स्वयं-होसटिंग, लाइसेंस, याददाश्त और कीमत शामिल हैं।",
    h1:
      "2026 के सर्वश्रेष्ठ व्यक़्तित AI एजैंट: Grok Bot, Muse, Dots, Instinct, Hark Pro और ओपन-सोर्स विकल्प",
    introLead:
      "Doitx एक स्वयं-होस्टेड AI एजैंट प्लेटफ़ॉर्म है, जो उन व्यक़्तियों और टीमें के लिए है जो अपने नियंत्रित इन्फ्रास्ट्रचर पर AI टीम-मेंबर्स चाहते हैं। अपनी प्रणाली से मेल खाने वाला टूल चुनें:",
    introTail:
      "Doitx, OpenClaw और Hermes Agent ओपन सोर्स हैं; Grok Bot, Meta Muse, OpenAI Dots, Instinct, Hark Pro और Claude Duet होस्टेड उत्पाद हैं।",
    getStarted: {
      intro: "स्वयं-होसटिंग की शुरुआत एक कमांड और एक की है।",
      stepHead: "इंस्टॉल करें और साइन इन करें",
      stepBody: "इंस्टॉलर प्रकाशित इमेज खींचता है, स्टैक शुरू करता है और ब्राउज़र खोलता है।",
      startTitle: "Doitx शुरू करें",
      startBody:
        "एक मॉडल जोड़ें या बिल्ट-इन गेटवे का उपयोग करें, बॉट जो उपकरण छू सकता है उन्हें जोड़ें और ईमेल से लोगों को आमंत्रित करें।",
      githubLabel: "GitHub पर देखें",
    },
    openSourceReasons: [
      "संपूर्ण स्रोत कोड एक सार्वजनििक रिपोज़िटरी में शामिल है।",
      "लाइसेंस एक व्यवसाय को उत्पाद चलाने, दोबारा बेचने और एम्बेड करने की अनुमति देता है।",
      "आप और कोड के बीच कोई कंपन या मॉडल वेंडर नहीं है।",
      "सर्वर Docker में चलता है और उसी मॉडल से जुड़ता है जिसके लिए आप पहले से ही भुगतान कर रहे हैं।",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description:
          "xAI का होस्टेड व्यक़्तित एजैंट। एक कंप््यटर का उपयोग करता है, रूटीन चलाता है, और भुगतान किए गए प्लान के भीतर मंजूरी प्राप्त करता है।",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "Meta का Meta-संचालित वर्चुअल मशीन पर होस्टेड एजैंट, 8 सितंबर 2026 को प्रस्तुत किया गया, Muse ऐप या WhatsApp से पहुँचा जाता है।",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "29 सितंबर 2026 को घोषित, पात्र ChatGPT प्लान पर सदाइव सक्रिय व्यक़्तित एजैंट। हर डॉट को अपना स्वयं का क्लाउड कंप््यटर मिलता है।",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description:
          "instinct.com पर होस्टेड सहायक, जिससे Spear Street Technology, Inc. संचालित करता है; आप उसे संदेश भेजते हैं या कॉल करते हैं।",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description:
          "Nous Research का एजैंट। एक डेस्कटॉप ऐप और एक वैकल्पिक स्वतंत्र गेटवे, और हर कौशल एक संपादन योग्य फ़ाइल है।",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "Anthropic का सक्रिय व्यक़्तित एजैंट, 21 अक्टूबर 2026 को शोध प्रीव्यू के रूप में जारी किया गया। यह एक क्लाउड कंप््यटर पर चलता है और अमेरिका में Claude Pro और Max के साथ आता है।",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "hark.com पर होस्टेड व्यक़्तित एजैंट, 6 अक्टूबर 2026 को लॉन्च किया गया। एक निःशुल्क टियर, साथ में  या  मासिक टियर जो उपयोग को 2× या 10× बढ़ाते हैं।",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "एक निःशुल्क एजैंट जो आप स्वयं चलाते हैं, ब्राउज़र, स्किल्स और दस्तावेजों में एक गेटवे के साथ। OpenClaw, Doitx से संबंधित नहीं है।",
      },
    ],
    roundupUpdated: "3 नवंबर 2026",
    updatedLabel: "अपडेटेड",
    topicLabel: "विषय",
    openSourceHeading: "खुला स्रोत और स्व-होस्टेड चुनन के कारण",
    sourcesHeading: "स्रोत",
  },
  "zh-tw": {
    title: "2026 個人 AI 智能體：Doitx 對比 OpenClaw、Hermes、Grok Bot 等",
    hubLabel: "替代品",
    metaDescription:
      "2026 年對比 Doitx、OpenClaw、Hermes Agent、Grok Bot、Meta Muse、OpenAI Dots、Instinct、Hark Pro 與 Claude Duet，涵蓋自架、授權、記憶與價格。",
    h1: "2026 年最佳個人 AI 智能體：Grok Bot、Muse、Dots、Instinct、Hark Pro 與開源替代品",
    introLead:
      "Doitx 是面向希望在自身掌控的基礎設施上運行 AI 隊友的個人與團隊的自架 AI 智能體平台。選擇與你的使用方式匹配的工具：",
    introTail:
      "Doitx、OpenClaw 與 Hermes Agent 是開源項目；Grok Bot、Meta Muse、OpenAI Dots、Instinct、Hark Pro 與 Claude Duet 是託管產品。",
    getStarted: {
      intro: "自架的起步只是一條指令與一把金鑰。",
      stepHead: "安裝並登入",
      stepBody: "安裝程式拉取已發布的映像檔、啟動整套服務並開啟瀏覽器。",
      startTitle: "啟動 Doitx",
      startBody: "連接一個模型或使用內建閘道器，新增機器人可使用的工具，並透過電子郵件邀請成員。",
      githubLabel: "在 GitHub 查看",
    },
    openSourceReasons: [
      "全部原始碼都在一個公開倉庫中。",
      "授權條款允許企業執行、轉售與嵌入該產品。",
      "你與程式碼之間沒有任何公司或模型供應商。",
      "伺服器運行在 Docker 中，並連接到你已經在付費的模型。",
    ],
    cards: [
      {
        slug: "grok-bot-alternative",
        title: "Grok Bot",
        description: "xAI 的託管個人智能體。使用一台電腦、執行例行任務，並在付費方案中取得核准。",
      },
      {
        slug: "muse-alternative",
        title: "Meta Muse",
        description:
          "Meta 託管的智能體，運行在 Meta 操作的虛擬機上，於 2026 年 9 月 8 日介紹，可透過 Muse 應用或 WhatsApp 聯繫。",
      },
      {
        slug: "dots-alternative",
        title: "OpenAI Dots",
        description:
          "2026 年 9 月 29 日宣佈的、針對符合條件之 ChatGPT 方案的全時個人智能體。每個 Dots 都有專屬的雲端電腦。",
      },
      {
        slug: "instinct-alternative",
        title: "Instinct",
        description: "instinct.com 的託管助理，由 Spear Street Technology, Inc. 營運，可透過簡訊或通話聯繫。",
      },
      {
        slug: "hermes-alternative",
        title: "Hermes Agent",
        description: "Nous Research 的智能體。桌面應用程式加上選配的獨立閘道器，且每個技能都是一個可編輯的檔案。",
      },
      {
        slug: "claude-duet-alternative",
        title: "Claude Duet",
        description:
          "Anthropic 的主動式個人智能體，於 2026 年 10 月 21 日以研究預覽形式發布。它運行在雲端電腦上，並在美国隨 Claude Pro 與 Max 提供。",
      },
      {
        slug: "hark-alternative",
        title: "Hark Pro",
        description:
          "hark.com 的託管個人智能體，於 2026 年 10 月 6 日上線。提供免費方案，另有 20 或 100 美元月費方案，可將用量放大 2 倍或 10 倍。",
      },
      {
        slug: "openclaw-alternative",
        title: "OpenClaw",
        description:
          "一個免費的智能體，由你自行運行，具備瀏覽器、技能以及文件中的閘道器。OpenClaw 與 Doitx 無關。",
      },
    ],
    roundupUpdated: "2026 年 11 月 3 日",
    updatedLabel: "更新於",
    topicLabel: "主題",
    openSourceHeading: "為什麼選擇私有部署",
    sourcesHeading: "資料來源",
  },
};

export function getAlternativesHubCopy(locale: Locale): AlternativesHubCopy {
  return ALTERNATIVES_HUB_COPY[locale];
}

/** Locale-aware path to the alternatives hub ("/alternatives/" or "/{locale}/alternatives/"). */
export function localeAltPath(locale: string): string {
  const base = rootSlug(locale);
  return `${base === "" ? "" : base}/alternatives/`;
}
