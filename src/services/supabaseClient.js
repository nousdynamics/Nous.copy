import { createClient } from '@supabase/supabase-js'

// ============================================
// CONFIGURAÇÃO DO SUPABASE
// ============================================
// Para atualizar as credenciais após atualização do MCP:
// 1. Obtenha as novas credenciais no painel do Supabase (Settings > API)
// 2. Atualize as variáveis de ambiente no arquivo .env
// 3. Ou atualize os valores padrão abaixo (não recomendado para produção)
// ============================================

// Valores padrão (serão substituídos pelas variáveis de ambiente se definidas)
const DEFAULT_SUPABASE_URL = 'https://errbnfjpfqoypveyvaxj.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_QZ0ccOermmDNDHAopDMP5A_W5kLO71G'

// Obter credenciais das variáveis de ambiente ou usar valores padrão
// Aceita tanto VITE_SUPABASE_ANON_KEY quanto VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                        import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 
                        DEFAULT_SUPABASE_ANON_KEY

// Validação básica
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Erro: Credenciais do Supabase não configuradas!')
  console.error('Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nas variáveis de ambiente.')
}

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Log para debug (apenas em desenvolvimento)
if (import.meta.env.DEV) {
  console.log('✅ Cliente Supabase inicializado:', {
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey
  })
}
