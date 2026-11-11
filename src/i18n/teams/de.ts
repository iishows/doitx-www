import type { TeamCopy } from "../teams";

const de: TeamCopy = {
  eyebrow: "Echte Teams",
  heading: "Keine Sammlung von Chatfenstern. Ein Team, das von selbst loslegt.",
  copy:
    "Ein Lead-Bot nimmt das Ziel auf, zerlegt es in Aufgaben und behält den Fortschritt im Blick. Spezialisten laufen nach Routinen und melden sich im selben Thread zurück. Diese drei Teams sind heute im Einsatz.",
  labels: {
    rhythm: "Takt",
    output: "Ergebnis",
    handoff: "Deine Entscheidung",
  },
  cards: [
    {
      tag: "Outbound-Pipeline",
      title: "Vom Zielprofil zur kontaktierbaren Liste",
      summary:
        "Ein Lead-Bot steuert Recherche, Verifizierung, Account-Recherche und Kanal-Ansprache und bewertet jede Antwort.",
      lead: "Outbound-Lead",
      roles: [
        "Verifizierung",
        "Account-Recherche",
        "Ansprache",
        "WhatsApp",
        "Facebook",
        "LinkedIn",
        "Deal-Nachverfolgung",
      ],
      rhythm:
        "Recherche täglich um 9:00 Uhr. Health-Checks alle 45 Minuten. Verifizierte Zeilen wandern in die Outreach-Warteschlange.",
      output:
        "Batch-CSVs, ein Quellen-Ledger, verifizierte Kontakte, eine Outreach-Warteschlange und ein Antwort-Ledger.",
      handoff:
        "Du bestätigst das Zielprofil; Listen und Versand können auf deine Freigabe warten.",
    },
    {
      tag: "Eigene Website",
      title: "Eine tägliche Content- und SEO/AEO-Fabrik",
      summary:
        "Ein Operations-Lead plant die Woche und verteilt die Arbeit. Technisches SEO, Content, KI-Sichtbarkeit, Digital PR, Merchandising und Paid Media verantworten jeweils ihre eigene Spur.",
      lead: "Operations-Lead",
      roles: [
        "Technisches SEO",
        "Content-Lead",
        "AEO / GEO",
        "Digital PR",
        "Merchandising",
        "Paid Media",
      ],
      rhythm:
        "Wochenplan am Montag. Ein Publishing-Brief um Mitternacht. Selbstcheck alle 30 Minuten, Datenreview am Freitag.",
      output:
        "Keyword-Intent-Maps, Briefs und Entwürfe, KI-Sichtbarkeitsberichte, PR-Ziellisten und ein Wochenrückblick.",
      handoff:
        "Du gibst Themen und Markenstimme frei und zeichnest vor der Veröffentlichung ab.",
    },
    {
      tag: "Content-Matrix",
      title: "Ein Brief, viele Plattformen",
      summary:
        "Ein Commander gibt den Takt vor, ein Chefredakteur teilt den Brief auf, und neun Plattform-Spezialisten passen an, veröffentlichen und prüfen.",
      lead: "Commander → Chefredakteur",
      roles: [
        "WeChat",
        "Zhihu",
        "Weibo",
        "Toutiao",
        "Baijiahao",
        "Douyin",
        "Kuaishou",
        "Channels",
        "Website",
      ],
      rhythm:
        "Die Kernbotschaft wird zur Content-Matrix. Selbstchecks und ein Flotten-Check alle 30 und 45 Minuten.",
      output:
        "Plattformfertige Entwürfe, ein Redaktionskalender und ein wöchentliches Content-Review.",
      handoff:
        "Du setzt die Marken-Leitplanken; externe Posts können eine Freigabe erfordern.",
    },
  ],
  stats: {
    runs: "Läufe in den letzten 7 Tagen",
    completed: "abgeschlossen",
    routines: "dauerhaft aktive Routinen",
    bots: "Bots im Zusammenspiel",
  },
  note:
    "Zahlen aus einer privaten Deployment-Instanz mit Dauerbetrieb im November 2026, über die vorangegangenen sieben Tage. Es sind keine Kundendaten enthalten.",
};

export default de;
