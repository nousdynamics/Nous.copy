# 🔄 Atualizar Credenciais do Supabase

## Passos para Atualizar Após Reinstalação do MCP

### 1. Obter Novas Credenciais

Você pode obter as credenciais de duas formas:

#### Opção A: Via Painel do Supabase
1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** > **API**
4. Copie:
   - **Project URL**
   - **anon public** key

#### Opção B: Fornecer as Credenciais Aqui
Se você tem as novas credenciais, posso atualizar automaticamente. Informe:
- URL do projeto Supabase
- Chave anônima (anon key)

### 2. Atualizar Arquivo `.env`

Crie ou atualize o arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-novo-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_nova_chave_anon_aqui
```

### 3. Atualizar Valores Padrão (Opcional)

Se quiser atualizar os valores padrão no código (não recomendado para produção), edite:
- `src/services/supabaseClient.js` - Atualize `DEFAULT_SUPABASE_URL` e `DEFAULT_SUPABASE_ANON_KEY`

### 4. Reiniciar o Servidor

Após atualizar as credenciais:

```bash
# Parar o servidor (Ctrl + C)
npm run dev
```

### 5. Testar a Conexão

A aplicação deve funcionar normalmente. Se houver erros, verifique:
- ✅ Credenciais corretas
- ✅ Arquivo .env na raiz do projeto
- ✅ Servidor reiniciado
- ✅ Console do navegador para mensagens de erro

## ⚠️ Importante

- O arquivo `.env` está no `.gitignore` e não será commitado
- Para produção (Vercel), configure as variáveis no painel do Vercel
- Nunca exponha as credenciais no código público
