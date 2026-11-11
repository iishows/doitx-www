import type { TeamDemoCopy } from "../team-demo";

const tr: TeamDemoCopy = {
  workspace: "Çalışma alanları",
  teamChat: "Ekip sohbeti",
  activityTitle: "Ekip etkinliği",
  members: (count) => `${count} Bot`,
  composer: "Ekibe mesaj yaz…",
  approve: "Onayla",
  later: "Sonra",
  routineLabel: "Sürekli rutin",
  leadBadge: "lider",
  running: "Çalışıyor",
  teams: [
    {
      name: "Dış erişim",
      lead: "Dış erişim lideri",
      members: 7,
      prompt: "Alman otomasyon şirketlerinde 80 satın alma yöneticisi bul. Önce e-postaları doğrula.",
      leadLine:
        "Hemen. Listeyi ben bulurum, doğrulama ve araştırmaya iletirim; isimleri sen onaylayana kadar iletişimi bekletirim.",
      replies: [
        { name: "Doğrulama", text: "80 kişiden 62'si doğrulandı. %87 e-posta geçerliliği, 11 kayıt kaynaklarla işaretlendi." },
        { name: "Hesap araştırması", text: "İlk 20 satırda artık karar vericiler, satın alma sinyalleri ve yaklaşım açıları var." },
        { name: "Erişim", text: "Kuyruk hazır. WhatsApp ve LinkedIn ayrı ayrı planlandı, senden onay bekliyor." },
      ],
      artifact: {
        title: "leads-batch-07.csv",
        lines: ["80 satır · 19 sütun", "80 kaynak kaydı", "62 doğrulandı"],
      },
      approval: "Erişim listesi onayına hazır.",
      activity: [
        { time: "09:00", text: "Lider grubu atadı", state: "done" },
        { time: "09:45", text: "62 kişi doğrulandı", state: "done" },
        { time: "10:30", text: "Erişim kuyruğu onay bekliyor", state: "wait" },
      ],
      routine: "Her gün 9:00'da çalışır · 45 dakikada bir sağlık kontrolü",
    },
    {
      name: "Bağımsız site",
      lead: "Operasyon lideri",
      members: 6,
      prompt: "Bu hafta beş yazı planla ve önce geçen hafta GSC'de kaybedilen anahtar kelimeleri geri kazan.",
      leadLine:
        "Beş brief'e böldüm: teknik SEO önce dizine eklemeyi düzeltiyor, içerik iki taslak hazırlıyor, GEO alıntıları izlemeye devam ediyor.",
      replies: [
        { name: "Teknik SEO", text: "3 kırık 404 ve 2 yinelenen canonical düzeltildi. Sitemap yeniden gönderildi." },
        { name: "İçerik lideri", text: "İki taslak incelemede, başlıklar arama niyetine göre yeniden yazıldı." },
        { name: "AEO / GEO", text: "Bu hafta AI alıntı kaynakları 6 arttı. İki rakip alıntısı düzeltme listesine eklendi." },
      ],
      artifact: {
        title: "Bu haftanın içerik planı",
        lines: ["5 brief · 2 taslak", "3 404 düzeltildi", "AI alıntıları +6"],
      },
      approval: "İki taslak hazır, yayın onayını bekliyor.",
      activity: [
        { time: "Pzt 9:00", text: "Haftalık plan yapıldı", state: "done" },
        { time: "00:00", text: "Yayın brief'i gönderildi", state: "done" },
        { time: "Cum 16:30", text: "Veri incelemesi", state: "running" },
      ],
      routine: "Pazartesi plan · gece yarısı brief · 30 dakikada bir öz denetim",
    },
    {
      name: "İçerik matrisi",
      lead: "Komutan → Genel yayın yönetmeni",
      members: 9,
      prompt: "Bu lansmanı her platform için içeriğe dönüştür. Bugün üç kanal yayınlanıyor.",
      leadLine:
        "Editör brief'i bölecek. Önce WeChat, Zhihu ve Douyin, kalanlar yarın.",
      replies: [
        { name: "Genel yayın yönetmeni", text: "Dokuz platform brief'i gönderildi. Marka kırmızı çizgileri geçen haftanın kurallarına uyuyor." },
        { name: "WeChat", text: "Uzun form taslak hazır, görseller ve özetle birlikte." },
        { name: "Zhihu", text: "Soru-cevap sürümü soru niyetine göre yeniden yazıldı, karşılaştırma tablosu eklendi." },
      ],
      artifact: {
        title: "Lansman içerik paketi",
        lines: ["9 brief", "Bugün 3 yazı hazır", "Platform takvimi oluşturuldu"],
      },
      approval: "Üç yazı onayın için hazır.",
      activity: [
        { time: "Her 30 dk", text: "Ekip öz denetimi", state: "done" },
        { time: "Her 45 dk", text: "Filo kontrolü", state: "done" },
        { time: "Bugün", text: "3 yazı onay bekliyor", state: "wait" },
      ],
      routine: "Her 30/45 dakikada öz denetim · 9 platform paralel",
    },
    {
      name: "Douyin mağazası",
      lead: "Mağaza operatörü",
      members: 6,
      prompt: "Bugünün adaylarını incele. Yayınlayabildiklerini yayınla, stokta olmayanları değiştir.",
      leadLine:
        "Hemen. Tedarik adayları gönderir, uyum onaylar, geri kalanı yayına girer. Stoğu ve reklam harcamasını ben takip ederim.",
      replies: [
        { name: "Tedarik", text: "23 aday, marj ve satışa göre 9'a indirildi. 1688 tedariki eklendi." },
        { name: "Uyum", text: "Kategori belgeleri tamam. Reklam kanununa aykırı iki ifade değiştirildi." },
        { name: "Stok", text: "3 aktif model stokta yok. 2 alternatif bulundu, 1'in kaldırılması gerek." },
      ],
      artifact: {
        title: "Bugünün listeleme raporu",
        lines: ["9 aday · 6 listelenebilir", "2 uyum düzeltmesi", "3 stokta yok · 2 değiştirildi"],
      },
      approval: "6 liste onayını bekliyor.",
      activity: [
        { time: "09:00", text: "Mutabakat kontrolü", state: "done" },
        { time: "09:30", text: "Tedarik 23 taradı", state: "done" },
        { time: "20:00", text: "Reklam incelemesi", state: "running" },
      ],
      routine: "9:00 mutabakat · 9:30 tedarik · 14:00 içerik · 20:00 inceleme",
    },
    {
      name: "Pinduoduo mağazası",
      lead: "Fırsat analisti",
      members: 6,
      prompt: "Fırsat grafiğini takip et. Bugün listelemeye değer bir şey var mı?",
      leadLine:
        "Grafiği tarar, fiyat karşılaştırması ve risk incelemesi yapar, marjı geçenleri kuyruğa alırım.",
      replies: [
        { name: "1688 fiyat karşılaştırması", text: "12 eşleşme. En düşük kargo dahil birim fiyat ¥8.6, %35 fark." },
        { name: "IP risk incelemesi", text: "2 benzer tasarım işaretlendi. Onları bekletiyorum." },
        { name: "Marj kontrolü", text: "4 tanesi %18–26 net ile geçti. Başlangıç için 3 listelerdim." },
      ],
      artifact: {
        title: "opportunity-2026-11-10.csv",
        lines: ["12 grafik ürünü", "4 onaylandı", "3 önerildi"],
      },
      approval: "3 listeleme fırsatı kararını bekliyor.",
      activity: [
        { time: "Her 15 dk", text: "Fırsat taraması", state: "done" },
        { time: "10:00", text: "Stok kontrolü", state: "done" },
        { time: "Şimdi", text: "3 karar bekliyor", state: "wait" },
      ],
      routine: "Her 15 dakikada tarama · 10:00'da stok kontrolü",
    },
    {
      name: "Roman yazımı",
      lead: "Genel yayın yönetmeni",
      members: 5,
      prompt: "12. bölümü yaz ve önceki bölümde kurulan hazırlığı kapat.",
      leadLine:
        "Önce ana hat ve karakter kartlarını kontrol ederiz. Kurgu çatışmayı yazar, üslup metne döker, inceleme onay verir.",
      replies: [
        { name: "Kurgu", text: "12. bölüm üç perdeye ayrılıyor. Hazırlık ikinci perdede kapanıyor, sonunda yeni bir kanca var." },
        { name: "Karakterler", text: "Başkarakterin motivasyonu 1–11. bölümlerle uyumlu. Yardımcı diyaloglar ses tonuna göre ayarlandı." },
        { name: "İnceleme", text: "İki yavaş pasaj kesildi, bir mantık boşluğu dolduruldu." },
      ],
      artifact: {
        title: "chapter-12-final.md",
        lines: ["3 perde · 3,200 kelime", "1 hazırlık kapatıldı", "4 inceleme notu"],
      },
      approval: "12. bölüm son okumanı bekliyor.",
      activity: [
        { time: "Ana hat", text: "Çatışma ve hazırlık eşlendi", state: "done" },
        { time: "Taslak", text: "Karakter kontrolü", state: "done" },
        { time: "Final", text: "İncelemeni bekliyor", state: "wait" },
      ],
      routine: "Diyalog odaklı · dünya ve karakter kartlarını yükler",
    },
    {
      name: "Kısa video",
      lead: "Yaratıcı lider",
      members: 4,
      prompt: "15 saniyelik bir ürün videosu yap. Final kurgu bugün lazım.",
      leadLine:
        "Senaryo satış noktasını sabitler, storyboard planları keser, final kurgu doğrudan yayına gider.",
      replies: [
        { name: "Senaryo", text: "15 saniyede üç plan: sorun, ürün, eylem. 42 kelime seslendirme." },
        { name: "Storyboard", text: "Planlar ve varlık listesi hazır. Geçen haftanın yüksek tıklamalı ana görseli yeniden kullanılıyor." },
        { name: "Video", text: "Final kurgu dışa aktarıldı, 1080×1920 dikey, altyazılar gömülü." },
      ],
      artifact: {
        title: "launch-15s.mp4",
        lines: ["15 sn · 1080×1920", "3 plan · 42 kelime", "Altyazılar gömülü"],
      },
      approval: "Final kurgu onayına hazır.",
      activity: [
        { time: "Senaryo", text: "Satış noktası ve seslendirme", state: "done" },
        { time: "Storyboard", text: "Planlar ve varlıklar", state: "done" },
        { time: "Final kurgu", text: "Onay bekliyor", state: "wait" },
      ],
      routine: "Senaryo → storyboard → kurgu → yayın",
    },
    {
      name: "Alibaba tedarik",
      lead: "Tedarik lideri",
      members: 5,
      prompt: "Alibaba satıcı iletişim sayfalarını tamamla ve partileri birleştir.",
      leadLine:
        "Beş parti paralel çalışır. Ben birleştirir, yinelenenleri ayıklar ve alanları doldururum, sonra kabul için sana veririm.",
      replies: [
        { name: "Toplayıcı 3", text: "Parti 3 tamam: 480 satır, %91 iletişim bilgisi eksiksiz." },
        { name: "Toplayıcı 5", text: "Parti 5 tamam: 460 satır. Captcha çıktı, yavaş moda geçtim." },
        { name: "Tedarik lideri", text: "5 parti birleştirildi: 2,340 satır, yinelenenler ayıklanınca 1,980. Alanlar dolduruldu." },
      ],
      artifact: {
        title: "alibaba-merchants.csv",
        lines: ["2,340 ham satır", "Yinelenenler sonrası 1,980", "%91 eksiksiz"],
      },
      approval: "Liste kabulüne hazır.",
      activity: [
        { time: "Parti 1–3", text: "Paralel toplama", state: "done" },
        { time: "Parti 4–5", text: "Doldur ve ayıkla", state: "done" },
        { time: "Birleştir", text: "Kabul bekliyor", state: "wait" },
      ],
      routine: "Paralel partiler · aynı anda 5 toplayıcı",
    },
  ],
};

export default tr;
