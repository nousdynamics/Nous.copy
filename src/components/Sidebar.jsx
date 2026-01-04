import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  LogOut,
  Sparkles,
  Layers,
  User
} from 'lucide-react';

export default function Sidebar({ user, onLogout, activeTab = 'dashboard', onTabChange }) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'generator', icon: Sparkles, label: 'Gerador' },
    { id: 'templates', icon: Layers, label: 'Templates' },
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden lg:flex flex-col w-64 h-[calc(100vh-2rem)] glass-card p-6 sticky top-4"
    >
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Nous.Copy
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`sidebar-item w-full ${activeTab === item.id ? 'sidebar-item-active' : ''}`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <button
          onClick={() => onTabChange('profile')}
          className={`sidebar-item w-full mb-2 ${activeTab === 'profile' ? 'sidebar-item-active' : ''}`}
        >
          <User size={20} />
          <span className="font-medium">Perfil</span>
        </button>
        
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-white truncate">{user?.email?.split('@')[0]}</span>
            <span className="text-xs text-text-muted truncate">{user?.email}</span>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="sidebar-item w-full text-red-400 hover:bg-red-400/10 hover:text-red-300"
        >
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </motion.aside>
  );
}
