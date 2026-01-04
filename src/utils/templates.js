// Definições de Templates do Sistema e estruturas de dados

import { BASE_FIELDS } from './formSchema';

// Templates do Sistema - Definem estrutura do formulário
export const SYSTEM_TEMPLATES = [
  {
    id: 'vsl_alta_conversao',
    nome: 'VSL de Alta Conversão',
    descricao: 'Estrutura completa para vídeos de vendas usando metodologia RMBC. Ideal para lançamentos e produtos de alto ticket.',
    tipo_saida: 'vsl',
    config_campos: {
      // Campos obrigatórios
      profissional_nome: { visivel: true, obrigatorio: true },
      segmento_atuacao: { visivel: true, obrigatorio: true },
      principal_dor: { visivel: true, obrigatorio: true },
      resultado_principal: { visivel: true, obrigatorio: true },
      oferta_nome: { visivel: true, obrigatorio: true },
      oferta_preco_principal: { visivel: true, obrigatorio: true },
      oferta_garantia_texto: { visivel: true, obrigatorio: true },
      // Campos com defaults
      canal_principal: { visivel: true, obrigatorio: false, default: 'vsl' },
      objetivo_campanha: { visivel: true, obrigatorio: false, default: 'vender_diretamente' },
      tom_de_voz: { visivel: true, obrigatorio: false, default: 'empatico' }
    },
    campos_extras: [
      {
        id: 'vsl_duracao_minutos',
        label: 'Duração Aproximada (minutos)',
        tipo: 'number',
        bloco: 'estrategia_venda',
        ordem: 9,
        placeholder: 'Ex.: 20',
        visivel: true,
        obrigatorio: false
      },
      {
        id: 'vsl_estrutura_preferida',
        label: 'Estrutura Preferida',
        tipo: 'select',
        bloco: 'estrategia_venda',
        ordem: 10,
        opcoes: [
          { value: 'classica_rmbc', label: 'Clássica RMBC' },
          { value: 'historia_pessoal', label: 'História Pessoal' },
          { value: 'case_sucesso', label: 'Case de Sucesso' }
        ],
        visivel: true,
        obrigatorio: false
      },
      {
        id: 'vsl_ponto_maximo_tensao',
        label: 'Ponto Máximo de Tensão',
        tipo: 'textarea',
        bloco: 'estrategia_venda',
        ordem: 11,
        placeholder: 'Momento da história onde a dor será mais enfatizada',
        visivel: true,
        obrigatorio: false
      }
    ]
  },
  {
    id: 'anuncio_meta_direto',
    nome: 'Anúncio Meta Ads Direto',
    descricao: 'Copy focada em cliques imediatos para produtos de ticket baixo e médio. Ideal para tráfego pago no Facebook e Instagram.',
    tipo_saida: 'anuncio_meta',
    config_campos: {
      // Campos obrigatórios
      oferta_nome: { visivel: true, obrigatorio: true },
      principal_dor: { visivel: true, obrigatorio: true },
      cta_principal: { visivel: true, obrigatorio: true },
      // Campos com defaults
      canal_principal: { visivel: true, obrigatorio: false, default: 'anuncio_meta_ads' },
      objetivo_campanha: { visivel: true, obrigatorio: false, default: 'vender_diretamente' },
      tamanho_copy: { visivel: true, obrigatorio: false, default: 'curta' }
    },
    campos_extras: [
      {
        id: 'tipo_criativo',
        label: 'Tipo de Criativo',
        tipo: 'select',
        bloco: 'estrategia_venda',
        ordem: 9,
        opcoes: [
          { value: 'imagem_estatica', label: 'Imagem Estática' },
          { value: 'video_curto', label: 'Vídeo Curto' },
          { value: 'carrossel', label: 'Carrossel' }
        ],
        visivel: true,
        obrigatorio: false
      },
      {
        id: 'formato_chamada',
        label: 'Formato da Chamada',
        tipo: 'select',
        bloco: 'estrategia_venda',
        ordem: 10,
        opcoes: [
          { value: 'headline_forte', label: 'Headline Forte' },
          { value: 'pergunta_provocativa', label: 'Pergunta Provocativa' },
          { value: 'promessa_direta', label: 'Promessa Direta' }
        ],
        visivel: true,
        obrigatorio: false
      },
      {
        id: 'posicionamento',
        label: 'Posicionamento do Anúncio',
        tipo: 'multiselect',
        bloco: 'estrategia_venda',
        ordem: 11,
        opcoes: [
          { value: 'feed', label: 'Feed' },
          { value: 'stories', label: 'Stories' },
          { value: 'reels', label: 'Reels' },
          { value: 'audience_network', label: 'Audience Network' }
        ],
        visivel: true,
        obrigatorio: false
      }
    ]
  },
  {
    id: 'sequencia_aquecimento_3_emails',
    nome: 'Sequência de Aquecimento (3 E-mails)',
    descricao: 'Sequência de 3 e-mails para preparar a audiência antes de uma oferta principal. Ideal para aquecer leads frios.',
    tipo_saida: 'sequencia_emails',
    config_campos: {
      // Campos obrigatórios
      publico_descricao: { visivel: true, obrigatorio: true },
      objetivo_campanha: { visivel: true, obrigatorio: true },
      oferta_nome: { visivel: true, obrigatorio: true },
      // Campos com defaults
      canal_principal: { visivel: true, obrigatorio: false, default: 'sequencia_emails' },
      objetivo_campanha_default: { visivel: true, obrigatorio: false, default: 'aquecer_lista' }
    },
    campos_extras: [
      {
        id: 'tema_central_sequencia',
        label: 'Tema Central da Sequência',
        tipo: 'text',
        bloco: 'estrategia_venda',
        ordem: 9,
        placeholder: 'Tema principal que será abordado nos 3 e-mails',
        visivel: true,
        obrigatorio: false
      },
      {
        id: 'numero_emails',
        label: 'Número de E-mails',
        tipo: 'number',
        bloco: 'estrategia_venda',
        ordem: 10,
        defaultValue: 3,
        visivel: true,
        obrigatorio: false
      },
      {
        id: 'dia_inicio',
        label: 'Dia de Início',
        tipo: 'text',
        bloco: 'estrategia_venda',
        ordem: 11,
        placeholder: 'Ex.: Antes do carrinho abrir',
        visivel: true,
        obrigatorio: false
      },
      {
        id: 'chamada_final_oferta',
        label: 'Chamada Final da Oferta',
        tipo: 'textarea',
        bloco: 'estrategia_venda',
        ordem: 12,
        placeholder: 'Como a oferta será apresentada no último e-mail',
        visivel: true,
        obrigatorio: false
      }
    ]
  }
];

