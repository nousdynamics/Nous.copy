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

export default openai;
