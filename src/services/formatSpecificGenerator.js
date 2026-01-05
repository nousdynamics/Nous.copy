// Geradores específicos por formato de copy e agente

import { generateWithOpenAI } from './openaiService';

/**
 * Mapeia os formatos para instruções específicas
 */
const FORMAT_INSTRUCTIONS = {
  'vsl': {
    gancho: 'Você é um especialista em criar ganchos para VSL (Vídeo de Vendas) que capturam atenção em 3 segundos. Ganchos de VSL devem ser falados, criarem curiosidade imediata e fazer o espectador querer continuar assistindo.',
    corpo: 'Você é um especialista em criar corpos de VSL. VSLs precisam de uma narrativa fluída que desenvolva o problema, apresente a solução, remova objeções e construa autoridade. O texto deve ser natural para ser falado em vídeo.',
    cta: 'Você é um especialista em criar CTAs para VSL. CTAs de VSL devem ser claros, criar urgência e facilitar a ação. Devem funcionar tanto no final do vídeo quanto como botão de overlay.'
  },
  'pagina_vendas': {
    gancho: 'Você é um especialista em criar headlines para páginas de vendas. Headlines devem capturar atenção, prometer um benefício claro e fazer o visitante querer ler o resto da página.',
    corpo: 'Você é um especialista em criar copy para páginas de vendas. Páginas de vendas precisam de uma estrutura completa: introdução do problema, apresentação da solução, provas sociais, remoção de objeções, apresentação da oferta e finalização. Seja detalhado e persuasivo.',
    cta: 'Você é um especialista em criar CTAs para páginas de vendas. CTAs devem aparecer estrategicamente ao longo da página, criar urgência e escassez, e serem visualmente destacados.'
  },
  'anuncio_meta_ads': {
    gancho: 'Você é um especialista em criar headlines para anúncios do Meta Ads (Facebook/Instagram). Headlines de anúncios devem ser concisos (até 40 caracteres idealmente), impactantes e fazer o usuário parar o scroll. Use emojis estrategicamente.',
    corpo: 'Você é um especialista em criar textos primários para anúncios do Meta Ads. Textos de anúncios devem ser curtos (idealmente 125 caracteres para exibição completa), diretos ao ponto, emocionais e com um CTA claro. Use quebras de linha estratégicas.',
    cta: 'Você é um especialista em criar CTAs para Meta Ads. CTAs devem ser ação clara e direta, como "Saiba Mais", "Comprar Agora", "Cadastre-se". Seja específico sobre o benefício da ação.'
  },
  'sequencia_emails': {
    gancho: 'Você é um especialista em criar subject lines (assuntos) para e-mails. Assuntos devem despertar curiosidade, criar urgência ou prometer benefício. Máximo de 50 caracteres para não ser cortado.',
    corpo: 'Você é um especialista em criar corpos de e-mail. E-mails devem ser curtos, personalizados, focados em um único objetivo e criar conexão emocional. Use storytelling breve e sempre termine com uma pergunta ou CTA claro.',
    cta: 'Você é um especialista em criar CTAs para e-mails. CTAs devem ser claros, criarem urgência e facilitarem a ação. Use botões visuais ou links destacados.'
  },
  'post_redes_sociais': {
    gancho: 'Você é um especialista em criar primeiras linhas para posts de redes sociais. As primeiras linhas devem capturar atenção no feed, criar curiosidade e fazer o usuário querer ver mais (clicar em "ver mais").',
    corpo: 'Você é um especialista em criar posts para redes sociais. Posts devem ser autênticos, emocionais, usar storytelling, emojis estrategicamente e sempre criar engajamento. Seja natural e conversacional.',
    cta: 'Você é um especialista em criar CTAs para posts de redes sociais. CTAs devem ser naturais, criar engajamento (comentários, salvos, compartilhamentos) e não parecerem muito "vendedores". Use perguntas ou call-to-engagement.'
  },
  'roteiro_video_curto': {
    gancho: 'Você é um especialista em criar ganchos para vídeos curtos (Reels, Shorts, TikTok). Ganchos devem capturar atenção nos primeiros 3 segundos, criar curiosidade visual/auditiva e fazer o usuário continuar assistindo.',
    corpo: 'Você é um especialista em criar roteiros para vídeos curtos. Roteiros devem ser concisos (15-60 segundos), ter ritmo acelerado, usar padrão de problema-solução-benefício rapidamente e sempre terminar com um gancho visual ou verbal.',
    cta: 'Você é um especialista em criar CTAs para vídeos curtos. CTAs devem aparecer visualmente no vídeo (texto overlay), serem claros e diretos. Use frases como "Link na bio", "Saiba mais", "Salve este vídeo".'
  },
  'titulos_google_ads': {
    gancho: 'Você é um especialista em criar Títulos 1 para Google Ads. Títulos devem ter máximo de 30 caracteres, incluir palavras-chave, prometer benefício claro e gerar cliques. Use números e palavras de ação.',
    corpo: 'Você é um especialista em criar Descrições para Google Ads. Descrições devem ter máximo de 90 caracteres, expandir o título, incluir benefícios específicos e criar urgência. Use palavras-chave naturalmente.',
    cta: 'Você é um especialista em criar CTAs para Google Ads. CTAs devem ser claros, específicos e criar urgência. Use frases como "Compre Agora", "Solicite Orçamento", "Confira Promoção".'
  }
};

