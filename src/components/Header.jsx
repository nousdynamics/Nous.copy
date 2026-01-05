import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Notifications from './Notifications';

export default function Header({ user }) {
  return (
    <header className="flex items-center justify-end mb-8">
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-64">
          <Search size={18} className="text-text-muted mr-2" />
          <input 
            type="text" 
            placeholder="Buscar templates..." 
            className="bg-transparent border-none outline-none text-sm text-white w-full"
          />
        </div>
        
        <Notifications />
      </div>
    </header>
  );
}
