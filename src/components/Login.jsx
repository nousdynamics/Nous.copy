import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../services/supabaseClient';
import Logo from './Logo';

export default function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Cadastro
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          // Usuário criado com sucesso
          onLoginSuccess(data.user);
        }
      } else {
        // Login
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        if (data.user) {
          onLoginSuccess(data.user);
        }
      }
    } catch (err) {
      setError(err.message || 'Erro ao realizar autenticação');
      console.error('Erro de autenticação:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-darker">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-bg-card rounded-3xl p-8 shadow-2xl border border-border">
          {/* Logo/Título */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
            <img
            src="assets/LOGO NOUS COPY COMPLETA.png"
            alt="Nous Copy Logo"
            className="h-16 w-auto"
            />
            </div>
            <p className="text-text-secondary text-sm">
              Gerador de Copies de Elite
            </p>
          </motion.div>

          {/* Tabs Login/Cadastro */}
          <div className="flex gap-2 mb-6 bg-bg-input p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError(null);
              }}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                !isSignUp
                  ? 'bg-gradient-radial text-white shadow-lg'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError(null);
              }}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                isSignUp
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-bg-input border-2 border-border rounded-xl text-text-primary focus:outline-none focus:border-primary transition-colors"
                placeholder="seu@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-bg-input border-2 border-border rounded-xl text-text-primary focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full py-3.5 px-6 bg-gradient-radial text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isSignUp ? 'Criando conta...' : 'Entrando...'}
                </span>
              ) : (
                isSignUp ? 'Criar Conta' : 'Entrar'
              )}
            </motion.button>
          </form>

          {isSignUp && (
            <p className="mt-4 text-center text-xs text-text-muted">
              Ao cadastrar, você concorda com nossos termos de serviço
            </p>
          )}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-text-muted text-sm mt-6"
        >
          Versão 6.0 | Janeiro 2026
        </motion.p>
      </motion.div>
    </div>
  );
}