/**
 * Mapeia os agentes para suas características específicas
 */
const AGENT_CHARACTERISTICS = {
  'criativo': {
    name: 'Criativo',
    description: 'Anúncios que param o scroll e criam conexão emocional instantânea',
    ganchoFocus: 'emoção, dor e solução em segundos',
    corpoFocus: 'storytelling rápido, benefício direto, sem enrolação',
    ctaFocus: 'ação imediata, baixa fricção',
    generateOnlyHook: false
  },
  'ganchos': {
    name: 'Ganchos',
    description: 'Ganchos que quebram padrões e capturam atenção em 3 segundos',
    ganchoFocus: 'quebra de padrão, curiosidade, validação emocional',
    corpoFocus: 'não se aplica - apenas gancho',
    ctaFocus: 'não se aplica - apenas gancho',
    generateOnlyHook: true // Apenas gera gancho, não corpo e CTA
  },
  'pagina_vendas': {
    name: 'Página de Vendas',
    description: 'Páginas completas que guiam o lead até a conversão',
    ganchoFocus: 'headline que promete transformação',
    corpoFocus: 'estrutura completa: problema, solução, provas, oferta, garantias',
    ctaFocus: 'múltiplos CTAs estratégicos ao longo da página',
    generateOnlyHook: false
  },
  'mini_vsl': {
    name: 'Mini VSL',
    description: 'Script completo de VSL curta, pronta para gravar',
    ganchoFocus: 'gancho falado, curiosidade em 3 segundos',
    corpoFocus: 'narrativa fluída, natural para fala, desenvolvimento completo',
    ctaFocus: 'CTA claro para ação no final e durante o vídeo',
    generateOnlyHook: false
  },
  'promessas': {
    name: 'Promessas',
    description: 'Promessas específicas e emocionais que geram desejo',
    ganchoFocus: 'promessa específica e mensurável',
    corpoFocus: 'desenvolvimento da promessa, prova de que é possível',
    ctaFocus: 'CTA que reforce a promessa e crie urgência',
    generateOnlyHook: false
  },
  'estrutura_invisivel': {
    name: 'Estrutura Invisível',
    description: 'Análise e adaptação da estrutura de copies de concorrentes',
    ganchoFocus: 'adaptação do gancho original mantendo poder',
    corpoFocus: 'aplicação da estrutura invisível de 8 etapas',
    ctaFocus: 'CTA adaptado com fechamento de impacto',
    generateOnlyHook: false
  }
};

// Exportar características dos agentes para uso em outros arquivos
export { AGENT_CHARACTERISTICS };

/**
 * Gera gancho específico para formato e agente
 */
