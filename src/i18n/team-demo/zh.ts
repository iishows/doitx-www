import type { TeamDemoCopy } from "../team-demo";

const zh: TeamDemoCopy = {
  workspace: "工作区",
  teamChat: "团队会话",
  activityTitle: "团队动态",
  members: (count) => `${count} 个 Bot`,
  composer: "给团队发消息…",
  approve: "批准",
  later: "稍后",
  routineLabel: "常驻例程",
  leadBadge: "主管",
  running: "运行中",
  teams: [
    {
      name: "海外获客",
      lead: "线索主管",
      members: 7,
      prompt: "找 80 条德国自动化设备采购负责人，先核实邮箱。",
      leadLine:
        "收到。我先拉线索，再交给核实和背调；外联名单发送前等你确认。",
      replies: [
        { name: "线索核实", text: "已核实 62/80，邮箱有效率 87%，11 条标记风险并附来源。" },
        { name: "客户背调", text: "Top 20 已补决策人、近期采购信号和外联切入点。" },
        { name: "外联触达", text: "外联队列已排好，WhatsApp 和 LinkedIn 分开排期，等你批准。" },
      ],
      artifact: {
        title: "leads-batch-07.csv",
        lines: ["80 行 · 19 列", "来源台账 80 条", "已核实 62 条"],
      },
      approval: "外联名单已就绪，等你批准发送。",
      activity: [
        { time: "09:00", text: "线索主管派单", state: "done" },
        { time: "09:45", text: "核实完成 62 条", state: "done" },
        { time: "10:30", text: "外联队列待批准", state: "wait" },
      ],
      routine: "每天 9:00 自动开跑 · 每 45 分钟巡检",
    },
    {
      name: "独立站运营",
      lead: "运营首席",
      members: 6,
      prompt: "这周排 5 篇，先把上周 GSC 掉词补回来。",
      leadLine:
        "已拆成 5 个 brief：技术 SEO 先修收录，内容主笔补两篇，GEO 跟进监测。",
      replies: [
        { name: "技术SEO官", text: "3 个 404 和 2 个重复 canonical 已修，sitemap 重新提交。" },
        { name: "内容主笔", text: "两篇成稿进审阅，标题按搜索意图重写。" },
        { name: "GEO可见性官", text: "上周 AI 引用来源 +6，竞品被引两次，已列入优化清单。" },
      ],
      artifact: {
        title: "本周内容排期",
        lines: ["5 个 brief · 2 篇成稿", "修复 3 个 404", "AI 引用 +6"],
      },
      approval: "两篇成稿已就绪，等你放行发布。",
      activity: [
        { time: "周一 9:00", text: "运营排期", state: "done" },
        { time: "00:00", text: "发布派单", state: "done" },
        { time: "周五 16:30", text: "数据复盘", state: "running" },
      ],
      routine: "周一排期 · 每天 0 点派单 · 每 30 分钟自检",
    },
    {
      name: "内容矩阵",
      lead: "总指挥 → 总编辑",
      members: 9,
      prompt: "把这条新品发布拆成全网内容，今天先发三个平台。",
      leadLine:
        "总编辑拆题，先出公众号、知乎、抖音三版，其余平台明天跟上。",
      replies: [
        { name: "总编辑", text: "核心信息已拆成 9 条 brief，品牌红线按上周口径执行。" },
        { name: "公众号专员", text: "长文成稿，配图和摘要已齐。" },
        { name: "知乎专员", text: "问答版按问题意图改写，附对比表。" },
      ],
      artifact: {
        title: "新品发布内容包",
        lines: ["9 份 brief", "3 篇今日可发", "平台排期已生成"],
      },
      approval: "今日三篇已就绪，等你确认发布。",
      activity: [
        { time: "每 30 分钟", text: "全队自检", state: "done" },
        { time: "每 45 分钟", text: "舰队巡检", state: "done" },
        { time: "今天", text: "3 篇待发布", state: "wait" },
      ],
      routine: "每 30/45 分钟自检 · 9 平台并行",
    },
    {
      name: "抖店铺货",
      lead: "操盘手",
      members: 6,
      prompt: "今天把候选清单过一遍，能铺的先铺，缺货的找替代。",
      leadLine:
        "收到。选品先出候选，合规过一遍，能铺的直接铺；库存和投流我盯着。",
      replies: [
        { name: "选品员", text: "候选 23 个，按利润和销量筛到 9 个，附 1688 货源。" },
        { name: "合规专员", text: "类目资质齐全，2 条广告法风险词已换掉。" },
        { name: "库存员", text: "昨天铺的 3 个款缺货，已找到 2 个替代货源，1 个建议下架。" },
      ],
      artifact: {
        title: "今日铺货回写",
        lines: ["9 个候选 · 6 个可铺", "2 条合规修改", "3 个缺货 · 2 个有替代"],
      },
      approval: "6 个铺货单等你确认执行。",
      activity: [
        { time: "09:00", text: "对账心跳", state: "done" },
        { time: "09:30", text: "选品扫描 23 个", state: "done" },
        { time: "20:00", text: "投流复盘", state: "running" },
      ],
      routine: "9:00 对账 · 9:30 选品 · 14:00 内容 · 20:00 复盘",
    },
    {
      name: "多多铺货",
      lead: "机会商品分析",
      members: 6,
      prompt: "盯一下机会商品榜，今天有没有值得铺的。",
      leadLine:
        "我先扫榜单，比价和风险审核过一遍，利润够的再进铺货队列。",
      replies: [
        { name: "1688图搜比价", text: "12 个同款，最低单件包邮价 8.6 元，差价够 35%。" },
        { name: "侵权风险审核", text: "2 个外观相似款标记风险，先不放。" },
        { name: "利润核算", text: "过审的 4 个款净利率 18%–26%，建议先铺 3 个。" },
      ],
      artifact: {
        title: "opportunity-2026-11-10.csv",
        lines: ["榜单单品 12 个", "过审 4 个", "建议铺 3 个"],
      },
      approval: "3 个铺货机会等你拍板。",
      activity: [
        { time: "每 15 分钟", text: "机会商品巡检", state: "done" },
        { time: "10:00", text: "库存检查", state: "done" },
        { time: "现在", text: "3 个待拍板", state: "wait" },
      ],
      routine: "每 15 分钟扫榜 · 每天 10:00 库存检查",
    },
    {
      name: "小说创作",
      lead: "总编辑",
      members: 5,
      prompt: "写第 12 章，把上章埋的伏笔收掉。",
      leadLine:
        "先对大纲和角色卡，剧情组给冲突，文笔组出初稿，最后交给审阅。",
      replies: [
        { name: "剧情", text: "第 12 章拆成三幕，伏笔在第 2 幕回收，结尾留新钩子。" },
        { name: "角色", text: "主角动机和前 11 章一致，配角台词已按口吻调整。" },
        { name: "审阅", text: "节奏偏慢的两段已删，逻辑漏洞 1 处已补。" },
      ],
      artifact: {
        title: "第12章-终稿.md",
        lines: ["3 幕结构 · 3,200 字", "伏笔回收 1 处", "审阅意见 4 条"],
      },
      approval: "第 12 章等你终审。",
      activity: [
        { time: "大纲", text: "冲突与伏笔安排", state: "done" },
        { time: "初稿", text: "角色校对", state: "done" },
        { time: "终稿", text: "待你审阅", state: "wait" },
      ],
      routine: "按对话推进 · 自动加载世界观与角色卡",
    },
    {
      name: "短视频创作",
      lead: "主策",
      members: 4,
      prompt: "做一条 15 秒的商品宣传视频，今天出成片。",
      leadLine:
        "脚本先定卖点，故事板出分镜，合成后直接进后期发布。",
      replies: [
        { name: "脚本策划", text: "15 秒三镜头：痛点、卖点、行动，口播 42 字。" },
        { name: "故事板", text: "分镜和素材清单已出，主图沿用上周高点击版本。" },
        { name: "视频合成", text: "成片已导出，竖版 1080×1920，字幕烧录完成。" },
      ],
      artifact: {
        title: "launch-15s.mp4",
        lines: ["15 秒 · 1080×1920", "3 个镜头 · 42 字口播", "字幕已烧录"],
      },
      approval: "成片等你确认后发布。",
      activity: [
        { time: "脚本", text: "卖点与口播", state: "done" },
        { time: "故事板", text: "分镜与素材", state: "done" },
        { time: "成片", text: "待确认", state: "wait" },
      ],
      routine: "脚本 → 分镜 → 合成 → 发布",
    },
    {
      name: "阿里国际拓客",
      lead: "首领",
      members: 5,
      prompt: "把阿里国际站这批商家联系页采完，按批次去重合并。",
      leadLine:
        "分 5 批并行，采完统一去重、补字段，再交给你验收。",
      replies: [
        { name: "采集员-3", text: "第 3 批完成 480 条，联系方式完整率 91%。" },
        { name: "采集员-5", text: "第 5 批完成 460 条，遇到验证码已切慢速模式。" },
        { name: "首领", text: "5 批合并 2,340 条，去重后 1,980 条，字段已补齐。" },
      ],
      artifact: {
        title: "alibaba-merchants.csv",
        lines: ["2,340 条原始", "去重后 1,980 条", "完整率 91%"],
      },
      approval: "名单等你验收后入库。",
      activity: [
        { time: "批次 1–3", text: "并行采集", state: "done" },
        { time: "批次 4–5", text: "补齐与去重", state: "done" },
        { time: "合并", text: "待验收", state: "wait" },
      ],
      routine: "按批次并行 · 5 个采集员同时跑",
    },
  ],
};

export default zh;
