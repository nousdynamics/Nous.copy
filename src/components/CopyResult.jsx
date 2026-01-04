import { motion } from 'framer-motion';
import { METODOLOGIAS } from '../utils/constants';
import { contarPalavras, calcularTempoFala, VELOCIDADE_FALA } from '../utils/copyGenerator';

export default function CopyResult({ dados, gancho, corpo, cta, estrategia, onVoltar, onVariacoes, onCopiar, onExportar }) {
  const isVideo = dados.plataforma.includes('video') || dados.plataforma === 'instagram-reels';
  const isImage = dados.plataforma === 'meta-ads-imagem' || dados.plataforma === 'google-ads-display';
  const isGooglePesquisa = dados.plataforma === 'google-ads-pesquisa';

  let resultadoHTML = null;

  if (isVideo) {
    const duracao = parseInt(dados.duracao);
    const textoCompleto = gancho + ' ' + corpo + ' ' + cta;
    const palavras = contarPalavras(textoCompleto);
    const tempoFala = calcularTempoFala(palavras);
    const tempoGancho = Math.floor(duracao * 0.1);
    const tempoCorpo = Math.floor(duracao * 0.8);
    const tempoCTA = duracao - tempoGancho - tempoCorpo;

    resultadoHTML = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 rounded-2xl p-6 border-l-4 border-indigo-500"
      >
        <h3 className="text-2xl font-bold mb-4 text-indigo-400">ROTEIRO: {parseInt(dados.duracao)} Segundos</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-800">
                <th className="p-3 text-left text-indigo-400 font-semibold border-b border-slate-700">Tempo (s)</th>
                <th className="p-3 text-left text-indigo-400 font-semibold border-b border-slate-700">Ação Visual</th>
                <th className="p-3 text-left text-indigo-400 font-semibold border-b border-slate-700">Áudio/Texto</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <td className="p-3 border-b border-slate-700 font-semibold">0-{tempoGancho}</td>
                <td className="p-3 border-b border-slate-700 text-slate-300">Close-up emocional</td>
                <td className="p-3 border-b border-slate-700">
                  <strong className="text-pink-400">GANCHO:</strong> {gancho}
                </td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <td className="p-3 border-b border-slate-700 font-semibold">{tempoGancho}-{tempoGancho + tempoCorpo}</td>
                <td className="p-3 border-b border-slate-700 text-slate-300">Transição: Imagens relacionadas</td>
                <td className="p-3 border-b border-slate-700">
                  <strong className="text-pink-400">CORPO:</strong> {corpo}
                </td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <td className="p-3 font-semibold">{tempoGancho + tempoCorpo}-{duracao}</td>
                <td className="p-3 text-slate-300">CTA + Profissional</td>
                <td className="p-3">
                  <strong className="text-pink-400">CTA:</strong> {cta}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="bg-slate-800 px-4 py-3 rounded-xl border border-slate-700">
            <strong className="block text-indigo-400 mb-1">Contagem de Palavras:</strong>
            <span className="text-slate-300">{palavras} palavras</span>
          </div>
          <div className="bg-slate-800 px-4 py-3 rounded-xl border border-slate-700">
            <strong className="block text-indigo-400 mb-1">Estimativa de Tempo de Fala:</strong>
            <span className="text-slate-300">{tempoFala} segundos</span>
          </div>
          <div className="bg-slate-800 px-4 py-3 rounded-xl border border-slate-700">
            <strong className="block text-indigo-400 mb-1">Velocidade de Fala:</strong>
            <span className="text-slate-300">{VELOCIDADE_FALA} ppm</span>
          </div>
        </div>
      </motion.div>
    );
  } else if (isImage) {
    const maxPalavrasHeadline = dados.densidade === 'minimalista' ? 5 : 10;
    const headline = gancho.split(' ').slice(0, maxPalavrasHeadline).join(' ').toUpperCase();

    resultadoHTML = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 rounded-2xl p-6 border-l-4 border-indigo-500"
      >
        <h3 className="text-2xl font-bold mb-4 text-indigo-400">COPY PARA IMAGEM</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <th className="p-3 text-left bg-slate-800 text-indigo-400 font-semibold border-b border-slate-700">Sugestão de Arte</th>
                <td className="p-3 border-b border-slate-700 text-slate-300">Imagem que represente {dados.publicoAlvo} com elemento visual relacionado a {estrategia.pecado.nome.toLowerCase()}</td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <th className="p-3 text-left bg-slate-800 text-indigo-400 font-semibold border-b border-slate-700">Headline da Arte</th>
                <td className="p-3 border-b border-slate-700 text-slate-300 font-bold">{headline}</td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <th className="p-3 text-left bg-slate-800 text-indigo-400 font-semibold border-b border-slate-700">Legenda de Suporte (Corpo)</th>
                <td className="p-3 border-b border-slate-700 text-slate-300">{corpo}</td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <th className="p-3 text-left bg-slate-800 text-indigo-400 font-semibold">Chamada para Ação (CTA)</th>
                <td className="p-3 text-slate-300 font-bold">{cta}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  } else if (isGooglePesquisa) {
    const headline1 = gancho.substring(0, 30);
    const headline2 = corpo.substring(0, 30);
    const descricao = (corpo + ' ' + cta).substring(0, 90);

    resultadoHTML = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 rounded-2xl p-6 border-l-4 border-indigo-500"
      >
        <h3 className="text-2xl font-bold mb-4 text-indigo-400">GOOGLE ADS - PESQUISA</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <th className="p-3 text-left bg-slate-800 text-indigo-400 font-semibold border-b border-slate-700">Headline 1</th>
                <td className="p-3 border-b border-slate-700 text-slate-300">{headline1}</td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <th className="p-3 text-left bg-slate-800 text-indigo-400 font-semibold border-b border-slate-700">Headline 2</th>
                <td className="p-3 border-b border-slate-700 text-slate-300">{headline2}</td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <th className="p-3 text-left bg-slate-800 text-indigo-400 font-semibold border-b border-slate-700">Descrição</th>
                <td className="p-3 border-b border-slate-700 text-slate-300">{descricao}</td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <th className="p-3 text-left bg-slate-800 text-indigo-400 font-semibold">URL Final</th>
                <td className="p-3 text-slate-300">{dados.urlFinal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-700"
    >
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-slate-100">Copy Gerada</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onVoltar}
          className="px-6 py-3 bg-slate-700 text-slate-100 rounded-xl border border-slate-600 hover:bg-slate-600 transition-colors"
        >
          Voltar ao Formulário
        </motion.button>
      </div>

      {resultadoHTML}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-6 mt-6"
      >
        <h4 className="text-xl font-semibold text-emerald-400 mb-3">Por que essa copy funciona:</h4>
        <div className="space-y-2 text-slate-300">
          <p><strong className="text-emerald-400">Gatilho Psicológico ({estrategia.pecado.nome}):</strong> {estrategia.pecado.gatilho}</p>
          <p><strong className="text-emerald-400">Nível de Consciência:</strong> {estrategia.nivel.nome} - {estrategia.nivel.abordagem}</p>
          <p><strong className="text-emerald-400">Metodologia:</strong> {METODOLOGIAS[dados.metodologia].nome} ({METODOLOGIAS[dados.metodologia].autor})</p>
          <p><strong className="text-emerald-400">Premissa Lógica:</strong> {estrategia.premissa}</p>
          <p className="mt-3">A copy ativa o {estrategia.pecado.nome.toLowerCase()} através de {estrategia.pecado.aplicacao.toLowerCase()}, conectando-se ao ponto de dor do público-alvo e oferecendo uma solução baseada na autoridade de {dados.anosExperiencia} anos de experiência.</p>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onVariacoes}
          className="px-6 py-3 bg-slate-700 text-slate-100 rounded-xl border border-slate-600 hover:bg-slate-600 transition-colors"
        >
          Gerar Variações A/B
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCopiar}
          className="px-6 py-3 bg-slate-700 text-slate-100 rounded-xl border border-slate-600 hover:bg-slate-600 transition-colors"
        >
          Copiar Copy
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExportar}
          className="px-6 py-3 bg-slate-700 text-slate-100 rounded-xl border border-slate-600 hover:bg-slate-600 transition-colors"
        >
          Exportar PDF
        </motion.button>
      </div>
    </motion.section>
  );
}
