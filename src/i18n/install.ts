import type { Locale } from "./locales";

export type InstallCopy = {
  eyebrow: string;
  heading: string;
  copy: string;
  windows: string;
  linux: string;
  copyLabel: string;
  copiedLabel: string;
  failedLabel: string;
  note: string;
};

export const INSTALL_COPY: Partial<Record<Locale, InstallCopy>> = {
  zh: {
    eyebrow: "安装 Doitx",
    heading: "下载客户端，或在线直接使用",
    copy: "桌面端支持 macOS、Windows 与 Linux。没有合适的平台？浏览器直接上手。",
    windows: "Windows 安装器",
    linux: "macOS / Linux 安装器",
    copyLabel: "复制下载链接",
    copiedLabel: "已复制",
    failedLabel: "复制失败",
    note: "系统要求：桌面端需 macOS 13+、Windows 11 或 Linux x86_64；在线端无需安装。",
  },
  en: {
    eyebrow: "Install Doitx",
    heading: "Download the client, or use it in the browser",
    copy: "Desktop apps for macOS, Windows, and Linux. No suitable platform? Jump in from your browser.",
    windows: "Windows installer",
    linux: "macOS / Linux installer",
    copyLabel: "Copy download link",
    copiedLabel: "Copied",
    failedLabel: "Copy failed",
    note: "Requirements: desktop needs macOS 13+, Windows 11, or Linux x86_64; the web app needs nothing installed.",
  },
  de: {
    eyebrow: "Doitx installieren",
    heading: "Client herunterladen oder direkt im Browser nutzen",
    copy: "Desktop-Apps für macOS, Windows und Linux. Keine passende Plattform? Direkt im Browser starten.",
    windows: "Windows-Installer",
    linux: "macOS / Linux-Installer",
    copyLabel: "Download-Link kopieren",
    copiedLabel: "Kopiert",
    failedLabel: "Kopieren fehlgeschlagen",
    note: "Voraussetzungen: Desktop benötigt macOS 13+, Windows 11 oder Linux x86_64; die Web-App muss nichts installieren.",
  },
  ko: {
    eyebrow: "Doitx 설치",
    heading: "클라이언트 다운로드 또는 브라우저에서 바로 사용",
    copy: "macOS, Windows, Linux용 데스크톱 앱. 알맞은 플랫폼이 없으면? 브라우저에서 바로 시작하세요.",
    windows: "Windows 설치 프로그램",
    linux: "macOS / Linux 설치 프로그램",
    copyLabel: "다운로드 링크 복사",
    copiedLabel: "복사됨",
    failedLabel: "복사 실패",
    note: "요구 사항: 데스크톱은 macOS 13+, Windows 11 또는 Linux x86_64 필요; 웹 앱은 설치 불필요.",
  },
  ja: {
    eyebrow: "Doitx をインストール",
    heading: "クライアントをダウンロード、またはブラウザでそのまま利用",
    copy: "macOS、Windows、Linux用のデスクトップアプリ。対応プラットフォームがない場合はブラウザから直接利用できます。",
    windows: "Windows インストーラー",
    linux: "macOS / Linux インストーラー",
    copyLabel: "ダウンロードリンクをコピー",
    copiedLabel: "コピーしました",
    failedLabel: "コピー失敗",
    note: "要件：デスクトップ版は macOS 13+、Windows 11、または Linux x86_64 が必要；Web版はインストール不要。",
  },
};

export function getInstallCopy(locale: Locale): InstallCopy {
  return INSTALL_COPY[locale] ?? INSTALL_COPY.en!;
}
