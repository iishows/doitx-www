// Marketing copy for the support and 404 pages.
import type { Locale } from "./locales";

/**
 * The account-deletion section. Store listings link to `/support#account-deletion`, so the
 * anchor must keep explaining how to delete an account. Split around the two links the page
 * renders: the app URL and the support address.
 */
export type AccountDeletionCopy = {
  heading: string;
  lead: string;
  trail: string;
  requestLead: string;
  requestTrail: string;
};

export type SupportCopy = {
  h1: string;
  description: string;
  emailNote: string;
  ticketNote: string;
  accountDeletion: AccountDeletionCopy;
};

export type NotFoundCopy = {
  h1: string;
  description: string;
  homeLabel: string;
  docsLabel: string;
};

type SupportBodyCopy = Omit<SupportCopy, "accountDeletion">;

/** Account-deletion copy lives in its own record so each locale block stays readable. */
export const ACCOUNT_DELETION_COPY: Record<Locale, AccountDeletionCopy> = {
  en: {
    heading: "Account deletion",
    lead: "In the mobile app, open Account, enter your current password under Delete account, and confirm. On the web, sign in at",
    trail:
      "and do the same under Settings → Account. This permanently deletes the hosted account and its associated personal Space data.",
    requestLead: "Without access to the app, email",
    requestTrail:
      "from your account's email address to ask us to delete it. Sign-in security records are kept for up to 90 days.",
  },
  de: {
    heading: "Konto löschen",
    lead: "Öffnen Sie in der mobilen App Account, geben Sie Ihr aktuelles Passwort unter Delete account ein und bestätigen Sie. Im Web melden Sie sich an unter",
    trail:
      "und tun dasselbe unter Settings → Account. Damit werden das gehostete Konto und die zugehörigen persönlichen Space-Daten dauerhaft gelöscht.",
    requestLead: "Ohne Zugriff auf die App schreiben Sie von der E-Mail-Adresse Ihres Kontos an",
    requestTrail:
      "und bitten um Löschung. Sicherheitsprotokolle zur Anmeldung werden bis zu 90 Tage aufbewahrt.",
  },
  ko: {
    heading: "계정 삭제",
    lead: "모바일 앱에서 Account를 열고 Delete account 항목에 현재 비밀번호를 입력한 뒤 확인하세요. 웹에서는",
    trail:
      "에 로그인한 뒤 Settings → Account에서 동일하게 진행하세요. 호스팅 계정과 연결된 개인 Space 데이터가 영구적으로 삭제됩니다.",
    requestLead: "앱에 접근할 수 없다면 계정의 이메일 주소에서",
    requestTrail:
      "로 삭제를 요청하세요. 로그인 보안 기록은 최대 90일 동안 보관됩니다.",
  },
  zh: {
    heading: "删除账户",
    lead: "在移动应用中打开 Account，在 Delete account 下输入当前密码并确认。在网页端，请登录",
    trail: "，然后在 Settings → Account 下执行相同操作。这将永久删除托管账户及其关联的个人 Space 数据。",
    requestLead: "如果无法访问应用，请用账户邮箱发送邮件至",
    requestTrail: "，请我们删除账户。登录安全记录最多保留 90 天。",
  },
  ja: {
    heading: "アカウントの削除",
    lead: "モバイルアプリで Account を開き、Delete account に現在のパスワードを入力して確定します。ウェブでは",
    trail:
      "にサインインし、Settings → Account で同じ操作を行います。ホストされているアカウントと、それに紐づく個人 Space のデータが完全に削除されます。",
    requestLead: "アプリにアクセスできない場合は、アカウントのメールアドレスから",
    requestTrail: "宛てに削除をご依頼ください。サインインのセキュリティ記録は最大 90 日間保持されます。",
  },
  es: {
    heading: "Eliminar la cuenta",
    lead: "En la app móvil, abre Account, introduce tu contraseña actual en Delete account y confirma. En la web, inicia sesión en",
    trail:
      "y haz lo mismo en Settings → Account. Esto elimina de forma permanente la cuenta alojada y los datos personales de su Space.",
    requestLead: "Si no tienes acceso a la app, escribe desde el correo de tu cuenta a",
    requestTrail:
      "para pedirnos que la eliminemos. Los registros de seguridad de inicio de sesión se conservan hasta 90 días.",
  },
  fr: {
    heading: "Suppression du compte",
    lead: "Dans l'application mobile, ouvrez Account, saisissez votre mot de passe actuel sous Delete account et confirmez. Sur le web, connectez-vous à",
    trail:
      "et faites de même sous Settings → Account. Cela supprime définitivement le compte hébergé et les données personnelles de son Space.",
    requestLead: "Sans accès à l'application, écrivez depuis l'adresse e-mail de votre compte à",
    requestTrail:
      "pour nous demander la suppression. Les journaux de sécurité de connexion sont conservés jusqu'à 90 jours.",
  },
  "pt-br": {
    heading: "Exclusão da conta",
    lead: "No app para celular, abra Account, informe sua senha atual em Delete account e confirme. Na web, entre em",
    trail:
      "e faça o mesmo em Settings → Account. Isso exclui permanentemente a conta hospedada e os dados pessoais do seu Space.",
    requestLead: "Sem acesso ao app, escreva do e-mail da sua conta para",
    requestTrail:
      "pedindo a exclusão. Os registros de segurança de login são mantidos por até 90 dias.",
  },
  nl: {
    heading: "Account verwijderen",
    lead: "Open in de mobiele app Account, voer je huidige wachtwoord in bij Delete account en bevestig. Log op het web in bij",
    trail:
      "en doe hetzelfde onder Settings → Account. Hiermee worden het gehoste account en de bijbehorende persoonlijke Space-gegevens permanent verwijderd.",
    requestLead: "Zonder toegang tot de app kun je vanaf het e-mailadres van je account mailen naar",
    requestTrail:
      "om ons te vragen het account te verwijderen. Beveiligingsregistraties van aanmeldingen worden tot 90 dagen bewaard.",
  },
  ru: {
    heading: "Удаление аккаунта",
    lead: "В мобильном приложении откройте Account, введите текущий пароль в разделе Delete account и подтвердите. В веб-версии войдите на",
    trail:
      "и сделайте то же самое в Settings → Account. Размещённый аккаунт и связанные личные данные Space удаляются безвозвратно.",
    requestLead: "Если доступа к приложению нет, напишите с адреса электронной почты аккаунта на",
    requestTrail:
      "с просьбой удалить его. Записи о безопасности входа хранятся до 90 дней.",
  },
  tr: {
    heading: "Hesabı silme",
    lead: "Mobil uygulamada Account bölümünü açın, Delete account altında mevcut parolanızı girin ve onaylayın. Web'de",
    trail:
      "adresinde oturum açın ve Settings → Account altında aynısını yapın. Bu, barındırılan hesabı ve ilgili kişisel Space verilerini kalıcı olarak siler.",
    requestLead: "Uygulamaya erişiminiz yoksa hesabınızın e-posta adresinden",
    requestTrail:
      "adresine yazıp silme talebinde bulunun. Oturum açma güvenlik kayıtları 90 güne kadar saklanır.",
  },
  he: {
    heading: "מחיקת חשבון",
    lead: "באפליקציה לנייד פתחו את Account, הזינו את הסיסמה הנוכחית תחת Delete account ואשרו. בדפדפן התחברו אל",
    trail:
      "ועשו אותו דבר תחת Settings → Account. פעולה זו מוחקת לצמיתות את החשבון המאוחסן ואת נתוני ה-Space האישיים המשויכים אליו.",
    requestLead: "אם אין לכם גישה לאפליקציה, כתבו מכתובת הדוא\"ל של החשבון אל",
    requestTrail: "ובקשו למחוק אותו. רשומות אבטחה של התחברות נשמרות עד 90 יום.",
  },
  hi: {
    heading: "खाता हटाना",
    lead: "मोबाइल ऐप में Account खोलें, Delete account के अंतर्गत अपना वर्तमान पासवर्ड डालें और पुष्टि करें। वेब पर",
    trail:
      "पर साइन इन करें और Settings → Account के अंतर्गत वही करें। इससे होस्ट किया गया खाता और उससे जुड़ा व्यक्तिगत Space डेटा स्थायी रूप से हट जाता है।",
    requestLead: "यदि ऐप तक पहुँच नहीं है, तो अपने खाते के ईमेल पते से",
    requestTrail: "पर लिखकर हमसे इसे हटाने का अनुरोध करें। साइन-इन सुरक्षा रिकॉर्ड अधिकतम 90 दिन तक रखे जाते हैं।",
  },
  "zh-tw": {
    heading: "刪除帳戶",
    lead: "在行動應用程式中開啟 Account，於 Delete account 下輸入目前密碼並確認。在網頁版，請登入",
    trail: "，然後在 Settings → Account 下執行相同操作。這將永久刪除託管帳戶及其關聯的個人 Space 資料。",
    requestLead: "若無法使用應用程式，請以帳戶電子郵件寄信至",
    requestTrail: "，請我們刪除帳戶。登入安全紀錄最多保留 90 天。",
  },
};

