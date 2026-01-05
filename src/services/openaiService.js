import OpenAI from "openai";

// Inicializar cliente OpenAI
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error('❌ VITE_OPENAI_API_KEY não configurada!');
  console.error('⚠️ Configure a chave da API OpenAI no arquivo .env:');
  console.error('   VITE_OPENAI_API_KEY=sk-sua_chave_aqui');
  console.error('   Obtenha sua chave em: https://platform.openai.com/api-keys');
}

const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Necessário para uso no browser
}) : null;

/**
 * Gera uma copy usando OpenAI
 * @param {Object} params - Parâmetros para geração
 * @param {string} params.prompt - Prompt para a IA
 * @param {string} params.model - Modelo a ser usado (padrão: gpt-4.1)
 * @param {boolean} params.store - Se deve armazenar a resposta
 * @returns {Promise<string>} Texto gerado pela IA
 */
export async function generateWithOpenAI({ prompt, model = "gpt-4.1", instructions = null, store = true }) {
  // Verificar novamente a chave (pode ter sido atualizada)
  const currentApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!currentApiKey || currentApiKey.trim() === '' || !openai) {
    const errorMsg = 'OpenAI API key não configurada!\n\n' +
      'Para corrigir:\n' +
      '1. Crie um arquivo .env na raiz do projeto\n' +
      '2. Adicione a linha: VITE_OPENAI_API_KEY=sk-sua_chave_aqui\n' +
      '3. Obtenha sua chave em: https://platform.openai.com/api-keys\n' +
      '4. Reinicie o servidor de desenvolvimento (npm run dev)';
    throw new Error(errorMsg);
  }
  
  // Validar formato da chave
  if (!currentApiKey.startsWith('sk-')) {
    throw new Error('A chave da API OpenAI parece estar incorreta. Ela deve começar com "sk-". Verifique o arquivo .env');
  }

  // Mapear modelos para versões disponíveis (usando nova API)
  const modelMap = {
    'gpt-5-nano': 'gpt-4.1',
    'gpt-4-turbo-preview': 'gpt-4.1',
    'gpt-4': 'gpt-4.1',
    'gpt-3.5-turbo': 'gpt-4.1',
    'gpt-4o': 'gpt-4.1',
    'gpt-4o-mini': 'gpt-4.1',
    'gpt-5': 'gpt-5',
    'gpt-5.2': 'gpt-5.2',
    'gpt-4.1': 'gpt-4.1'
  };
  
  const modelToUse = modelMap[model] || 'gpt-4.1';

  try {
    // Usar a nova Responses API
    const response = await openai.responses.create({
      model: modelToUse,
      instructions: instructions || "Você é um especialista em copywriting de alta performance. Gere copies persuasivas e emocionais que convertem. Seja específico, criativo e sempre focado em resultados.",
      input: prompt,
      reasoning: modelToUse.includes('gpt-5') || modelToUse.includes('o3') ? { effort: "medium" } : undefined
    });
    
    // Extrair texto da resposta - tentar diferentes formatos
    let content = '';
    
    // Primeiro, tentar output_text (se disponível no SDK)
    if (response.output_text) {
      content = response.output_text;
    }
    // Segundo, tentar extrair do array output (estrutura real da API)
    else if (response.output && Array.isArray(response.output) && response.output.length > 0) {
      // Procurar por mensagens do tipo "message" com conteúdo de texto
      for (const outputItem of response.output) {
        if (outputItem.type === 'message' && outputItem.content && Array.isArray(outputItem.content)) {
          for (const contentItem of outputItem.content) {
            // Extrair texto de itens do tipo "output_text" (conforme exemplo da API)
            if (contentItem.type === 'output_text' && contentItem.text) {
              content += (content.length > 0 ? '\n\n' : '') + contentItem.text;
            }
          }
        }
      }
    }
    // Fallback: tentar acessar diretamente
    else if (response.output?.[0]?.content?.[0]?.text) {
      content = response.output[0].content[0].text;
    }
    
    if (!content || content.trim() === '') {
      console.error('Resposta da API não contém texto:', JSON.stringify(response, null, 2));
      throw new Error('A IA não retornou nenhum conteúdo. Verifique os logs do console para mais detalhes.');
    }
    
    return content.trim();
  } catch (error) {
    console.error("Erro ao gerar com OpenAI:", error);
    
    // Mensagens de erro mais específicas
    if (error.message && (error.message.includes('API key') || error.message.includes('401'))) {
      throw new Error('Chave da API OpenAI inválida ou não configurada. Verifique VITE_OPENAI_API_KEY no arquivo .env');
    }
    
    if (error.message && error.message.includes('rate limit')) {
      throw new Error('Limite de requisições excedido. Aguarde alguns instantes e tente novamente.');
    }
    
    if (error.message && error.message.includes('insufficient_quota')) {
      throw new Error('Cota da API OpenAI esgotada. Verifique seu saldo na conta da OpenAI.');
    }
    
    if (error.message && error.message.includes('model')) {
      throw new Error('Modelo não disponível. Verifique se você tem acesso ao modelo solicitado na sua conta OpenAI.');
    }
    
    throw new Error(`Erro ao gerar copy com IA: ${error.message || 'Erro desconhecido'}`);
  }
}

