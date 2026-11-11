import type { TeamCopy } from "../teams";

const nl: TeamCopy = {
  eyebrow: "Echte teams",
  heading: "Geen berg chatvensters. Een team dat zelf aan de slag gaat.",
  copy:
    "Een lead-bot neemt het doel over, splitst het op in taken en houdt de voortgang in de gaten. Specialisten draaien op routines en rapporteren terug in dezelfde thread. Deze drie teams draaien vandaag.",
  labels: {
    rhythm: "Ritme",
    output: "Output",
    handoff: "Jouw beslissing",
  },
  cards: [
    {
      tag: "Outbound-pipeline",
      title: "Van doelprofiel naar contacteerbare lijst",
      summary:
        "Een lead-bot stuurt sourcing, verificatie, accountonderzoek en kanaalbenadering aan en beoordeelt elk antwoord.",
      lead: "Outbound-lead",
      roles: [
        "Verificatie",
        "Accountonderzoek",
        "Benadering",
        "WhatsApp",
        "Facebook",
        "LinkedIn",
        "Deal-opvolging",
      ],
      rhythm:
        "Sourcing dagelijks om 9:00. Health checks elke 45 minuten. Geverifieerde rijen gaan naar de outreach-wachtrij.",
      output:
        "Batch-CSV's, een bronlog, geverifieerde contacten, een outreach-wachtrij en een antwoordlog.",
      handoff:
        "Jij bevestigt het doelprofiel; lijsten en verzendingen kunnen op jouw goedkeuring wachten.",
    },
    {
      tag: "Eigen website",
      title: "Een dagelijkse content- en SEO/AEO-fabriek",
      summary:
        "Een operations-lead plant de week en verdeelt het werk. Technische SEO, content, AI-zichtbaarheid, digital PR, merchandising en paid media hebben elk hun eigen spoor.",
      lead: "Operations-lead",
      roles: [
        "Technische SEO",
        "Content-lead",
        "AEO / GEO",
        "Digital PR",
        "Merchandising",
        "Paid media",
      ],
      rhythm:
        "Weekplan op maandag. Eén publishing-brief om middernacht. Zelfcheck elke 30 minuten en een datareview op vrijdag.",
      output:
        "Keyword-intentkaarten, briefs en concepten, AI-zichtbaarheidsrapporten, PR-doellijsten en een wekelijkse terugblik.",
      handoff:
        "Jij keurt onderwerpen en de merktoon goed en geeft groen licht voor publicatie.",
    },
    {
      tag: "Contentmatrix",
      title: "Eén brief, veel platforms",
      summary:
        "Een commander bepaalt het ritme, een hoofdredacteur splitst de brief en negen platformspecialisten passen aan, publiceren en evalueren.",
      lead: "Commander → Hoofdredacteur",
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
        "De kernboodschap wordt een contentmatrix. Zelfchecks en een fleetcheck elke 30 en 45 minuten.",
      output:
        "Platformklare concepten, een publicatiekalender en een wekelijkse contentreview.",
      handoff:
        "Jij stelt de merkgrenzen vast; externe posts kunnen goedkeuring vereisen.",
    },
  ],
  stats: {
    runs: "uitvoeringen in de laatste 7 dagen",
    completed: "afgerond",
    routines: "altijd actieve routines",
    bots: "bots die samenwerken",
  },
  note:
    "Cijfers uit één private deployment die in november 2026 continu draaide, over de zeven dagen daarvoor. Er zijn geen klantgegevens opgenomen.",
};

export default nl;
