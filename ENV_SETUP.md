# Configuração de Variáveis de Ambiente

## Variáveis Necessárias

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://errbnfjpfqoypveyvaxj.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_QZ0ccOermmDNDHAopDMP5A_W5kLO71G
# Ou use VITE_SUPABASE_ANON_KEY (ambos funcionam)
# VITE_SUPABASE_ANON_KEY=sb_publishable_QZ0ccOermmDNDHAopDMP5A_W5kLO71G

# OpenAI Configuration (Opcional)
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## Para Vercel

Configure estas variáveis no painel do Vercel:
1. Vá para Settings > Environment Variables
2. Adicione as variáveis acima
