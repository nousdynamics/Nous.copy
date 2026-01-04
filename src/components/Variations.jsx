import { motion, AnimatePresence } from 'framer-motion';
import { PECADOS_CAPITAIS } from '../utils/constants';
import { analiseEstrategica, gerarGancho, gerarCorpo, gerarCTA } from '../utils/copyGenerator';

export default function Variations({ dados, onClose }) {
  const outrosPecados = Object.keys(PECADOS_CAPITAIS).filter(p => p !== dados.pecadoCapital).slice(0, 3);

  const variacoes = outrosPecados.map(pecado => {
    const dadosVariacao = { ...dados, pecadoCapital: pecado };
    const estrategiaVariacao = analiseEstrategica(dadosVariacao);
    const ganchoVariacao = gerarGancho(dadosVariacao, estrategiaVariacao);
    const corpoVariacao = gerarCorpo(dadosVariacao, estrategiaVariacao);
    const ctaVariacao = gerarCTA(dadosVariacao, estrategiaVariacao);

    return {
      pecado,
      gancho: ganchoVariacao,
      corpo: corpoVariacao,
      cta: ctaVariacao
    };
  });

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-700 mt-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-slate-100">Variações A/B</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-3 bg-slate-700 text-slate-100 rounded-xl border border-slate-600 hover:bg-slate-600 transition-colors"
          >
            Fechar Variações
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {variacoes.map((variacao, index) => (
            <motion.div
              key={variacao.pecado}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-slate-700/30 rounded-2xl p-6 border-2 border-slate-600 hover:border-pink-500 transition-colors"
            >
              <h4 className="text-xl font-semibold text-pink-400 mb-4">
                Variação: {PECADOS_CAPITAIS[variacao.pecado].nome}
              </h4>
              <div className="space-y-3 text-slate-300">
                <div className="bg-slate-800/50 p-4 rounded-xl border-l-3 border-pink-500">
                  <p className="font-semibold text-pink-400 mb-1">GANCHO:</p>
                  <p className="italic">{variacao.gancho}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border-l-3 border-indigo-500">
                  <p className="font-semibold text-indigo-400 mb-1">CORPO:</p>
                  <p className="italic">{variacao.corpo}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border-l-3 border-purple-500">
                  <p className="font-semibold text-purple-400 mb-1">CTA:</p>
                  <p className="italic">{variacao.cta}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
