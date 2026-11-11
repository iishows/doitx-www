import type { TeamDemoCopy } from "../team-demo";

const ptBr: TeamDemoCopy = {
  workspace: "Espaços de trabalho",
  teamChat: "Chat da equipe",
  activityTitle: "Atividade da equipe",
  members: (count) => `${count} bots`,
  composer: "Envie uma mensagem para a equipe…",
  approve: "Aprovar",
  later: "Depois",
  routineLabel: "Rotina sempre ativa",
  leadBadge: "líder",
  running: "Em execução",
  teams: [
    {
      name: "Prospecção",
      lead: "Líder de prospecção",
      members: 7,
      prompt: "Encontre 80 responsáveis de compras em empresas alemãs de automação. Verifique os e-mails primeiro.",
      leadLine:
        "Já vou. Eu monto a lista, passo para verificação e pesquisa, e seguro o contato até você aprovar os nomes.",
      replies: [
        { name: "Verificação", text: "62 de 80 verificados. 87% de e-mails válidos, 11 sinalizados com fontes." },
        { name: "Pesquisa de contas", text: "As 20 primeiras linhas já têm decisores, sinais de compra e abordagens." },
        { name: "Contato", text: "Fila montada. WhatsApp e LinkedIn agendados separadamente, aguardando você." },
      ],
      artifact: {
        title: "leads-batch-07.csv",
        lines: ["80 linhas · 19 colunas", "80 registros de origem", "62 verificados"],
      },
      approval: "A lista de contatos está pronta para sua aprovação.",
      activity: [
        { time: "09:00", text: "O líder atribuiu o lote", state: "done" },
        { time: "09:45", text: "62 contatos verificados", state: "done" },
        { time: "10:30", text: "A fila de contato aguarda aprovação", state: "wait" },
      ],
      routine: "Roda às 9:00 todos os dias · checagem a cada 45 minutos",
    },
    {
      name: "Site independente",
      lead: "Líder de operações",
      members: 6,
      prompt: "Planeje cinco posts esta semana e recupere primeiro as keywords perdidas no GSC da semana passada.",
      leadLine:
        "Dividi em cinco briefs: SEO técnico corrige a indexação primeiro, conteúdo prepara dois rascunhos, GEO continua monitorando citações.",
      replies: [
        { name: "SEO técnico", text: "3 erros 404 e 2 canonical duplicados corrigidos. Sitemap reenviado." },
        { name: "Líder de conteúdo", text: "Dois rascunhos em revisão, títulos reescritos conforme a intenção de busca." },
        { name: "AEO / GEO", text: "As fontes de citação de IA subiram 6 esta semana. Duas citações de concorrentes entraram na lista de correções." },
      ],
      artifact: {
        title: "Plano de conteúdo desta semana",
        lines: ["5 briefs · 2 rascunhos", "3 erros 404 corrigidos", "Citações de IA +6"],
      },
      approval: "Dois rascunhos prontos, aguardando seu aval para publicar.",
      activity: [
        { time: "Seg 9:00", text: "Plano semanal definido", state: "done" },
        { time: "00:00", text: "Brief de publicação enviado", state: "done" },
        { time: "Sex 16:30", text: "Revisão de dados", state: "running" },
      ],
      routine: "Plano na segunda · brief à meia-noite · autoverificação a cada 30 minutos",
    },
    {
      name: "Matriz de conteúdo",
      lead: "Comandante → Editor-chefe",
      members: 9,
      prompt: "Transforme este lançamento em conteúdo para todas as plataformas. Três canais saem hoje.",
      leadLine:
        "O editor divide o brief. WeChat, Zhihu e Douyin primeiro; o resto amanhã.",
      replies: [
        { name: "Editor-chefe", text: "Nove briefs de plataforma enviados. As linhas vermelhas da marca seguem as regras da semana passada." },
        { name: "WeChat", text: "Rascunho longo pronto, com imagens e resumo." },
        { name: "Zhihu", text: "Versão de perguntas e respostas reescrita conforme a intenção da pergunta, com tabela comparativa anexada." },
      ],
      artifact: {
        title: "Pacote de conteúdo do lançamento",
        lines: ["9 briefs", "3 posts prontos hoje", "Calendário de plataformas gerado"],
      },
      approval: "Três posts prontos para sua confirmação.",
      activity: [
        { time: "A cada 30 min", text: "Autoverificação da equipe", state: "done" },
        { time: "A cada 45 min", text: "Checagem da frota", state: "done" },
        { time: "Hoje", text: "3 posts aguardando aprovação", state: "wait" },
      ],
      routine: "Autoverificação a cada 30/45 minutos · 9 plataformas em paralelo",
    },
    {
      name: "Loja Douyin",
      lead: "Operador da loja",
      members: 6,
      prompt: "Revise os candidatos de hoje. Publique o que puder e substitua o que estiver esgotado.",
      leadLine:
        "Já vou. O sourcing envia candidatos, a conformidade aprova e o resto entra no ar. Eu acompanho o estoque e o investimento em anúncios.",
      replies: [
        { name: "Sourcing", text: "23 candidatos filtrados para 9 por margem e vendas. Fornecimento do 1688 anexado." },
        { name: "Conformidade", text: "A documentação da categoria está completa. Duas frases de risco pela lei de publicidade foram substituídas." },
        { name: "Estoque", text: "3 modelos ativos estão esgotados. Encontrei 2 alternativas, 1 deve sair do ar." },
      ],
      artifact: {
        title: "Relatório de anúncios de hoje",
        lines: ["9 candidatos · 6 publicáveis", "2 ajustes de conformidade", "3 esgotados · 2 substituídos"],
      },
      approval: "6 anúncios aguardam seu aval.",
      activity: [
        { time: "09:00", text: "Conferência de conciliação", state: "done" },
        { time: "09:30", text: "Sourcing analisou 23", state: "done" },
        { time: "20:00", text: "Revisão de anúncios", state: "running" },
      ],
      routine: "9:00 conciliação · 9:30 sourcing · 14:00 conteúdo · 20:00 revisão",
    },
    {
      name: "Loja Pinduoduo",
      lead: "Analista de oportunidades",
      members: 6,
      prompt: "Acompanhe o gráfico de oportunidades. Tem algo que valha a pena anunciar hoje?",
      leadLine:
        "Vou escanear o gráfico, fazer comparação de preços e revisão de riscos, e enfileirar o que passar da margem.",
      replies: [
        { name: "Comparação de preços 1688", text: "12 correspondências. O menor preço unitário com frete é ¥8.6, uma diferença de 35%." },
        { name: "Revisão de risco de PI", text: "2 designs parecidos estão sinalizados. Vou segurá-los." },
        { name: "Checagem de margem", text: "4 passaram com 18–26% líquido. Eu anunciaria 3 para começar." },
      ],
      artifact: {
        title: "opportunity-2026-11-10.csv",
        lines: ["12 itens do gráfico", "4 aprovados", "3 recomendados"],
      },
      approval: "3 oportunidades de anúncio precisam da sua decisão.",
      activity: [
        { time: "A cada 15 min", text: "Varredura de oportunidades", state: "done" },
        { time: "10:00", text: "Checagem de estoque", state: "done" },
        { time: "Agora", text: "3 aguardam sua decisão", state: "wait" },
      ],
      routine: "Varredura a cada 15 minutos · checagem de estoque às 10:00",
    },
    {
      name: "Escrita de romance",
      lead: "Editor-chefe",
      members: 5,
      prompt: "Escreva o capítulo 12 e resolva a preparação do capítulo anterior.",
      leadLine:
        "Primeiro conferimos o roteiro e as fichas dos personagens. O enredo monta o conflito, a prosa escreve e a revisão aprova.",
      replies: [
        { name: "Enredo", text: "O capítulo 12 se divide em três atos. A preparação se resolve no ato dois, com um novo gancho no final." },
        { name: "Personagens", text: "O motivo do protagonista bate com os capítulos 1–11. Os diálogos secundários foram ajustados à voz." },
        { name: "Revisão", text: "Cortei dois trechos lentos e preenchi uma lacuna lógica." },
      ],
      artifact: {
        title: "chapter-12-final.md",
        lines: ["3 atos · 3,200 palavras", "1 preparação resolvida", "4 notas de revisão"],
      },
      approval: "O capítulo 12 aguarda sua leitura final.",
      activity: [
        { time: "Roteiro", text: "Conflito e preparação mapeados", state: "done" },
        { time: "Rascunho", text: "Checagem de personagens", state: "done" },
        { time: "Final", text: "Aguardando sua revisão", state: "wait" },
      ],
      routine: "Baseado em diálogo · carrega o mundo e as fichas dos personagens",
    },
    {
      name: "Vídeo curto",
      lead: "Líder criativo",
      members: 4,
      prompt: "Faça um vídeo de produto de 15 segundos. Preciso do corte final hoje.",
      leadLine:
        "O roteiro fixa o argumento de venda, o storyboard corta as cenas e o corte final vai direto para publicação.",
      replies: [
        { name: "Roteiro", text: "Três cenas em 15 segundos: problema, produto, ação. 42 palavras de narração." },
        { name: "Storyboard", text: "Cenas e lista de recursos prontas. Reutilizando a imagem principal de alto clique da semana passada." },
        { name: "Vídeo", text: "Corte final exportado, vertical 1080×1920, legendas gravadas." },
      ],
      artifact: {
        title: "launch-15s.mp4",
        lines: ["15 s · 1080×1920", "3 cenas · 42 palavras", "Legendas gravadas"],
      },
      approval: "O corte final está pronto para seu aval.",
      activity: [
        { time: "Roteiro", text: "Argumento e narração", state: "done" },
        { time: "Storyboard", text: "Cenas e recursos", state: "done" },
        { time: "Corte final", text: "Aguardando aval", state: "wait" },
      ],
      routine: "Roteiro → storyboard → edição → publicação",
    },
    {
      name: "Sourcing no Alibaba",
      lead: "Líder de sourcing",
      members: 5,
      prompt: "Termine as páginas de contato dos comerciantes do Alibaba e mescle os lotes.",
      leadLine:
        "Cinco lotes em paralelo. Eu mesclo, deduplico e preencho os campos, depois entrego para você aceitar.",
      replies: [
        { name: "Coletor 3", text: "Lote 3 concluído: 480 linhas, 91% dos dados de contato completos." },
        { name: "Coletor 5", text: "Lote 5 concluído: 460 linhas. Apareceu um captcha, mudei para o modo lento." },
        { name: "Líder de sourcing", text: "5 lotes mesclados: 2,340 linhas, 1,980 após deduplicar. Campos preenchidos." },
      ],
      artifact: {
        title: "alibaba-merchants.csv",
        lines: ["2,340 linhas brutas", "1,980 após deduplicar", "91% completo"],
      },
      approval: "A lista está pronta para sua aceitação.",
      activity: [
        { time: "Lotes 1–3", text: "Coleta em paralelo", state: "done" },
        { time: "Lotes 4–5", text: "Preencher e deduplicar", state: "done" },
        { time: "Mescla", text: "Aguardando aceitação", state: "wait" },
      ],
      routine: "Lotes em paralelo · 5 coletores ao mesmo tempo",
    },
  ],
};

export default ptBr;
