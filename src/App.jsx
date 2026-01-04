import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './services/supabaseClient';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CopyForm from './components/CopyForm';
import CopyResult from './components/CopyResult';
import Variations from './components/Variations';
import Footer from './components/Footer';
import Dashboard from './components/pages/Dashboard';
import Templates from './components/pages/Templates';
import Profile from './components/pages/Profile';
import History from './components/pages/History';
import { analiseEstrategica, gerarGancho, gerarCorpo, gerarCTA, ajustarParaDuracao } from './utils/copyGenerator';
import { useOpenAI } from './hooks/useOpenAI';

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showResult, setShowResult] = useState(false);
  const [showVariations, setShowVariations] = useState(false);
  const [copyData, setCopyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { gerarGancho: gerarGanchoIA, gerarCorpo: gerarCorpoIA, gerarCTA: gerarCTAIA } = useOpenAI();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (activeTab !== 'generator') {
      setShowResult(false);
      setShowVariations(false);
    }
  }, [activeTab]);

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
      const estrategia = analiseEstrategica(formData);
      let gancho, corpo, cta;
      
      try {
        gancho = await gerarGanchoIA(formData, estrategia);
        corpo = await gerarCorpoIA(formData, estrategia, gancho);
        cta = await gerarCTAIA(formData, estrategia);
      } catch (error) {
        gancho = gerarGancho(formData, estrategia);
        corpo = gerarCorpo(formData, estrategia);
        cta = gerarCTA(formData, estrategia);
      }
      
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
        geradoComIA: true
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
    setActiveTab('generator');
  };

  const handleVariacoes = () => {
    setShowVariations(!showVariations);
  };

  const handleCopiar = () => {
    if (!copyData) return;
    const texto = `GANCHO: ${copyData.gancho}\n\nCORPO: ${copyData.corpo}\n\nCTA: ${copyData.cta}`.trim();
    navigator.clipboard.writeText(texto).then(() => alert('Copy copiada!')).catch(() => alert('Erro ao copiar.'));
  };

  const handleExportar = () => window.print();

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'generator': return (
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <CopyForm onSubmit={handleGenerate} loading={loading} />
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="space-y-6">
              <CopyResult dados={copyData.dados} gancho={copyData.gancho} corpo={copyData.corpo} cta={copyData.cta} estrategia={copyData.estrategia} onVoltar={handleVoltar} onVariacoes={handleVariacoes} onCopiar={handleCopiar} onExportar={handleExportar} />
              {showVariations && <Variations dados={copyData.dados} onClose={() => setShowVariations(false)} />}
            </motion.div>
          )}
        </AnimatePresence>
      );
      case 'templates': return <Templates />;
      case 'history': return <History />;
      case 'profile': return <Profile user={user} />;
      default: return <Dashboard user={user} />;
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dashboard-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-dashboard-bg flex p-4 gap-6">
      <Sidebar user={user} onLogout={handleLogout} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full">
        <Header user={user} />
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {renderContent()}
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;
