import type { TeamCopy } from "../teams";

const en: TeamCopy = {
  eyebrow: "Real teams",
  heading: "Not a pile of chat windows. A team that starts work on its own.",
  copy:
    "A lead bot takes the goal, splits it into tasks, and watches progress. Specialists run on routines and report back in the same thread. These three teams are running today.",
  labels: {
    rhythm: "Rhythm",
    output: "Output",
    handoff: "Your call",
  },
  cards: [
    {
      tag: "Outbound pipeline",
      title: "From a target profile to a contactable list",
      summary:
        "A lead bot runs sourcing, verification, account research and channel outreach, then grades every reply.",
      lead: "Outbound lead",
      roles: [
        "Verification",
        "Account research",
        "Outreach",
        "WhatsApp",
        "Facebook",
        "LinkedIn",
        "Deal follow-up",
      ],
      rhythm:
        "Sourcing at 9:00 daily. Health checks every 45 minutes. Verified rows move into the outreach queue.",
      output:
        "Batch CSVs, a source ledger, verified contacts, an outreach queue and a reply ledger.",
      handoff:
        "You confirm the target profile, and lists or sends can wait for your approval.",
    },
    {
      tag: "Independent site",
      title: "A daily content and SEO/AEO factory",
      summary:
        "An operations lead plans the week and assigns work. Technical SEO, content, AI visibility, digital PR, merchandising and paid media each own their lane.",
      lead: "Operations lead",
      roles: [
        "Technical SEO",
        "Content lead",
        "AEO / GEO",
        "Digital PR",
        "Merchandising",
        "Paid media",
      ],
      rhythm:
        "Weekly plan on Monday. One publishing brief at midnight. Self-check every 30 minutes, and a data review on Friday.",
      output:
        "Keyword intent maps, briefs and drafts, AI-visibility reports, PR target lists and a weekly recap.",
      handoff: "You approve topics and the brand voice, and sign off before publishing.",
    },
    {
      tag: "Content matrix",
      title: "One brief, many platforms",
      summary:
        "A commander sets the cadence, an editor-in-chief splits the brief, and nine platform specialists adapt, publish and review.",
      lead: "Commander → Editor-in-chief",
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
        "Core messaging becomes a content matrix. Self-checks and a fleet check every 30 and 45 minutes.",
      output:
        "Platform-ready drafts, a publishing calendar and a weekly content review.",
      handoff: "You set the brand red lines, and outbound posts can require approval.",
    },
  ],
  stats: {
    runs: "runs in 7 days",
    completed: "completed",
    routines: "always-on routines",
    bots: "bots working together",
  },
  note:
    "Numbers from one private deployment running continuously in November 2026, over the previous seven days. No customer data is included.",
};

export default en;
