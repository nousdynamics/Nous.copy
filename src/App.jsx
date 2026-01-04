import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './services/supabaseClient';
import Login from './components/Login';
import Header from './components/Header';
import CopyForm from './components/CopyForm';
import CopyResult from './components/CopyResult';
import Variations from './components/Variations';
import Footer from './components/Footer';
import { analiseEstrategica, gerarGancho, gerarCorpo, gerarCTA, ajustarParaDuracao } from './utils/copyGenerator';
import { useOpenAI } from './hooks/useOpenAI';

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [showVariations, setShowVariations] = useState(false);
  const [copyData, setCopyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { gerarGancho: gerarGanchoIA, gerarCorpo: gerarCorpoIA, gerarCTA: gerarCTAIA } = useOpenAI();

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    });

    // Ouvir mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleGenerate = async (formData) => {
    setLoading(true);
    
    try {
      // Análise estratégica
      const estrategia = analiseEstrategica(formData);
      
      let gancho, corpo, cta;
      
      // Verificar se deve usar IA
      if (formData.usarIA) {
        try {
          // Gerar com IA
          gancho = await gerarGanchoIA(formData, estrategia);
          corpo = await gerarCorpoIA(formData, estrategia, gancho);
          cta = await gerarCTAIA(formData, estrategia);
        } catch (error) {
          console.error('Erro ao gerar com IA, usando método padrão:', error);
          // Fallback para método padrão
          gancho = gerarGancho(formData, estrategia);
          corpo = gerarCorpo(formData, estrategia);
          cta = gerarCTA(formData, estrategia);
        }
      } else {
        // Gerar componentes com método padrão
        gancho = gerarGancho(formData, estrategia);
        corpo = gerarCorpo(formData, estrategia);
        cta = gerarCTA(formData, estrategia);
      }
      
      // Ajustar para duração se for vídeo
      if (formData.duracao) {
        const textoCompleto = gancho + ' ' + corpo + ' ' + cta;
        const palavrasCompletas = textoCompleto.trim().split(/\s+/).filter(p => p.length > 0).length;
        const tempoCompleto = (palavrasCompletas / 150) * 60;
        
        if (tempoCompleto > parseInt(formData.duracao)) {
          gancho = ajustarParaDuracao(gancho, parseInt(formData.duracao) * 0.1);
          corpo = ajustarParaDuracao(corpo, parseInt(formData.duracao) * 0.7);
          cta = ajustarParaDuracao(cta, parseInt(formData.duracao) * 0.2);
        }
      }
      
      setCopyData({
        dados: formData,
        estrategia,
        gancho,
        corpo,
        cta,
        geradoComIA: formData.usarIA
      });
      
      setShowResult(true);
      setShowVariations(false);
    } catch (error) {
      console.error('Erro ao gerar copy:', error);
      alert('Erro ao gerar copy. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    setShowResult(false);
    setShowVariations(false);
  };

  const handleVariacoes = () => {
    setShowVariations(!showVariations);
  };

  const handleCopiar = () => {
    if (!copyData) return;
    
    const texto = `
GANCHO: ${copyData.gancho}

CORPO: ${copyData.corpo}

CTA: ${copyData.cta}
    `.trim();
    
    navigator.clipboard.writeText(texto).then(() => {
      alert('Copy copiada para a área de transferência!');
    }).catch(() => {
      alert('Erro ao copiar. Tente selecionar o texto manualmente.');
    });
  };

  const handleExportar = () => {
    window.print();
  };

  // Mostrar loading enquanto verifica autenticação
  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Mostrar tela de login se não estiver autenticado
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header user={user} onLogout={handleLogout} />
        
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CopyForm onSubmit={handleGenerate} loading={loading} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CopyResult
                dados={copyData.dados}
                gancho={copyData.gancho}
                corpo={copyData.corpo}
                cta={copyData.cta}
                estrategia={copyData.estrategia}
                onVoltar={handleVoltar}
                onVariacoes={handleVariacoes}
                onCopiar={handleCopiar}
                onExportar={handleExportar}
              />
              
              {showVariations && (
                <Variations
                  dados={copyData.dados}
                  onClose={() => setShowVariations(false)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
