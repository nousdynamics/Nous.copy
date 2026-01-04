// Nous.Copy - Constantes e Configurações

export const VELOCIDADE_FALA = 150; // palavras por minuto

export const PECADOS_CAPITAIS = {
  gula: {
    nome: 'Gula',
    gatilho: 'Desejo insaciável',
    aplicacao: 'Você quer mais, sempre mais',
    frases: [
      'Você quer mais',
      'Sempre mais',
      'Você merece o máximo',
      'Não se contente com menos'
    ]
  },
  avareza: {
    nome: 'Avareza',
    gatilho: 'Medo da perda financeira',
    aplicacao: 'Quanto custa sua incerteza?',
    frases: [
      'Quanto custa sua incerteza?',
      'Você está perdendo dinheiro',
      'Cada dia sem solução é dinheiro jogado fora',
      'O custo da inação é maior'
    ]
  },
  luxuria: {
    nome: 'Luxúria',
    gatilho: 'Desejo por prazer/conforto',
    aplicacao: 'Imagine a vida sem essa dor',
    frases: [
      'Imagine a vida sem essa dor',
      'Você merece conforto',
      'Liberte-se do sofrimento',
      'Sinta o alívio que você merece'
    ]
  },
  inveja: {
    nome: 'Inveja',
    gatilho: 'Comparação social',
    aplicacao: 'O que os outros fazem que você não faz?',
    frases: [
      'Outros já conseguiram',
      'Por que não você?',
      'Veja o que eles têm que você não tem',
      'Não fique para trás'
    ]
  },
  ira: {
    nome: 'Ira',
    gatilho: 'Frustração/Indignação',
    aplicacao: 'Você tem todo o direito de estar com raiva',
    frases: [
      'Você está com raiva',
      'E você tem todo o direito de estar',
      'Essa raiva não é sua culpa',
      'Transforme sua frustração em resultado'
    ]
  },
  preguica: {
    nome: 'Preguiça',
    gatilho: 'Busca por atalho/facilidade',
    aplicacao: 'Sem complicações, sem espera',
    frases: [
      'Sem complicações',
      'Sem espera',
      'A solução mais simples',
      'Sem esforço desnecessário'
    ]
  },
  soberba: {
    nome: 'Soberba',
    gatilho: 'Status/Exclusividade',
    aplicacao: 'Apenas os melhores conseguem',
    frases: [
      'Apenas os melhores',
      'Você é especial',
      'Exclusivo para quem merece',
      'Status que você merece'
    ]
  }
};

export const NIVEL_CONSCIENCIA = {
  'inconsciente': {
    nome: 'Inconsciente',
    descricao: 'Audiência não sabe que tem o problema',
    abordagem: 'Educação + Despertar'
  },
  'consciente-problema': {
    nome: 'Consciente do Problema',
    descricao: 'Sabe que tem o problema, mas não a solução',
    abordagem: 'Validação + Esperança'
  },
  'consciente-solucao': {
    nome: 'Consciente da Solução',
    descricao: 'Sabe que existe solução, mas não a sua',
    abordagem: 'Diferenciação'
  },
  'consciente-produto': {
    nome: 'Consciente do Produto',
    descricao: 'Conhece você ou seu produto',
    abordagem: 'Objeção + Prova'
  },
  'totalmente-consciente': {
    nome: 'Totalmente Consciente',
    descricao: 'Já decidiu, só precisa do CTA',
    abordagem: 'Urgência + Facilidade'
  }
};

export const METODOLOGIAS = {
  'light-copy': {
    nome: 'Light Copy',
    autor: 'Leandro Ladeira',
    estrutura: 'Premissa Lógica + Gancho Emocional + CTA'
  },
  'rmbc': {
    nome: 'RMBC',
    autor: 'Stefan Georgi',
    estrutura: 'Resultado + Mecanismo + Benefício + CTA'
  },
  'resposta-direta': {
    nome: 'Resposta Direta',
    autor: 'Gary Halbert',
    estrutura: 'Gancho Forte + Premissa + Prova + CTA'
  },
  '5-niveis': {
    nome: '5 Níveis',
    autor: 'Eugene Schwartz',
    estrutura: 'Educação Progressiva + Objeção + CTA'
  }
};
