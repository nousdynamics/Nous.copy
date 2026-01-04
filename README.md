# Nous.Copy - Gerador de Copies de Elite

**Versão:** 6.0  
**Data:** Janeiro 2026  
**Objetivo:** Sistema completo para gerar copies de alta performance para Meta Ads, Google Ads e Instagram Reels, seguindo metodologias de elite e gatilhos psicológicos profundos.

---

## 📋 Sobre o Projeto

O Nous.Copy é uma aplicação web que combina as metodologias de grandes mestres do mercado (Leandro Ladeira, Stefan Georgi, Gary Halbert, Eugene Schwartz) com gatilhos psicológicos profundos baseados nos **7 Pecados Capitais**.

### Características Principais

- ✅ **Validação Completa de Parâmetros**: Garante que todos os dados necessários sejam fornecidos
- ✅ **Análise Estratégica Automática**: Identifica pontos de dor e premissas lógicas
- ✅ **Geração Inteligente**: Cria ganchos, corpos e CTAs coesos e poderosos
- ✅ **Otimização Técnica**: Ajusta automaticamente para durações e limites de caracteres
- ✅ **Múltiplos Formatos**: Suporta vídeo, imagem e Google Ads
- ✅ **Sistema A/B**: Gera variações para testes
- ✅ **Interface Moderna**: Design responsivo e intuitivo

---

## 🚀 Como Usar

### 1. Instalação

```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### 3. Build para Produção

```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist`.

### 2. Preencher os Parâmetros

#### Dados do Negócio (OBRIGATÓRIO)
- **Nome/Especialidade do Profissional**: Ex: "Dr. João Silva - Pediatra"
- **Anos de Experiência**: Ex: "15"
- **Resultados Comprovados**: Ex: "400+ pacientes curados"
- **Diferencial Competitivo**: Ex: "Protocolo exclusivo baseado em evidências"
- **Público-alvo Principal**: Ex: "Mães com filhos com APLV"

#### Nível de Consciência da Audiência (OBRIGATÓRIO)
Selecione um dos 5 níveis:

| Nível | Descrição | Abordagem |
|-------|-----------|-----------|
| **Inconsciente** | Não sabe que tem o problema | Educação + Despertar |
| **Consciente do Problema** | Sabe que tem o problema, mas não a solução | Validação + Esperança |
| **Consciente da Solução** | Sabe que existe solução, mas não a sua | Diferenciação |
| **Consciente do Produto** | Conhece você ou seu produto | Objeção + Prova |
| **Totalmente Consciente** | Já decidiu, só precisa do CTA | Urgência + Facilidade |

#### Gatilho Psicológico - Pecado Capital (OBRIGATÓRIO)
Selecione um dos 7 Pecados Capitais:

| Pecado | Gatilho | Aplicação |
|--------|---------|-----------|
| **Gula** | Desejo insaciável | "Você quer mais, sempre mais" |
| **Avareza** | Medo da perda financeira | "Quanto custa sua incerteza?" |
| **Luxúria** | Desejo por prazer/conforto | "Imagine a vida sem essa dor" |
| **Inveja** | Comparação social | "O que os outros fazem que você não faz?" |
| **Ira** | Frustração/Indignação | "Você tem todo o direito de estar com raiva" |
| **Preguiça** | Busca por atalho/facilidade | "Sem complicações, sem espera" |
| **Soberba** | Status/Exclusividade | "Apenas os melhores conseguem" |

#### Metodologia Raiz (OBRIGATÓRIO)
Selecione uma das 4 metodologias:

| Metodologia | Autor | Estrutura |
|-------------|-------|-----------|
| **Light Copy** | Leandro Ladeira | Premissa Lógica + Gancho Emocional + CTA |
| **RMBC** | Stefan Georgi | Resultado + Mecanismo + Benefício + CTA |
| **Resposta Direta** | Gary Halbert | Gancho Forte + Premissa + Prova + CTA |
| **5 Níveis** | Eugene Schwartz | Educação Progressiva + Objeção + CTA |

#### Plataforma e Formato (OBRIGATÓRIO)
- **Meta Ads - Vídeo/Reels**: Duração 15s, 30s, 60s, 90s
- **Meta Ads - Imagem/Estático**: Densidade Minimalista, Informativo, Carrossel
- **Google Ads - Pesquisa**: Headline (30 caracteres) + Descrição (90 caracteres)
- **Google Ads - Vídeo**: Duração 15s, 30s, 60s
- **Google Ads - Display**: Imagem + Headline + Descrição
- **Instagram - Reels**: Duração 15s, 30s, 60s

#### Especificações Técnicas (CONDICIONAL)
Dependendo do formato selecionado, você precisará informar:
- **Vídeo**: Duração alvo (15s, 30s, 60s, 90s)
- **Imagem**: Nível de texto (Minimalista, Informativo, Carrossel)
- **Google Ads Pesquisa**: URL final

### 3. Gerar a Copy

Clique em **"Gerar Copy"** e o sistema irá:
1. Validar todos os parâmetros
2. Realizar análise estratégica
3. Gerar gancho, corpo e CTA
4. Otimizar para o formato selecionado
5. Exibir o resultado formatado

### 4. Funcionalidades Adicionais

- **Gerar Variações A/B**: Cria variações com diferentes Pecados Capitais
- **Copiar Copy**: Copia o texto para a área de transferência
- **Exportar PDF**: Imprime ou salva como PDF

---

## 📁 Estrutura do Projeto

```
Nous.Copy/
│
├── index.html          # Interface principal
├── styles.css          # Estilos e design
├── script.js           # Lógica de geração de copies
└── README.md           # Documentação
```

---

## 🎯 Metodologias Implementadas

### Light Copy (Leandro Ladeira)
- Premissa Lógica clara
- Gancho Emocional poderoso
- CTA direto e objetivo

### RMBC (Stefan Georgi)
- Resultado prometido
- Mecanismo explicado
- Benefício destacado
- CTA final

### Resposta Direta (Gary Halbert)
- Gancho forte e imediato
- Premissa convincente
- Prova social integrada
- CTA urgente

### 5 Níveis (Eugene Schwartz)
- Educação progressiva
- Objeções tratadas
- CTA facilitado

---

## 🧠 Gatilhos Psicológicos

Cada Pecado Capital ativa uma emoção específica:

1. **Gula**: Desejo insaciável por mais
2. **Avareza**: Medo de perder dinheiro/recursos
3. **Luxúria**: Busca por prazer e conforto
4. **Inveja**: Comparação social e competição
5. **Ira**: Frustração e indignação
6. **Preguiça**: Busca por facilidade e atalhos
7. **Soberba**: Status e exclusividade

---

## 📊 Formatos de Saída

### Vídeo (Meta Ads / Instagram Reels)
- Roteiro completo com timing
- Contagem de palavras
- Estimativa de tempo de fala
- Sugestões de ação visual

### Imagem (Meta Ads / Google Ads Display)
- Sugestão de arte
- Headline otimizada
- Legenda de suporte
- CTA claro

### Google Ads Pesquisa
- Headlines (30 caracteres cada)
- Descrição (90 caracteres)
- URL final

---

## ⚙️ Regras Técnicas

### Vídeos
- Velocidade de fala: 150 palavras por minuto
- Ajuste automático para duração alvo
- Divisão em 3 atos: Gancho | Corpo | CTA

### Imagens
- **Minimalista**: Máximo 5 palavras na arte
- **Informativo**: Máximo 3 bullet points
- **Carrossel**: Texto distribuído em slides

### Google Ads
- Headline: Máximo 30 caracteres
- Descrição: Máximo 90 caracteres
- Validação automática de limites

---

## 🔄 Fluxo de Trabalho

```
1. Usuário preenche parâmetros
   ↓
