import type { TeamCopy } from "../teams";

const es: TeamCopy = {
  eyebrow: "Equipos reales",
  heading: "No es un montón de ventanas de chat. Es un equipo que arranca solo.",
  copy:
    "Un Bot líder recibe el objetivo, lo divide en tareas y vigila el avance. Los especialistas trabajan con rutinas y reportan en el mismo hilo. Estos tres equipos ya están en marcha.",
  labels: {
    rhythm: "Ritmo",
    output: "Resultados",
    handoff: "Tu aprobación",
  },
  cards: [
    {
      tag: "Captación outbound",
      title: "De un perfil objetivo a una lista contactable",
      summary:
        "Un Bot líder gestiona la prospección, la verificación, la investigación de cuentas y el contacto multicanal, y después clasifica cada respuesta.",
      lead: "Líder de outbound",
      roles: [
        "Verificación",
        "Investigación de cuentas",
        "Contacto",
        "WhatsApp",
        "Facebook",
        "LinkedIn",
        "Seguimiento de oportunidades",
      ],
      rhythm:
        "Prospección a las 9:00 cada día. Comprobaciones de estado cada 45 minutos. Las filas verificadas pasan a la cola de contacto.",
      output:
        "CSV por lotes, registro de fuentes, contactos verificados, cola de contacto y registro de respuestas.",
      handoff:
        "Tú confirmas el perfil objetivo, y las listas o los envíos pueden esperar tu aprobación.",
    },
    {
      tag: "Sitio propio",
      title: "Una fábrica diaria de contenido y SEO/AEO",
      summary:
        "Un líder de operaciones planifica la semana y asigna el trabajo. SEO técnico, contenido, visibilidad en IA, relaciones públicas digitales, merchandising y medios de pago tienen cada uno su carril.",
      lead: "Líder de operaciones",
      roles: [
        "SEO técnico",
        "Responsable de contenido",
        "AEO / GEO",
        "PR digital",
        "Merchandising",
        "Medios de pago",
      ],
      rhythm:
        "Plan semanal el lunes. Un brief de publicación a medianoche. Autochequeo cada 30 minutos y revisión de datos el viernes.",
      output:
        "Mapas de intención de palabras clave, briefs y borradores, informes de visibilidad en IA, listas de objetivos de PR y un resumen semanal.",
      handoff:
        "Tú apruebas los temas y la voz de marca, y das el visto bueno antes de publicar.",
    },
    {
      tag: "Matriz de contenido",
      title: "Un brief, muchas plataformas",
      summary:
        "Un comandante marca el ritmo, un editor jefe divide el brief y nueve especialistas de plataforma adaptan, publican y revisan.",
      lead: "Comandante → Editor jefe",
      roles: [
        "WeChat",
        "Zhihu",
        "Weibo",
        "Toutiao",
        "Baijiahao",
        "Douyin",
        "Kuaishou",
        "Channels",
        "Sitio web",
      ],
      rhythm:
        "El mensaje central se convierte en una matriz de contenido. Autochequeos y una revisión de flota cada 30 y 45 minutos.",
      output:
        "Borradores listos para cada plataforma, un calendario de publicación y una revisión semanal de contenido.",
      handoff:
        "Tú defines las líneas rojas de la marca, y las publicaciones externas pueden requerir aprobación.",
    },
  ],
  stats: {
    runs: "ejecuciones en 7 días",
    completed: "completadas",
    routines: "rutinas siempre activas",
    bots: "Bots trabajando juntos",
  },
  note:
    "Datos de una implementación privada en funcionamiento continuo en noviembre de 2026, durante los siete días anteriores. No incluye datos de clientes.",
};

export default es;
