# Integração OpenAI - Nous.Copy

## 📋 Sobre a Integração

O Nous.Copy agora possui integração com OpenAI para gerar copies ainda mais personalizadas e otimizadas usando Inteligência Artificial.

## 🚀 Como Usar

### 1. Ativação da IA

No formulário de geração de copies, você encontrará uma opção no final:

```
☑ Usar Inteligência Artificial para melhorar a copy (OpenAI)
```

Marque esta opção antes de clicar em "Gerar Copy" para usar a IA.

### 2. Funcionamento

Quando a opção de IA está ativada:

1. **Gancho**: A IA gera um gancho personalizado baseado nos seus parâmetros
2. **Corpo**: O corpo é gerado considerando o gancho e todos os contextos
3. **CTA**: A chamada para ação é otimizada para o seu público e plataforma

### 3. Fallback Automático

Se houver algum erro na API da OpenAI, o sistema automaticamente:
- Usa o método padrão de geração (sem IA)
- Exibe a copy normalmente
- Registra o erro no console para debug

## 🔧 Configuração

### Variável de Ambiente (Opcional)

Para maior segurança, você pode criar um arquivo `.env.local` na raiz do projeto:

```env
VITE_OPENAI_API_KEY=sua_chave_aqui
```

Se não configurar, o sistema usará a chave padrão do código.

## 📊 Diferenças entre Métodos

### Método Padrão (Sem IA)
- ✅ Rápido e instantâneo
- ✅ Sem custos de API
- ✅ Funciona offline
- ⚠️ Copies mais genéricas

### Método com IA
- ✅ Copies mais personalizadas
- ✅ Melhor adaptação ao contexto
- ✅ Otimização para cada público
- ⚠️ Requer conexão com internet
- ⚠️ Pode ter custos de API (dependendo do plano)

## 🎯 Quando Usar Cada Método

### Use IA quando:
- Você quer copies mais criativas e únicas
- Precisa de adaptação específica para seu público
- Quer testar diferentes abordagens
- Tem um orçamento para APIs

### Use Método Padrão quando:
- Precisa de velocidade
- Está sem internet
- Quer economizar custos
- As copies padrão já atendem suas necessidades

## 🔒 Segurança

⚠️ **IMPORTANTE**: A chave da API está exposta no código do cliente. Para produção, considere:

1. Criar um backend proxy para a API
2. Usar variáveis de ambiente
3. Implementar rate limiting
4. Monitorar uso da API

## 🐛 Troubleshooting

### Erro: "Não foi possível gerar a copy com IA"

**Soluções:**
1. Verifique sua conexão com a internet
2. Confirme que a chave da API está válida
3. Verifique os logs do console para mais detalhes
4. Tente novamente após alguns segundos

### A IA está demorando muito

Isso é normal! A geração com IA pode levar 5-15 segundos dependendo da complexidade. O botão mostrará "Gerando com IA..." durante o processo.

### A copy gerada não está boa

1. Tente ajustar os parâmetros do formulário
2. Seja mais específico nos dados do negócio
3. Experimente diferentes Pecados Capitais
4. Use o método padrão como comparação

## 📝 Exemplo de Uso

```javascript
// No componente, a IA é chamada automaticamente quando:
formData.usarIA === true

// O sistema gera:
1. Gancho personalizado com IA
2. Corpo conectado ao gancho
3. CTA otimizado
```

## 🔄 Próximas Melhorias

- [ ] Cache de copies geradas
- [ ] Histórico de gerações com IA
- [ ] Comparação lado a lado (com/sem IA)
- [ ] Ajuste fino de parâmetros da IA
- [ ] Suporte a múltiplos modelos
- [ ] Backend proxy para segurança

---

**Nota**: Esta integração está em constante evolução. Sugestões e feedback são bem-vindos!
