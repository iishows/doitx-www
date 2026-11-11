import type { TeamDemoCopy } from "../team-demo";

const fr: TeamDemoCopy = {
  workspace: "Espaces de travail",
  teamChat: "Chat d'équipe",
  activityTitle: "Activité de l'équipe",
  members: (count) => `${count} bots`,
  composer: "Écrire à l'équipe…",
  approve: "Approuver",
  later: "Plus tard",
  routineLabel: "Routine permanente",
  leadBadge: "Lead",
  running: "En cours",
  teams: [
    {
      name: "Prospection",
      lead: "Responsable prospection",
      members: 7,
      prompt: "Trouve 80 responsables achats dans des entreprises allemandes d'automatisation. Vérifie les e-mails d'abord.",
      leadLine:
        "Compris. Je prépare la liste, je la confie à la vérification et à la recherche, et je bloque l'envoi jusqu'à ton approbation des noms.",
      replies: [
        { name: "Vérification", text: "62 sur 80 vérifiés. 87 % de validité e-mail, 11 signalés avec sources." },
        { name: "Recherche comptes", text: "Les 20 premières lignes ont désormais décideurs, signaux d'achat et angles d'approche." },
        { name: "Prospection", text: "La file est prête. WhatsApp et LinkedIn sont planifiés séparément, en attente de toi." },
      ],
      artifact: {
        title: "leads-batch-07.csv",
        lines: ["80 lignes · 19 colonnes", "80 enregistrements source", "62 vérifiés"],
      },
      approval: "La liste de prospection est prête pour ton approbation.",
      activity: [
        { time: "09:00", text: "Le lead a assigné le lot", state: "done" },
        { time: "09:45", text: "62 contacts vérifiés", state: "done" },
        { time: "10:30", text: "File de prospection à approuver", state: "wait" },
      ],
      routine: "Tous les jours à 9:00 · contrôle toutes les 45 minutes",
    },
    {
      name: "Site indépendant",
      lead: "Responsable opérations",
      members: 6,
      prompt: "Planifie cinq articles cette semaine et récupère d'abord les mots-clés GSC perdus la semaine dernière.",
      leadLine:
        "Découpé en cinq briefs : correctifs SEO technique en premier, deux brouillons, GEO continue de surveiller les citations.",
      replies: [
        { name: "SEO technique", text: "3 404 et 2 canonicals en double corrigés. Sitemap resoumis." },
        { name: "Responsable contenu", text: "Deux brouillons en relecture, titres réécrits selon l'intention de recherche." },
        { name: "AEO / GEO", text: "Sources de citations IA +6 cette semaine. Deux citations concurrentes ajoutées à la liste des correctifs." },
      ],
      artifact: {
        title: "Plan de contenu de la semaine",
        lines: ["5 briefs · 2 brouillons", "3 404 corrigés", "Citations IA +6"],
      },
      approval: "Deux brouillons sont prêts, en attente de ton feu vert pour publier.",
      activity: [
        { time: "lun. 9:00", text: "Plan hebdo défini", state: "done" },
        { time: "00:00", text: "Brief de publication envoyé", state: "done" },
        { time: "ven. 16:30", text: "Revue des données", state: "running" },
      ],
      routine: "Plan le lundi · brief à minuit · auto-contrôle toutes les 30 minutes",
    },
    {
      name: "Matrice de contenu",
      lead: "Commandant → Rédacteur en chef",
      members: 9,
      prompt: "Transforme ce lancement en contenu pour chaque plateforme. Trois canaux partent aujourd'hui.",
      leadLine:
        "La rédaction découpe le brief. D'abord WeChat, Zhihu et Douyin, le reste suit demain.",
      replies: [
        { name: "Rédacteur en chef", text: "Neuf briefs plateformes sont partis. Lignes rouges de marque selon les règles de la semaine dernière." },
        { name: "WeChat", text: "Brouillon long format terminé, avec images et résumé." },
        { name: "Zhihu", text: "Version Q&R réécrite selon l'intention de la question, tableau comparatif joint." },
      ],
      artifact: {
        title: "Pack de contenu de lancement",
        lines: ["9 briefs", "3 articles prêts aujourd'hui", "Calendrier plateformes généré"],
      },
      approval: "Trois articles sont prêts pour ta confirmation.",
      activity: [
        { time: "Toutes les 30 min", text: "Auto-contrôle d'équipe", state: "done" },
        { time: "Toutes les 45 min", text: "Contrôle de la flotte", state: "done" },
        { time: "Aujourd'hui", text: "3 articles en attente d'approbation", state: "wait" },
      ],
      routine: "Auto-contrôle toutes les 30/45 minutes · 9 plateformes en parallèle",
    },
    {
      name: "Boutique Douyin",
      lead: "Opérateur boutique",
      members: 6,
      prompt: "Passe en revue les candidats du jour. Mets en ligne ce que tu peux, remplace ce qui est en rupture.",
      leadLine:
        "Compris. Le sourcing envoie des candidats, la conformité les valide, le reste part en ligne. Je surveille le stock et le budget pub.",
      replies: [
        { name: "Sourcing", text: "23 candidats filtrés à 9 selon la marge et les ventes. Approvisionnement 1688 joint." },
        { name: "Conformité", text: "Les justificatifs de catégorie sont complets. Deux formulations à risque publicitaire remplacées." },
        { name: "Stock", text: "3 modèles actifs sont en rupture. 2 alternatives trouvées, 1 à retirer." },
      ],
      artifact: {
        title: "Rapport de mise en ligne du jour",
        lines: ["9 candidats · 6 publiables", "2 corrections conformité", "3 en rupture · 2 remplacés"],
      },
      approval: "6 fiches attendent ton feu vert.",
      activity: [
        { time: "09:00", text: "Contrôle de rapprochement", state: "done" },
        { time: "09:30", text: "Sourcing : 23 analysés", state: "done" },
        { time: "20:00", text: "Revue pub", state: "running" },
      ],
      routine: "9:00 rapprochement · 9:30 sourcing · 14:00 contenu · 20:00 revue",
    },
    {
      name: "Boutique Pinduoduo",
      lead: "Analyste opportunités",
      members: 6,
      prompt: "Surveille le classement des opportunités. Quelque chose à mettre en ligne aujourd'hui ?",
      leadLine:
        "Je scanne le classement, je fais le comparatif de prix et la revue des risques, puis je mets en file tout ce qui passe la marge.",
      replies: [
        { name: "Comparatif 1688", text: "12 correspondances. Prix unitaire livré le plus bas : ¥8.6, soit 35% d'écart." },
        { name: "Revue risque PI", text: "2 designs ressemblants sont signalés. Je les mets de côté." },
        { name: "Contrôle marge", text: "4 validés à 18–26% net. Je listerais 3 pour commencer." },
      ],
      artifact: {
        title: "opportunity-2026-11-10.csv",
        lines: ["12 articles du classement", "4 validés", "3 recommandés"],
      },
      approval: "3 opportunités de mise en ligne attendent ta décision.",
      activity: [
        { time: "Toutes les 15 min", text: "Scan des opportunités", state: "done" },
        { time: "10:00", text: "Contrôle stock", state: "done" },
        { time: "Maintenant", text: "3 en attente de ta décision", state: "wait" },
      ],
      routine: "Scan toutes les 15 minutes · contrôle stock à 10:00",
    },
    {
      name: "Écriture de roman",
      lead: "Rédaction en chef",
      members: 5,
      prompt: "Écris le chapitre 12 et résous l'amorce du chapitre précédent.",
      leadLine:
        "On vérifie d'abord le plan et les fiches personnages. Intrigue pose le conflit, la prose l'écrit, la relecture valide.",
      replies: [
        { name: "Intrigue", text: "Le chapitre 12 se découpe en trois actes. L'amorce se résout à l'acte deux, avec un nouvel accrocheur à la fin." },
        { name: "Personnages", text: "La motivation du héros correspond aux chapitres 1–11. Les dialogues secondaires sont ajustés à la voix." },
        { name: "Relecture", text: "Deux passages lents supprimés et une faille logique comblée." },
      ],
      artifact: {
        title: "chapter-12-final.md",
        lines: ["3 actes · 3,200 mots", "1 amorce résolue", "4 notes de relecture"],
      },
      approval: "Le chapitre 12 attend ta lecture finale.",
      activity: [
        { time: "Plan", text: "Conflit et amorce cartographiés", state: "done" },
        { time: "Brouillon", text: "Vérification personnages", state: "done" },
        { time: "Final", text: "En attente de ta relecture", state: "wait" },
      ],
      routine: "Porté par les dialogues · charge l'univers et les fiches personnages",
    },
    {
      name: "Vidéo courte",
      lead: "Directeur créatif",
      members: 4,
      prompt: "Fais une vidéo produit de 15 secondes. Il me faut le montage final aujourd'hui.",
      leadLine:
        "Le script fixe l'argument de vente, le board découpe les plans, et le montage final part directement en publication.",
      replies: [
        { name: "Script", text: "Trois plans en 15 secondes : problème, produit, action. 42 mots de voix off." },
        { name: "Storyboard", text: "Plans et liste des assets prêts. On réutilise l'image hero à fort taux de clic de la semaine dernière." },
        { name: "Vidéo", text: "Montage final exporté, 1080×1920 vertical, sous-titres incrustés." },
      ],
      artifact: {
        title: "launch-15s.mp4",
        lines: ["15s · 1080×1920", "3 plans · 42 mots", "Sous-titres incrustés"],
      },
      approval: "Le montage final est prêt pour ton feu vert.",
      activity: [
        { time: "Script", text: "Argument de vente et voix off", state: "done" },
        { time: "Board", text: "Plans et assets", state: "done" },
        { time: "Montage final", text: "En attente de validation", state: "wait" },
      ],
      routine: "Script → storyboard → montage → publication",
    },
    {
      name: "Sourcing Alibaba",
      lead: "Responsable sourcing",
      members: 5,
      prompt: "Termine les pages contact des marchands Alibaba et fusionne les lots.",
      leadLine:
        "Cinq lots tournent en parallèle. Je fusionne, déduplique et remplis les champs, puis je te le passe pour validation.",
      replies: [
        { name: "Collecteur 3", text: "Lot 3 terminé : 480 lignes, 91% de coordonnées complètes." },
        { name: "Collecteur 5", text: "Lot 5 terminé : 460 lignes. Captcha rencontré, passage en mode lent." },
        { name: "Responsable sourcing", text: "5 lots fusionnés : 2,340 lignes, 1,980 après déduplication. Champs remplis." },
      ],
      artifact: {
        title: "alibaba-merchants.csv",
        lines: ["2,340 lignes brutes", "1,980 après déduplication", "91% complètes"],
      },
      approval: "La liste est prête pour ta validation.",
      activity: [
        { time: "Lots 1–3", text: "Collecte parallèle", state: "done" },
        { time: "Lots 4–5", text: "Remplissage et déduplication", state: "done" },
        { time: "Fusion", text: "En attente de validation", state: "wait" },
      ],
      routine: "Lots parallèles · 5 collecteurs à la fois",
    },
  ],
};

export default fr;