2. Sistema valida todos os campos
   ↓
3. Análise estratégica automática
   ↓
4. Geração de gancho, corpo e CTA
   ↓
5. Otimização técnica (tempo/caracteres)
   ↓
6. Validação final
   ↓
7. Exibição do resultado formatado
```

---

## 💡 Dicas de Uso

1. **Seja Específico**: Quanto mais detalhados os dados do negócio, melhor a copy
2. **Teste Diferentes Pecados**: Use variações A/B para encontrar o melhor gatilho
3. **Ajuste o Nível de Consciência**: Considere onde seu público está na jornada
4. **Revise a Premissa**: A premissa lógica é o coração da copy
5. **Valide o Tempo**: Para vídeos, sempre verifique se o tempo está adequado

---

## 🎨 Personalização

O sistema pode ser facilmente personalizado editando:

- **Gatilhos Psicológicos**: `script.js` → `PECADOS_CAPITAIS`
- **Metodologias**: `script.js` → `METODOLOGIAS`
- **Estilos**: `styles.css` → Variáveis CSS
- **Interface**: `index.html` → Estrutura HTML

---

## 📝 Exemplo de Uso

### Entrada:
- **Profissional**: Dr. João Silva - Pediatra
- **Experiência**: 15 anos
- **Resultados**: 400+ pacientes curados de APLV
- **Diferencial**: Protocolo exclusivo baseado em evidências
- **Público**: Mães com filhos com APLV
- **Consciência**: Consciente do Problema
- **Pecado**: Ira
- **Metodologia**: Light Copy
- **Plataforma**: Meta Ads - Vídeo (30s)

### Saída:
- Roteiro completo com timing
- Gancho ativando Ira
- Corpo com premissa lógica e autoridade
- CTA transformando frustração em ação
- Contagem de palavras e tempo de fala

---

## 🚧 Melhorias Futuras

- [ ] Integração com API de IA para geração mais avançada
- [ ] Histórico de copies geradas
- [ ] Exportação em múltiplos formatos (Word, PDF, JSON)
- [ ] Análise de performance de copies
- [ ] Biblioteca de templates
- [ ] Modo escuro/claro
- [ ] Suporte a múltiplos idiomas

---

## 📄 Licença

Este projeto é uma implementação do Meta Prompt CopyAgent Pro v6.0 para uso educacional e comercial.

---

## 👨‍💻 Desenvolvido com

- HTML5
- CSS3 (Grid, Flexbox, Variáveis CSS)
- JavaScript (ES6+)
- Metodologias de Copywriting de Elite

---

**Nous.Copy** - Gerando copies que convertem através de psicologia e estratégia.