export async function gerarGanchoPorFormato(dados, estrategia, formato, agenteId) {
  // Usar formato passado como parâmetro (já mapeado corretamente)
  const formatKey = formato || dados.canal_principal || 'anuncio_meta_ads';
  const agentChar = AGENT_CHARACTERISTICS[agenteId] || AGENT_CHARACTERISTICS['criativo'];
  const formatInst = FORMAT_INSTRUCTIONS[formatKey] || FORMAT_INSTRUCTIONS['anuncio_meta_ads'];
  
  const instructions = `${formatInst.gancho}. ${agentChar.ganchoFocus ? `Foque em: ${agentChar.ganchoFocus}.` : ''}`;
  
  const prompt = `Gere um GANCHO poderoso para ${formatKey} seguindo estas características:
- Formato: ${formatKey}
- Agente: ${agentChar.name}
- ${agentChar.ganchoFocus ? `Característica: ${agentChar.ganchoFocus}` : ''}

Requisitos do formato ${formatKey}:
${formatKey === 'vsl' || formatKey === 'roteiro_video_curto' ? '- Deve ser natural para ser falado\n- Capturar atenção em 3 segundos\n' : ''}
${formatKey === 'anuncio_meta_ads' ? '- Máximo 40 caracteres idealmente\n- Impactante para parar o scroll\n' : ''}
${formatKey === 'titulos_google_ads' ? '- Máximo 30 caracteres\n- Incluir palavra-chave\n' : ''}
${formatKey === 'sequencia_emails' ? '- Máximo 50 caracteres\n- Criar curiosidade ou urgência\n' : ''}
${formatKey === 'post_redes_sociais' ? '- Primeiras linhas visíveis no feed\n- Criar curiosidade para "ver mais"\n' : ''}

IMPORTANTE: O termo de referência estratégica é apenas uma direção para a abordagem emocional. Use a área emocional (${estrategia?.pecado?.gatilho || 'persuasão estratégica'}) de forma lúdica e persuasiva, focando no desejo/necessidade do negócio, não no sentido literal.

Contexto:
- Profissional: ${dados.nomeProfissional || dados.profissional_nome || 'Profissional'}
- Público-alvo: ${dados.publicoAlvo || dados.publico_descricao || 'público-alvo'}
- Área emocional a ativar: ${estrategia?.pecado?.gatilho || 'persuasão estratégica'}
- Premissa: ${estrategia?.premissa || 'A solução existe'}

Gere APENAS o gancho, sem explicações.`;

  return await generateWithOpenAI({ prompt, instructions, model: "gpt-4.1", store: false });
}

/**
 * Gera corpo específico para formato e agente
 */
export async function gerarCorpoPorFormato(dados, estrategia, gancho, formato, agenteId) {
  // Usar formato passado como parâmetro (já mapeado corretamente)
  const formatKey = formato || dados.canal_principal || dados.plataforma || 'anuncio_meta_ads';
  const agentChar = AGENT_CHARACTERISTICS[agenteId] || AGENT_CHARACTERISTICS['criativo'];
  const formatInst = FORMAT_INSTRUCTIONS[formatKey] || FORMAT_INSTRUCTIONS['anuncio_meta_ads'];
  
  const instructions = `${formatInst.corpo}. ${agentChar.corpoFocus ? `Foque em: ${agentChar.corpoFocus}.` : ''}`;
  
  const prompt = `Gere o CORPO da copy para ${formatKey} seguindo estas características:
- Formato: ${formatKey}
- Agente: ${agentChar.name}
- ${agentChar.corpoFocus ? `Característica: ${agentChar.corpoFocus}` : ''}

Requisitos do formato ${formatKey}:
${formatKey === 'vsl' || formatKey === 'mini_vsl' ? '- Narrativa fluída para ser falada\n- Natural e conversacional\n- Desenvolver problema → solução → prova\n' : ''}
${formatKey === 'pagina_vendas' ? '- Estrutura completa e detalhada\n- Múltiplos parágrafos\n- Remover objeções\n- Apresentar oferta claramente\n' : ''}
${formatKey === 'anuncio_meta_ads' ? '- Máximo 125 caracteres idealmente\n- Direto ao ponto\n- Emocional e impactante\n' : ''}
${formatKey === 'sequencia_emails' ? '- Curto e pessoal\n- Storytelling breve\n- Um objetivo por e-mail\n' : ''}
${formatKey === 'post_redes_sociais' ? '- Autêntico e conversacional\n- Usar emojis estrategicamente\n- Criar engajamento\n' : ''}
${formatKey === 'roteiro_video_curto' ? '- Conciso (15-60 segundos)\n- Ritmo acelerado\n- Problema-solução-benefício rápido\n' : ''}
${formatKey === 'titulos_google_ads' ? '- Máximo 90 caracteres\n- Expandir o título\n- Incluir benefícios\n' : ''}

Gancho gerado: "${gancho}"

IMPORTANTE: Use a abordagem emocional de forma lúdica e estratégica. O foco é atacar o âmbito/desejo relacionado a essa área emocional do público-alvo, não usar termos literalmente.

Contexto:
- Profissional: ${dados.nomeProfissional || dados.profissional_nome || 'Profissional'}
- Diferencial: ${dados.diferencialCompetitivo || dados.diferencial || 'diferencial'}
- Premissa: ${estrategia?.premissa || 'A solução existe'}
- Área emocional a ativar: ${estrategia?.pecado?.gatilho || 'persuasão estratégica'}

Gere APENAS o corpo, sem explicações.`;

  return await generateWithOpenAI({ prompt, instructions, model: "gpt-4.1", store: false });
}

