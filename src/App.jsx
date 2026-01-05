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
import AgentsSelection from './components/pages/AgentsSelection';
import AgentCopyForm from './components/AgentCopyForm';
import { analiseEstrategica, gerarGancho, gerarCorpo, gerarCTA, ajustarParaDuracao } from './utils/copyGenerator';
import { useOpenAI } from './hooks/useOpenAI';
import { useTemplate } from './hooks/useTemplate';

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showResult, setShowResult] = useState(false);
  const [showVariations, setShowVariations] = useState(false);
  const [copyData, setCopyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prefilledData, setPrefilledData] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const { gerarGancho: gerarGanchoIA, gerarCorpo: gerarCorpoIA, gerarCTA: gerarCTAIA } = useOpenAI();
  const templateManager = useTemplate();

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

  const handleUseTemplate = (templateData, isSystemTemplate = false, templateId = null, userTemplateData = null) => {
    if (isSystemTemplate && templateId) {
      // Aplicar template do sistema
      const newFormData = templateManager.applySystemTemplateId(templateId, prefilledData || {});
      setPrefilledData(newFormData);
    } else if (userTemplateData) {
      // Aplicar template do usuário
      const newFormData = templateManager.applyUserTemplate(userTemplateData, prefilledData || {});
      setPrefilledData(newFormData);
    } else {
      // Template simples (compatibilidade com código antigo)
      setPrefilledData(templateData);
    }
    setActiveTab('generator');
    setShowResult(false);
  };

  const handleGenerate = async (formData, showLoading = true, agentId = null) => {
    if (showLoading) {
      setLoading(true);
    }
    try {
      // Verificar se é o agente de Estrutura Invisível
      if (agentId === 'estrutura_invisivel' || formData.copy_concorrente) {
        const { gerarEstruturaInvisivelComIA } = await import('./services/openaiService');
        let result;
        try {
          result = await gerarEstruturaInvisivelComIA(formData);
        } catch (error) {
          console.error('Erro ao gerar estrutura invisível com IA:', error);
          // Não usar fallback - propagar o erro
          throw error;
        }
        
        // Criar estratégia mínima válida para estrutura invisível
        const estrategiaInvisivel = {
          tipo: 'estrutura_invisivel',
          pontoDor: '',
          premissa: 'Análise e adaptação da estrutura do concorrente',
          pecado: {
            nome: 'Persuasão Estratégica',
            gatilho: 'Estrutura comprovada adaptada para seu negócio'
          },
          nivel: {
            nome: 'Consciente da Oportunidade',
            abordagem: 'Aplicar estrutura testada e validada'
          }
        };
        
        const copyResult = {
          dados: formData,
          estrategia: estrategiaInvisivel,
          gancho: result.gancho,
          corpo: result.corpo,
          cta: result.cta,
          geradoComIA: true
        };
        
        if (showLoading) {
          setCopyData(copyResult);
          setShowResult(true);
          setShowVariations(false);
          setPrefilledData(null);
          
          // Salvar no histórico
          if (user) {
            try {
              const title = 'Estrutura Invisível - Copy adaptada';
              const platform = 'estrutura_invisivel';
              const method = 'Estrutura Invisível';
              
              const { error: historyError } = await supabase
                .from('copy_history')
                .insert([{
                  user_id: user.id,
                  title: title,
                  form_data: formData,
                  gancho: result.gancho,
                  corpo: result.corpo,
                  cta: result.cta,
                  estrategia: copyResult.estrategia,
                  platform: platform,
                  method: method
                }]);
              
              if (historyError) {
                console.error('Erro ao salvar no histórico:', historyError);
              }
            } catch (historyErr) {
              console.error('Erro ao salvar histórico:', historyErr);
            }
          }
        }
        
        return copyResult;
      }

      // Lógica normal para outros agentes - SEMPRE usar IA
      const estrategia = analiseEstrategica(formData);
      let gancho, corpo, cta;
      
      // Sempre tentar usar IA primeiro
      try {
        gancho = await gerarGanchoIA(formData, estrategia);
        corpo = await gerarCorpoIA(formData, estrategia, gancho);
        cta = await gerarCTAIA(formData, estrategia);
      } catch (error) {
        console.error('Erro ao gerar copy com IA:', error);
        // Não usar fallback - mostrar erro claro para o usuário
        const errorMessage = error.message || 'Erro desconhecido ao gerar copy';
        throw new Error(`Erro ao gerar copy: ${errorMessage}`);
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
      
      const copyResult = {
        dados: formData,
        estrategia,
        gancho,
        corpo,
        cta,
        geradoComIA: true
      };
      
      // Se showLoading, atualizar estado para modo antigo (compatibilidade)
      if (showLoading) {
        setCopyData(copyResult);
        setShowResult(true);
        setShowVariations(false);
        setPrefilledData(null);
        
        // Salvar no histórico
        if (user) {
          try {
            const title = formData.oferta_nome || formData.negocio_nome || formData.profissional_nome || 'Copy gerada';
            const platform = formData.canal_principal || 'Não especificado';
            const method = formData.metodologia_base || 'Não especificado';
            
            const { error: historyError } = await supabase
              .from('copy_history')
              .insert([{
                user_id: user.id,
                title: title,
                form_data: formData,
                gancho: gancho,
                corpo: corpo,
                cta: cta,
                estrategia: estrategia,
                platform: platform,
                method: method
              }]);
            
            if (historyError) {
              console.error('Erro ao salvar no histórico:', historyError);
            }
          } catch (historyErr) {
            console.error('Erro ao salvar histórico:', historyErr);
          }
        }
      }
      
      // Retornar o resultado para permitir múltiplas gerações
      return copyResult;
    } catch (error) {
      console.error('Erro ao gerar copy:', error);
      if (showLoading) {
        // Mensagem de erro mais detalhada
        const errorMessage = error.message || 'Erro desconhecido';
        if (errorMessage.includes('API key')) {
          alert('❌ Erro de Configuração:\n\nA chave da API OpenAI não está configurada ou é inválida.\n\nPor favor:\n1. Crie um arquivo .env na raiz do projeto\n2. Adicione: VITE_OPENAI_API_KEY=sua_chave_aqui\n3. Reinicie o servidor de desenvolvimento');
        } else if (errorMessage.includes('rate limit')) {
          alert('⚠️ Limite de Requisições:\n\nVocê excedeu o limite de requisições da API OpenAI.\n\nAguarde alguns minutos e tente novamente.');
        } else if (errorMessage.includes('quota')) {
          alert('💳 Cota Esgotada:\n\nSua cota da API OpenAI foi esgotada.\n\nVerifique seu saldo na conta da OpenAI.');
        } else {
          alert(`❌ Erro ao gerar copy:\n\n${errorMessage}\n\nVerifique sua conexão com a internet e tente novamente.`);
        }
      }
      throw error;
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const handleVoltar = () => {
    setShowResult(false);
    setShowVariations(false);
    setSelectedAgent(null);
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
              {selectedAgent ? (
                <AgentCopyForm
                  agent={selectedAgent}
                  onSubmit={async (formData, showLoading, agentId) => {
                    return await handleGenerate(formData, showLoading, agentId);
                  }}
                  loading={loading}
                  onBack={() => setSelectedAgent(null)}
                  user={user}
                  supabaseClient={supabase}
                  onSaveAsTemplate={async (templateData) => {
                    if (!user) {
                      alert('Você precisa estar logado para criar templates');
                      return;
                    }
                    try {
                      const { error } = await supabase
                        .from('user_templates')
                        .insert([{
                          user_id: user.id,
                          nome: templateData.nome,
                          descricao: templateData.descricao,
                          base_template_id: templateData.base_template_id,
                          valores_predefinidos: templateData.valores_predefinidos
                        }]);
                      if (error) throw error;
                      alert('Template criado com sucesso!');
                    } catch (error) {
                      console.error('Erro ao criar template:', error);
                      alert('Erro ao criar template. Verifique se a tabela user_templates existe no Supabase.');
                    }
                  }}
                />
              ) : (
                <AgentsSelection 
                  onSelectAgent={(agent) => {
                    setSelectedAgent(agent);
                    setShowResult(false);
                  }}
                />
              )}
            </motion.div>
          ) : (
            copyData ? (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="space-y-6">
                <CopyResult dados={copyData.dados || {}} gancho={copyData.gancho} corpo={copyData.corpo} cta={copyData.cta} estrategia={copyData.estrategia} onVoltar={handleVoltar} onVariacoes={handleVariacoes} onCopiar={handleCopiar} onExportar={handleExportar} />
                {showVariations && <Variations dados={copyData.dados || {}} onClose={() => setShowVariations(false)} />}
              </motion.div>
            ) : (
              <motion.div key="result-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-card p-8 text-center">
                  <p className="text-text-secondary">Nenhum resultado disponível. Por favor, gere uma nova copy.</p>
                  <button onClick={handleVoltar} className="btn-primary mt-4">
                    Voltar ao Gerador
                  </button>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      );
      case 'templates': return <Templates onUseTemplate={handleUseTemplate} user={user} templateManager={templateManager} />;
      case 'history': return <History user={user} onViewCopy={(copyData) => {
        setCopyData(copyData);
        setShowResult(true);
        setActiveTab('generator');
      }} />;
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
