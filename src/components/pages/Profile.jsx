import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Zap,
  CheckCircle2,
  Camera,
  Save,
  History as HistoryIcon
} from 'lucide-react';
import History from './History';

export default function Profile({ user }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    marketing: true
  });

  const cardStyle = "glass-card p-8 border-white/5";
  const sectionTitle = "text-lg font-bold text-white mb-6 flex items-center gap-2";

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Minha Conta</h2>
        <p className="text-text-secondary">Gerencie suas informações, preferências e histórico.</p>
      </motion.div>

      {/* Tabs Internas do Perfil */}
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
            Perfil & Configurações
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
            <HistoryIcon size={18} />
            Histórico de Copies
          </div>
        </button>
      </div>

      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeSection === 'profile' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Esquerda: Info Básica */}
            <div className="lg:col-span-2 space-y-8">
              <div className={cardStyle}>
                <h3 className={sectionTitle}>
                  <User className="text-primary" size={20} />
                  Informações Pessoais
                </h3>
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-dashboard-bg border border-white/10 rounded-full text-text-secondary hover:text-white transition-colors shadow-lg">
                      <Camera size={18} />
                    </button>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Nome de Exibição</label>
                      <input 
                        type="text" 
                        defaultValue={user?.email?.split('@')[0]} 
                        className="dashboard-input w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">E-mail</label>
                      <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-muted cursor-not-allowed">
                        <Mail size={16} className="mr-2" />
                        <span className="text-sm">{user?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                  <button className="btn-primary flex items-center gap-2">
                    <Save size={18} />
                    Salvar Alterações
                  </button>
                </div>
              </div>

              <div className={cardStyle}>
                <h3 className={sectionTitle}>
                  <Bell className="text-primary" size={20} />
                  Notificações
                </h3>
                
                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-white capitalize">Notificações por {key}</p>
                        <p className="text-xs text-text-muted">Receba atualizações sobre suas copies e novidades.</p>
                      </div>
                      <button 
                        onClick={() => setNotifications(prev => ({...prev, [key]: !value}))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-primary' : 'bg-white/10'}`}
                      >
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : ''}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna Direita: Plano e Segurança */}
            <div className="space-y-8">
              <div className={`${cardStyle} bg-primary/5 border-primary/10`}>
                <h3 className={sectionTitle}>
                  <Zap className="text-primary" size={20} />
                  Seu Plano
                </h3>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">Elite Pro</span>
                  <p className="text-sm text-text-secondary mt-1">Renova em 15 de Fev, 2026</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-text-secondary">
                    <CheckCircle2 size={16} className="text-primary" />
                    Copies Ilimitadas
                  </li>
                  <li className="flex items-center gap-2 text-sm text-text-secondary">
                    <CheckCircle2 size={16} className="text-primary" />
                    Acesso ao GPT-4
                  </li>
                </ul>

                <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10">
                  Gerenciar Assinatura
                </button>
              </div>

              <div className={cardStyle}>
                <h3 className={sectionTitle}>
                  <Shield className="text-primary" size={20} />
                  Segurança
                </h3>
                
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                    <span className="text-sm text-text-secondary group-hover:text-white">Alterar Senha</span>
                    <Shield size={16} className="text-text-muted" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <History />
        )}
      </motion.div>
    </div>
  );
}
