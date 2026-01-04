import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar,
  History,
  Settings,
  Save,
  Copy,
  Trash2,
  Eye
} from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

export default function Profile({ user }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.email?.split('@')[0] || '',
    email: user?.email || '',
    createdAt: user?.created_at || ''
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeSection === 'history') {
      loadHistory();
    }
  }, [activeSection]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      // Aqui você pode buscar o histórico do Supabase
      // Por enquanto, vamos simular dados vazios
      setHistory([]);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Aqui você pode salvar os dados do perfil no Supabase
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Perfil</h2>
        <p className="text-text-secondary">Gerencie suas informações e histórico</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10">
        <button
          onClick={() => setActiveSection('profile')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${
            activeSection === 'profile'
              ? 'text-primary border-primary'
              : 'text-text-secondary border-transparent hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <User size={18} />
            Perfil
          </div>
        </button>
        <button
          onClick={() => setActiveSection('history')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${
            activeSection === 'history'
              ? 'text-primary border-primary'
              : 'text-text-secondary border-transparent hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <History size={18} />
            Histórico
          </div>
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeSection === 'profile' && (
          <div className="glass-card p-8 max-w-2xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-2xl font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {profileData.name}
                </h3>
                <p className="text-text-secondary">{profileData.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                  <User size={16} />
                  Nome
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="dashboard-input w-full"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                  <Mail size={16} />
                  E-mail
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="dashboard-input w-full opacity-50 cursor-not-allowed"
                />
                <p className="text-xs text-text-muted mt-1">
                  O e-mail não pode ser alterado
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                  <Calendar size={16} />
                  Membro desde
                </label>
                <input
                  type="text"
                  value={profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString('pt-BR') : ''}
                  disabled
                  className="dashboard-input w-full opacity-50 cursor-not-allowed"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 px-6 py-3"
                >
                  <Save size={18} />
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'history' && (
          <div className="space-y-4">
            {loading ? (
              <div className="glass-card p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-text-secondary">Carregando histórico...</p>
              </div>
            ) : history.length > 0 ? (
              history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {item.title || 'Copy Gerada'}
                      </h3>
                      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                        {item.description || 'Descrição da copy gerada...'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-text-muted">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(item.created_at || Date.now()).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-text-secondary hover:text-white">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-text-secondary hover:text-white">
                        <Copy size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-text-secondary hover:text-red-400">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-12 text-center"
              >
                <History size={64} className="mx-auto mb-4 text-text-muted opacity-30" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Nenhum histórico ainda
                </h3>
                <p className="text-text-secondary">
                  Suas copies geradas aparecerão aqui
                </p>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}