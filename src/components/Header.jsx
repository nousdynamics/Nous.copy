import { motion } from 'framer-motion';

export default function Header({ user, onLogout }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-10 p-8 bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700 relative"
    >
      {user && onLogout && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onLogout}
          className="absolute top-4 right-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors text-sm font-medium"
        >
          Sair
        </motion.button>
      )}
      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="text-5xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3"
      >
        Nous.Copy
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-slate-300 mb-2"
      >
        Gerador de Copies de Elite
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-slate-400"
      >
        Versão 6.0 | Janeiro 2026
      </motion.p>
      {user && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-slate-500 mt-2"
        >
          {user.email}
        </motion.p>
      )}
    </motion.header>
  );
}
