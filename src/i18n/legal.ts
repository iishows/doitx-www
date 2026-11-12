// Copy for the privacy and terms pages.
//
// The English text is authoritative and is the only language with a full body. Every other
// locale carries a translated date and intro and then falls back to the English sections, so a
// page never ships with a truncated policy. The disclaimer tells the reader that is what they
// are seeing.
import { INBOX_ZERO_URL } from "../site";
import type { Locale } from "./locales";

/** A run of inline text. `href` renders an anchor; `strong` renders emphasis. */
export type LegalRun = { text: string; href?: string; strong?: boolean };

/** One block of a section body: a paragraph, a bulleted list, or an address with hard breaks. */
export type LegalBlock =
  | { kind: "paragraph"; runs: readonly LegalRun[] }
  | { kind: "list"; items: readonly (readonly LegalRun[])[] }
  | { kind: "address"; lines: readonly (readonly LegalRun[])[] };

export type LegalSection = {
  /** Anchor target, for sections other copy links to. */
  id?: string;
  heading: string;
  blocks: readonly LegalBlock[];
};

/** The parts of a legal page that are actually translated per locale. */
type LegalTranslation = {
  /** Page title, without the site suffix. */
  title: string;
  /** Meta description. */
  description: string;
  h1: string;
  lastUpdated: string;
  intro: string;
  /** Empty for English, which needs no notice. */
  disclaimer: string;
};

export type LegalCopy = LegalTranslation & { sections: readonly LegalSection[] };

const text = (...runs: readonly (string | LegalRun)[]): readonly LegalRun[] =>
  runs.map((run) => (typeof run === "string" ? { text: run } : run));

const para = (...runs: readonly (string | LegalRun)[]): LegalBlock => ({
  kind: "paragraph",
  runs: text(...runs),
});

/** A single run, or a run of runs, so a one-line list item can be written as a bare string. */
type LegalLine = string | LegalRun | readonly (string | LegalRun)[];

const toRuns = (line: LegalLine): readonly LegalRun[] =>
  Array.isArray(line)
    ? text(...(line as readonly (string | LegalRun)[]))
    : text(line as string | LegalRun);

const list = (...items: readonly LegalLine[]): LegalBlock => ({
  kind: "list",
  items: items.map(toRuns),
});

const address = (...lines: readonly LegalLine[]): LegalBlock => ({
  kind: "address",
  lines: lines.map(toRuns),
});

const CONTACT = address(
  "Inbox Zero Inc.",
  "131 Continental Dr, Suite 305",
  "Newark, Delaware 19713, United States",
  [{ text: "hello@doitx.ai", href: "mailto:hello@doitx.ai" }],
);