/**
 * Gera um gancho melhorado usando IA
 * @param {Object} dados - Dados do negócio e parâmetros
 * @param {Object} estrategia - Estratégia calculada
 * @returns {Promise<string>} Gancho gerado pela IA
 */
export async function gerarGanchoComIA(dados, estrategia) {
  const instructions = "Você é um copywriter de elite especializado em criar ganchos (hooks) poderosos que capturam atenção imediata e ativam áreas emocionais estratégicas. Use abordagens lúdicas e persuasivas focadas em desejos/necessidades do negócio. Seja específico, criativo e emocional.";
  
  // Verificações de segurança para evitar erros quando estratégia não está completa
  const pecadoNome = estrategia?.pecado?.nome || 'persuasão';
  const pecadoGatilho = estrategia?.pecado?.gatilho || 'curiosidade e desejo';
  const nivelNome = estrategia?.nivel?.nome || 'consciente do problema';
  const nivelAbordagem = estrategia?.nivel?.abordagem || 'focar na solução';
  const premissa = estrategia?.premissa || 'A solução existe e está ao seu alcance';
  
  const prompt = `Gere um GANCHO poderoso que:
- Capture a atenção em 3 segundos (máximo 15 palavras)
- Ative a área emocional relacionada a: ${pecadoGatilho} (use de forma lúdica e estratégica, não literal)
- Foque no âmbito/desejo: ${pecadoGatilho} - atacando essa área do comportamento/necessidade do público
- Seja específico e não genérico
- Crie curiosidade ou validação emocional

IMPORTANTE: O termo "${pecadoNome}" é apenas uma referência estratégica para direcionar a abordagem. Use a área emocional (${pecadoGatilho}) de forma lúdica e persuasiva, focando no desejo/necessidade do negócio, não no sentido literal do termo.

Contexto:
- Profissional: ${dados.nomeProfissional || dados.profissional_nome || 'Profissional'}
- Público-alvo: ${dados.publicoAlvo || dados.publico_descricao || 'público-alvo'}
- Nível de consciência: ${nivelNome} - ${nivelAbordagem}
- Premissa lógica: ${premissa}
- Área emocional a ativar: ${pecadoGatilho}

Gere APENAS o gancho, sem explicações adicionais.`;

  const model = dados.modeloIA || 'gpt-4.1';
  return await generateWithOpenAI({ prompt, model, instructions, store: false });
}

/**
 * Gera um corpo melhorado usando IA
 * @param {Object} dados - Dados do negócio e parâmetros
 * @param {Object} estrategia - Estratégia calculada
 * @param {string} gancho - Gancho já gerado
 * @returns {Promise<string>} Corpo gerado pela IA
 */
