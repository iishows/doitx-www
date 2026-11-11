import type { TeamCopy } from "../teams";

const ptBr: TeamCopy = {
  eyebrow: "Times reais",
  heading: "Não é um monte de janelas de chat. É um time que começa a trabalhar sozinho.",
  copy:
    "Um Bot líder recebe o objetivo, divide em tarefas e acompanha o progresso. Os especialistas trabalham em rotinas e reportam na mesma conversa. Estes três times já estão rodando.",
  labels: {
    rhythm: "Ritmo",
    output: "Entregas",
    handoff: "Sua aprovação",
  },
  cards: [
    {
      tag: "Pipeline outbound",
      title: "De um perfil-alvo a uma lista pronta para contato",
      summary:
        "Um Bot líder conduz prospecção, verificação, pesquisa de contas e abordagem multicanal, e depois classifica cada resposta.",
      lead: "Líder de outbound",
      roles: [
        "Verificação",
        "Pesquisa de contas",
        "Abordagem",
        "WhatsApp",
        "Facebook",
        "LinkedIn",
        "Acompanhamento de negócios",
      ],
      rhythm:
        "Prospecção às 9h todos os dias. Checagens de status a cada 45 minutos. As linhas verificadas entram na fila de abordagem.",
      output:
        "CSVs em lote, registro de fontes, contatos verificados, fila de abordagem e registro de respostas.",
      handoff:
        "Você confirma o perfil-alvo, e listas ou envios podem aguardar sua aprovação.",
    },
    {
      tag: "Site próprio",
      title: "Uma fábrica diária de conteúdo e SEO/AEO",
      summary:
        "Um líder de operações planeja a semana e distribui as tarefas. SEO técnico, conteúdo, visibilidade em IA, PR digital, merchandising e mídia paga cuidam cada um da sua frente.",
      lead: "Líder de operações",
      roles: [
        "SEO técnico",
        "Líder de conteúdo",
        "AEO / GEO",
        "PR digital",
        "Merchandising",
        "Mídia paga",
      ],
      rhythm:
        "Planejamento semanal na segunda-feira. Um brief de publicação à meia-noite. Autoverificação a cada 30 minutos e revisão de dados na sexta.",
      output:
        "Mapas de intenção de palavras-chave, briefs e rascunhos, relatórios de visibilidade em IA, listas de alvos de PR e um resumo semanal.",
      handoff:
        "Você aprova os temas e o tom da marca, e dá o aval antes da publicação.",
    },
    {
      tag: "Matriz de conteúdo",
      title: "Um brief, muitas plataformas",
      summary:
        "Um comandante define a cadência, um editor-chefe divide o brief e nove especialistas de plataforma adaptam, publicam e revisam.",
      lead: "Comandante → Editor-chefe",
      roles: [
        "WeChat",
        "Zhihu",
        "Weibo",
        "Toutiao",
        "Baijiahao",
        "Douyin",
        "Kuaishou",
        "Channels",
        "Site",
      ],
      rhythm:
        "A mensagem central vira uma matriz de conteúdo. Autoverificações e uma checagem da equipe a cada 30 e 45 minutos.",
      output:
        "Rascunhos prontos para cada plataforma, um calendário de publicação e uma revisão semanal de conteúdo.",
      handoff:
        "Você define as linhas vermelhas da marca, e publicações externas podem exigir aprovação.",
    },
  ],
  stats: {
    runs: "execuções em 7 dias",
    completed: "concluídas",
    routines: "rotinas sempre ativas",
    bots: "Bots trabalhando juntos",
  },
  note:
    "Dados de uma implantação privada em operação contínua em novembro de 2026, nos sete dias anteriores. Nenhum dado de cliente está incluído.",
};

export default ptBr;