const PRIVACY_SECTIONS: readonly LegalSection[] = [
  {
    heading: "Information we collect",
    blocks: [
      para("Depending on how you use Doitx, we collect:"),
      list(
        "Contact and account information, such as your name, email address, and authentication records.",
        "Content you provide to the service, including bot instructions, messages, tasks, memories, files, routines, and support communications.",
        "Connection information you choose to provide, such as encrypted credentials or tokens for model providers, connected applications, and browser sessions.",
        "Technical information needed to operate and secure the service, such as IP address, user agent, session records, device push token, timestamps, and diagnostic information.",
      ),
    ],
  },
  {
    heading: "How we use information",
    blocks: [
      para("We use this information to:"),
      list(
        "Provide, maintain, secure, and troubleshoot Doitx.",
        "Authenticate you and synchronize your account across supported clients.",
        "Run the bots, routines, connections, and notifications you request.",
        "Respond to support requests and comply with legal obligations.",
      ),
    ],
  },
  {
    heading: "Service providers and AI processing",
    blocks: [
      para(
        "Before submitting content or starting AI work, the Doitx mobile app names configured recipients, explains the data and purpose, and asks you to allow sharing. Choosing Not now prevents the mobile action. Permission applies to the selected Space and recipient. Account → AI data sharing lets you withdraw permission for new mobile actions. Stop existing runs and disable routines separately; withdrawal cannot recall data already sent. Web, desktop, and on-premise server workflows use the connections you configure without this mobile permission flow.",
      ),
      list(
        [
          { text: "Models and agents:", strong: true },
          " messages, relevant conversation history, bot instructions, memories, attachments and file content, screenshots, and content retrieved from connected apps are used to generate responses and perform your tasks, including scheduled tasks. Supported connections include OpenAI, Anthropic, Google, OpenRouter, Vercel AI Gateway, Cursor, and custom model servers. The mobile permission screen identifies the services configured for your Space; configuring a service does not by itself grant permission for new mobile actions.",
        ],
        [
          { text: "AI gateways:", strong: true },
          " OpenRouter and Vercel AI Gateway receive requests and forward them to model providers according to the connection's routing settings. The mobile disclosure names the configured gateway. Processing, retention, and routing depend on the gateway account settings and applicable provider agreements. Doitx's mobile permission flow does not change those settings or promise zero retention.",
        ],
        [
          { text: "Voice:", strong: true },
          " recorded audio is sent to your selected transcription service; text you choose to play, including bot responses, is sent for speech generation. Supported voice services include OpenAI, ElevenLabs, Cartesia, and Fish Audio. Microphone access and permission to share with an AI service are separate choices.",
        ],
        [
          { text: "Memory:", strong: true },
          " when Supermemory is configured, conversation summaries, saved memories, search queries, and bot and Space identifiers are sent to store and retrieve context. On-premise memory is processed by the server shown in your permission screen.",
        ],
      ),
      para(
        "We collect this content from what you enter, upload, record, or authorize your bots to access. We store the recipient, Space, disclosure version, and time of your permission for the mobile app to remember your choices. We do not sell personal information or use Doitx content for third-party advertising.",
      ),
      para(
        "Services we select to process personal information must provide protection equal to or greater than the safeguards described in this policy, including limited processing purposes, appropriate security, and retention and deletion protections. Before enabling a provider, we review its terms and safeguards against these requirements. A on-premise operator is responsible for assessing the services it selects and its own agreements with those services.",
      ),
      para(
        "Provider terms govern their processing and retention after receipt. You can review the applicable provider policy from AI data sharing. Policies for supported services: ",
        { text: "OpenAI", href: "https://openai.com/policies/privacy-policy/" },
        ", ",
        { text: "Anthropic", href: "https://www.anthropic.com/legal/privacy" },
        ", ",
        { text: "Google", href: "https://policies.google.com/privacy" },
        ", ",
        { text: "OpenRouter", href: "https://openrouter.ai/privacy" },
        ", ",
        { text: "Vercel", href: "https://vercel.com/legal/privacy-policy" },
        ", ",
        { text: "Cursor", href: "https://cursor.com/privacy" },
        ", ",
        { text: "ElevenLabs", href: "https://elevenlabs.io/privacy-policy" },
        ", ",
        { text: "Cartesia", href: "https://cartesia.ai/legal/privacy" },
        ", ",
        { text: "Fish Audio", href: "https://fish.audio/privacy/" },
        ", and ",
        { text: "Supermemory", href: "https://supermemory.ai/privacy" },
        ".",
      ),
      para(
        "Other services may host infrastructure, run sandboxes, deliver notifications, store data, or connect apps as needed for the work you request. Connected apps receive the content required for the actions you authorize. Their processing is governed by their applicable terms and privacy policies.",
      ),
    ],
  },
  {
    heading: "On-premise deployments",
    blocks: [
      para(
        "The Doitx mobile app can connect to a server that you or another organization operates. In that case, the server operator, not Inbox Zero, controls the information sent to that deployment. The app stores the selected server address and session token securely on your device.",
      ),
    ],
  },
  {
    heading: "Retention and deletion",
    blocks: [
      para(
        "We keep hosted account information and content while your account is active and as reasonably needed to provide the service. You can permanently delete your hosted account and associated personal Space data from the Account screen in the Doitx app. We may retain limited information when required by law, to resolve disputes, or to enforce agreements. Information already sent to a third-party provider is subject to that provider’s retention practices.",
      ),
    ],
  },
  {
    heading: "Security and international transfers",
    blocks: [
      para(
        "We use reasonable technical and organizational safeguards designed to protect personal information. No system is completely secure. We and our service providers may process information in the United States and other countries, which may have different data-protection laws than your country.",
      ),
    ],
  },
  {
    heading: "Children",
    blocks: [
      para(
        "Doitx is not directed to children under 13, and we do not knowingly collect personal information from children under 13.",
      ),
    ],
  },
  {
    heading: "Your rights",
    blocks: [
      para(
        "Depending on where you live, you may have rights to access, correct, delete, restrict, or receive a copy of your personal information, or to object to certain processing. Contact us to make a request.",
      ),
    ],
  },
  { heading: "Contact us", blocks: [CONTACT] },
];

