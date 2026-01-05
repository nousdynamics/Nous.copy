// Schema base de campos do formulário de copy
// Este schema define todos os campos possíveis que podem ser usados em templates

export const FORM_BLOCKS = {
  DADOS_NEGOCIO: 'dados_negocio',
  PUBLICO_ALVO: 'publico_alvo',
  OFERTA: 'oferta',
  ESTRATEGIA_VENDA: 'estrategia_venda',
  CONFIGURACOES_COPY: 'configuracoes_copy'
};

export const FIELD_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  NUMBER: 'number',
  SELECT: 'select',
  MULTISELECT: 'multiselect',
  CHECKBOX: 'checkbox',
  RADIO: 'radio'
};

// Definições de campos do formulário base
export const BASE_FIELDS = [
  // Bloco: Dados do Negócio
  {
    id: 'profissional_nome',
    label: 'Nome do Profissional/Marca',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.DADOS_NEGOCIO,
    ordem: 1,
    placeholder: 'Ex: Dr. João Silva'
  },
  {
    id: 'profissional_cargo',
    label: 'Cargo ou Posição',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.DADOS_NEGOCIO,
    ordem: 2,
    placeholder: 'Ex: Nutrólogo'
  },
  {
    id: 'negocio_nome',
    label: 'Nome da Empresa/Marca',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.DADOS_NEGOCIO,
    ordem: 3,
    placeholder: 'Ex: Clínica Vida Plena'
  },
  {
    id: 'segmento_atuacao',
    label: 'Segmento/Nicho de Atuação',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.DADOS_NEGOCIO,
    ordem: 4,
    placeholder: 'Ex: Saúde infantil'
  },
  {
    id: 'tempo_experiencia',
    label: 'Tempo de Experiência',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.DADOS_NEGOCIO,
    ordem: 5,
    placeholder: 'Ex: 15 anos'
  },
  {
    id: 'resultado_principal',
    label: 'Principal Resultado Gerado',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.DADOS_NEGOCIO,
    ordem: 6,
    placeholder: 'Ex: 400+ pacientes'
  },
  {
    id: 'provas_sociais',
    label: 'Provas Sociais',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.DADOS_NEGOCIO,
    ordem: 7,
    placeholder: 'Ex: 50+ clientes, 4.9 estrelas'
  },
  {
    id: 'diferencial',
    label: 'Diferencial ou Protocolo Exclusivo',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.DADOS_NEGOCIO,
    ordem: 8,
    placeholder: 'Ex: Método exclusivo de tratamento'
  },
  
  // Bloco: Público-Alvo
  {
    id: 'publico_descricao',
    label: 'Descrição do Público-Alvo',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.PUBLICO_ALVO,
    ordem: 1,
    placeholder: 'Ex: Mães com filhos APLV'
  },
  {
    id: 'publico_idade',
    label: 'Faixa Etária Principal',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.PUBLICO_ALVO,
    ordem: 2,
    placeholder: 'Ex: 25-40 anos'
  },
  {
    id: 'publico_localizacao',
    label: 'Localização Principal',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.PUBLICO_ALVO,
    ordem: 3,
    placeholder: 'Ex: São Paulo, SP'
  },
  {
    id: 'nivel_consciencia',
    label: 'Nível de Consciência do Público',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.PUBLICO_ALVO,
    ordem: 4,
    opcoes: [
      { value: 'nao_sabe_problema', label: 'Não sabe que tem um problema' },
      { value: 'sabe_problema', label: 'Sabe do problema, mas não da solução' },
      { value: 'sabe_solucao', label: 'Sabe da solução, mas não conhece o produto' },
      { value: 'sabe_produto', label: 'Sabe do produto, mas ainda não confia' },
      { value: 'pronto_comprar', label: 'Pronto para comprar' }
    ]
  },
  {
    id: 'principal_dor',
    label: 'Dor Principal',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.PUBLICO_ALVO,
    ordem: 5,
    placeholder: 'Ex: Falta de tempo'
  },
  {
    id: 'outras_dores',
    label: 'Outras Dores Relevantes',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.PUBLICO_ALVO,
    ordem: 6,
    placeholder: 'Ex: Alto custo, complexidade'
  },
  {
    id: 'principais_desejos',
    label: 'Principais Desejos/Resultados Esperados',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.PUBLICO_ALVO,
    ordem: 7,
    placeholder: 'Ex: Mais qualidade de vida'
  },
  {
    id: 'objecoes_comuns',
    label: 'Objeções Mais Frequentes',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.PUBLICO_ALVO,
    ordem: 8,
    placeholder: 'Ex: Preço, confiança'
  },
  {
    id: 'curiosidade_ou_dor',
    label: 'Foco: Curiosidade ou Dor',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.PUBLICO_ALVO,
    ordem: 9,
    opcoes: [
      { value: 'curiosidade', label: 'Curiosidade' },
      { value: 'dor', label: 'Dor' },
      { value: 'ambos', label: 'Ambos' }
    ]
  },
  
  // Bloco: Oferta
  {
    id: 'oferta_nome',
    label: 'Nome da Oferta/Produto',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.OFERTA,
    ordem: 1,
    placeholder: 'Ex: Curso Completo de Marketing'
  },
  {
    id: 'oferta_tipo',
    label: 'Tipo de Oferta',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.OFERTA,
    ordem: 2,
    opcoes: [
      { value: 'curso_online', label: 'Curso Online' },
      { value: 'mentoria', label: 'Mentoria' },
      { value: 'servico_1_1', label: 'Serviço 1:1' },
      { value: 'servico_recorrente', label: 'Serviço Recorrente' },
      { value: 'software', label: 'Software' },
      { value: 'produto_fisico', label: 'Produto Físico' }
    ]
  },
  {
    id: 'oferta_descricao',
    label: 'Descrição Curta da Oferta',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.OFERTA,
    ordem: 3,
    placeholder: 'Ex: Curso online com 10 módulos'
  },
  {
    id: 'oferta_conteudo_principal',
    label: 'Conteúdo Principal Incluso',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.OFERTA,
    ordem: 4,
    placeholder: 'Ex: 10 módulos, certificado'
  },
  {
    id: 'oferta_bonuses',
    label: 'Lista de Bônus',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.OFERTA,
    ordem: 5,
    placeholder: 'Ex: Bônus 1, Bônus 2'
  },
  {
    id: 'oferta_preco_principal',
    label: 'Preço Oficial',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.OFERTA,
    ordem: 6,
    placeholder: 'Ex: R$ 997'
  },
  {
    id: 'oferta_condicoes_pagamento',
    label: 'Condições de Pagamento',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.OFERTA,
    ordem: 7,
    placeholder: 'Ex: 12x sem juros'
  },
  {
    id: 'oferta_garantia_tipo',
    label: 'Tipo de Garantia',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.OFERTA,
    ordem: 8,
    opcoes: [
      { value: '7_dias', label: '7 dias' },
      { value: '15_dias', label: '15 dias' },
      { value: '30_dias', label: '30 dias' },
      { value: 'incondicional', label: 'Incondicional' },
      { value: 'condicional', label: 'Condicional' }
    ]
  },
  {
    id: 'oferta_garantia_texto',
    label: 'Texto da Promessa de Garantia',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.OFERTA,
    ordem: 9,
    placeholder: 'Ex: 7 dias de garantia incondicional'
  },
  {
    id: 'oferta_urgencia_ou_escassez',
    label: 'Tipo de Urgência/Escassez',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.OFERTA,
    ordem: 10,
    opcoes: [
      { value: 'vagas_limitadas', label: 'Vagas Limitadas' },
      { value: 'tempo_limitado', label: 'Tempo Limitado' },
      { value: 'bonus_por_tempo', label: 'Bônus por Tempo' },
      { value: 'preco_promocional', label: 'Preço Promocional' }
    ]
  },
  {
    id: 'duracao_vsl',
    label: 'Duração da VSL (minutos)',
    tipo: FIELD_TYPES.NUMBER,
    bloco: FORM_BLOCKS.OFERTA,
    ordem: 11,
    placeholder: 'Ex: 10 (Mínimo recomendado: 5 min)'
  },
  
  // Bloco: Estratégia de Venda
  {
    id: 'canal_principal',
    label: 'Canal/Formato da Copy',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 1,
    opcoes: [
      { value: 'vsl', label: 'VSL (Vídeo de Vendas)' },
      { value: 'pagina_vendas', label: 'Página de Vendas' },
      { value: 'anuncio_meta_ads', label: 'Anúncio Meta Ads' },
      { value: 'sequencia_emails', label: 'Sequência de E-mails' },
      { value: 'post_redes_sociais', label: 'Post para Redes Sociais' },
      { value: 'roteiro_video_curto', label: 'Roteiro de Vídeo Curto' },
      { value: 'titulos_google_ads', label: 'Títulos do Google Ads' }
    ]
  },
  {
    id: 'formato_criativo',
    label: 'Formato do Criativo',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 1.1,
    opcoes: [
      { value: 'video_curto', label: 'Vídeo (Reels/TikTok/Ads)' },
      { value: 'arte_estatica', label: 'Arte Estática (Card/Banner)' },
      { value: 'carrossel', label: 'Carrossel' },
      { value: 'texto_apenas', label: 'Apenas Texto/Legenda' }
    ]
  },
  {
    id: 'duracao_video',
    label: 'Duração do Vídeo (segundos)',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 1.2,
    opcoes: [
      { value: '15', label: '15 segundos' },
      { value: '30', label: '30 segundos' },
      { value: '60', label: '60 segundos' }
    ]
  },
  {
    id: 'tamanho_texto_arte',
    label: 'Tamanho do Texto na Arte',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 1.3,
    opcoes: [
      { value: 'curto', label: 'Curto (Direto ao ponto)' },
      { value: 'medio', label: 'Médio (Explicativo)' },
      { value: 'longo', label: 'Longo (Informativo)' }
    ]
  },
  {
    id: 'objetivo_campanha',
    label: 'Objetivo da Campanha',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 2,
    opcoes: [
      { value: 'captar_leads', label: 'Captar Leads' },
      { value: 'vender_diretamente', label: 'Vender Diretamente' },
      { value: 'agendar_chamadas', label: 'Agendar Chamadas' },
      { value: 'aumentar_autoridade', label: 'Aumentar Autoridade' },
      { value: 'aquecer_lista', label: 'Aquecer Lista' }
    ]
  },
  {
    id: 'gatilho_principal',
    label: 'Gatilho Principal (Opcional)',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 3,
    opcoes: [
      { value: 'nenhum', label: 'Nenhum (Padrão/Direto)' },
      { value: 'prova_social', label: 'Prova Social' },
      { value: 'autoridade', label: 'Autoridade' },
      { value: 'escassez', label: 'Escassez' },
      { value: 'urgencia', label: 'Urgência' },
      { value: 'curiosidade', label: 'Curiosidade' },
      { value: 'reciprocidade', label: 'Reciprocidade' },
      { value: 'novidade', label: 'Novidade' }
    ],
    defaultValue: 'nenhum'
  },
  {
    id: 'gatilhos_secundarios',
    label: 'Gatilhos Secundários',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 4,
    opcoes: [
      { value: 'prova_social', label: 'Prova Social' },
      { value: 'autoridade', label: 'Autoridade' },
      { value: 'escassez', label: 'Escassez' },
      { value: 'urgencia', label: 'Urgência' },
      { value: 'curiosidade', label: 'Curiosidade' },
      { value: 'reciprocidade', label: 'Reciprocidade' },
      { value: 'novidade', label: 'Novidade' }
    ]
  },
  {
    id: 'metodologia_base',
    label: 'Metodologia Base',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 5,
    opcoes: [
      { value: 'rmbc', label: 'RMBC' },
      { value: 'aida', label: 'AIDA' },
      { value: 'pas', label: 'PAS' },
      { value: 'storytelling', label: 'Storytelling' },
      { value: 'ladeira', label: 'Ladeira' },
      { value: 'halbert', label: 'Halbert' },
      { value: 'schwartz', label: 'Schwartz' }
    ]
  },
  {
    id: 'angulo_principal',
    label: 'Ângulo da Copy',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 6,
    opcoes: [
      { value: 'direto_ao_ponto', label: 'Direto ao Ponto' },
      { value: 'educacional', label: 'Educacional' },
      { value: 'comparativo', label: 'Comparativo' },
      { value: 'emocional', label: 'Emocional' },
      { value: 'racional', label: 'Racional' },
      { value: 'transformacao_vida', label: 'Transformação de Vida' }
    ]
  },
  {
    id: 'cta_principal',
    label: 'Chamada Principal para Ação',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 7,
    opcoes: [
      { value: 'clicar_link', label: 'Clicar no Link' },
      { value: 'enviar_whatsapp', label: 'Enviar Mensagem no WhatsApp' },
      { value: 'responder_email', label: 'Responder E-mail' },
      { value: 'agendar_sessao', label: 'Agendar Sessão' },
      { value: 'ir_checkout', label: 'Ir para Checkout' }
    ]
  },
  {
    id: 'cta_secundaria',
    label: 'Chamada de Ação Secundária (Opcional)',
    tipo: FIELD_TYPES.TEXT,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 8,
    placeholder: 'Ex: Saiba mais'
  },
  
  // Bloco: Configurações de Copy
  {
    id: 'tom_de_voz',
    label: 'Tom de Voz',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.CONFIGURACOES_COPY,
    ordem: 1,
    opcoes: [
      { value: 'profissional', label: 'Profissional' },
      { value: 'informal', label: 'Informal' },
      { value: 'empatico', label: 'Empático' },
      { value: 'agressivo_venda', label: 'Agressivo na Venda' },
      { value: 'inspirador', label: 'Inspirador' },
      { value: 'tecnico', label: 'Técnico' }
    ]
  },
  {
    id: 'estilo_linguagem',
    label: 'Estilo de Linguagem',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.CONFIGURACOES_COPY,
    ordem: 2,
    opcoes: [
      { value: 'simples_direto', label: 'Mais Simples e Direto' },
      { value: 'rebuscado', label: 'Mais Rebuscado' },
      { value: 'jovem', label: 'Mais Jovem' },
      { value: 'corporativo', label: 'Mais Corporativo' }
    ]
  },
  {
    id: 'tamanho_copy',
    label: 'Tamanho Desejado da Copy',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.CONFIGURACOES_COPY,
    ordem: 3,
    opcoes: [
      { value: 'curta', label: 'Curta' },
      { value: 'media', label: 'Média' },
      { value: 'longa', label: 'Longa' }
    ]
  },
  {
    id: 'idioma',
    label: 'Idioma',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.CONFIGURACOES_COPY,
    ordem: 4,
    opcoes: [
      { value: 'pt_br', label: 'PT-BR' },
      { value: 'pt_pt', label: 'PT-PT' },
      { value: 'en', label: 'EN' },
      { value: 'es', label: 'ES' }
    ],
    defaultValue: 'pt_br'
  },
  {
    id: 'persona_marca',
    label: 'Persona da Marca',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.CONFIGURACOES_COPY,
    ordem: 5,
    opcoes: [
      { value: 'amiga', label: 'Amiga' },
      { value: 'especialista', label: 'Especialista' },
      { value: 'mentora_rigida', label: 'Mentora Rígida' },
      { value: 'professor_paciente', label: 'Professor Paciente' },
      { value: 'marca_luxo', label: 'Marca de Luxo' },
      { value: 'marca_acessivel', label: 'Marca Acessível' }
    ]
  },
  {
    id: 'nivel_energia',
    label: 'Nível de Energia do Texto',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.CONFIGURACOES_COPY,
    ordem: 6,
    opcoes: [
      { value: 'baixo', label: 'Baixo' },
      { value: 'medio', label: 'Médio' },
      { value: 'alto', label: 'Alto' }
    ]
  },
  {
    id: 'estrutura_paragrafos',
    label: 'Estrutura de Parágrafos',
    tipo: FIELD_TYPES.SELECT,
    bloco: FORM_BLOCKS.CONFIGURACOES_COPY,
    ordem: 7,
    opcoes: [
      { value: 'paragrafos_curtos', label: 'Parágrafos Curtos' },
      { value: 'paragrafos_medios', label: 'Parágrafos Médios' },
      { value: 'bullets_destacados', label: 'Bullets Destacados' },
      { value: 'muitas_quebras', label: 'Muito Uso de Quebras de Linha' }
    ]
  },
  {
    id: 'palavras_que_devem_aparecer',
    label: 'Palavras que Devem Aparecer',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.CONFIGURACOES_COPY,
    ordem: 8,
    placeholder: 'Ex: garantido, comprovado'
  },
  {
    id: 'palavras_que_devem_ser_evitas',
    label: 'Palavras que Devem ser Evitadas',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.CONFIGURACOES_COPY,
    ordem: 9,
    placeholder: 'Ex: nunca, sempre'
  },
  
  // Campos para Estrutura Invisível
  {
    id: 'copy_concorrente',
    label: 'Copy do Concorrente',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 10,
    placeholder: 'Cole aqui a copy completa do seu concorrente para análise e modelagem...',
    rows: 10
  },
  {
    id: 'observacoes_adaptacao',
    label: 'Observações e Adaptações Desejadas',
    tipo: FIELD_TYPES.TEXTAREA,
    bloco: FORM_BLOCKS.ESTRATEGIA_VENDA,
    ordem: 11,
    placeholder: 'Descreva o que você quer adaptar, modificar ou melhorar nesta copy. Ex: "Trocar o produto para meu serviço", "Adicionar mais urgência", "Focar em outro público", etc.',
    rows: 6
  }
];

// Função auxiliar para obter campos por bloco
export const getFieldsByBlock = (bloco) => {
  return BASE_FIELDS.filter(field => field.bloco === bloco).sort((a, b) => a.ordem - b.ordem);
};

// Função auxiliar para obter um campo por ID
export const getFieldById = (id) => {
  return BASE_FIELDS.find(field => field.id === id);
};

// Função auxiliar para obter todos os blocos
export const getAllBlocks = () => {
  return Object.values(FORM_BLOCKS);
};

// Labels dos blocos para exibição
export const BLOCK_LABELS = {
  [FORM_BLOCKS.DADOS_NEGOCIO]: 'Dados do Negócio',
  [FORM_BLOCKS.PUBLICO_ALVO]: 'Público-Alvo',
  [FORM_BLOCKS.OFERTA]: 'Oferta',
  [FORM_BLOCKS.ESTRATEGIA_VENDA]: 'Estratégia de Venda',
  [FORM_BLOCKS.CONFIGURACOES_COPY]: 'Configurações de Copy'
};
