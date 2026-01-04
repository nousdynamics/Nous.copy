# Configuração do Arquivo .env

⚠️ **IMPORTANTE**: Você precisa criar um arquivo `.env` na raiz do projeto para a ferramenta funcionar!

## Como criar o arquivo .env

1. Na raiz do projeto (mesma pasta onde está o `package.json`), crie um arquivo chamado `.env`

2. Adicione as seguintes linhas no arquivo:

```env
# Configuração do Supabase
VITE_SUPABASE_URL=https://errbnfjpfqoypveyvaxj.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_QZ0ccOermmDNDHAopDMP5A_W5kLO71G

# Configuração da OpenAI (OBRIGATÓRIO para gerar copies)
# Obtenha sua chave em: https://platform.openai.com/api-keys
VITE_OPENAI_API_KEY=sk-sua_chave_aqui
```

## Como obter a chave da OpenAI

1. Acesse: https://platform.openai.com/api-keys
2. Faça login na sua conta OpenAI
3. Clique em "Create new secret key"
4. Copie a chave (ela começa com `sk-`)
5. Cole no arquivo `.env` no lugar de `sk-sua_chave_aqui`

## Após configurar

1. **Reinicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

2. A ferramenta agora usará a API do GPT para gerar todas as copies!

## Verificação

Se tudo estiver configurado corretamente:
- O console do navegador NÃO mostrará erros sobre a API key
- As copies serão geradas usando inteligência artificial
- Você verá mensagens de loading enquanto a IA processa
