import type { TeamCopy } from "../teams";

const tr: TeamCopy = {
  eyebrow: "Gerçek ekipler",
  heading: "Bir yığın sohbet penceresi değil. Kendi başına işe başlayan bir ekip.",
  copy:
    "Bir lider Bot hedefi alır, görevlere böler ve ilerlemeyi izler. Uzmanlar rutinlerle çalışır ve aynı akışta rapor verir. Bu üç ekip şu anda çalışıyor.",
  labels: {
    rhythm: "Ritim",
    output: "Çıktı",
    handoff: "Sizin onayınız",
  },
  cards: [
    {
      tag: "Outbound hattı",
      title: "Hedef profilden iletişime açık listeye",
      summary:
        "Bir lider Bot kaynak bulma, doğrulama, hesap araştırması ve kanal bazlı iletişimi yürütür; ardından her yanıtı derecelendirir.",
      lead: "Outbound lideri",
      roles: [
        "Doğrulama",
        "Hesap araştırması",
        "İletişim",
        "WhatsApp",
        "Facebook",
        "LinkedIn",
        "Fırsat takibi",
      ],
      rhythm:
        "Her gün 9.00'da kaynak taraması. 45 dakikada bir durum kontrolü. Doğrulanan satırlar iletişim kuyruğuna geçer.",
      output:
        "Toplu CSV'ler, kaynak defteri, doğrulanmış kişiler, iletişim kuyruğu ve yanıt defteri.",
      handoff:
        "Hedef profili siz onaylarsınız; listeler veya gönderimler onayınızı bekleyebilir.",
    },
    {
      tag: "Bağımsız site",
      title: "Günlük içerik ve SEO/AEO fabrikası",
      summary:
        "Bir operasyon lideri haftayı planlar ve işi dağıtır. Teknik SEO, içerik, yapay zeka görünürlüğü, dijital PR, merchandising ve ücretli medya kendi alanını yönetir.",
      lead: "Operasyon lideri",
      roles: [
        "Teknik SEO",
        "İçerik lideri",
        "AEO / GEO",
        "Dijital PR",
        "Merchandising",
        "Ücretli medya",
      ],
      rhythm:
        "Pazartesi haftalık plan. Gece yarısı bir yayın brief'i. 30 dakikada bir öz kontrol, cuma günü veri incelemesi.",
      output:
        "Anahtar kelime niyet haritaları, brief'ler ve taslaklar, yapay zeka görünürlük raporları, PR hedef listeleri ve haftalık özet.",
      handoff:
        "Konuları ve marka dilini siz onaylarsınız, yayından önce son kontrolü siz yaparsınız.",
    },
    {
      tag: "İçerik matrisi",
      title: "Tek brief, birçok platform",
      summary:
        "Bir komutan tempoyu belirler, bir genel yayın yönetmeni brief'i böler ve dokuz platform uzmanı uyarlar, yayınlar ve inceler.",
      lead: "Komutan → Genel yayın yönetmeni",
      roles: [
        "WeChat",
        "Zhihu",
        "Weibo",
        "Toutiao",
        "Baijiahao",
        "Douyin",
        "Kuaishou",
        "Channels",
        "Web sitesi",
      ],
      rhythm:
        "Ana mesaj bir içerik matrisine dönüşür. 30 ve 45 dakikada bir öz kontrol ve filo kontrolü yapılır.",
      output:
        "Platforma hazır taslaklar, bir yayın takvimi ve haftalık içerik incelemesi.",
      handoff:
        "Marka sınırlarını siz belirlersiniz; dışa dönük gönderiler onay gerektirebilir.",
    },
  ],
  stats: {
    runs: "7 günde çalıştırma",
    completed: "tamamlandı",
    routines: "sürekli açık rutin",
    bots: "birlikte çalışan Bot",
  },
  note:
    "Rakamlar, Kasım 2026'da kesintisiz çalışan özel bir kurulumdan, önceki yedi güne aittir. Müşteri verisi içermez.",
};

export default tr;
