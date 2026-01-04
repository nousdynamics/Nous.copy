# Nous.Copy - Gerador de Copies de Elite

**Versão:** 6.0  
**Data:** Janeiro 2026  
**Stack:** React + Vite + Tailwind CSS + Supabase

Sistema completo para gerar copies de alta performance para Meta Ads, Google Ads e Instagram Reels, seguindo metodologias de elite e gatilhos psicológicos profundos.

---

## 📋 Sobre o Projeto

O Nous.Copy é uma aplicação web que combina as metodologias de grandes mestres do mercado (Leandro Ladeira, Stefan Georgi, Gary Halbert, Eugene Schwartz) com gatilhos psicológicos profundos baseados nos **7 Pecados Capitais**.

### Características Principais

- ✅ **Sistema de Templates**: Templates do sistema e templates personalizados do usuário
- ✅ **Formulário Dinâmico**: Renderização dinâmica baseada em templates
- ✅ **Integração OpenAI**: Geração de copies com Inteligência Artificial
- ✅ **Validação Completa**: Garante que todos os campos obrigatórios sejam preenchidos
- ✅ **Análise Estratégica**: Identifica pontos de dor e premissas lógicas
- ✅ **Múltiplos Formatos**: Suporta VSL, anúncios Meta Ads, sequências de e-mails
- ✅ **Interface Moderna**: Design responsivo e intuitivo
- ✅ **Autenticação**: Sistema de login com Supabase

---

## 🚀 Início Rápido

### 1. Instalação

```bash
npm install
```

### 2. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui

# OpenAI Configuration (OBRIGATÓRIO para gerar copies)
VITE_OPENAI_API_KEY=sua_chave_openai_aqui
```

**Para obter as credenciais do Supabase:**
1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** > **API**
4. Copie a **Project URL** e a **anon public** key

### 3. Criar Tabela no Supabase

Execute o seguinte SQL no SQL Editor do Supabase:

```sql
CREATE TABLE user_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  base_template_id TEXT NOT NULL,
  valores_predefinidos JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_templates_user_id ON user_templates(user_id);

ALTER TABLE user_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own templates"
  ON user_templates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own templates"
  ON user_templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
  ON user_templates FOR DELETE
  USING (auth.uid() = user_id);
```

### 4. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### 5. Build para Produção

```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist`.

---

## 📁 Estrutura do Projeto

```
Nous.Copy/
├── src/
│   ├── components/          # Componentes React
│   │   ├── pages/          # Páginas da aplicação
│   │   └── ...
│   ├── hooks/              # Hooks customizados
│   ├── services/           # Serviços (Supabase, OpenAI)
│   ├── utils/              # Utilitários e helpers
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globais
├── public/                 # Arquivos estáticos
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🎯 Sistema de Templates

### Templates do Sistema

Templates pré-configurados que alteram a estrutura do formulário:

- **VSL de Alta Conversão**: Para vídeos de vendas usando metodologia RMBC
- **Anúncio Meta Ads Direto**: Copy focada em cliques imediatos
- **Sequência de Aquecimento (3 E-mails)**: Para preparar audiência antes de oferta

### Templates do Usuário

Templates personalizados que:
- Pré-preenchem valores padrão
- Podem travar campos para impedir edição
- Marcam campos como obrigatórios

### Como Usar Templates

1. **Usar Template do Sistema**: Vá em "Templates" → "Templates do Sistema" → Clique em "Usar Template"
2. **Criar Meu Template**: Preencha o formulário → Clique em "Salvar como Meu Template" → Configure os campos
3. **Usar Meu Template**: Vá em "Templates" → "Meus Templates" → Clique em "Usar"

---

## 🤖 Integração OpenAI

O Nous.Copy utiliza **OBRIGATORIAMENTE** a API do OpenAI para gerar todas as copies. Não há método fallback - todas as copies são geradas usando inteligência artificial.

### Como Usar

1. Obtenha sua chave da API OpenAI em: https://platform.openai.com/api-keys
2. Adicione no arquivo `.env`: `VITE_OPENAI_API_KEY=sk-sua_chave_aqui`
3. Reinicie o servidor de desenvolvimento
4. Todas as copies serão geradas usando GPT!

### Configuração

Adicione sua chave da OpenAI no arquivo `.env`:

```env
VITE_OPENAI_API_KEY=sk-...
```

⚠️ **Nota**: Para produção, considere criar um backend proxy para proteger sua chave da API.

---

## 🔧 Configuração do Supabase

### Atualizar Credenciais

1. Obtenha as novas credenciais no painel do Supabase
2. Atualize o arquivo `.env`
3. (Opcional) Atualize os valores padrão em `src/services/supabaseClient.js`
4. Reinicie o servidor

---

## 📊 Metodologias Implementadas

- **Light Copy (Leandro Ladeira)**: Premissa Lógica + Gancho Emocional + CTA
- **RMBC (Stefan Georgi)**: Resultado + Mecanismo + Benefício + CTA
- **Resposta Direta (Gary Halbert)**: Gancho Forte + Premissa + Prova + CTA
- **5 Níveis (Eugene Schwartz)**: Educação Progressiva + Objeção + CTA

---

## 🧠 Gatilhos Psicológicos (7 Pecados Capitais)

1. **Gula**: Desejo insaciável por mais
2. **Avareza**: Medo de perder dinheiro/recursos
3. **Luxúria**: Busca por prazer e conforto
4. **Inveja**: Comparação social e competição
5. **Ira**: Frustração e indignação
6. **Preguiça**: Busca por facilidade e atalhos
7. **Soberba**: Status e exclusividade

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "Port already in use"
```bash
npx kill-port 5173
```

### Página em branco
1. Abra o Console do navegador (F12)
2. Verifique se há erros
3. Verifique se o servidor está rodando
4. Limpe o cache do navegador (Ctrl + Shift + Delete)

### Erro ao carregar templates do usuário
Verifique se a tabela `user_templates` foi criada no Supabase e se as políticas RLS estão configuradas corretamente.

---

## 🚧 Melhorias Futuras

- [ ] Histórico de copies geradas
- [ ] Exportação em múltiplos formatos (Word, PDF, JSON)
- [ ] Análise de performance de copies
- [ ] Edição de templates do usuário
- [ ] Compartilhamento de templates
- [ ] Suporte a múltiplos idiomas

---

## 📄 Licença

Este projeto é uma implementação do Meta Prompt CopyAgent Pro v6.0 para uso educacional e comercial.

---

## 👨‍💻 Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animações
- **Supabase** - Backend (Auth + Database)
- **OpenAI API** - Geração de conteúdo com IA
- **Lucide React** - Ícones

---

**Nous.Copy** - Gerando copies que convertem através de psicologia e estratégia.