export async function gerarCorpoComIA(dados, estrategia, gancho) {
  const instructions = "Você é um copywriter de elite especializado em criar corpos de copy persuasivos que desenvolvem argumentos convincentes, estabelecem autoridade e criam urgência emocional.";
  
  // Verificações de segurança para evitar erros quando estratégia não está completa
  const premissa = estrategia?.premissa || 'A solução existe e está ao seu alcance';
  const nivelNome = estrategia?.nivel?.nome || 'consciente do problema';
  const pecadoNome = estrategia?.pecado?.nome || 'persuasão';
  
  const prompt = `Gere o CORPO de uma copy que:
- Inicie com uma frase de TRANSIÇÃO conectando ao gancho: "${gancho}"
- Desenvolva a Premissa Lógica: ${premissa}
- Integre a Autoridade do Especialista: ${dados.anosExperiencia || dados.anos_experiencia || 'anos'} de experiência, ${dados.resultadosComprovados || dados.resultados_comprovados || 'resultados comprovados'}
- Crie urgência ou esperança baseado no nível: ${nivelNome}
- Ative a área emocional relacionada a: ${estrategia?.pecado?.gatilho || 'persuasão'} (de forma lúdica e estratégica, focando no desejo/necessidade do negócio)

IMPORTANTE: Use a abordagem emocional (${estrategia?.pecado?.gatilho || 'persuasão'}) de forma lúdica e estratégica. O foco é atacar o âmbito/desejo relacionado a essa área emocional do público-alvo, não usar o termo literalmente.

Contexto:
- Profissional: ${dados.nomeProfissional || dados.profissional_nome || 'Profissional'}
- Diferencial: ${dados.diferencialCompetitivo || dados.diferencial_competitivo || 'diferencial competitivo'}
- Público-alvo: ${dados.publicoAlvo || dados.publico_descricao || 'público-alvo'}
- Área emocional a ativar: ${estrategia?.pecado?.gatilho || 'persuasão estratégica'}
- Metodologia: ${dados.metodologia || dados.metodologia_base || 'metodologia comprovada'}

Gere APENAS o corpo, sem explicações adicionais.`;

  const model = dados.modeloIA || 'gpt-4.1';
  return await generateWithOpenAI({ prompt, model, instructions, store: false });
}

/**
 * Gera um CTA melhorado usando IA
 * @param {Object} dados - Dados do negócio e parâmetros
 * @param {Object} estrategia - Estratégia calculada
 * @returns {Promise<string>} CTA gerado pela IA
 */
export async function gerarCTAComIA(dados, estrategia) {
  const instructions = "Você é um copywriter de elite especializado em criar CTAs (Chamadas para Ação) claras, diretas e persuasivas que geram conversão.";
  
  // Verificações de segurança para evitar erros quando estratégia não está completa
  const pecadoNome = estrategia?.pecado?.nome || 'persuasão';
  const nivelNome = estrategia?.nivel?.nome || 'consciente do problema';
  
  const prompt = `Gere um CTA (Chamada para Ação) que:
- Seja CLARO e DIRETO (máximo 2 frases)
- Crie urgência ou esperança
- Facilite a ação (não complique)
- Reforce o benefício final
- Ative a área emocional relacionada ao desejo/necessidade: ${estrategia?.pecado?.gatilho || 'persuasão'} (de forma lúdica e estratégica)

IMPORTANTE: Use a abordagem emocional de forma lúdica e estratégica, focando no âmbito/desejo do negócio, não no sentido literal.

Contexto:
- Nível de consciência: ${nivelNome}
- Plataforma: ${dados.plataforma || dados.canal_principal || 'plataforma digital'}
- Área emocional a ativar: ${estrategia?.pecado?.gatilho || 'persuasão estratégica'}

Gere APENAS o CTA, sem explicações adicionais.`;

  const model = dados.modeloIA || 'gpt-4.1';
  return await generateWithOpenAI({ prompt, model, instructions, store: false });
}

/**
 * Gera uma copy completa melhorada usando IA
 * @param {Object} dados - Dados do negócio e parâmetros
 * @param {Object} estrategia - Estratégia calculada
 * @returns {Promise<Object>} Objeto com gancho, corpo e cta
 */
export async function gerarCopyCompletaComIA(dados, estrategia) {
  try {
    // Gerar gancho primeiro
    const gancho = await gerarGanchoComIA(dados, estrategia);
    
    // Gerar corpo e CTA em paralelo (corpo precisa do gancho)
    const [corpo, cta] = await Promise.all([
      gerarCorpoComIA(dados, estrategia, gancho),
      gerarCTAComIA(dados, estrategia)
    ]);

    return {
      gancho: gancho.trim(),
      corpo: corpo.trim(),
      cta: cta.trim()
    };
  } catch (error) {
    console.error("Erro ao gerar copy completa:", error);
    throw error;
  }
}

/**
 * Gera uma copy usando Estrutura Invisível - analisa copy do concorrente e adapta
 * @param {Object} dados - Dados do formulário (deve conter copy_concorrente e observacoes_adaptacao)
 * @returns {Promise<Object>} Objeto com gancho, corpo e cta seguindo a estrutura de 8 etapas
 */
