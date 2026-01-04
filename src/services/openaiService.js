import OpenAI from "openai";

// Inicializar cliente OpenAI
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn('VITE_OPENAI_API_KEY não configurada. Funcionalidade de IA desabilitada.');
}

const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Necessário para uso no browser
}) : null;

/**
 * Gera uma copy usando OpenAI
 * @param {Object} params - Parâmetros para geração
 * @param {string} params.prompt - Prompt para a IA
 * @param {string} params.model - Modelo a ser usado (padrão: gpt-5-nano)
 * @param {boolean} params.store - Se deve armazenar a resposta
 * @returns {Promise<string>} Texto gerado pela IA
 */
export async function generateWithOpenAI({ prompt, model = "gpt-5-nano", store = true }) {
  if (!openai) {
    throw new Error('OpenAI API key não configurada. Configure VITE_OPENAI_API_KEY nas variáveis de ambiente.');
  }

  try {
    // Tentar usar a API customizada primeiro
    if (openai.responses && openai.responses.create) {
      const response = await openai.responses.create({
        model: model,
        input: prompt,
        store: store,
      });
      
      return response.output_text || response.text || response;
    }
    
    // Fallback para API padrão do OpenAI
    const completion = await openai.chat.completions.create({
      model: model, // Usar modelo selecionado
      messages: [
        {
          role: "system",
          content: "Você é um especialista em copywriting de alta performance. Gere copies persuasivas e emocionais que convertem."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });
    
    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Erro ao gerar com OpenAI:", error);
    
    // Se a API customizada falhar, tentar API padrão
    try {
      const completion = await openai.chat.completions.create({
        model: model === "gpt-4-turbo-preview" || model === "gpt-4" ? "gpt-3.5-turbo" : model,
        messages: [
          {
            role: "system",
            content: "Você é um especialista em copywriting de alta performance."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });
      
      return completion.choices[0]?.message?.content || "";
    } catch (fallbackError) {
      console.error("Erro no fallback:", fallbackError);
      throw new Error("Não foi possível gerar a copy com IA. Tente novamente.");
    }
  }
}

/**
 * Gera um gancho melhorado usando IA
 * @param {Object} dados - Dados do negócio e parâmetros
 * @param {Object} estrategia - Estratégia calculada
 * @returns {Promise<string>} Gancho gerado pela IA
 */
export async function gerarGanchoComIA(dados, estrategia) {
  const prompt = `Você é um copywriter de elite. Gere um GANCHO poderoso que:
- Capture a atenção em 3 segundos (máximo 15 palavras)
- Ative o gatilho psicológico: ${estrategia.pecado.nome} (${estrategia.pecado.gatilho})
- Seja específico e não genérico
- Crie curiosidade ou validação emocional

Contexto:
- Profissional: ${dados.nomeProfissional}
- Público-alvo: ${dados.publicoAlvo}
- Nível de consciência: ${estrategia.nivel.nome} - ${estrategia.nivel.abordagem}
- Premissa lógica: ${estrategia.premissa}

Gere APENAS o gancho, sem explicações adicionais.`;

  const model = dados.modeloIA || 'gpt-4-turbo-preview';
  return await generateWithOpenAI({ prompt, model });
}

/**
 * Gera um corpo melhorado usando IA
 * @param {Object} dados - Dados do negócio e parâmetros
 * @param {Object} estrategia - Estratégia calculada
 * @param {string} gancho - Gancho já gerado
 * @returns {Promise<string>} Corpo gerado pela IA
 */
export async function gerarCorpoComIA(dados, estrategia, gancho) {
  const prompt = `Você é um copywriter de elite. Gere o CORPO de uma copy que:
- Inicie com uma frase de TRANSIÇÃO conectando ao gancho: "${gancho}"
- Desenvolva a Premissa Lógica: ${estrategia.premissa}
- Integre a Autoridade do Especialista: ${dados.anosExperiencia} anos de experiência, ${dados.resultadosComprovados}
- Crie urgência ou esperança baseado no nível: ${estrategia.nivel.nome}

Contexto:
- Profissional: ${dados.nomeProfissional}
- Diferencial: ${dados.diferencialCompetitivo}
- Público-alvo: ${dados.publicoAlvo}
- Pecado Capital: ${estrategia.pecado.nome}
- Metodologia: ${dados.metodologia}

Gere APENAS o corpo, sem explicações adicionais.`;

  const model = dados.modeloIA || 'gpt-4-turbo-preview';
  return await generateWithOpenAI({ prompt, model });
}

/**
 * Gera um CTA melhorado usando IA
 * @param {Object} dados - Dados do negócio e parâmetros
 * @param {Object} estrategia - Estratégia calculada
 * @returns {Promise<string>} CTA gerado pela IA
 */
export async function gerarCTAComIA(dados, estrategia) {
  const prompt = `Você é um copywriter de elite. Gere um CTA (Chamada para Ação) que:
- Seja CLARO e DIRETO (máximo 2 frases)
- Crie urgência ou esperança
- Facilite a ação (não complique)
- Reforce o benefício final
- Ative o gatilho: ${estrategia.pecado.nome}

Contexto:
- Nível de consciência: ${estrategia.nivel.nome}
- Plataforma: ${dados.plataforma}

Gere APENAS o CTA, sem explicações adicionais.`;

  const model = dados.modeloIA || 'gpt-4-turbo-preview';
  return await generateWithOpenAI({ prompt, model });
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

  try {
    const response = await generateWithOpenAI({ 
      prompt, 
      model: "gpt-4-turbo-preview" 
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