const TERMS_SECTIONS: readonly LegalSection[] = [
  {
    heading: "Software license",
    blocks: [
      para(
        "The Doitx source code is available under the ",
        { text: "Apache License 2.0", href: `` },
        ". That license, not these terms, governs your use of the code. It does not grant rights to the Doitx name or logo; do not use them in a way that suggests we operate or endorse something we do not. A third party that operates a on-premise Doitx deployment is responsible for that deployment and its own terms.",
      ),
    ],
  },
  {
    heading: "Your account",
    blocks: [
      para(
        "You must be at least 13 years old, and old enough to form a binding contract where you live, to use the Service. You may not use the Service if you are barred from doing so under US sanctions or export laws. Keep your sign-in details and connected credentials secure. You are responsible for activity in your account.",
      ),
    ],
  },
  {
    heading: "Bots and AI output",
    blocks: [
      para(
        "Bots act with the instructions, permissions, and connected accounts you give them, including when you are not watching, such as in scheduled routines. Actions your bots take, such as sending messages, changing data, making purchases, or running commands, are taken on your behalf and are your responsibility. Give bots only the access they need, and require approval for actions that are hard to undo.",
      ),
      para(
        "AI output can be inaccurate or incomplete. Review it before you rely on it. Do not use the Service where an error could cause death, injury, or serious harm, or to make decisions with legal, medical, or financial consequences for others without qualified human review.",
      ),
    ],
  },
  {
    heading: "Acceptable use",
    blocks: [
      para("You may not use the Service, or direct a bot, to:"),
      list(
        "Break the law or infringe the rights of others.",
        "Send spam, distribute malware, or commit fraud.",
        "Access systems, accounts, or data you are not authorized to access.",
        "Interfere with the Service, circumvent its limits, or use its computers for cryptocurrency mining or attacks on other systems.",
        "Violate the terms of the model providers or connected apps you use through the Service.",
        "Create accounts by automated means or to evade limits, or resell or provide the hosted Service to others without our written permission.",
      ),
    ],
  },
  {
    heading: "Your content",
    blocks: [
      para(
        "You keep ownership of the content you provide and the output your bots produce, and you are responsible for having the rights to provide it. You give us permission to host, process, and transmit that content only as needed to provide the Service, as described in our ",
        { text: "privacy policy", href: "/privacy/" },
        ". We may use aggregated or de-identified usage data to operate and improve the Service. If you send us feedback, we may use it without obligation to you. Keep your own copies of content that matters to you.",
      ),
    ],
  },
  {
    heading: "Third-party services",
    blocks: [
      para(
        "The Service can connect to model providers, voice and memory services, computer providers, and other apps you choose. Those services are governed by their own terms, and we are not responsible for them. You are responsible for fees they charge you, including usage your bots incur on your own API keys.",
      ),
    ],
  },
  {
    heading: "Paid plans and billing",
    blocks: [
      para(
        "Some features require a paid plan. Prices are shown before you subscribe. Subscriptions renew automatically at the end of each billing period until you cancel, and we charge the payment method on file, which is processed by Stripe. Prices exclude taxes unless stated otherwise. If your plan starts with a free trial, we collect a payment method at signup and charge it when the trial ends unless you cancel before then. Cancelling during the trial ends it, and you are not charged. Plans are subject to the ",
        { text: "fair use", href: "#fair-use" },
        " limits below. If a payment fails, we may pause paid features until it succeeds. If you dispute a charge with your bank instead of contacting us, we may suspend the account while the dispute is open. We will notify you before a price change takes effect on your next renewal, and you can cancel before it does.",
      ),
    ],
  },
  {
    id: "fair-use",
    heading: "Fair use",
    blocks: [
      para(
        "Hosted plans include up to 100 computer-hours a month and up to 5 computers running at once per account, which is more than enough for most people. A computer counts toward those hours only while it is running. Computers sleep after a few minutes without activity and run for up to about two hours each time they wake, so they are not meant to stay on continuously. Each computer currently has 4 vCPUs, 8 GB of memory, and 50 GB of disk. Files are saved when a computer sleeps, up to 20 GB per computer, and kept until you delete the bot or your account.",
      ),
      para(
        "If an account goes beyond these limits or places an unreasonable load on the Service, we may slow or pause its computers and will contact you before taking further action. We do not charge for computer use beyond your plan. These limits do not apply to on-premise Doitx.",
      ),
    ],
  },
  {
    heading: "Cancellation and refunds",
    blocks: [
      para(
        "You can cancel at any time from your account’s billing settings or by emailing ",
        { text: "hello@doitx.ai", href: "mailto:hello@doitx.ai" },
        ". Cancellation stops future renewals; you keep access until the end of the period you paid for. Payments are non-refundable and partial periods are not prorated, except where required by law. If you were charged in error, email us within 30 days and we will refund the charge.",
      ),
      para(
        "If you are a consumer in the European Union or the United Kingdom, you can withdraw from a new subscription within 14 days of buying it by telling us, for example by email. Because you ask the Service to start immediately, we will refund your payment less an amount proportionate to the Service provided before you withdrew.",
      ),
    ],
  },
  {
    heading: "Changes to the Service",
    blocks: [
      para(
        "We may add, change, or remove features. Features marked as beta or preview may be incomplete or change without notice, and we do not promise the Service will be uninterrupted or error-free. If we materially reduce a paid feature during your billing period, we will tell you in advance, and you can cancel and receive a refund for the unused period.",
      ),
    ],
  },
  {
    heading: "Termination",
    blocks: [
      para(
        "You can stop using the Service and delete your account at any time. We may suspend or terminate your access if you violate these terms, do not pay, or put the Service or others at risk, or if the law requires it. Where reasonable, we will tell you first. If we terminate your account or stop offering the Service for reasons other than a violation of these terms, we will give you reasonable notice and refund any prepaid fees for the unused period.",
      ),
      para(
        "When an account is deleted, its bots and routines stop and we delete its content as described in our privacy policy, so save anything you want to keep first. Terms that by their nature should survive termination, such as fees owed, disclaimers, limits of liability, and indemnity, continue to apply.",
      ),
    ],
  },
  {
    heading: "Disclaimers",
    blocks: [
      para(
        "TO THE EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
      ),
    ],
  },
  {
    heading: "Limitation of liability",
    blocks: [
      para(
        "TO THE EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS OR DATA. OUR TOTAL LIABILITY FOR ANY CLAIM RELATED TO THE SERVICE IS LIMITED TO THE GREATER OF THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM OR US$100.",
      ),
      para(
        "Nothing in these terms limits liability that cannot be limited by law, such as for fraud, gross negligence, or death or personal injury caused by negligence, or rights you have as a consumer that cannot be waived.",
      ),
    ],
  },
  {
    heading: "Indemnity",
    blocks: [
      para(
        "To the extent permitted by law, you will compensate us for third-party claims, and reasonable related costs, arising from your content, your bots’ actions, or your violation of these terms or the law.",
      ),
    ],
  },
  {
    heading: "Changes",
    blocks: [
      para(
        "We may update these terms. For material changes, we will notify you before they take effect. If you do not agree, you can cancel before then. Continuing to use the Service after that means you accept the updated terms.",
      ),
    ],
  },
  {
    heading: "App stores",
    blocks: [
      para(
        "If you download a Doitx app from an app store, that store’s terms also apply to the app. For the iOS app, Apple’s Standard EULA applies. Apple is not a party to these terms and is not responsible for the Service or its support.",
      ),
    ],
  },
  {
    heading: "Governing law",
    blocks: [
      para(
        "These terms are governed by the laws of the State of Delaware, without regard to its conflict of law rules. Disputes will be resolved in the state or federal courts located in Delaware, except where your local law gives you the right to bring a claim where you live. To the extent permitted by law, you and we each waive any right to a jury trial.",
      ),
    ],
  },
  {
    heading: "General",
    blocks: [
      para(
        "These terms, together with any terms shown when you buy a plan, are the entire agreement between you and us about the Service. If any part is unenforceable, the rest stays in effect. Not enforcing a term is not a waiver. You may not transfer these terms without our consent; we may transfer them in connection with a merger, acquisition, or sale of assets. Neither of us is responsible for delays caused by events beyond reasonable control. We may send you notices by email or in the Service, and you can send notices to us at the address below.",
      ),
    ],
  },
  { heading: "Contact us", blocks: [CONTACT] },
];

