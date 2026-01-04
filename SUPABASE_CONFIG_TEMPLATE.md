# Configuração do Supabase - Template

## 📋 Credenciais Necessárias

Para atualizar as credenciais do Supabase após a atualização do MCP, você precisa das seguintes informações:

1. **URL do Projeto Supabase**: `https://seu-projeto.supabase.co`
2. **Chave Anônima (anon key)**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 🔧 Como Obter as Credenciais

1. Acesse o painel do Supabase: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** > **API**
4. Copie:
   - **Project URL** (será sua `VITE_SUPABASE_URL`)
   - **anon public** key (será sua `VITE_SUPABASE_ANON_KEY`)

## 📝 Atualização dos Arquivos

Após obter as novas credenciais, atualize:

### 1. Arquivo `.env` (se existir) ou crie um novo:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

### 2. Arquivo `src/services/supabaseClient.js`

As credenciais também são usadas como fallback no código. Atualize os valores padrão se necessário.

### 3. Arquivo `ENV_SETUP.md`

Atualize a documentação com as novas credenciais.

## ⚠️ Importante

- NUNCA commite o arquivo `.env` no Git (já está no .gitignore)
- Use variáveis de ambiente no Vercel/Produção
- As credenciais são sensíveis - mantenha-as seguras
