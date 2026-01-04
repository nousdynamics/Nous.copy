# Configuração de Variáveis de Ambiente

## Variáveis Necessárias

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://tdfvkgytyaltjdlssuiy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZnZrZ3l0eWFsdGpkbHNzdWl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk3MTcsImV4cCI6MjA4MjM1NTcxN30.TP15-jAMDb7tAr4ikQcP9AYBvB7RdvB12lZxvyCMR2E

# OpenAI Configuration (Opcional)
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## Para Vercel

Configure estas variáveis no painel do Vercel:
1. Vá para Settings > Environment Variables
2. Adicione as variáveis acima
