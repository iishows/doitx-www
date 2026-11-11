import type { TeamDemoCopy } from "../team-demo";

const ja: TeamDemoCopy = {
  workspace: "ワークスペース",
  teamChat: "チームチャット",
  activityTitle: "チームアクティビティ",
  members: (count) => `${count} 体のBot`,
  composer: "チームにメッセージ…",
  approve: "承認",
  later: "後で",
  routineLabel: "常時稼働のルーティン",
  leadBadge: "リード",
  running: "実行中",
  teams: [
    {
      name: "アウトバウンド",
      lead: "アウトバウンド責任者",
      members: 7,
      prompt: "ドイツの自動化機器メーカーの購買責任者を80件探して。先にメールを検証して。",
      leadLine:
        "了解しました。まずリストを抽出し、検証とリサーチに回します。アウトバウンドは承認が下りるまで止めておきます。",
      replies: [
        { name: "検証", text: "80件中62件を検証済み。メール有効率87%、11件はソース付きでフラグ。" },
        { name: "アカウントリサーチ", text: "上位20行に意思決定者、購買シグナル、アプローチ案を追加。" },
        { name: "アウトバウンド", text: "キューは作成済み。WhatsAppとLinkedInは個別にスケジュールし、承認待ちです。" },
      ],
      artifact: {
        title: "leads-batch-07.csv",
        lines: ["80行 · 19列", "ソース80件", "62件検証済み"],
      },
      approval: "アウトバウンドリストの準備ができました。承認をお願いします。",
      activity: [
        { time: "09:00", text: "リードがバッチを割り当て", state: "done" },
        { time: "09:45", text: "62件の連絡先を検証", state: "done" },
        { time: "10:30", text: "アウトバウンドキューが承認待ち", state: "wait" },
      ],
      routine: "毎日9:00に実行 · 45分ごとにヘルスチェック",
    },
    {
      name: "自社サイト",
      lead: "運用責任者",
      members: 6,
      prompt: "今週5本の記事を計画して。先に先週落としたGSCキーワードを取り戻して。",
      leadLine:
        "5つのbriefに分割します。技術SEOが先にインデックスを修正、コンテンツは2本、GEOは引用の監視を続けます。",
      replies: [
        { name: "技術SEO", text: "404が3件、重複canonicalが2件を修正。sitemapを再送信しました。" },
        { name: "コンテンツリード", text: "2本の下書きがレビュー中。タイトルは検索意図に合わせて書き直し済み。" },
        { name: "AEO / GEO", text: "今週AI引用元が6件増。競合の引用2件を修正リストに追加しました。" },
      ],
      artifact: {
        title: "今週のコンテンツ計画",
        lines: ["5 briefs · 下書き2本", "404 3件修正", "AI引用 +6"],
      },
      approval: "下書き2本の準備ができました。公開の承認をお待ちしています。",
      activity: [
        { time: "月 9:00", text: "週次計画を設定", state: "done" },
        { time: "00:00", text: "公開briefを送信", state: "done" },
        { time: "金 16:30", text: "データレビュー", state: "running" },
      ],
      routine: "月曜に計画 · 0時にbrief · 30分ごとにセルフチェック",
    },
    {
      name: "コンテンツマトリクス",
      lead: "総指揮 → 編集長",
      members: 9,
      prompt: "このリリースを全プラットフォーム向けのコンテンツにして。今日は3チャネルを配信して。",
      leadLine:
        "編集長がbriefを分割します。WeChat、Zhihu、Douyinを先に、残りは明日続きます。",
      replies: [
        { name: "編集長", text: "9プラットフォーム分のbriefを配布。ブランドレッドラインは先週のルールに準拠。" },
        { name: "WeChat", text: "長文の下書きが完成。画像と要約付き。" },
        { name: "Zhihu", text: "Q&A版を質問意図に合わせて書き直し、比較表を添付。" },
      ],
      artifact: {
        title: "ローンチコンテンツパック",
        lines: ["brief 9本", "今日公開可能 3本", "プラットフォームカレンダー生成済み"],
      },
      approval: "3本の準備ができました。確認をお願いします。",
      activity: [
        { time: "30分ごと", text: "チームセルフチェック", state: "done" },
        { time: "45分ごと", text: "フリートチェック", state: "done" },
        { time: "今日", text: "承認待ちの投稿3本", state: "wait" },
      ],
      routine: "30/45分ごとにセルフチェック · 9プラットフォーム並列",
    },
    {
      name: "Douyinショップ",
      lead: "ショップ運営責任者",
      members: 6,
      prompt: "今日の候補を見直して。出品できるものは出品し、在庫切れは入れ替えて。",
      leadLine:
        "了解しました。選品が候補を出し、コンプライアンスが確認して、残りはそのまま公開します。在庫と広告費は私が監視します。",
      replies: [
        { name: "選品", text: "候補23件を利益率と販売数で9件に絞り込み。1688の供給元を添付。" },
        { name: "コンプライアンス", text: "カテゴリ書類は完了。広告法のリスク表現2件を差し替えました。" },
        { name: "在庫", text: "販売中の3型が在庫切れ。代替2件を確保、1件は取下げ推奨。" },
      ],
      artifact: {
        title: "今日の出品レポート",
        lines: ["候補9件 · 出品可6件", "コンプライアンス修正2件", "在庫切れ3件 · 差し替え2件"],
      },
      approval: "6件の出品が承認待ちです。",
      activity: [
        { time: "09:00", text: "照合チェック", state: "done" },
        { time: "09:30", text: "選品が23件をスキャン", state: "done" },
        { time: "20:00", text: "広告レビュー", state: "running" },
      ],
      routine: "9:00 照合 · 9:30 選品 · 14:00 コンテンツ · 20:00 レビュー",
    },
    {
      name: "Pinduoduoショップ",
      lead: "機会アナリスト",
      members: 6,
      prompt: "機会商品チャートを監視して。今日出品する価値のあるものはある？",
      leadLine:
        "チャートをスキャンし、価格比較とリスク審査を回して、利益が残るものをキューに入れます。",
      replies: [
        { name: "1688価格比較", text: "12件マッチ。最安の送料込み単価は¥8.6、差幅35%。" },
        { name: "IPリスク審査", text: "類似デザイン2件をフラグ。保留にしています。" },
        { name: "利益チェック", text: "4件が純利益18–26%で通過。まず3件の出品を推奨。" },
      ],
      artifact: {
        title: "opportunity-2026-11-10.csv",
        lines: ["チャート12件", "通過4件", "推奨3件"],
      },
      approval: "3件の出品機会について判断をお願いします。",
      activity: [
        { time: "15分ごと", text: "機会スキャン", state: "done" },
        { time: "10:00", text: "在庫チェック", state: "done" },
        { time: "現在", text: "3件が判断待ち", state: "wait" },
      ],
      routine: "15分ごとにスキャン · 10:00に在庫チェック",
    },
    {
      name: "小説執筆",
      lead: "編集長",
      members: 5,
      prompt: "第12章を書いて。前章の伏線を回収して。",
      leadLine:
        "まずプロットとキャラクターシートを確認します。プロットが対立を作り、本文が書き、レビューが承認します。",
      replies: [
        { name: "プロット", text: "第12章は三幕構成。伏線は第二幕で回収し、最後に新しいフックを置きます。" },
        { name: "キャラクター", text: "主人公の動機は第1〜11章と一致。脇役のセリフは口調に合わせて調整。" },
        { name: "レビュー", text: "テンポの遅い2箇所を削り、論理の穴を1つ埋めました。" },
      ],
      artifact: {
        title: "chapter-12-final.md",
        lines: ["3幕 · 3,200字", "伏線回収1件", "レビュー指摘4件"],
      },
      approval: "第12章は最終確認待ちです。",
      activity: [
        { time: "プロット", text: "対立と伏線を設計", state: "done" },
        { time: "下書き", text: "キャラクターチェック", state: "done" },
        { time: "最終稿", text: "レビュー待ち", state: "wait" },
      ],
      routine: "会話主導 · 世界観とキャラクターシートを自動読み込み",
    },
    {
      name: "ショート動画",
      lead: "クリエイティブリード",
      members: 4,
      prompt: "15秒の商品動画を作って。今日中に完成版が欲しい。",
      leadLine:
        "スクリプトが訴求点を固め、絵コンテがカットを切り、完成版がそのまま公開へ進みます。",
      replies: [
        { name: "スクリプト", text: "15秒で3カット：課題、商品、行動。ナレーション42文字。" },
        { name: "絵コンテ", text: "カットと素材リストは準備済み。先週クリック率の高かったメインビジュアルを流用。" },
        { name: "動画", text: "完成版を書き出し済み。縦型1080×1920、字幕焼き込み済み。" },
      ],
      artifact: {
        title: "launch-15s.mp4",
        lines: ["15秒 · 1080×1920", "3カット · 42文字", "字幕焼き込み済み"],
      },
      approval: "完成版の承認をお待ちしています。",
      activity: [
        { time: "スクリプト", text: "訴求点とナレーション", state: "done" },
        { time: "絵コンテ", text: "カットと素材", state: "done" },
        { time: "完成版", text: "承認待ち", state: "wait" },
      ],
      routine: "スクリプト → 絵コンテ → 編集 → 公開",
    },
    {
      name: "Alibaba調達",
      lead: "調達リード",
      members: 5,
      prompt: "Alibabaの商家連絡先ページを採り終えて、バッチを統合して。",
      leadLine:
        "5バッチを並列で回します。私が統合・重複排除・項目補完をして、検収のために渡します。",
      replies: [
        { name: "コレクター3", text: "バッチ3完了：480行、連絡先の充足率91%。" },
        { name: "コレクター5", text: "バッチ5完了：460行。CAPTCHAに当たり、低速モードに切替。" },
        { name: "調達リード", text: "5バッチ統合：2,340行、重複排除後1,980行。項目は補完済み。" },
      ],
      artifact: {
        title: "alibaba-merchants.csv",
        lines: ["生データ2,340行", "重複排除後1,980行", "充足率91%"],
      },
      approval: "リストは検収待ちです。",
      activity: [
        { time: "バッチ1–3", text: "並列収集", state: "done" },
        { time: "バッチ4–5", text: "補完と重複排除", state: "done" },
        { time: "統合", text: "検収待ち", state: "wait" },
      ],
      routine: "バッチ並列 · 5人のコレクターが同時実行",
    },
  ],
};

export default ja;