const PRIVACY_TRANSLATIONS: Record<Locale, LegalTranslation> = {
  en: {
    title: "Privacy",
    description:
      "How Inbox Zero Inc. collects, uses, and protects information when you use Doitx.",
    h1: "Privacy",
    lastUpdated: "September 14, 2026",
    intro:
      "This policy explains how Inbox Zero Inc. (“Inbox Zero,” “we,” or “us”) handles personal information when you use the Doitx mobile app, a Doitx service that we host, or doitx.ai. A third party that operates a on-premise Doitx deployment is responsible for its own privacy practices.",
    disclaimer: "",
  },
  de: {
    title: "Datenschutz",
    description:
      "Wie Inbox Zero Inc. Informationen erhebt, verwendet und schützt, wenn Sie Doitx nutzen.",
    h1: "Datenschutz",
    lastUpdated: "14. September 2026",
    intro:
      "Diese Richtlinie erklärt, wie Inbox Zero Inc. („Inbox Zero“, „wir“ oder „uns“) personenbezogene Daten verarbeitet, wenn Sie die Doitx-App, einen von uns betriebenen Doitx-Dienst oder doitx.ai nutzen. Dritte, die ein selbst gehostetes Doitx-Deployment betreiben, sind für ihre eigenen Datenschutzpraktiken verantwortlich.",
    disclaimer: "Dies ist eine Übersetzung. Die englische Fassung ist maßgeblich.",
  },
  ko: {
    title: "개인정보",
    description:
      "Inbox Zero Inc.이 Doitx 사용 시 정보를 수집, 이용 및 보호하는 방법입니다.",
    h1: "개인정보",
    lastUpdated: "2026년 9월 14일",
    intro:
      "이 정책은 Inbox Zero Inc.(‘Inbox Zero’, ‘우리’ 또는 ‘당사’)이 Doitx 모바일 앱, 당사가 호스팅하는 Doitx 서비스 또는 doitx.ai를 사용할 때 개인 정보를 어떻게 처리하는지 설명합니다. 자체 호스팅 Doitx 배포를 운영하는 제3자는 자체 개인 정보 처리 관행에 대해 책임을 집니다.",
    disclaimer: "이 문서는 번역본입니다. 영문 원문이 공식적인 기준입니다.",
  },
  zh: {
    title: "隐私政策",
    description:
      "Inbox Zero Inc. 在您使用 Doitx 时如何收集、使用和保护信息。",
    h1: "隐私政策",
    lastUpdated: "2026年9月14日",
    intro:
      "本政策说明 Inbox Zero Inc.（“Inbox Zero”、“我们”或“我方”）在您使用 Doitx 移动应用、我们托管的 Doitx 服务或 doitx.ai 时如何处理个人信息。运营私有部署 Doitx 的第三方对其自身的隐私实践负责。",
    disclaimer: "本文为译文。英文版为权威版本。",
  },
  ja: {
    title: "プライバシー",
    description:
      "Doitx のご利用にあたり、Inbox Zero Inc. が情報をどのように収集、利用、保護するかを説明します。",
    h1: "プライバシー",
    lastUpdated: "2026年9月14日",
    intro:
      "本ポリシーは、Inbox Zero Inc.（「Inbox Zero」「当社」「当方」とも）が、Doitx モバイルアプリ、当社がホスティングする Doitx サービス、または doitx.ai をご利用になる際の個人情報の扱いについて説明します。セルフホステッドの Doitx デプロイを運営する第三者は、自らのプライバシー慣行に責任を負います。",
    disclaimer: "本内容は翻訳版です。英語版が正式なバージョンです。",
  },
  es: {
    title: "Privacidad",
    description:
      "Cómo Inbox Zero Inc. recopila, usa y protege la información cuando usted usa Doitx.",
    h1: "Privacidad",
    lastUpdated: "14 de septiembre de 2026",
    intro:
      "Esta política explica cómo Inbox Zero Inc. («Inbox Zero», «nosotros» o «nosotras») gestiona la información personal cuando usted utiliza la aplicación móvil de Doitx, un servicio de Doitx que alojamos, o doitx.ai. Un tercero que opera un despliegue de Doitx autoalojado es responsable de sus propias prácticas de privacidad.",
    disclaimer: "Esta es una traducción. La versión en inglés es la que prevalece.",
  },
  fr: {
    title: "Confidentialité",
    description:
      "Comment Inbox Zero Inc. collecte, utilise et protège les informations lorsque vous utilisez Doitx.",
    h1: "Confidentialité",
    lastUpdated: "14 septembre 2026",
    intro:
      "Cette politique explique comment Inbox Zero Inc. (« Inbox Zero », « nous ») traite les informations personnelles lorsque vous utilisez l’application mobile Doitx, un service Doitx que nous hébergeons, ou doitx.ai. Un tiers qui exploite un déploiement auto-hébergé de Doitx est responsable de ses propres pratiques de confidentialité.",
    disclaimer: "Ceci est une traduction. La version anglaise fait foi.",
  },
  "pt-br": {
    title: "Privacidade",
    description:
      "Como a Inbox Zero Inc. coleta, usa e protege informações quando você usa a Doitx.",
    h1: "Privacidade",
    lastUpdated: "14 de setembro de 2026",
    intro:
      "Esta política explica como a Inbox Zero Inc. (“Inbox Zero”, “nós”) lida com informações pessoais quando você usa o app mobile da Doitx, um serviço da Doitx que hospedamos, ou doitx.ai. Um terceiro que opera um deploy on-premise da Doitx é responsável pelas próprias práticas de privacidade.",
    disclaimer: "Esta é uma tradução. A versão em inglês é a oficial.",
  },
  nl: {
    title: "Privacy",
    description:
      "Hoe Inbox Zero Inc. informatie verzamelt, gebruikt en beschermt wanneer u Doitx gebruikt.",
    h1: "Privacy",
    lastUpdated: "14 september 2026",
    intro:
      "Dit beleid legt uit hoe Inbox Zero Inc. (“Inbox Zero”, “wij”) omgaat met persoonlijke gegevens wanneer u de Doitx mobiele app, een door ons gehoste Doitx-dienst of doitx.ai gebruikt. Een derde die een self-gehoste Doitx-installatie draait, is zelf verantwoordelijk voor zijn privacypraktijken.",
    disclaimer: "Dit is een vertaling. De Engelstalige versie is bepalend.",
  },
  ru: {
    title: "Конфиденциальность",
    description:
      "Как Inbox Zero Inc. собирает, использует и защищает информацию при использовании Doitx.",
    h1: "Конфиденциальность",
    lastUpdated: "14 сентября 2026 г.",
    intro:
      "Эта политика описывает, как Inbox Zero Inc. («Inbox Zero», «мы») обрабатывает персональные данные при использовании мобильного приложения Doitx, хостингуемого нами сервиса Doitx или doitx.ai. Третья сторона, эксплуатирующая on-premise-развёртывание Doitx, несёт ответственность за собственную политику конфиденциальности.",
    disclaimer: "Это перевод. Авторитетной является английская версия.",
  },
  tr: {
    title: "Gizlilik",
    description:
      "Inbox Zero Inc.'nin Doitx'i kullandığınızda bilgileri nasıl topladığı, kullandığı ve koruduğu.",
    h1: "Gizlilik",
    lastUpdated: "14 Eylül 2026",
    intro:
      "Bu politika, Doitx mobil uygulamasını, bizim barındırdığımız bir Doitx hizmetini veya doitx.ai'yi kullanırken Inbox Zero Inc.'nin (“Inbox Zero”, “biz”) kişisel bilgileri nasıl işlediğini açıklar. Kendi barındırdığı bir Doitx dağıtımını işleten üçüncü taraf, kendi gizlilik uygulamalarından sorumludur.",
    disclaimer: "Bu bir çeviridir. İngilizce versiyon yetkilidir.",
  },
  he: {
    title: "פרטיות",
    description:
      "כיצד Inbox Zero Inc. אוספת, משתמשת ומגנה על מידע בעת השימוש ב־Doitx.",
    h1: "פרטיות",
    lastUpdated: "14 בספטמבר 2026",
    intro:
      "מדיניות זו מסבירה כיצד Inbox Zero Inc. (“Inbox Zero”, “אנחנו”) מטפלת בפרטים אישיים בעת השימוש באפליקציית Doitx המובילה, בשירות Doitx שמתארח אצלנו, או ב־doitx.ai. צד שלישי שמפעיל פריסה on-premise של Doitx אחראי למנהגיו האישיים שלו.",
    disclaimer: "זוהי תרגום. הגרסה באנגלית היא הרשמית.",
  },
  hi: {
    title: "गोपनीयता",
    description:
      "Doitx का उपयोग करते समय Inbox Zero Inc. जानकारी को कैसे एकत्र, उपयोग और सुरक्षित करती है।",
    h1: "गोपनीयता",
    lastUpdated: "14 सितंबर 2026",
    intro:
      "यह नीति बताती है कि Inbox Zero Inc. (“Inbox Zero”, “हम”) Doitx मोबाइल ऐप, हमारी होस्टिंग वाले Doitx सेवा या doitx.ai का उपयोग करते समय व्यक्तिगत जानकारी का प्रबंधन कैसे करती है। सव-होस्टेड Doitx डिप्लॉइमेंट चलाने वाला तीसरा पक्ष अपनी गोपनीयता प्रथाओं के लिए उत्तरदायी है।",
    disclaimer: "यह अनुवाद है। अंग्रेज़ी संस्करण आधिकारिक है।",
  },
  "zh-tw": {
    title: "隱私政策",
    description:
      "Inbox Zero Inc. 在您使用 Doitx 時如何蒐集、使用和保護資訊。",
    h1: "隱私政策",
    lastUpdated: "2026年9月14日",
    intro:
      "本政策說明 Inbox Zero Inc.（「Inbox Zero」、「我們」或「我方」）在您使用 Doitx 移動應用程式、我們託管的 Doitx 服務或 doitx.ai 時如何處理個人資訊。營運自託管 Doitx 部署的第三方對其自身的隱私實踐負責。",
    disclaimer: "本文為譯本。英文版為權威版本。",
  },
};

