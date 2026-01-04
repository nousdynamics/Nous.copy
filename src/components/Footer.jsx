import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="text-center py-8 mt-10 text-slate-400 text-sm"
    >
      <p>Nous.Copy - Sistema de Geração de Copies de Elite</p>
      <p className="mt-2">Metodologias: Ladeira | Georgi | Halbert | Schwartz</p>
    </motion.footer>
  );
}