export async function gerarEstruturaInvisivelComIA(dados) {
  const copyConcorrente = dados.copy_concorrente || '';
  const observacoes = dados.observacoes_adaptacao || '';
  
  if (!copyConcorrente.trim()) {
    throw new Error('Copy do concorrente é obrigatória para gerar Estrutura Invisível');
  }

  const prompt = `Você é um especialista em copywriting estratégico. Analise a copy do concorrente abaixo e crie uma nova copy adaptada seguindo exatamente a ESTRUTURA INVISÍVEL de 8 etapas:

COPY DO CONCORRENTE:
${copyConcorrente}

OBSERVAÇÕES E ADAPTAÇÕES DESEJADAS:
${observacoes || 'Adaptar para meu negócio mantendo a estrutura original'}

---

ESTRUTURA INVISÍVEL (8 ETAPAS OBRIGATÓRIAS):

1. HOOK DE QUEBRA DE PADRÃO
   - Crie um gancho que quebra expectativas e captura atenção imediata
   - Baseado no gancho original, mas adaptado

2. AGITAÇÃO DO PROBLEMA
   - Identifique e amplifique a dor/problema que a copy original abordava
   - Adapte para o contexto das observações

3. DESTAQUE DA INEFICIÊNCIA DA SOLUÇÃO ATUAL
   - Mostre por que as soluções tradicionais não funcionam
   - Mantenha a lógica do original

4. APRESENTAÇÃO DO NOVO MECANISMO
   - Revele o mecanismo/solução (adaptado conforme observações)
   - Explique como funciona de forma clara

5. REMOÇÃO DE OBJEÇÕES
   - Antecipe e responda objeções comuns
   - Foque em facilidade, conveniência, garantias

6. PROVA DE LTV EMOCIONAL (RETENÇÃO)
   - Mostre resultados, depoimentos, provas sociais
   - Estabeleça autoridade e confiança

7. CHAMADA PARA AÇÃO (CTA COM BENEFÍCIO)
   - Crie um CTA claro com benefício específico
   - Gere urgência ou escassez se aplicável

8. FECHAMENTO COM IMPACTO (ANCORAGEM DE VALOR)
   - Reforce o valor e o diferencial
   - Deixe uma última impressão memorável

---

INSTRUÇÕES:
- Mantenha a essência e estrutura da copy original
- Adapte conteúdo conforme as observações fornecidas
- Separe claramente as 8 etapas na resposta
- O texto deve fluir naturalmente, como uma única copy coesa
- Não mencione explicitamente "Etapa 1", "Etapa 2", etc. no texto final

Gere APENAS a copy adaptada, organizando em:
- GANCHO: (apenas o hook de quebra de padrão)
- CORPO: (etapas 2 a 7 integradas em parágrafos fluídos)
- CTA: (etapas 7 e 8 combinadas - CTA com benefício e fechamento de impacto)

Formato da resposta:
GANCHO: [texto do gancho]

CORPO: [texto do corpo com etapas 2-7 integradas]

CTA: [texto do CTA com etapas 7-8]`;

  const instructions = "Você é um especialista em copywriting estratégico que analisa copies de concorrentes e adapta estruturas de alta performance seguindo metodologias comprovadas.";
  
  try {
    const response = await generateWithOpenAI({ 
      prompt: prompt,
      instructions: instructions,
      model: "gpt-4.1",
      store: false
    });

    // Extrair gancho, corpo e CTA da resposta
    const lines = response.split('\n');
    let gancho = '';
    let corpo = '';
    let cta = '';
    let currentSection = null;

    lines.forEach(line => {
      if (line.toUpperCase().includes('GANCHO:')) {
        currentSection = 'gancho';
        gancho = line.replace(/GANCHO:\s*/i, '').trim();
      } else if (line.toUpperCase().includes('CORPO:')) {
        currentSection = 'corpo';
        corpo = line.replace(/CORPO:\s*/i, '').trim();
      } else if (line.toUpperCase().includes('CTA:')) {
        currentSection = 'cta';
        cta = line.replace(/CTA:\s*/i, '').trim();
      } else if (currentSection === 'gancho' && line.trim()) {
        gancho += ' ' + line.trim();
      } else if (currentSection === 'corpo' && line.trim()) {
        corpo += '\n\n' + line.trim();
      } else if (currentSection === 'cta' && line.trim()) {
        cta += ' ' + line.trim();
      }
    });

    return {
      gancho: gancho.trim() || 'Copy adaptada com sucesso',
      corpo: corpo.trim() || response,
      cta: cta.trim() || 'Clique aqui para garantir sua vaga'
    };
  } catch (error) {
    console.error('Erro ao gerar estrutura invisível:', error);
    throw error;
  }
}

export default openai;