/**
 * Gera CTA específico para formato e agente
 */
export async function gerarCTAPorFormato(dados, estrategia, formato, agenteId) {
  // Usar formato passado como parâmetro (já mapeado corretamente)
  const formatKey = formato || dados.canal_principal || dados.plataforma || 'anuncio_meta_ads';
  const agentChar = AGENT_CHARACTERISTICS[agenteId] || AGENT_CHARACTERISTICS['criativo'];
  const formatInst = FORMAT_INSTRUCTIONS[formatKey] || FORMAT_INSTRUCTIONS['anuncio_meta_ads'];
  
  const instructions = `${formatInst.cta}. ${agentChar.ctaFocus ? `Foque em: ${agentChar.ctaFocus}.` : ''}`;
  
  const prompt = `Gere um CTA (Chamada para Ação) para ${formatKey} seguindo estas características:
- Formato: ${formatKey}
- Agente: ${agentChar.name}
- ${agentChar.ctaFocus ? `Característica: ${agentChar.ctaFocus}` : ''}

Requisitos do formato ${formatKey}:
${formatKey === 'vsl' || formatKey === 'mini_vsl' ? '- CTA claro e falado\n- Criar urgência\n- Funcionar como botão de overlay\n' : ''}
${formatKey === 'pagina_vendas' ? '- Múltiplos CTAs ao longo da página\n- Criar urgência e escassez\n- Visualmente destacado\n' : ''}
${formatKey === 'anuncio_meta_ads' ? '- Ação clara e direta\n- Específico sobre benefício\n' : ''}
${formatKey === 'sequencia_emails' ? '- Claro e com urgência\n- Botão visual ou link destacado\n' : ''}
${formatKey === 'post_redes_sociais' ? '- Natural, não muito "vendedor"\n- Criar engajamento\n- Perguntas ou call-to-engagement\n' : ''}
${formatKey === 'roteiro_video_curto' ? '- Visual (texto overlay)\n- Claro e direto\n- "Link na bio", "Saiba mais"\n' : ''}
${formatKey === 'titulos_google_ads' ? '- Específico e com urgência\n- "Compre Agora", "Solicite Orçamento"\n' : ''}

IMPORTANTE: Use a abordagem emocional de forma lúdica e estratégica, focando no âmbito/desejo do negócio, não no sentido literal.

Contexto:
- Área emocional a ativar: ${estrategia?.pecado?.gatilho || 'persuasão estratégica'}
- Nível de consciência: ${estrategia?.nivel?.nome || 'consciente'}

Gere APENAS o CTA, sem explicações.`;

  return await generateWithOpenAI({ prompt, instructions, model: "gpt-4.1", store: false });
}