const TERMS_TRANSLATIONS: Record<Locale, LegalTranslation> = {
  en: {
    title: "Terms",
    description:
      "The agreement between you and Inbox Zero Inc. when you use Doitx, including your plans and the conduct we require.",
    h1: "Terms of Service",
    lastUpdated: "October 27, 2026",
    intro:
      "These terms are an agreement between you and Inbox Zero Inc. (“Inbox Zero,” “we,” or “us”) for your use of the Doitx service that we host, the Doitx web, desktop, and mobile apps, and doitx.ai (together, the “Service”). By using the Service, you agree to these terms. If you use the Service on behalf of an organization, you confirm that you can bind that organization to these terms, and “you” includes it.",
    disclaimer: "",
  },
  de: {
    title: "Bedingungen",
    description:
      "Die Vereinbarung zwischen Ihnen und Inbox Zero Inc. bei der Nutzung von Doitx, einschließlich Ihrer Pläne und des von uns geforderten Verhaltens.",
    h1: "Nutzungsbedingungen",
    lastUpdated: "27. Oktober 2026",
    intro:
      "Diese Bedingungen sind eine Vereinbarung zwischen Ihnen und Inbox Zero Inc. („Inbox Zero“, „wir“ oder „uns“) für Ihre Nutzung des von uns betriebenen Doitx-Dienstes, der Doitx-Web-, Desktop- und mobilen Apps sowie doitx.ai (zusammen der „Dienst“). Durch die Nutzung des Dienstes erklären Sie sich mit diesen Bedingungen einverstanden. Wenn Sie den Dienst im Namen einer Organisation nutzen, bestätigen Sie, dass Sie diese Organisation an diese Bedingungen binden können, und „Sie“ umfasst diese.",
    disclaimer: "Dies ist eine Übersetzung. Die englische Fassung ist maßgeblich.",
  },
  ko: {
    title: "약관",
    description:
      "Doitx 이용 시 귀하와 Inbox Zero Inc. 간의 약정으로, 요금제와 당사가 요구하는 행동을 포함합니다.",
    h1: "서비스 약관",
    lastUpdated: "2026년 10월 27일",
    intro:
      "본 약관은 귀하와 Inbox Zero Inc.(‘Inbox Zero’, ‘우리’, ‘당사’) 간의 약정으로, 당사가 호스팅하는 Doitx 서비스, Doitx 웹/데스크톱/모바일 앱 및 doitx.ai(이하 ‘서비스’)의 이용에 적용됩니다. 서비스를 이용하면 귀하께서는 본 약관에 동의한 것으로 봅니다. 조직을 대리해 서비스를 사용하는 경우, 귀하가 해당 조직을 본 약관에 구속할 수 있음을 확인하는 것이며, ‘귀하’에는 해당 조직이 포함됩니다.",
    disclaimer: "이 문서는 번역본입니다. 영문 원문이 공식적인 기준입니다.",
  },
  zh: {
    title: "条款",
    description:
      "您与 Inbox Zero Inc. 之间就使用 Doitx 达成的协议，包括您的套餐及我们要求的行为规范。",
    h1: "服务条款",
    lastUpdated: "2026年10月27日",
    intro:
      "本条款是您与 Inbox Zero Inc.（“Inbox Zero”、“我们”或“我方”）之间就您使用我们托管的 Doitx 服务、Doitx Web/桌面/移动应用及 doitx.ai（统称“服务”）达成的协议。使用服务即表示您同意本条款。代表组织使用服务的，确认您有权使该组织受本条款约束，“您”包含该组织。",
    disclaimer: "本文为译文。英文版为权威版本。",
  },
  ja: {
    title: "利用規約",
    description:
      "Doitx のご利用にあたるお客様と Inbox Zero Inc. の間の契約で、プランと当社が求める行動を含みます。",
    h1: "利用規約",
    lastUpdated: "2026年10月27日",
    intro:
      "本利用規約は、お客様と Inbox Zero Inc.（「Inbox Zero」「当社」「当方」）の間の、当社が提供する Doitx サービス、Doitx Web / デスクトップ / モバイルアプリ、および doitx.ai（以下「サービス」）の利用に関する契約です。サービスをご利用いただくことで、お客様は本規約に同意したものとみなされます。組織を代表してサービスをご利用になる場合は、当該組織を本規約に拘束することができることを確認し、「お客様」には当該組織を含みます。",
    disclaimer: "本内容は翻訳版です。英語版が正式なバージョンです。",
  },
  es: {
    title: "Términos",
    description:
      "El acuerdo entre usted e Inbox Zero Inc. al usar Doitx, incluidos sus planes y la conducta que exigimos.",
    h1: "Términos del Servicio",
    lastUpdated: "27 de octubre de 2026",
    intro:
      "Estos términos son un acuerdo entre usted y Inbox Zero Inc. («Inbox Zero», «nosotros» o «nosotras») para su uso del servicio de Doitx que alojamos, las aplicaciones web, de escritorio y móviles de Doitx y doitx.ai (en conjunto, el «Servicio»). Al usar el Servicio, usted acepta estos términos. Si usa el Servicio en nombre de una organización, confirma que puede vincular a esa organización a estos términos, y «usted» la incluye.",
    disclaimer: "Esta es una traducción. La versión en inglés es la que prevalece.",
  },
  fr: {
    title: "Conditions",
    description:
      "L’accord entre vous et Inbox Zero Inc. lors de l’utilisation de Doitx, y compris vos forfaits et la conduite que nous exigeons.",
    h1: "Conditions d’utilisation",
    lastUpdated: "27 octobre 2026",
    intro:
      "Les présentes conditions constituent un accord entre vous et Inbox Zero Inc. (« Inbox Zero », « nous ») pour votre utilisation du service Doitx que nous hébergeons, des applications web, de bureau et mobiles Doitx, et de doitx.ai (ensemble, le « Service »). En utilisant le Service, vous acceptez ces conditions. Si vous utilisez le Service au nom d’une organisation, vous confirmez pouvoir lier cette organisation à ces conditions, et « vous » l’inclut.",
    disclaimer: "Ceci est une traduction. La version anglaise fait foi.",
  },
  "pt-br": {
    title: "Termos",
    description:
      "O acordo entre você e a Inbox Zero Inc. ao usar a Doitx, incluindo seus planos e a conduta que exigimos.",
    h1: "Termos de Serviço",
    lastUpdated: "27 de outubro de 2026",
    intro:
      "Estes termos são um acordo entre você e a Inbox Zero Inc. (“Inbox Zero”, “nós”) para o seu uso do serviço da Doitx que hospedamos, dos apps web, desktop e mobile da Doitx e de doitx.ai (juntos, o “Serviço”). Ao usar o Serviço, você aceita estes termos. Se usar o Serviço em nome de uma organização, você confirma que pode vincular essa organização a estes termos, e “você” a inclui.",
    disclaimer: "Esta é uma tradução. A versão em inglês é a oficial.",
  },
  nl: {
    title: "Voorwaarden",
    description:
      "De overeenkomst tussen u en Inbox Zero Inc. bij gebruik van Doitx, inclusief uw abonnementen en het gedrag dat wij vereisen.",
    h1: "Servicevoorwaarden",
    lastUpdated: "27 oktober 2026",
    intro:
      "Deze voorwaarden zijn een overeenkomst tussen u en Inbox Zero Inc. (“Inbox Zero”, “wij”) voor uw gebruik van de door ons gehoste Doitx-dienst, de Doitx-web-, desktop- en mobiele apps en doitx.ai (samen de “Dienst”). Door gebruik te maken van de Dienst gaat u akkoord met deze voorwaarden. Als u de Dienst gebruikte nam van een organisatie, bevestigt u dat u die organisatie kunt binden aan deze voorwaarden, en “u” omvat die.",
    disclaimer: "Dit is een vertaling. De Engelstalige versie is bepalend.",
  },
  ru: {
    title: "Условия",
    description:
      "Соглашение между вами и Inbox Zero Inc. при использовании Doitx, включая ваши тарифы и требуемое нами поведение.",
    h1: "Условия обслуживания",
    lastUpdated: "27 октября 2026 г.",
    intro:
      "Настоящие условия являются соглашением между вами и Inbox Zero Inc. («Inbox Zero», «мы») в отношении использования хостингуемого нами сервиса Doitx, веб-, настольных и мобильных приложений Doitx, а также doitx.ai (совместно — «Сервис»). Используя Сервис, вы соглашаетесь с настоящими условиями. Если вы используете Сервис от имени организации, вы подтверждаете, что можете обязать эту организацию настоящими условиями, и под «вы» она понимается включённой.",
    disclaimer: "Это перевод. Авторитетной является английская версия.",
  },
  tr: {
    title: "Şartlar",
    description:
      "Doitx'i kullanırken sizinle Inbox Zero Inc. arasındaki, planlarınızı ve talep ettiğimiz davranışı içeren sözleşme.",
    h1: "Hizmet Şartları",
    lastUpdated: "27 Ekim 2026",
    intro:
      "Bu şartlar, bizim barındırdığımız Doitx hizmetinin, Doitx web/masaüstü/uygulama ve doitx.ai'nin (bir arada “Hizmet”) kullanımınız için sizinle Inbox Zero Inc. (“Inbox Zero”, “biz”) arasında bir sözleşmedir. Hizmeti kullanarak bu şartları kabul etmiş olursunuz. Hizmeti bir kuruluş adına kullanıyorsanız, o kuruluştan bu şartlara bağlayabileceğinizi onaylıyor ve “siz” onu da kapsıyor demektir.",
    disclaimer: "Bu bir çeviridir. İngilizce versiyon yetkilidir.",
  },
  he: {
    title: "תנאים",
    description:
      "ההסכם בינך ובין Inbox Zero Inc. בעת השימוש ב־Doitx, כולל התוכניות שלך וההתנהגות שאנו דורשים.",
    h1: "תנאי שירות",
    lastUpdated: "27 באוקטובר 2026",
    intro:
      "תנאים אלו הם הסכם בינך ובין Inbox Zero Inc. (“Inbox Zero”, “אנחנו”) לגבי השימוש שלך בשירות Doitx המתארח אצלנו, באפליקציות Doitx לדפדפן, למחשב ולמובייל, וב־doitx.ai (יחד – “השירות”). על ידי שימוש בשירות, אתה מסכים לתנאים אלה. אם אתה משתמש בשירות בשם ארגון, אתה מאשר שתוכל לחייב את הארגון בתנאים אלה, ו־“אתה” כולל אותו.",
    disclaimer: "זוהי תרגום. הגרסה באנגלית היא הרשמית.",
  },
  hi: {
    title: "शर्तें",
    description:
      "Doitx का उपयोग करते समय आपके और Inbox Zero Inc. के बीच का समझौता, जिसमें आपकी योजनाएँ और हमारी अपेक्षित आचरण शामिल हैं।",
    h1: "सेवा की शर्तें",
    lastUpdated: "27 अक्टूबर 2026",
    intro:
      "ये शर्तें आप और Inbox Zero Inc. (“Inbox Zero”, “हम”) के बीच, हमारी होस्टिंग वाली Doitx सेवा, Doitx वेब/डेस्कटॉप/मोबाइल ऐप्स और doitx.ai (मिलकर “सेवा”) के उपयोग के लिए एक समझौता हैं। सेवा का उपयोग करके आप इन शर्तों से सहमत होते हैं। यदि आप किसी संगठन के प्रतिनिधि के रूप में सेवा का उपयोग कर रहे हैं, तो आप पुष्टि करते हैं कि आप उस संगठन को इन शर्तों से बांध सकते हैं, और “आप” में उसका समावेश है।",
    disclaimer: "यह अनुवाद है। अंग्रेज़ी संस्करण आधिकारिक है।",
  },
  "zh-tw": {
    title: "條款",
    description:
      "您與 Inbox Zero Inc. 之間就使用 Doitx 所訂立的協議，包括您的方案及我們要求的行為規範。",
    h1: "服務條款",
    lastUpdated: "2026年10月27日",
    intro:
      "本條款是您與 Inbox Zero Inc.（「Inbox Zero」、「我們」或「我方」）之間就您使用我們託管的 Doitx 服務、Doitx Web/桌面/移動應用及 doitx.ai（統稱「服務」）所訂立的協議。使用服務即表示您同意本條款。代表組織使用服務的，確認您有權使該組織受本條款約束，「您」包含該組織。",
    disclaimer: "本文為譯本。英文版為權威版本。",
  },
};

export function getPrivacyCopy(locale: Locale): LegalCopy {
  return { ...PRIVACY_TRANSLATIONS[locale], sections: PRIVACY_SECTIONS };
}

export function getTermsCopy(locale: Locale): LegalCopy {
  return { ...TERMS_TRANSLATIONS[locale], sections: TERMS_SECTIONS };
}
