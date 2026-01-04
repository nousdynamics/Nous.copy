import { motion } from 'framer-motion';
import { Bell, Search, User } from 'lucide-react';

export default function Header({ user }) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-1"
        >
          Bem-vindo, {user?.email?.split('@')[0]}
        </motion.h1>
        <p className="text-text-secondary">Crie copies de alta conversão em segundos.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-64">
          <Search size={18} className="text-text-muted mr-2" />
          <input 
            type="text" 
            placeholder="Buscar templates..." 
            className="bg-transparent border-none outline-none text-sm text-white w-full"
          />
        </div>
        
        <button className="p-3 glass-card !rounded-xl hover:bg-white/10 transition-colors relative">
          <Bell size={20} className="text-text-secondary" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-dashboard-bg"></span>
        </button>
        
        <button className="p-3 glass-card !rounded-xl hover:bg-white/10 transition-colors">
          <User size={20} className="text-text-secondary" />
        </button>
      </div>
    </header>
  );
}
