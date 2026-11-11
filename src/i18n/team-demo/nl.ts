import type { TeamDemoCopy } from "../team-demo";

const nl: TeamDemoCopy = {
  workspace: "Werkruimtes",
  teamChat: "Teamchat",
  activityTitle: "Teamactiviteit",
  members: (count) => `${count} bots`,
  composer: "Bericht aan het team…",
  approve: "Goedkeuren",
  later: "Later",
  routineLabel: "Doorlopende routine",
  leadBadge: "Lead",
  running: "Actief",
  teams: [
    {
      name: "Outbound",
      lead: "Outbound-lead",
      members: 7,
      prompt: "Zoek 80 inkoopverantwoordelijken bij Duitse automatiseringsbedrijven. Verifieer eerst de e-mails.",
      leadLine:
        "Begrepen. Ik stel de lijst samen, geef hem aan verificatie en research, en houd de outreach tegen tot je de namen goedkeurt.",
      replies: [
        { name: "Verificatie", text: "62 van 80 geverifieerd. 87% e-mailgeldigheid, 11 gemarkeerd met bronnen." },
        { name: "Accountresearch", text: "De bovenste 20 rijen hebben nu beslissers, koopsignalen en invalshoeken." },
        { name: "Outreach", text: "De wachtrij staat. WhatsApp en LinkedIn zijn apart ingepland, wachten op jou." },
      ],
      artifact: {
        title: "leads-batch-07.csv",
        lines: ["80 rijen · 19 kolommen", "80 bronrecords", "62 geverifieerd"],
      },
      approval: "De outreachlijst is klaar voor je goedkeuring.",
      activity: [
        { time: "09:00", text: "Lead heeft de batch toegewezen", state: "done" },
        { time: "09:45", text: "62 contacten geverifieerd", state: "done" },
        { time: "10:30", text: "Outreachwachtrij wacht op goedkeuring", state: "wait" },
      ],
      routine: "Dagelijks om 9:00 · healthcheck elke 45 minuten",
    },
    {
      name: "Eigen site",
      lead: "Operations-lead",
      members: 6,
      prompt: "Plan deze week vijf posts en win eerst de verloren GSC-keywords van vorige week terug.",
      leadLine:
        "Opgesplitst in vijf briefs: technische SEO-fixes eerst, twee contentconcepten, GEO blijft citaties volgen.",
      replies: [
        { name: "Technische SEO", text: "3 kapotte 404's en 2 dubbele canonicals opgelost. Sitemap opnieuw ingediend." },
        { name: "Contentlead", text: "Twee concepten liggen ter review, titels herschreven rond zoekintentie." },
        { name: "AEO / GEO", text: "AI-citatiebronnen deze week +6. Twee concurrentcitaten op de fixlijst gezet." },
      ],
      artifact: {
        title: "Contentplan van deze week",
        lines: ["5 briefs · 2 concepten", "3 404's opgelost", "AI-citaties +6"],
      },
      approval: "Twee concepten zijn klaar, wachten op je akkoord om te publiceren.",
      activity: [
        { time: "ma 9:00", text: "Weekplanning vastgelegd", state: "done" },
        { time: "00:00", text: "Publicatiebrief verzonden", state: "done" },
        { time: "vr 16:30", text: "Datareview", state: "running" },
      ],
      routine: "Maandagplan · brief om middernacht · zelfcheck elke 30 minuten",
    },
    {
      name: "Contentmatrix",
      lead: "Commandant → Hoofdredactie",
      members: 9,
      prompt: "Maak van deze launch content voor elk platform. Drie kanalen gaan vandaag live.",
      leadLine:
        "De redactie splitst de brief. Eerst WeChat, Zhihu en Douyin, de rest volgt morgen.",
      replies: [
        { name: "Hoofdredactie", text: "Negen platformbriefs zijn uit. Merkrichtlijnen volgens de regels van vorige week." },
        { name: "WeChat", text: "Langtekstconcept is klaar, met afbeeldingen en samenvatting." },
        { name: "Zhihu", text: "Q&A-versie herschreven rond vraagintentie, vergelijkingstabel bijgevoegd." },
      ],
      artifact: {
        title: "Launch-contentpakket",
        lines: ["9 briefs", "3 posts klaar vandaag", "Platformkalender gegenereerd"],
      },
      approval: "Drie posts zijn klaar voor je bevestiging.",
      activity: [
        { time: "Elke 30 min", text: "Teamzelfcheck", state: "done" },
        { time: "Elke 45 min", text: "Vlootcheck", state: "done" },
        { time: "Vandaag", text: "3 posts wachten op goedkeuring", state: "wait" },
      ],
      routine: "Zelfcheck elke 30/45 minuten · 9 platforms parallel",
    },
    {
      name: "Douyin-shop",
      lead: "Shop-operator",
      members: 6,
      prompt: "Bekijk de kandidaten van vandaag. Plaats wat kan, vervang wat uitverkocht is.",
      leadLine:
        "Begrepen. Sourcing stuurt kandidaten, compliance keurt ze goed, de rest gaat live. Ik houd voorraad en advertentiebudget in de gaten.",
      replies: [
        { name: "Sourcing", text: "23 kandidaten op marge en omzet teruggebracht naar 9. 1688-voorraad bijgevoegd." },
        { name: "Compliance", text: "Categoriepapieren zijn compleet. Twee risicovolle reclamewet-uitingen vervangen." },
        { name: "Voorraad", text: "3 actieve stijlen zijn uitverkocht. 2 alternatieven gevonden, 1 kan eraf." },
      ],
      artifact: {
        title: "Listingrapport van vandaag",
        lines: ["9 kandidaten · 6 plaatsbaar", "2 compliance-aanpassingen", "3 uitverkocht · 2 vervangen"],
      },
      approval: "6 listings wachten op jouw akkoord.",
      activity: [
        { time: "09:00", text: "Afstemmingscheck", state: "done" },
        { time: "09:30", text: "Sourcing scande 23", state: "done" },
        { time: "20:00", text: "Advertentiereview", state: "running" },
      ],
      routine: "9:00 afstemmen · 9:30 sourcing · 14:00 content · 20:00 review",
    },
    {
      name: "Pinduoduo-shop",
      lead: "Kansenanalist",
      members: 6,
      prompt: "Houd de kansenlijst in de gaten. Iets interessants om vandaag te plaatsen?",
      leadLine:
        "Ik scan de lijst, doe prijsvergelijking en risicocheck, en zet alles wat de marge haalt in de wachtrij.",
      replies: [
        { name: "1688-prijsvergelijking", text: "12 matches. Laagste verzonden stukprijs is ¥8.6, een spread van 35%." },
        { name: "IP-risicocheck", text: "2 lookalike-ontwerpen zijn gemarkeerd. Ik houd ze tegen." },
        { name: "Margecheck", text: "4 door op 18–26% netto. Ik zou met 3 beginnen." },
      ],
      artifact: {
        title: "opportunity-2026-11-10.csv",
        lines: ["12 lijstitems", "4 goedgekeurd", "3 aanbevolen"],
      },
      approval: "3 listingkansen wachten op jouw besluit.",
      activity: [
        { time: "Elke 15 min", text: "Kansenscan", state: "done" },
        { time: "10:00", text: "Voorraadcheck", state: "done" },
        { time: "Nu", text: "3 wachten op jouw besluit", state: "wait" },
      ],
      routine: "Scan elke 15 minuten · voorraadcheck om 10:00",
    },
    {
      name: "Romanschrijven",
      lead: "Hoofdredactie",
      members: 5,
      prompt: "Schrijf hoofdstuk 12 en los de setup uit het vorige hoofdstuk op.",
      leadLine:
        "We checken eerst de outline en personagebladen. Plot ontwerpt het conflict, proza schrijft het, review geeft akkoord.",
      replies: [
        { name: "Plot", text: "Hoofdstuk 12 valt uiteen in drie aktes. De setup lost op in akte twee, met een nieuwe hook aan het eind." },
        { name: "Personages", text: "Het motief van de hoofdpersoon klopt met hoofdstuk 1–11. Bijrol-dialoog is op stem aangepast." },
        { name: "Review", text: "Twee trage passages geschrapt en één logisch gat gedicht." },
      ],
      artifact: {
        title: "chapter-12-final.md",
        lines: ["3 aktes · 3,200 woorden", "1 setup opgelost", "4 reviewnotities"],
      },
      approval: "Hoofdstuk 12 wacht op je laatste leesronde.",
      activity: [
        { time: "Outline", text: "Conflict en setup in kaart", state: "done" },
        { time: "Concept", text: "Personagecheck", state: "done" },
        { time: "Slot", text: "Wachten op je review", state: "wait" },
      ],
      routine: "Dialooggedreven · laadt wereld- en personagebladen",
    },
    {
      name: "Korte video",
      lead: "Creative lead",
      members: 4,
      prompt: "Maak een productvideo van 15 seconden. Ik heb de final cut vandaag nodig.",
      leadLine:
        "Script legt het verkooppunt vast, de board snijdt de shots, en de final cut gaat direct door naar publicatie.",
      replies: [
        { name: "Script", text: "Drie shots in 15 seconden: probleem, product, actie. 42 woorden voice-over." },
        { name: "Storyboard", text: "Shots en assetlijst zijn klaar. We hergebruiken de hero-image met veel clicks van vorige week." },
        { name: "Video", text: "Final cut geëxporteerd, 1080×1920 verticaal, ondertitels ingebrand." },
      ],
      artifact: {
        title: "launch-15s.mp4",
        lines: ["15s · 1080×1920", "3 shots · 42 woorden", "Ondertitels ingebrand"],
      },
      approval: "De final cut is klaar voor je akkoord.",
      activity: [
        { time: "Script", text: "Verkooppunt en voice-over", state: "done" },
        { time: "Board", text: "Shots en assets", state: "done" },
        { time: "Final cut", text: "Wachten op akkoord", state: "wait" },
      ],
      routine: "Script → storyboard → montage → publicatie",
    },
    {
      name: "Alibaba-sourcing",
      lead: "Sourcing-lead",
      members: 5,
      prompt: "Maak de contactpagina's van Alibaba-handelaren af en voeg de batches samen.",
      leadLine:
        "Vijf batches lopen parallel. Ik voeg samen, dedupliceer en vul de velden, en geef het dan aan jou voor acceptatie.",
      replies: [
        { name: "Verzamelaar 3", text: "Batch 3 klaar: 480 rijen, 91% volledige contactgegevens." },
        { name: "Verzamelaar 5", text: "Batch 5 klaar: 460 rijen. Captcha geraakt, overgestapt op slow mode." },
        { name: "Sourcing-lead", text: "5 batches samengevoegd: 2,340 rijen, 1,980 na dedupe. Velden ingevuld." },
      ],
      artifact: {
        title: "alibaba-merchants.csv",
        lines: ["2,340 ruwe rijen", "1,980 na dedupe", "91% compleet"],
      },
      approval: "De lijst is klaar voor je acceptatie.",
      activity: [
        { time: "Batches 1–3", text: "Parallelle verzameling", state: "done" },
        { time: "Batches 4–5", text: "Invullen en dedupe", state: "done" },
        { time: "Samenvoegen", text: "Wachten op acceptatie", state: "wait" },
      ],
      routine: "Parallelle batches · 5 verzamelaars tegelijk",
    },
  ],
};

export default nl;
