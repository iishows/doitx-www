import type { Locale } from "./locales";
import de from "./teams/de";
import en from "./teams/en";
import es from "./teams/es";
import fr from "./teams/fr";
import he from "./teams/he";
import hi from "./teams/hi";
import ja from "./teams/ja";
import ko from "./teams/ko";
import nl from "./teams/nl";
import ptBr from "./teams/pt-br";
import ru from "./teams/ru";
import tr from "./teams/tr";
import zhTw from "./teams/zh-tw";
import zh from "./teams/zh";

export type TeamScenario = {
  tag: string;
  title: string;
  summary: string;
  lead: string;
  roles: string[];
  rhythm: string;
  output: string;
  handoff: string;
};

export type TeamCopy = {
  eyebrow: string;
  heading: string;
  copy: string;
  labels: {
    rhythm: string;
    output: string;
    handoff: string;
  };
  cards: [TeamScenario, TeamScenario, TeamScenario];
  /** Labels for the shared, audited numbers in TEAM_STATS. */
  stats: Record<keyof typeof TEAM_STATS, string>;
  note: string;
};

/**
 * Aggregated from one private Doitx deployment over the seven days before
 * 2026-11-10. No customer data is included; update deliberately, not live.
 */
export const TEAM_STATS = {
  runs: "7,668",
  completed: "6,731",
  routines: "21",
  bots: "58",
} as const;

export const TEAM_STAT_ORDER = ["runs", "completed", "routines", "bots"] as const;

const TEAM_COPY: Record<Locale, TeamCopy> = {
  en,
  de,
  ko,
  zh,
  ja,
  es,
  fr,
  "pt-br": ptBr,
  nl,
  ru,
  tr,
  he,
  hi,
  "zh-tw": zhTw,
};

export function getTeamCopy(locale: Locale): TeamCopy {
  return TEAM_COPY[locale];
}
