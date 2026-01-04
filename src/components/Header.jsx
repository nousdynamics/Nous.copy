import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Header({ user, onLogout }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-10 p-8 bg-bg-card rounded-3xl shadow-2xl border border-border relative"
    >
      {user && onLogout && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onLogout}
          className="absolute top-4 right-4 px-4 py-2 bg-bg-secondary hover:bg-bg-secondary/80 text-text-secondary rounded-lg transition-colors text-sm font-medium"
        >
          Sair
        </motion.button>
      )}
      <div className="flex items-center justify-center gap-4 mb-4">
            
        <motion.img
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="h-16 w-auto"
          src="assets/LOGO NOUS COPY COMPLETA.png"
          alt="Nous Copy Logo"
        >
        </motion.img>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-text-secondary mb-2"
      >
        Gerador de Copies de Elite
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-text-muted"
      >
        Versão 6.0 | Janeiro 2026
      </motion.p>
      {user && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-text-muted mt-2"
        >
          {user.email}
        </motion.p>
      )}
    </motion.header>
  );
}