// Função auxiliar para obter template do sistema por ID
export const getSystemTemplate = (id) => {
  return SYSTEM_TEMPLATES.find(template => template.id === id);
};

// Função para obter configuração de campo de um template do sistema
export const getFieldConfig = (templateId, fieldId) => {
  const template = getSystemTemplate(templateId);
  if (!template) return { visivel: true, obrigatorio: false };
  
  return template.config_campos[fieldId] || { visivel: true, obrigatorio: false };
};

// Função para obter campos extras de um template
export const getExtraFields = (templateId) => {
  const template = getSystemTemplate(templateId);
  return template?.campos_extras || [];
};

// Função para aplicar configuração de template do sistema
export const applySystemTemplate = (templateId, formData = {}) => {
  const template = getSystemTemplate(templateId);
  if (!template) return { formData, visibleFields: [], requiredFields: [], extraFields: [] };
  
  const visibleFields = [];
  const requiredFields = [];
  const newFormData = { ...formData };
  
  // Aplicar configurações de campos base
  BASE_FIELDS.forEach(field => {
    const config = template.config_campos[field.id] || { visivel: true, obrigatorio: false };
    
    if (config.visivel) {
      visibleFields.push(field.id);
      
      if (config.obrigatorio) {
        requiredFields.push(field.id);
      }
      
      // Aplicar valor default se existir
      if (config.default && !newFormData[field.id]) {
        newFormData[field.id] = config.default;
      }
    }
  });
  
  // Adicionar campos extras
  const extraFields = template.campos_extras || [];
  extraFields.forEach(field => {
    if (field.visivel) {
      visibleFields.push(field.id);
      
      if (field.obrigatorio) {
        requiredFields.push(field.id);
      }
      
      // Aplicar valor default se existir
      if (field.defaultValue !== undefined && !newFormData[field.id]) {
        newFormData[field.id] = field.defaultValue;
      }
    }
  });
  
  return {
    formData: newFormData,
    visibleFields,
    requiredFields,
    extraFields
  };
};
