import type { TeamDemoCopy } from "../team-demo";

const es: TeamDemoCopy = {
  workspace: "Espacios de trabajo",
  teamChat: "Chat del equipo",
  activityTitle: "Actividad del equipo",
  members: (count) => `${count} bots`,
  composer: "Escribe al equipo…",
  approve: "Aprobar",
  later: "Más tarde",
  routineLabel: "Rutina permanente",
  leadBadge: "líder",
  running: "En marcha",
  teams: [
    {
      name: "Prospección",
      lead: "Líder de prospección",
      members: 7,
      prompt: "Encuentra 80 responsables de compras en empresas alemanas de automatización. Verifica los correos primero.",
      leadLine:
        "En marcha. Busco la lista, la paso a verificación e investigación, y retengo el contacto hasta que apruebes los nombres.",
      replies: [
        { name: "Verificación", text: "62 de 80 verificados. 87% de correos válidos, 11 marcados con fuentes." },
        { name: "Investigación de cuentas", text: "Las 20 primeras filas ya incluyen decisores, señales de compra y ángulos de contacto." },
        { name: "Contacto", text: "Cola lista. WhatsApp y LinkedIn programados por separado, esperando tu aprobación." },
      ],
      artifact: {
        title: "leads-batch-07.csv",
        lines: ["80 filas · 19 columnas", "80 registros de origen", "62 verificados"],
      },
      approval: "La lista de contacto está lista para tu aprobación.",
      activity: [
        { time: "09:00", text: "El líder asignó el lote", state: "done" },
        { time: "09:45", text: "62 contactos verificados", state: "done" },
        { time: "10:30", text: "La cola de contacto espera aprobación", state: "wait" },
      ],
      routine: "Se ejecuta a las 9:00 cada día · comprobación cada 45 minutos",
    },
    {
      name: "Sitio independiente",
      lead: "Líder de operaciones",
      members: 6,
      prompt: "Planifica cinco publicaciones esta semana y recupera primero las keywords perdidas en GSC la semana pasada.",
      leadLine:
        "Lo dividí en cinco briefs: SEO técnico arregla la indexación primero, contenido prepara dos borradores, GEO sigue vigilando las citas.",
      replies: [
        { name: "SEO técnico", text: "3 errores 404 y 2 canonical duplicados corregidos. Sitemap reenviado." },
        { name: "Responsable de contenido", text: "Dos borradores en revisión, títulos reescritos según la intención de búsqueda." },
        { name: "AEO / GEO", text: "Las fuentes de citas de IA suben 6 esta semana. Dos citas de competidores añadidas a la lista de correcciones." },
      ],
      artifact: {
        title: "Plan de contenido de esta semana",
        lines: ["5 briefs · 2 borradores", "3 errores 404 corregidos", "Citas de IA +6"],
      },
      approval: "Dos borradores listos, esperando tu visto bueno para publicar.",
      activity: [
        { time: "Lun 9:00", text: "Plan semanal definido", state: "done" },
        { time: "00:00", text: "Brief de publicación enviado", state: "done" },
        { time: "Vie 16:30", text: "Revisión de datos", state: "running" },
      ],
      routine: "Plan los lunes · brief a medianoche · autocomprobación cada 30 minutos",
    },
    {
      name: "Matriz de contenido",
      lead: "Comandante → Editor jefe",
      members: 9,
      prompt: "Convierte este lanzamiento en contenido para todas las plataformas. Hoy salen tres canales.",
      leadLine:
        "El editor dividirá el brief. WeChat, Zhihu y Douyin primero; el resto mañana.",
      replies: [
        { name: "Editor jefe", text: "Nueve briefs de plataforma enviados. Las líneas rojas de marca siguen las reglas de la semana pasada." },
        { name: "WeChat", text: "Borrador extenso listo, con imágenes y resumen." },
        { name: "Zhihu", text: "Versión de preguntas y respuestas reescrita según la intención de la pregunta, con tabla comparativa adjunta." },
      ],
      artifact: {
        title: "Paquete de contenido del lanzamiento",
        lines: ["9 briefs", "3 publicaciones listas hoy", "Calendario de plataformas generado"],
      },
      approval: "Tres publicaciones listas para tu confirmación.",
      activity: [
        { time: "Cada 30 min", text: "Autocomprobación del equipo", state: "done" },
        { time: "Cada 45 min", text: "Comprobación de la flota", state: "done" },
        { time: "Hoy", text: "3 publicaciones esperan aprobación", state: "wait" },
      ],
      routine: "Autocomprobación cada 30/45 minutos · 9 plataformas en paralelo",
    },
    {
      name: "Tienda Douyin",
      lead: "Operador de la tienda",
      members: 6,
      prompt: "Revisa los candidatos de hoy. Publica lo que puedas y reemplaza lo que esté agotado.",
      leadLine:
        "En marcha. Aprovisionamiento envía candidatos, cumplimiento los aprueba y el resto sale a la venta. Yo vigilo el stock y la inversión publicitaria.",
      replies: [
        { name: "Aprovisionamiento", text: "23 candidatos filtrados a 9 por margen y ventas. Suministro de 1688 adjunto." },
        { name: "Cumplimiento", text: "Los papeles de categoría están completos. Se reemplazaron dos frases de riesgo según la ley publicitaria." },
        { name: "Inventario", text: "3 modelos activos están agotados. Encontré 2 alternativas, 1 debería retirarse." },
      ],
      artifact: {
        title: "Informe de publicación de hoy",
        lines: ["9 candidatos · 6 publicables", "2 ediciones de cumplimiento", "3 agotados · 2 reemplazados"],
      },
      approval: "6 publicaciones esperan tu visto bueno.",
      activity: [
        { time: "09:00", text: "Comprobación de conciliación", state: "done" },
        { time: "09:30", text: "Aprovisionamiento escaneó 23", state: "done" },
        { time: "20:00", text: "Revisión de anuncios", state: "running" },
      ],
      routine: "9:00 conciliación · 9:30 aprovisionamiento · 14:00 contenido · 20:00 revisión",
    },
    {
      name: "Tienda Pinduoduo",
      lead: "Analista de oportunidades",
      members: 6,
      prompt: "Vigila el gráfico de oportunidades. ¿Hay algo que valga la pena publicar hoy?",
      leadLine:
        "Escanearé el gráfico, haré comparación de precios y revisión de riesgos, y pondré en cola lo que supere el margen.",
      replies: [
        { name: "Comparación de precios 1688", text: "12 coincidencias. El precio unitario con envío más bajo es ¥8.6, un margen del 35%." },
        { name: "Revisión de riesgo de PI", text: "2 diseños sospechosos de imitación están marcados. Los retengo." },
        { name: "Verificación de margen", text: "4 pasaron con 18–26% neto. Publicaría 3 para empezar." },
      ],
      artifact: {
        title: "opportunity-2026-11-10.csv",
        lines: ["12 artículos del gráfico", "4 aprobados", "3 recomendados"],
      },
      approval: "3 oportunidades de publicación necesitan tu decisión.",
      activity: [
        { time: "Cada 15 min", text: "Escaneo de oportunidades", state: "done" },
        { time: "10:00", text: "Comprobación de stock", state: "done" },
        { time: "Ahora", text: "3 esperan tu decisión", state: "wait" },
      ],
      routine: "Escaneo cada 15 minutos · comprobación de stock a las 10:00",
    },
    {
      name: "Escritura de novela",
      lead: "Editor jefe",
      members: 5,
      prompt: "Escribe el capítulo 12 y cierra la trama preparada en el capítulo anterior.",
      leadLine:
        "Primero revisamos el esquema y las fichas de personajes. Trama redacta el conflicto, prosa lo escribe y revisión da el visto bueno.",
      replies: [
        { name: "Trama", text: "El capítulo 12 se divide en tres actos. La preparación se cierra en el acto dos, con un nuevo gancho al final." },
        { name: "Personajes", text: "El motivo del protagonista coincide con los capítulos 1–11. El diálogo secundario se ajustó a su voz." },
        { name: "Revisión", text: "Recorté dos pasajes lentos y rellené un hueco lógico." },
      ],
      artifact: {
        title: "chapter-12-final.md",
        lines: ["3 actos · 3,200 palabras", "1 preparación resuelta", "4 notas de revisión"],
      },
      approval: "El capítulo 12 espera tu lectura final.",
      activity: [
        { time: "Esquema", text: "Conflicto y preparación trazados", state: "done" },
        { time: "Borrador", text: "Revisión de personajes", state: "done" },
        { time: "Final", text: "Esperando tu revisión", state: "wait" },
      ],
      routine: "Impulsado por diálogo · carga el mundo y las fichas de personajes",
    },
    {
      name: "Video corto",
      lead: "Líder creativo",
      members: 4,
      prompt: "Haz un video de producto de 15 segundos. Necesito el corte final hoy.",
      leadLine:
        "El guion fija el argumento de venta, el storyboard corta las tomas y el corte final pasa directo a publicación.",
      replies: [
        { name: "Guion", text: "Tres tomas en 15 segundos: problema, producto, acción. 42 palabras de voz en off." },
        { name: "Storyboard", text: "Tomas y lista de recursos listas. Reutilizo la imagen principal de alto clic de la semana pasada." },
        { name: "Video", text: "Corte final exportado, vertical 1080×1920, subtítulos incrustados." },
      ],
      artifact: {
        title: "launch-15s.mp4",
        lines: ["15 s · 1080×1920", "3 tomas · 42 palabras", "Subtítulos incrustados"],
      },
      approval: "El corte final está listo para tu visto bueno.",
      activity: [
        { time: "Guion", text: "Argumento y voz en off", state: "done" },
        { time: "Storyboard", text: "Tomas y recursos", state: "done" },
        { time: "Corte final", text: "Esperando visto bueno", state: "wait" },
      ],
      routine: "Guion → storyboard → edición → publicación",
    },
    {
      name: "Aprovisionamiento en Alibaba",
      lead: "Líder de aprovisionamiento",
      members: 5,
      prompt: "Termina las páginas de contacto de comerciantes de Alibaba y fusiona los lotes.",
      leadLine:
        "Cinco lotes en paralelo. Yo fusiono, deduplico y completo los campos, y luego te lo paso para aceptación.",
      replies: [
        { name: "Recolector 3", text: "Lote 3 terminado: 480 filas, 91% de datos de contacto completos." },
        { name: "Recolector 5", text: "Lote 5 terminado: 460 filas. Apareció un captcha, cambié a modo lento." },
        { name: "Líder de aprovisionamiento", text: "5 lotes fusionados: 2,340 filas, 1,980 tras deduplicar. Campos completados." },
      ],
      artifact: {
        title: "alibaba-merchants.csv",
        lines: ["2,340 filas brutas", "1,980 tras deduplicar", "91% completo"],
      },
      approval: "La lista está lista para tu aceptación.",
      activity: [
        { time: "Lotes 1–3", text: "Recolección en paralelo", state: "done" },
        { time: "Lotes 4–5", text: "Completar y deduplicar", state: "done" },
        { time: "Fusión", text: "Esperando aceptación", state: "wait" },
      ],
      routine: "Lotes en paralelo · 5 recolectores a la vez",
    },
  ],
};

export default es;
