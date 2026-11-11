import type { Locale } from "./locales";
import de from "./team-demo/de";
import en from "./team-demo/en";
import es from "./team-demo/es";
import fr from "./team-demo/fr";
import he from "./team-demo/he";
import hi from "./team-demo/hi";
import ja from "./team-demo/ja";
import ko from "./team-demo/ko";
import nl from "./team-demo/nl";
import ptBr from "./team-demo/pt-br";
import ru from "./team-demo/ru";
import tr from "./team-demo/tr";
import zhTw from "./team-demo/zh-tw";
import zh from "./team-demo/zh";

export type TeamDemoMember = {
  name: string;
  text: string;
};

export type TeamDemoActivity = {
  time: string;
  text: string;
  state: "done" | "running" | "wait";
};

export type TeamDemoTeam = {
  /** Short workspace name, used in the sidebar and mobile tabs. */
  name: string;
  lead: string;
  members: number;
  prompt: string;
  leadLine: string;
  replies: [TeamDemoMember, TeamDemoMember, TeamDemoMember];
  artifact: {
    title: string;
    lines: [string, string, string];
  };
  approval: string;
  activity: [TeamDemoActivity, TeamDemoActivity, TeamDemoActivity];
  routine: string;
};

export type TeamDemoCopy = {
  workspace: string;
  teamChat: string;
  activityTitle: string;
  members: (count: number) => string;
  composer: string;
  approve: string;
  later: string;
  routineLabel: string;
  leadBadge: string;
  running: string;
  teams: TeamDemoTeam[];
};

const TEAM_DEMO_COPY: Record<Locale, TeamDemoCopy> = {
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

export function getTeamDemoCopy(locale: Locale): TeamDemoCopy {
  return TEAM_DEMO_COPY[locale];
}
