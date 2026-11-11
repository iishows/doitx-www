import type { TeamDemoCopy } from "../team-demo";

const de: TeamDemoCopy = {
  workspace: "Arbeitsbereiche",
  teamChat: "Teamchat",
  activityTitle: "Team-Aktivität",
  members: (count) => `${count} Bots`,
  composer: "Nachricht an das Team…",
  approve: "Genehmigen",
  later: "Später",
  routineLabel: "Dauerhafte Routine",
  leadBadge: "Lead",
  running: "Läuft",
  teams: [
    {
      name: "Outbound",
      lead: "Outbound-Lead",
      members: 7,
      prompt: "Finde 80 Einkaufsleiter bei deutschen Automatisierungsunternehmen. E-Mails zuerst verifizieren.",
      leadLine:
        "Verstanden. Ich stelle die Liste zusammen, gebe sie an Verifizierung und Recherche und halte den Versand zurück, bis du die Namen freigibst.",
      replies: [
        { name: "Verifizierung", text: "62 von 80 verifiziert. 87 % E-Mail-Gültigkeit, 11 mit Quellen markiert." },
        { name: "Account-Recherche", text: "Die Top-20-Zeilen haben jetzt Entscheider, Kaufsignale und passende Ansätze." },
        { name: "Outreach", text: "Die Warteschlange steht. WhatsApp und LinkedIn sind separat geplant, warten auf dich." },
      ],
      artifact: {
        title: "leads-batch-07.csv",
        lines: ["80 Zeilen · 19 Spalten", "80 Quelldatensätze", "62 verifiziert"],
      },
      approval: "Die Outreach-Liste ist bereit für deine Freigabe.",
      activity: [
        { time: "09:00", text: "Lead hat den Batch zugewiesen", state: "done" },
        { time: "09:45", text: "62 Kontakte verifiziert", state: "done" },
        { time: "10:30", text: "Outreach-Warteschlange braucht Freigabe", state: "wait" },
      ],
      routine: "Täglich um 9:00 · Health-Check alle 45 Minuten",
    },
    {
      name: "Eigene Website",
      lead: "Operations-Lead",
      members: 6,
      prompt: "Plane diese Woche fünf Beiträge und hol zuerst die verlorenen GSC-Keywords der letzten Woche zurück.",
      leadLine:
        "Aufgeteilt in fünf Briefs: technische SEO-Fixes zuerst, zwei Content-Entwürfe, GEO beobachtet weiter die Zitate.",
      replies: [
        { name: "Technisches SEO", text: "3 defekte 404er und 2 doppelte Canonicals behoben. Sitemap erneut eingereicht." },
        { name: "Content-Lead", text: "Zwei Entwürfe sind im Review, Titel auf Suchintention neu geschrieben." },
        { name: "AEO / GEO", text: "KI-Zitatquellen diese Woche +6. Zwei Wettbewerber-Zitate auf die Fix-Liste gesetzt." },
      ],
      artifact: {
        title: "Content-Plan dieser Woche",
        lines: ["5 Briefs · 2 Entwürfe", "3 404er behoben", "KI-Zitate +6"],
      },
      approval: "Zwei Entwürfe sind bereit, warten auf dein Okay zum Veröffentlichen.",
      activity: [
        { time: "Mo 9:00", text: "Wochenplan festgelegt", state: "done" },
        { time: "00:00", text: "Publishing-Brief gesendet", state: "done" },
        { time: "Fr 16:30", text: "Daten-Review", state: "running" },
      ],
      routine: "Montagsplan · Brief um Mitternacht · Selbstcheck alle 30 Minuten",
    },
    {
      name: "Content-Matrix",
      lead: "Commander → Chefredaktion",
      members: 9,
      prompt: "Mach aus diesem Launch Inhalte für jede Plattform. Drei Kanäle gehen heute raus.",
      leadLine:
        "Die Redaktion teilt den Brief auf. Zuerst WeChat, Zhihu und Douyin, der Rest folgt morgen.",
      replies: [
        { name: "Chefredaktion", text: "Neun Plattform-Briefs sind raus. Marken-Redlines wie letzte Woche." },
        { name: "WeChat", text: "Langtext-Entwurf ist fertig, mit Bildern und Zusammenfassung." },
        { name: "Zhihu", text: "Q&A-Version auf Frageintention umgeschrieben, Vergleichstabelle angehängt." },
      ],
      artifact: {
        title: "Launch-Content-Paket",
        lines: ["9 Briefs", "3 Beiträge heute bereit", "Plattform-Kalender erstellt"],
      },
      approval: "Drei Beiträge sind bereit für deine Bestätigung.",
      activity: [
        { time: "Alle 30 Min", text: "Team-Selbstcheck", state: "done" },
        { time: "Alle 45 Min", text: "Flottencheck", state: "done" },
        { time: "Heute", text: "3 Beiträge warten auf Freigabe", state: "wait" },
      ],
      routine: "Selbstcheck alle 30/45 Minuten · 9 Plattformen parallel",
    },
    {
      name: "Douyin-Shop",
      lead: "Shop-Operator",
      members: 6,
      prompt: "Sieh dir die heutigen Kandidaten an. Liste, was du kannst, ersetze, was ausverkauft ist.",
      leadLine:
        "Verstanden. Sourcing schickt Kandidaten, Compliance gibt sie frei, der Rest geht live. Lager und Werbebudget behalte ich im Blick.",
      replies: [
        { name: "Sourcing", text: "23 Kandidaten nach Marge und Absatz auf 9 gefiltert. 1688-Bezug angehängt." },
        { name: "Compliance", text: "Kategorie-Nachweise sind vollständig. Zwei werberechtliche Risikoformulierungen ersetzt." },
        { name: "Lager", text: "3 aktive Styles sind ausverkauft. 2 Alternativen gefunden, 1 sollte raus." },
      ],
      artifact: {
        title: "Heutiger Listing-Report",
        lines: ["9 Kandidaten · 6 listbar", "2 Compliance-Korrekturen", "3 ausverkauft · 2 ersetzt"],
      },
      approval: "6 Listings warten auf dein Go.",
      activity: [
        { time: "09:00", text: "Abgleichprüfung", state: "done" },
        { time: "09:30", text: "Sourcing hat 23 gescannt", state: "done" },
        { time: "20:00", text: "Werbe-Review", state: "running" },
      ],
      routine: "9:00 Abgleich · 9:30 Sourcing · 14:00 Content · 20:00 Review",
    },
    {
      name: "Pinduoduo-Shop",
      lead: "Chancen-Analyst",
      members: 6,
      prompt: "Beobachte die Chancen-Übersicht. Gibt es heute etwas Wertvolles zum Listen?",
      leadLine:
        "Ich scanne die Übersicht, mache Preisvergleich und Risikoprüfung und stelle alles in die Warteschlange, was die Marge besteht.",
      replies: [
        { name: "1688-Preisvergleich", text: "12 Treffer. Niedrigster Versand-Stückpreis ¥8.6, 35% Spread." },
        { name: "IP-Risikoprüfung", text: "2 ähnliche Designs sind markiert. Ich halte sie zurück." },
        { name: "Margenprüfung", text: "4 bei 18–26% netto bestanden. Ich würde 3 zum Start listen." },
      ],
      artifact: {
        title: "opportunity-2026-11-10.csv",
        lines: ["12 Einträge", "4 bestanden", "3 empfohlen"],
      },
      approval: "3 Listing-Chancen brauchen deine Entscheidung.",
      activity: [
        { time: "Alle 15 Min", text: "Chancen-Scan", state: "done" },
        { time: "10:00", text: "Lagerprüfung", state: "done" },
        { time: "Jetzt", text: "3 warten auf deine Entscheidung", state: "wait" },
      ],
      routine: "Scan alle 15 Minuten · Lagerprüfung um 10:00",
    },
    {
      name: "Roman schreiben",
      lead: "Chefredaktion",
      members: 5,
      prompt: "Schreib Kapitel 12 und löse das Setup aus dem letzten Kapitel ein.",
      leadLine:
        "Wir prüfen zuerst Outline und Figurenblätter. Plot entwirft den Konflikt, Prosa schreibt, Review gibt frei.",
      replies: [
        { name: "Plot", text: "Kapitel 12 teilt sich in drei Akte. Das Setup löst sich im zweiten Akt ein, am Ende ein neuer Hook." },
        { name: "Figuren", text: "Das Motiv der Hauptfigur passt zu Kapitel 1–11. Nebendialog ist auf die Stimme angepasst." },
        { name: "Review", text: "Zwei langsame Passagen gestrichen und eine Logiklücke gefüllt." },
      ],
      artifact: {
        title: "chapter-12-final.md",
        lines: ["3 Akte · 3,200 Wörter", "1 Setup eingelöst", "4 Review-Notizen"],
      },
      approval: "Kapitel 12 wartet auf deinen finalen Lese-Durchgang.",
      activity: [
        { time: "Outline", text: "Konflikt und Setup kartiert", state: "done" },
        { time: "Entwurf", text: "Figurencheck", state: "done" },
        { time: "Final", text: "Warten auf dein Review", state: "wait" },
      ],
      routine: "Dialoggetrieben · lädt Welt- und Figurenblätter",
    },
    {
      name: "Kurzvideos",
      lead: "Creative-Lead",
      members: 4,
      prompt: "Mach ein 15-Sekunden-Produktvideo. Ich brauche den Final Cut heute.",
      leadLine:
        "Das Skript legt den Selling Point fest, das Board schneidet die Shots, der Final Cut geht direkt ins Publishing.",
      replies: [
        { name: "Skript", text: "Drei Shots in 15 Sekunden: Problem, Produkt, Action. 42 Wörter Voiceover." },
        { name: "Storyboard", text: "Shots und Asset-Liste sind fertig. Wir nutzen das klickstarke Hero-Bild von letzter Woche." },
        { name: "Video", text: "Final Cut exportiert, 1080×1920 vertikal, Untertitel eingebrannt." },
      ],
      artifact: {
        title: "launch-15s.mp4",
        lines: ["15s · 1080×1920", "3 Shots · 42 Wörter", "Untertitel eingebrannt"],
      },
      approval: "Der Final Cut ist bereit für dein Okay.",
      activity: [
        { time: "Skript", text: "Selling Point und Voiceover", state: "done" },
        { time: "Board", text: "Shots und Assets", state: "done" },
        { time: "Final Cut", text: "Warten auf Freigabe", state: "wait" },
      ],
      routine: "Skript → Storyboard → Schnitt → Publish",
    },
    {
      name: "Alibaba-Sourcing",
      lead: "Sourcing-Lead",
      members: 5,
      prompt: "Vervollständige die Alibaba-Händler-Kontaktseiten und führe die Batches zusammen.",
      leadLine:
        "Fünf Batches laufen parallel. Ich führe zusammen, dedupliziere und fülle die Felder, dann geht es zur Abnahme an dich.",
      replies: [
        { name: "Sammler 3", text: "Batch 3 fertig: 480 Zeilen, 91% vollständige Kontaktdaten." },
        { name: "Sammler 5", text: "Batch 5 fertig: 460 Zeilen. Captcha erwischt, auf Slow Mode umgestellt." },
        { name: "Sourcing-Lead", text: "5 Batches zusammengeführt: 2,340 Zeilen, 1,980 nach Dedupe. Felder gefüllt." },
      ],
      artifact: {
        title: "alibaba-merchants.csv",
        lines: ["2,340 Rohzeilen", "1,980 nach Dedupe", "91% vollständig"],
      },
      approval: "Die Liste ist bereit für deine Abnahme.",
      activity: [
        { time: "Lots 1–3", text: "Parallele Sammlung", state: "done" },
        { time: "Lots 4–5", text: "Füllen und Dedupe", state: "done" },
        { time: "Merge", text: "Warten auf Abnahme", state: "wait" },
      ],
      routine: "Parallele Batches · 5 Sammler gleichzeitig",
    },
  ],
};

export default de;
