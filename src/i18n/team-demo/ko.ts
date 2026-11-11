import type { TeamDemoCopy } from "../team-demo";

const ko: TeamDemoCopy = {
  workspace: "워크스페이스",
  teamChat: "팀 채팅",
  activityTitle: "팀 활동",
  members: (count) => `${count}개 Bot`,
  composer: "팀에 메시지…",
  approve: "승인",
  later: "나중에",
  routineLabel: "상시 루틴",
  leadBadge: "리드",
  running: "실행 중",
  teams: [
    {
      name: "아웃바운드",
      lead: "아웃바운드 리드",
      members: 7,
      prompt: "독일 자동화 장비 기업의 구매 담당자 80명을 찾아줘. 이메일 검증을 먼저 해줘.",
      leadLine:
        "알겠습니다. 리스트를 뽑아 검증과 리서치에 넘기고, 승인 전까지 아웃바운드는 보류하겠습니다.",
      replies: [
        { name: "검증", text: "80명 중 62명 검증 완료. 이메일 유효율 87%, 11건은 출처와 함께 플래그 처리." },
        { name: "계정 리서치", text: "상위 20개 행에 의사결정자, 구매 신호, 접근 각도를 추가했습니다." },
        { name: "아웃바운드", text: "큐 구성 완료. WhatsApp과 LinkedIn은 따로 예약되며 승인 대기 중입니다." },
      ],
      artifact: {
        title: "leads-batch-07.csv",
        lines: ["80행 · 19열", "출처 80건", "62건 검증 완료"],
      },
      approval: "아웃바운드 리스트가 준비되었습니다. 승인해 주세요.",
      activity: [
        { time: "09:00", text: "리드가 배치 배정", state: "done" },
        { time: "09:45", text: "연락처 62건 검증", state: "done" },
        { time: "10:30", text: "아웃바운드 큐 승인 대기", state: "wait" },
      ],
      routine: "매일 9:00 실행 · 45분마다 상태 점검",
    },
    {
      name: "자사 사이트",
      lead: "운영 리드",
      members: 6,
      prompt: "이번 주 글 5편을 기획하고, 지난주에 잃은 GSC 키워드부터 되찾아줘.",
      leadLine:
        "brief 5개로 나눕니다. 기술 SEO가 먼저 색인을 고치고, 콘텐츠는 2편, GEO는 인용 모니터링을 이어갑니다.",
      replies: [
        { name: "기술 SEO", text: "404 3건과 중복 canonical 2건 수정. sitemap 재제출 완료." },
        { name: "콘텐츠 리드", text: "초안 2편 검토 중. 제목은 검색 의도에 맞게 다시 작성했습니다." },
        { name: "AEO / GEO", text: "이번 주 AI 인용 출처 6건 증가. 경쟁사 인용 2건을 수정 목록에 추가했습니다." },
      ],
      artifact: {
        title: "이번 주 콘텐츠 계획",
        lines: ["brief 5개 · 초안 2편", "404 3건 수정", "AI 인용 +6"],
      },
      approval: "초안 2편이 준비되었습니다. 게시 승인을 기다립니다.",
      activity: [
        { time: "월 9:00", text: "주간 계획 수립", state: "done" },
        { time: "00:00", text: "게시 brief 발송", state: "done" },
        { time: "금 16:30", text: "데이터 리뷰", state: "running" },
      ],
      routine: "월요일 기획 · 자정 brief · 30분마다 자체 점검",
    },
    {
      name: "콘텐츠 매트릭스",
      lead: "총지휘 → 편집장",
      members: 9,
      prompt: "이번 출시를 모든 플랫폼 콘텐츠로 만들어줘. 오늘은 세 채널을 먼저 내보내.",
      leadLine:
        "편집장이 brief를 나눕니다. WeChat, Zhihu, Douyin을 먼저, 나머지는 내일 이어집니다.",
      replies: [
        { name: "편집장", text: "9개 플랫폼 brief 배포 완료. 브랜드 레드라인은 지난주 기준을 따릅니다." },
        { name: "WeChat", text: "장문 초안 완료. 이미지와 요약 포함." },
        { name: "Zhihu", text: "Q&A 버전을 질문 의도에 맞게 다시 쓰고 비교표를 첨부했습니다." },
      ],
      artifact: {
        title: "출시 콘텐츠 팩",
        lines: ["brief 9개", "오늘 게시 가능 3편", "플랫폼 캘린더 생성 완료"],
      },
      approval: "게시글 3편이 준비되었습니다. 확인해 주세요.",
      activity: [
        { time: "30분마다", text: "팀 자체 점검", state: "done" },
        { time: "45분마다", text: "플리트 점검", state: "done" },
        { time: "오늘", text: "승인 대기 3편", state: "wait" },
      ],
      routine: "30/45분마다 자체 점검 · 9개 플랫폼 병렬",
    },
    {
      name: "Douyin 숍",
      lead: "숍 운영자",
      members: 6,
      prompt: "오늘 후보를 검토해줘. 올릴 수 있는 건 올리고, 품절은 교체해.",
      leadLine:
        "알겠습니다. 소싱이 후보를 보내고 컴플라이언스가 확인하면 나머지는 바로 올립니다. 재고와 광고비는 제가 봅니다.",
      replies: [
        { name: "소싱", text: "후보 23개를 마진과 판매량으로 9개까지 추렸습니다. 1688 공급처 첨부." },
        { name: "컴플라이언스", text: "카테고리 서류는 완비. 광고법 리스크 문구 2개를 교체했습니다." },
        { name: "재고", text: "판매 중인 3개 스타일이 품절. 대체 2개를 찾았고, 1개는 내려야 합니다." },
      ],
      artifact: {
        title: "오늘의 등록 리포트",
        lines: ["후보 9개 · 등록 가능 6개", "컴플라이언스 수정 2건", "품절 3개 · 교체 2개"],
      },
      approval: "등록 6건이 승인 대기 중입니다.",
      activity: [
        { time: "09:00", text: "정합성 점검", state: "done" },
        { time: "09:30", text: "소싱 23개 스캔", state: "done" },
        { time: "20:00", text: "광고 리뷰", state: "running" },
      ],
      routine: "9:00 정합성 · 9:30 소싱 · 14:00 콘텐츠 · 20:00 리뷰",
    },
    {
      name: "Pinduoduo 숍",
      lead: "기회 상품 분석",
      members: 6,
      prompt: "기회 상품 차트를 지켜봐. 오늘 등록할 만한 게 있어?",
      leadLine:
        "차트를 스캔하고 가격 비교와 리스크 검토를 돌려서, 마진이 남는 것만 큐에 넣겠습니다.",
      replies: [
        { name: "1688 가격 비교", text: "12건 매칭. 최저 배송 포함 단가 ¥8.6, 격차 35%." },
        { name: "IP 리스크 검토", text: "유사 디자인 2건 플래그. 보류합니다." },
        { name: "마진 점검", text: "4건이 순마진 18–26%로 통과. 우선 3건 등록을 권합니다." },
      ],
      artifact: {
        title: "opportunity-2026-11-10.csv",
        lines: ["차트 12건", "통과 4건", "권장 3건"],
      },
      approval: "등록 기회 3건에 대한 판단이 필요합니다.",
      activity: [
        { time: "15분마다", text: "기회 스캔", state: "done" },
        { time: "10:00", text: "재고 점검", state: "done" },
        { time: "지금", text: "3건 판단 대기", state: "wait" },
      ],
      routine: "15분마다 스캔 · 10:00 재고 점검",
    },
    {
      name: "소설 집필",
      lead: "편집장",
      members: 5,
      prompt: "12장을 써줘. 지난 장에 심어둔 복선을 회수해.",
      leadLine:
        "먼저 개요와 캐릭터 시트를 확인합니다. 플롯이 갈등을 만들고, 문장이 쓰고, 리뷰가 승인합니다.",
      replies: [
        { name: "플롯", text: "12장은 3막으로 나뉩니다. 복선은 2막에서 회수하고 마지막에 새 훅을 둡니다." },
        { name: "캐릭터", text: "주인공 동기는 1–11장과 일치. 조연 대사는 말투에 맞게 조정." },
        { name: "리뷰", text: "느린 구간 2곳을 덜어내고 논리 구멍 1개를 메웠습니다." },
      ],
      artifact: {
        title: "chapter-12-final.md",
        lines: ["3막 · 3,200자", "복선 회수 1건", "리뷰 의견 4건"],
      },
      approval: "12장이 최종 검토를 기다립니다.",
      activity: [
        { time: "개요", text: "갈등과 복선 설계", state: "done" },
        { time: "초고", text: "캐릭터 점검", state: "done" },
        { time: "최종고", text: "검토 대기", state: "wait" },
      ],
      routine: "대화 중심 · 세계관과 캐릭터 시트 자동 로드",
    },
    {
      name: "숏폼 영상",
      lead: "크리에이티브 리드",
      members: 4,
      prompt: "15초 제품 영상을 만들어줘. 오늘 최종본이 필요해.",
      leadLine:
        "스크립트가 셀링 포인트를 잡고, 스토리보드가 컷을 나누고, 최종본이 바로 게시로 넘어갑니다.",
      replies: [
        { name: "스크립트", text: "15초에 3컷: 문제, 제품, 행동. 내레이션 42자." },
        { name: "스토리보드", text: "컷과 소재 목록 준비 완료. 지난주 클릭률 높은 대표 이미지를 재사용." },
        { name: "영상", text: "최종본 내보내기 완료. 세로 1080×1920, 자막 번인." },
      ],
      artifact: {
        title: "launch-15s.mp4",
        lines: ["15초 · 1080×1920", "3컷 · 42자", "자막 번인 완료"],
      },
      approval: "최종본이 승인을 기다립니다.",
      activity: [
        { time: "스크립트", text: "셀링 포인트와 내레이션", state: "done" },
        { time: "스토리보드", text: "컷과 소재", state: "done" },
        { time: "최종본", text: "승인 대기", state: "wait" },
      ],
      routine: "스크립트 → 스토리보드 → 편집 → 게시",
    },
    {
      name: "Alibaba 소싱",
      lead: "소싱 리드",
      members: 5,
      prompt: "Alibaba 판매자 연락처 페이지를 마저 수집하고 배치를 합쳐줘.",
      leadLine:
        "5개 배치를 병렬로 돌립니다. 제가 병합·중복 제거·필드 보완 후 검수용으로 넘기겠습니다.",
      replies: [
        { name: "수집기 3", text: "배치 3 완료: 480행, 연락처 완성률 91%." },
        { name: "수집기 5", text: "배치 5 완료: 460행. 캡차를 만나 저속 모드로 전환." },
        { name: "소싱 리드", text: "5개 배치 병합: 2,340행, 중복 제거 후 1,980행. 필드 보완 완료." },
      ],
      artifact: {
        title: "alibaba-merchants.csv",
        lines: ["원본 2,340행", "중복 제거 후 1,980행", "완성률 91%"],
      },
      approval: "리스트가 검수를 기다립니다.",
      activity: [
        { time: "배치 1–3", text: "병렬 수집", state: "done" },
        { time: "배치 4–5", text: "보완과 중복 제거", state: "done" },
        { time: "병합", text: "검수 대기", state: "wait" },
      ],
      routine: "배치 병렬 · 수집기 5개 동시 실행",
    },
  ],
};

export default ko;