export const SUPPORT_COPY: Record<Locale, SupportBodyCopy> = {
  en: {
    h1: "Support",
    description:
      "For account and plan questions, start with the self-hosting guide, and reply to an open issue with the logs. For bugs and feature requests, open an issue on the GitHub repository, or email support@doitx.ai and we will open one.",
    emailNote: "Include logs and the setup you ran.",
    ticketNote: "A ticket agent picks the request up.",
  },
  de: {
    h1: "Support",
    description:
      "Für Fragen zu Konto und Plan beginnen Sie mit dem Self-Hosting-Leitfaden und antworten Sie auf ein offenes Issue mit den Logs. Für Fehler und Funktionswünsche öffnen Sie ein Issue im GitHub-Repository oder schreiben Sie an support@doitx.ai — wir eröffnen dann eines.",
    emailNote: "Fügen Sie Logs und die laufende Einrichtung bei.",
    ticketNote: "Ein Ticket-Agent nimmt die Anfrage auf.",
  },
  ko: {
    h1: "지원",
    description:
      "계정 및 플랜 질문은 셀프 호스팅 가이드로 시작하고, 열린 이슈에 로그를 붙여 답변해 주세요. 버그와 기능 요청은 GitHub 저장소에서 이슈를 열거나 support@doitx.ai로 이메일을 보내주시면 우리가 등록해 드립니다.",
    emailNote: "로그와 실행 중인 설정을 포함하세요.",
    ticketNote: "티켓 대행자가 요청을 접수합니다.",
  },
  zh: {
    h1: "支持",
    description:
      "关于账户和方案的问题，请先参考自托管指南，并在已开启的问题中回复日志。报告 bug 或提交功能需求时，请在 GitHub 仓库中提交问题，或发送邮件至 support@doitx.ai，我们会为您创建。",
    emailNote: "请附上日志和您运行的部署配置。",
    ticketNote: "工单代理会受理该请求。",
  },
  ja: {
    h1: "サポート",
    description:
      "アカウントやプランに関するお問い合わせは、セルフホスティングガイドを参照のうえ、オープンな Issue に対しておログを添えて返信してください。バグや機能のリクエストは、GitHub リポジトリで Issue を作成するか、support@doitx.ai へメールをお送りください。こちらで作成いたします。",
    emailNote: "ログと実行したセットアップを添付してください。",
    ticketNote: "チケット担当者へ引き継ぎます。",
  },
  es: {
    h1: "Soporte",
    description:
      "Para preguntas sobre la cuenta o el plan, empieza con la guía de autoalojamiento y responde a una incidencia abierta con las grabaciones. Para errores y solicitudes de funciones, abre una incidencia en el repositorio de GitHub o escribe a support@doitx.ai y la abriremos.",
    emailNote: "Incluye las grabaciones y la configuración que ejecutaste.",
    ticketNote: "Un agente de tickets asume la solicitud.",
  },
  fr: {
    h1: "Assistance",
    description:
      "Pour les questions sur le compte et l'abonnement, commencez par le guide d'auto-hébergement et répondez à une demande ouverte avec les journaux. Pour les bugs et demandes de fonctionnalités, ouvrez une demande dans le dépôt GitHub ou écrivez à support@doitx.ai et nous l'ouvrirons.",
    emailNote: "Joignez les journaux et la configuration exécutée.",
    ticketNote: "Un agent du support prend en charge la demande.",
  },
  "pt-br": {
    h1: "Suporte",
    description:
      "Para dúvidas sobre conta e plano, comece pelo guia de auto-hospedagem e responda a uma issue aberta com os logs. Para erros e pedidos de recursos, abra uma issue no repositório do GitHub ou envie um e-mail para support@doitx.ai e abriremos uma.",
    emailNote: "Inclua os logs e a configuração executada.",
    ticketNote: "Um agente de tickets assume a solicitação.",
  },
  nl: {
    h1: "Ondersteuning",
    description:
      "Voor vragen over account en plan begin met de zelf-hosting gids en antwoord op een openstaande melding met de logs. Voor fouten en wensen voor functies open je een melding in het GitHub-repository, of mail support@doitx.ai en we openen er een.",
    emailNote: "Voeg logs en de uitgevoerde instelling toe.",
    ticketNote: "Een ticketagent neemt de verzoek over.",
  },
  ru: {
    h1: "Поддержка",
    description:
      "По вопросам аккаунта и тарифа начните с гайд по самохостингу и ответьте на открытое обращение с логами. Для ошибок и предложений по функциям создайте обращение в GitHub-репозитории или напишите на support@doitx.ai — мы создадим его за вас.",
    emailNote: "Приложите логи и конфигурацию, которую вы запускали.",
    ticketNote: "Обращение забирает оператор тикетов.",
  },
  tr: {
    h1: "Destek",
    description:
      "Hesap ve plan soruları için önce kendi barındırma rehberine bakın ve açık bir soruya loglarla yanıt verin. Hatalar ve özellik istekleri için GitHub deposunda bir sorun açın ya da support@doitx.ai adresine e-posta gönderin, biz açalım.",
    emailNote: "Logları ve çalıştırdığınız kurulumu ekleyin.",
    ticketNote: "Bir bilet temsilcisi isteği devralır.",
  },
  he: {
    h1: "תמיכה",
    description:
      "לשאלות על חשבון ומנוי, התחילו עם מדריך ההארחות העצמית וענו בהודעה פתוחה תוך צירוף רישומים. לבגים ולבקשות תכונות, פתחו הודעה במאגר ה־GitHub או שלחו מייל ל־support@doitx.ai ונפתח עבורכם.",
    emailNote: "צרפו את הרישומים וההגדרה שרצתם.",
    ticketNote: "נושא תזוורות מקבל את הבקשה.",
  },

  hi: {
    h1: "सहायता",
    description:
      "खाता और योजना से जुड़े सवाल के लिए सेल्फ़-होस्टिंग गाइड से शुरू करें और खुले इश्यू में लॉगों के साथ जवाब दें। बग और फ़ीचर अनुरोधों के लिए GitHub रिपॉज़िटरी में इश्यू खोलें, या support@doitx.ai पर ईमेल करें — हम एक खोल देंगे।",
    emailNote: "लॉग और आपके जिस सेटअप को चलाया वह शामिल करें।",
    ticketNote: "एक टिकट एजेंट अनुरोध संभालता है।",
  },

  "zh-tw": {
    h1: "支援",
    description:
      "關於帳戶與方案的問題，請先參照自架指南，並在已開啟的 issue 中回覆日誌。回報 bug 或提出功能需求時，請在 GitHub 倉庫中建立 issue，或寄信至 support@doitx.ai，我們為您建立。",
    emailNote: "請附上日誌與您所執行的部署設定。",
    ticketNote: "工單代理會受理此請求。",
  },
};

