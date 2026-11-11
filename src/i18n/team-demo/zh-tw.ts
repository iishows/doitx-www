import type { TeamDemoCopy } from "../team-demo";

const zhTw: TeamDemoCopy = {
  workspace: "工作區",
  teamChat: "團隊會話",
  activityTitle: "團隊動態",
  members: (count) => `${count} 個 Bot`,
  composer: "傳訊息給團隊…",
  approve: "核准",
  later: "稍後",
  routineLabel: "常駐例行程序",
  leadBadge: "主管",
  running: "執行中",
  teams: [
    {
      name: "海外獲客",
      lead: "線索主管",
      members: 7,
      prompt: "找 80 位德國自動化設備採購負責人，先驗證電子郵件。",
      leadLine:
        "收到。我先蒐集名單，再交給驗證和背景調查；外聯名單寄出前等你確認。",
      replies: [
        { name: "線索驗證", text: "已驗證 62/80，電子郵件有效率 87%，11 筆標記風險並附上來源。" },
        { name: "客戶背景調查", text: "Top 20 已補上決策者、近期採購訊號和外聯切入點。" },
        { name: "外聯觸達", text: "外聯佇列已排好，WhatsApp 和 LinkedIn 分開排程，等你核准。" },
      ],
      artifact: {
        title: "leads-batch-07.csv",
        lines: ["80 列 · 19 欄", "來源清冊 80 筆", "已驗證 62 筆"],
      },
      approval: "外聯名單已就緒，等你核准寄出。",
      activity: [
        { time: "09:00", text: "線索主管派單", state: "done" },
        { time: "09:45", text: "驗證完成 62 筆", state: "done" },
        { time: "10:30", text: "外聯佇列待核准", state: "wait" },
      ],
      routine: "每天 9:00 自動執行 · 每 45 分鐘巡檢",
    },
    {
      name: "獨立站營運",
      lead: "營運首席",
      members: 6,
      prompt: "這週排 5 篇，先把上週 GSC 掉排名的詞補回來。",
      leadLine:
        "已拆成 5 個 brief：技術 SEO 先修收錄，內容主筆補兩篇，GEO 持續追蹤。",
      replies: [
        { name: "技術SEO官", text: "3 個 404 和 2 個重複 canonical 已修，sitemap 重新提交。" },
        { name: "內容主筆", text: "兩篇成稿進入審閱，標題依搜尋意圖重寫。" },
        { name: "GEO可見性官", text: "上週 AI 引用來源 +6，競品被引用兩次，已列入優化清單。" },
      ],
      artifact: {
        title: "本週內容排程",
        lines: ["5 個 brief · 2 篇成稿", "修復 3 個 404", "AI 引用 +6"],
      },
      approval: "兩篇成稿已就緒，等你放行發布。",
      activity: [
        { time: "週一 9:00", text: "營運排程", state: "done" },
        { time: "00:00", text: "發布派單", state: "done" },
        { time: "週五 16:30", text: "資料檢討", state: "running" },
      ],
      routine: "週一排程 · 每天 0 點派單 · 每 30 分鐘自檢",
    },
    {
      name: "內容矩陣",
      lead: "總指揮 → 總編輯",
      members: 9,
      prompt: "把這條新品發布拆成全網內容，今天先發三個平台。",
      leadLine:
        "總編輯拆題，先出公眾號、知乎、抖音三版，其餘平台明天跟上。",
      replies: [
        { name: "總編輯", text: "核心訊息已拆成 9 條 brief，品牌紅線依上週準則執行。" },
        { name: "公眾號專員", text: "長文成稿，配圖和摘要已齊。" },
        { name: "知乎專員", text: "問答版依問題意圖改寫，附上比較表。" },
      ],
      artifact: {
        title: "新品發布內容包",
        lines: ["9 份 brief", "3 篇今日可發", "平台排程已產生"],
      },
      approval: "今日三篇已就緒，等你確認發布。",
      activity: [
        { time: "每 30 分鐘", text: "全隊自檢", state: "done" },
        { time: "每 45 分鐘", text: "艦隊巡檢", state: "done" },
        { time: "今天", text: "3 篇待發布", state: "wait" },
      ],
      routine: "每 30/45 分鐘自檢 · 9 平台並行",
    },
    {
      name: "抖音鋪貨",
      lead: "操盤手",
      members: 6,
      prompt: "今天把候選清單過一遍，能上架的先上，缺貨的找替代。",
      leadLine:
        "收到。選品先出候選，合規過一遍，能上架的直接上；庫存和廣告投放我盯著。",
      replies: [
        { name: "選品員", text: "候選 23 個，依利潤和銷量篩到 9 個，附 1688 貨源。" },
        { name: "合規專員", text: "類目資質齊全，2 條廣告法風險詞已換掉。" },
        { name: "庫存員", text: "昨天上架的 3 個款式缺貨，已找到 2 個替代貨源，1 個建議下架。" },
      ],
      artifact: {
        title: "今日上架回寫",
        lines: ["9 個候選 · 6 個可上架", "2 條合規修改", "3 個缺貨 · 2 個有替代"],
      },
      approval: "6 個上架單等你確認執行。",
      activity: [
        { time: "09:00", text: "對帳心跳", state: "done" },
        { time: "09:30", text: "選品掃描 23 個", state: "done" },
        { time: "20:00", text: "廣告投放檢討", state: "running" },
      ],
      routine: "9:00 對帳 · 9:30 選品 · 14:00 內容 · 20:00 檢討",
    },
    {
      name: "拼多多鋪貨",
      lead: "機會商品分析",
      members: 6,
      prompt: "盯一下機會商品榜，今天有沒有值得上架的。",
      leadLine:
        "我先掃榜單，比價和風險審核過一遍，利潤夠的再進上架佇列。",
      replies: [
        { name: "1688 圖搜比價", text: "12 個同款，最低單件免運價 8.6 元，價差有 35%。" },
        { name: "侵權風險審核", text: "2 個外觀相似款標記風險，先不上。" },
        { name: "利潤核算", text: "過審的 4 個款淨利率 18%–26%，建議先上 3 個。" },
      ],
      artifact: {
        title: "opportunity-2026-11-10.csv",
        lines: ["榜單商品 12 個", "過審 4 個", "建議上架 3 個"],
      },
      approval: "3 個上架機會等你拍板。",
      activity: [
        { time: "每 15 分鐘", text: "機會商品巡檢", state: "done" },
        { time: "10:00", text: "庫存檢查", state: "done" },
        { time: "現在", text: "3 個待拍板", state: "wait" },
      ],
      routine: "每 15 分鐘掃榜 · 每天 10:00 庫存檢查",
    },
    {
      name: "小說創作",
      lead: "總編輯",
      members: 5,
      prompt: "寫第 12 章，把上一章埋的伏筆收掉。",
      leadLine:
        "先對大綱和角色卡，劇情組給衝突，文筆組出初稿，最後交給審閱。",
      replies: [
        { name: "劇情", text: "第 12 章拆成三幕，伏筆在第 2 幕回收，結尾留新鉤子。" },
        { name: "角色", text: "主角動機和前 11 章一致，配角台詞已依語氣調整。" },
        { name: "審閱", text: "節奏偏慢的兩段已刪，邏輯漏洞 1 處已補。" },
      ],
      artifact: {
        title: "第12章-終稿.md",
        lines: ["3 幕結構 · 3,200 字", "伏筆回收 1 處", "審閱意見 4 條"],
      },
      approval: "第 12 章等你終審。",
      activity: [
        { time: "大綱", text: "衝突與伏筆安排", state: "done" },
        { time: "初稿", text: "角色校對", state: "done" },
        { time: "終稿", text: "待你審閱", state: "wait" },
      ],
      routine: "依對話推進 · 自動載入世界觀與角色卡",
    },
    {
      name: "短影音創作",
      lead: "主策",
      members: 4,
      prompt: "做一支 15 秒的商品宣傳影片，今天要出成品。",
      leadLine:
        "腳本先定賣點，分鏡表出鏡頭，合成後直接進後期發布。",
      replies: [
        { name: "腳本企劃", text: "15 秒三鏡頭：痛點、賣點、行動，口播 42 字。" },
        { name: "分鏡表", text: "分鏡和素材清單已出，主圖沿用上週高點擊版本。" },
        { name: "影片合成", text: "成品已匯出，直式 1080×1920，字幕已燒錄。" },
      ],
      artifact: {
        title: "launch-15s.mp4",
        lines: ["15 秒 · 1080×1920", "3 個鏡頭 · 42 字口播", "字幕已燒錄"],
      },
      approval: "成品等你確認後發布。",
      activity: [
        { time: "腳本", text: "賣點與口播", state: "done" },
        { time: "分鏡表", text: "分鏡與素材", state: "done" },
        { time: "成品", text: "待確認", state: "wait" },
      ],
      routine: "腳本 → 分鏡 → 合成 → 發布",
    },
    {
      name: "阿里國際站拓客",
      lead: "首領",
      members: 5,
      prompt: "把阿里國際站這批商家聯絡頁採完，依批次去重合併。",
      leadLine:
        "分 5 批並行，採完統一去重、補欄位，再交給你驗收。",
      replies: [
        { name: "採集員-3", text: "第 3 批完成 480 筆，聯絡方式完整率 91%。" },
        { name: "採集員-5", text: "第 5 批完成 460 筆，遇到驗證碼已切慢速模式。" },
        { name: "首領", text: "5 批合併 2,340 筆，去重後 1,980 筆，欄位已補齊。" },
      ],
      artifact: {
        title: "alibaba-merchants.csv",
        lines: ["2,340 筆原始", "去重後 1,980 筆", "完整率 91%"],
      },
      approval: "名單等你驗收後入庫。",
      activity: [
        { time: "批次 1–3", text: "並行採集", state: "done" },
        { time: "批次 4–5", text: "補齊與去重", state: "done" },
        { time: "合併", text: "待驗收", state: "wait" },
      ],
      routine: "依批次並行 · 5 個採集員同時跑",
    },
  ],
};

export default zhTw;
