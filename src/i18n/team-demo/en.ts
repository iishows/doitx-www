import type { TeamDemoCopy } from "../team-demo";

const en: TeamDemoCopy = {
  workspace: "Workspaces",
  teamChat: "Team chat",
  activityTitle: "Team activity",
  members: (count) => `${count} bots`,
  composer: "Message the team…",
  approve: "Approve",
  later: "Later",
  routineLabel: "Always-on routine",
  leadBadge: "lead",
  running: "Running",
  teams: [
    {
      name: "Outbound",
      lead: "Outbound lead",
      members: 7,
      prompt: "Find 80 heads of procurement at German automation companies. Verify emails first.",
      leadLine:
        "On it. I'll source the list, hand it to verification and research, and hold outreach until you approve the names.",
      replies: [
        { name: "Verification", text: "62 of 80 verified. 87% email validity, 11 flagged with sources." },
        { name: "Account research", text: "Top 20 rows now have decision makers, buying signals and angles." },
        { name: "Outreach", text: "Queue is built. WhatsApp and LinkedIn are scheduled separately, waiting on you." },
      ],
      artifact: {
        title: "leads-batch-07.csv",
        lines: ["80 rows · 19 columns", "80 source records", "62 verified"],
      },
      approval: "Outreach list is ready for your approval.",
      activity: [
        { time: "09:00", text: "Lead assigned the batch", state: "done" },
        { time: "09:45", text: "62 contacts verified", state: "done" },
        { time: "10:30", text: "Outreach queue needs approval", state: "wait" },
      ],
      routine: "Runs at 9:00 daily · health check every 45 minutes",
    },
    {
      name: "Independent site",
      lead: "Operations lead",
      members: 6,
      prompt: "Plan five posts this week, and win back last week's lost GSC keywords first.",
      leadLine:
        "Split into five briefs: technical SEO fixes indexing first, content drafts two, GEO keeps watching citations.",
      replies: [
        { name: "Technical SEO", text: "3 broken 404s and 2 duplicate canonicals fixed. Sitemap resubmitted." },
        { name: "Content lead", text: "Two drafts are in review, titles rewritten around search intent." },
        { name: "AEO / GEO", text: "AI citation sources are up 6 this week. Two competitor citations added to the fix list." },
      ],
      artifact: {
        title: "This week's content plan",
        lines: ["5 briefs · 2 drafts", "3 404s fixed", "AI citations +6"],
      },
      approval: "Two drafts are ready, waiting for your publish sign-off.",
      activity: [
        { time: "Mon 9:00", text: "Weekly plan set", state: "done" },
        { time: "00:00", text: "Publishing brief sent", state: "done" },
        { time: "Fri 16:30", text: "Data review", state: "running" },
      ],
      routine: "Monday plan · brief at midnight · self-check every 30 minutes",
    },
    {
      name: "Content matrix",
      lead: "Commander → Editor-in-chief",
      members: 9,
      prompt: "Turn this launch into content for every platform. Three channels go out today.",
      leadLine:
        "The editor will split the brief. WeChat, Zhihu and Douyin first, the rest follow tomorrow.",
      replies: [
        { name: "Editor-in-chief", text: "Nine platform briefs are out. Brand red lines match last week's rules." },
        { name: "WeChat", text: "Long-form draft is done, with images and summary." },
        { name: "Zhihu", text: "Q&A version rewritten around question intent, comparison table attached." },
      ],
      artifact: {
        title: "Launch content pack",
        lines: ["9 briefs", "3 posts ready today", "Platform calendar generated"],
      },
      approval: "Three posts are ready for your confirmation.",
      activity: [
        { time: "Every 30 min", text: "Team self-check", state: "done" },
        { time: "Every 45 min", text: "Fleet check", state: "done" },
        { time: "Today", text: "3 posts awaiting approval", state: "wait" },
      ],
      routine: "Self-check every 30/45 minutes · 9 platforms in parallel",
    },
    {
      name: "Douyin shop",
      lead: "Shop operator",
      members: 6,
      prompt: "Review today's candidates. List what you can, replace what's out of stock.",
      leadLine:
        "On it. Sourcing sends candidates, compliance clears them, and the rest goes live. I watch stock and ad spend.",
      replies: [
        { name: "Sourcing", text: "23 candidates filtered to 9 by margin and sales. 1688 supply attached." },
        { name: "Compliance", text: "Category papers are complete. Two ad-law risk phrases replaced." },
        { name: "Inventory", text: "3 live styles are out of stock. 2 alternates found, 1 should come down." },
      ],
      artifact: {
        title: "Today's listing report",
        lines: ["9 candidates · 6 listable", "2 compliance edits", "3 out of stock · 2 replaced"],
      },
      approval: "6 listings are waiting for your go-ahead.",
      activity: [
        { time: "09:00", text: "Reconciliation check", state: "done" },
        { time: "09:30", text: "Sourcing scanned 23", state: "done" },
        { time: "20:00", text: "Ad review", state: "running" },
      ],
      routine: "9:00 reconcile · 9:30 sourcing · 14:00 content · 20:00 review",
    },
    {
      name: "Pinduoduo shop",
      lead: "Opportunity analyst",
      members: 6,
      prompt: "Watch the opportunity chart. Anything worth listing today?",
      leadLine:
        "I'll scan the chart, run price matching and risk review, and queue whatever clears the margin.",
      replies: [
        { name: "1688 price match", text: "12 matches. Lowest shipped unit price is ¥8.6, a 35% spread." },
        { name: "IP risk review", text: "2 lookalike designs are flagged. Holding them back." },
        { name: "Margin check", text: "4 cleared at 18–26% net. I'd list 3 to start." },
      ],
      artifact: {
        title: "opportunity-2026-11-10.csv",
        lines: ["12 chart items", "4 cleared", "3 recommended"],
      },
      approval: "3 listing opportunities need your call.",
      activity: [
        { time: "Every 15 min", text: "Opportunity scan", state: "done" },
        { time: "10:00", text: "Stock check", state: "done" },
        { time: "Now", text: "3 awaiting your call", state: "wait" },
      ],
      routine: "Scan every 15 minutes · stock check at 10:00",
    },
    {
      name: "Novel writing",
      lead: "Editor-in-chief",
      members: 5,
      prompt: "Write chapter 12 and pay off the setup from the last chapter.",
      leadLine:
        "We'll check the outline and character sheets first. Plot drafts the conflict, prose writes it, review signs off.",
      replies: [
        { name: "Plot", text: "Chapter 12 splits into three acts. The setup pays off in act two, with a new hook at the end." },
        { name: "Characters", text: "The lead's motive matches chapters 1–11. Supporting dialogue is adjusted to voice." },
        { name: "Review", text: "Cut two slow passages and filled one logic gap." },
      ],
      artifact: {
        title: "chapter-12-final.md",
        lines: ["3 acts · 3,200 words", "1 setup paid off", "4 review notes"],
      },
      approval: "Chapter 12 is waiting for your final read.",
      activity: [
        { time: "Outline", text: "Conflict and setup mapped", state: "done" },
        { time: "Draft", text: "Character check", state: "done" },
        { time: "Final", text: "Awaiting your review", state: "wait" },
      ],
      routine: "Dialogue-driven · loads world and character sheets",
    },
    {
      name: "Short video",
      lead: "Creative lead",
      members: 4,
      prompt: "Make a 15-second product video. I need the final cut today.",
      leadLine:
        "Script locks the selling point, the board cuts shots, and the final cut moves straight to publishing.",
      replies: [
        { name: "Script", text: "Three shots in 15 seconds: problem, product, action. 42 words of voiceover." },
        { name: "Storyboard", text: "Shots and asset list are ready. Reusing last week's high-click hero image." },
        { name: "Video", text: "Final cut exported, 1080×1920 vertical, subtitles burned in." },
      ],
      artifact: {
        title: "launch-15s.mp4",
        lines: ["15s · 1080×1920", "3 shots · 42 words", "Subtitles burned in"],
      },
      approval: "The final cut is ready for your sign-off.",
      activity: [
        { time: "Script", text: "Selling point and voiceover", state: "done" },
        { time: "Board", text: "Shots and assets", state: "done" },
        { time: "Final cut", text: "Awaiting sign-off", state: "wait" },
      ],
      routine: "Script → storyboard → edit → publish",
    },
    {
      name: "Alibaba sourcing",
      lead: "Sourcing lead",
      members: 5,
      prompt: "Finish the Alibaba merchant contact pages and merge the batches.",
      leadLine:
        "Five batches run in parallel. I merge, dedupe and fill the fields, then hand it to you for acceptance.",
      replies: [
        { name: "Collector 3", text: "Batch 3 done: 480 rows, 91% complete contact details." },
        { name: "Collector 5", text: "Batch 5 done: 460 rows. Hit a captcha, switched to slow mode." },
        { name: "Sourcing lead", text: "5 batches merged: 2,340 rows, 1,980 after dedupe. Fields filled." },
      ],
      artifact: {
        title: "alibaba-merchants.csv",
        lines: ["2,340 raw rows", "1,980 after dedupe", "91% complete"],
      },
      approval: "The list is ready for your acceptance.",
      activity: [
        { time: "Batches 1–3", text: "Parallel collection", state: "done" },
        { time: "Batches 4–5", text: "Fill and dedupe", state: "done" },
        { time: "Merge", text: "Awaiting acceptance", state: "wait" },
      ],
      routine: "Parallel batches · 5 collectors at once",
    },
  ],
};

export default en;
