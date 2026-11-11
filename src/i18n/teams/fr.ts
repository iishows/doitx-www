import type { TeamCopy } from "../teams";

const fr: TeamCopy = {
  eyebrow: "Équipes réelles",
  heading: "Pas un tas de fenêtres de chat. Une équipe qui se met au travail toute seule.",
  copy:
    "Un bot lead prend l'objectif, le découpe en tâches et suit la progression. Les spécialistes tournent sur des routines et rendent compte dans le même fil. Ces trois équipes sont en production aujourd'hui.",
  labels: {
    rhythm: "Rythme",
    output: "Livrables",
    handoff: "Votre validation",
  },
  cards: [
    {
      tag: "Pipeline outbound",
      title: "D'un profil cible à une liste contactable",
      summary:
        "Un bot lead pilote la prospection, la vérification, la recherche de comptes et l'approche multicanale, puis qualifie chaque réponse.",
      lead: "Lead outbound",
      roles: [
        "Vérification",
        "Recherche de comptes",
        "Prise de contact",
        "WhatsApp",
        "Facebook",
        "LinkedIn",
        "Suivi des opportunités",
      ],
      rhythm:
        "Prospection chaque jour à 9 h. Contrôles de santé toutes les 45 minutes. Les lignes vérifiées passent dans la file d'approche.",
      output:
        "Des CSV par lot, un registre des sources, des contacts vérifiés, une file d'approche et un registre des réponses.",
      handoff:
        "Vous validez le profil cible ; les listes et les envois peuvent attendre votre accord.",
    },
    {
      tag: "Site indépendant",
      title: "Une usine quotidienne de contenu et de SEO/AEO",
      summary:
        "Un lead opérations planifie la semaine et répartit le travail. SEO technique, contenu, visibilité IA, RP digitales, merchandising et paid media ont chacun leur couloir.",
      lead: "Lead opérations",
      roles: [
        "SEO technique",
        "Lead contenu",
        "AEO / GEO",
        "RP digitales",
        "Merchandising",
        "Paid media",
      ],
      rhythm:
        "Plan hebdomadaire le lundi. Un brief de publication à minuit. Auto-contrôle toutes les 30 minutes et revue des données le vendredi.",
      output:
        "Des cartographies d'intention de mots-clés, des briefs et des brouillons, des rapports de visibilité IA, des listes de cibles RP et un récap hebdomadaire.",
      handoff:
        "Vous validez les sujets et la voix de marque, et donnez le feu vert avant publication.",
    },
    {
      tag: "Matrice de contenu",
      title: "Un brief, plusieurs plateformes",
      summary:
        "Un commandant fixe le tempo, un rédacteur en chef découpe le brief, et neuf spécialistes de plateforme adaptent, publient et évaluent.",
      lead: "Commandant → Rédacteur en chef",
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
        "Le message clé devient une matrice de contenu. Auto-contrôles et un contrôle de flotte toutes les 30 et 45 minutes.",
      output:
        "Des brouillons prêts pour chaque plateforme, un calendrier de publication et une revue de contenu hebdomadaire.",
      handoff:
        "Vous fixez les lignes rouges de la marque ; les publications externes peuvent exiger une validation.",
    },
  ],
  stats: {
    runs: "exécutions sur les 7 derniers jours",
    completed: "terminées",
    routines: "routines toujours actives",
    bots: "bots qui travaillent ensemble",
  },
  note:
    "Chiffres issus d'un déploiement privé en fonctionnement continu en novembre 2026, sur les sept jours précédents. Aucune donnée client n'est incluse.",
};

export default fr;