export function getSupportCopy(locale: Locale): SupportCopy {
  return { ...SUPPORT_COPY[locale], accountDeletion: ACCOUNT_DELETION_COPY[locale] };
}

export const NOT_FOUND_COPY: Record<Locale, NotFoundCopy> = {
  en: {
    h1: "Page not found",
    description: "The page you were looking for is unavailable.",
    homeLabel: "Home",
    docsLabel: "Read the docs",
  },
  de: {
    h1: "Seite nicht gefunden",
    description: "Die gesuchte Seite ist nicht verfügbar.",
    homeLabel: "Startseite",
    docsLabel: "Dokumente lesen",
  },
  ko: {
    h1: "페이지를 찾을 수 없습니다",
    description: "확인하려는 페이지를 사용할 수 없습니다.",
    homeLabel: "홈",
    docsLabel: "문서 읽기",
  },
  zh: {
    h1: "未找到页面",
    description: "您要查找的页面不可用。",
    homeLabel: "首页",
    docsLabel: "阅读文档",
  },
  ja: {
    h1: "ページが見つかりません",
    description: "お探しになっているページは利用できません。",
    homeLabel: "ホーム",
    docsLabel: "ドキュメントを読む",
  },
  es: {
    h1: "Página no encontrada",
    description: "La página que buscabas no está disponible.",
    homeLabel: "Inicio",
    docsLabel: "Leer la documentación",
  },
  fr: {
    h1: "Page introuvable",
    description: "La page que vous cherchiez est indisponible.",
    homeLabel: "Accueil",
    docsLabel: "Lire la documentation",
  },
  "pt-br": {
    h1: "Página não encontrada",
    description: "A página que você procurava está indisponível.",
    homeLabel: "Início",
    docsLabel: "Ler a documentação",
  },
  nl: {
    h1: "Pagina niet gevonden",
    description: "De pagina die je zocht is niet beschikbaar.",
    homeLabel: "Startpagina",
    docsLabel: "Documentatie lezen",
  },
  ru: {
    h1: "Страница не найдена",
    description: "Страница, которую вы искали, недоступна.",
    homeLabel: "Главная",
    docsLabel: "Читать документацию",
  },
  tr: {
    h1: "Sayfa bulunamadı",
    description: "Aradığınız sayfa kullanılamıyor.",
    homeLabel: "Ana sayfa",
    docsLabel: "Belgeleri oku",
  },
  he: {
    h1: "הדף לא נמצא",
    description: "הדף שחיפשת אינו זמין.",
    homeLabel: "בית",
    docsLabel: "לקרוא את התיעוד",
  },
  hi: {
    h1: "पेज नहीं मिला",
    description: "जो पेज आप ढूँध रहे थे वह उपलब्ध नहीं है।",
    homeLabel: "होम",
    docsLabel: "दस्तावेज़ पढ़ें",
  },
  "zh-tw": {
    h1: "找不到頁面",
    description: "您要尋找的頁面無法使用。",
    homeLabel: "首頁",
    docsLabel: "閱讀文件",
  },
};

export function getNotFoundCopy(locale: Locale): NotFoundCopy {
  return NOT_FOUND_COPY[locale];
}
