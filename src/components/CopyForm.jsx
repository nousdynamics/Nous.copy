import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CopyForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    nomeProfissional: '',
    anosExperiencia: '',
    resultadosComprovados: '',
    diferencialCompetitivo: '',
    publicoAlvo: '',
    nivelConsciencia: '',
    pecadoCapital: '',
    metodologia: '',
    plataforma: '',
    duracao: '30',
    densidade: 'informativo',
    urlFinal: '',
    usarIA: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isVideo = formData.plataforma.includes('video') || formData.plataforma === 'instagram-reels';
  const isImage = formData.plataforma === 'meta-ads-imagem' || formData.plataforma === 'google-ads-display';
  const isGooglePesquisa = formData.plataforma === 'google-ads-pesquisa';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-700"
    >
      <h2 className="text-3xl font-bold mb-6 text-slate-100 border-b-2 border-indigo-500 pb-3">
        Parâmetros de Entrada
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dados do Negócio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600"
        >
          <h3 className="text-xl font-semibold mb-4 text-indigo-400">1. Dados do Negócio (OBRIGATÓRIO)</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-slate-300 font-medium">Nome/Especialidade do Profissional</label>
              <input
                type="text"
                name="nomeProfissional"
                value={formData.nomeProfissional}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Ex: Dr. João Silva - Pediatra"
              />
            </div>
            <div>
              <label className="block mb-2 text-slate-300 font-medium">Anos de Experiência</label>
              <input
                type="number"
                name="anosExperiencia"
                value={formData.anosExperiencia}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Ex: 15"
              />
            </div>
            <div>
              <label className="block mb-2 text-slate-300 font-medium">Resultados Comprovados</label>
              <input
                type="text"
                name="resultadosComprovados"
                value={formData.resultadosComprovados}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Ex: 400+ pacientes curados"
              />
            </div>
            <div>
              <label className="block mb-2 text-slate-300 font-medium">Diferencial Competitivo</label>
              <textarea
                name="diferencialCompetitivo"
                value={formData.diferencialCompetitivo}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-y"
                placeholder="Ex: Protocolo exclusivo baseado em evidências científicas"
              />
            </div>
            <div>
              <label className="block mb-2 text-slate-300 font-medium">Público-alvo Principal</label>
              <input
                type="text"
                name="publicoAlvo"
                value={formData.publicoAlvo}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Ex: Mães com filhos com APLV"
              />
            </div>
          </div>
        </motion.div>

        {/* Nível de Consciência */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600"
        >
          <h3 className="text-xl font-semibold mb-4 text-indigo-400">2. Nível de Consciência da Audiência (OBRIGATÓRIO)</h3>
          <select
            name="nivelConsciencia"
            value={formData.nivelConsciencia}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="">Selecione o nível...</option>
            <option value="inconsciente">Inconsciente - Não sabe que tem o problema</option>
            <option value="consciente-problema">Consciente do Problema - Sabe que tem o problema, mas não a solução</option>
            <option value="consciente-solucao">Consciente da Solução - Sabe que existe solução, mas não a sua</option>
            <option value="consciente-produto">Consciente do Produto - Conhece você ou seu produto</option>
            <option value="totalmente-consciente">Totalmente Consciente - Já decidiu, só precisa do CTA</option>
          </select>
        </motion.div>

        {/* Gatilho Psicológico */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600"
        >
          <h3 className="text-xl font-semibold mb-4 text-indigo-400">3. Gatilho Psicológico - Pecado Capital (OBRIGATÓRIO)</h3>
          <select
            name="pecadoCapital"
            value={formData.pecadoCapital}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="">Selecione o pecado capital...</option>
            <option value="gula">Gula - Desejo insaciável</option>
            <option value="avareza">Avareza - Medo da perda financeira</option>
            <option value="luxuria">Luxúria - Desejo por prazer/conforto</option>
            <option value="inveja">Inveja - Comparação social</option>
            <option value="ira">Ira - Frustração/Indignação</option>
            <option value="preguica">Preguiça - Busca por atalho/facilidade</option>
            <option value="soberba">Soberba - Status/Exclusividade</option>
          </select>
        </motion.div>

        {/* Metodologia */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600"
        >
          <h3 className="text-xl font-semibold mb-4 text-indigo-400">4. Metodologia Raiz (OBRIGATÓRIO)</h3>
          <select
            name="metodologia"
            value={formData.metodologia}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="">Selecione a metodologia...</option>
            <option value="light-copy">Light Copy - Leandro Ladeira</option>
            <option value="rmbc">RMBC - Stefan Georgi</option>
            <option value="resposta-direta">Resposta Direta - Gary Halbert</option>
            <option value="5-niveis">5 Níveis - Eugene Schwartz</option>
          </select>
        </motion.div>

        {/* Plataforma */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600"
        >
          <h3 className="text-xl font-semibold mb-4 text-indigo-400">5. Plataforma e Formato (OBRIGATÓRIO)</h3>
          <select
            name="plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="">Selecione a plataforma...</option>
            <option value="meta-ads-video">Meta Ads - Vídeo/Reels</option>
            <option value="meta-ads-imagem">Meta Ads - Imagem/Estático</option>
            <option value="google-ads-pesquisa">Google Ads - Pesquisa</option>
            <option value="google-ads-video">Google Ads - Vídeo</option>
            <option value="google-ads-display">Google Ads - Display</option>
            <option value="instagram-reels">Instagram - Reels</option>
          </select>
        </motion.div>

        {/* Especificações Técnicas */}
        <AnimatePresence>
          {formData.plataforma && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600 overflow-hidden"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">6. Especificações Técnicas</h3>
              {isVideo && (
                <div>
                  <label className="block mb-2 text-slate-300 font-medium">Duração Alvo (segundos)</label>
                  <select
                    name="duracao"
                    value={formData.duracao}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="15">15 segundos</option>
                    <option value="30">30 segundos</option>
                    <option value="60">60 segundos</option>
                    {formData.plataforma === 'meta-ads-video' && <option value="90">90 segundos</option>}
                  </select>
                </div>
              )}
              {isImage && (
                <div>
                  <label className="block mb-2 text-slate-300 font-medium">Nível de Texto</label>
                  <select
                    name="densidade"
                    value={formData.densidade}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="minimalista">Minimalista</option>
                    <option value="informativo">Informativo</option>
                    <option value="carrossel">Carrossel</option>
                  </select>
                </div>
              )}
              {isGooglePesquisa && (
                <div>
                  <label className="block mb-2 text-slate-300 font-medium">URL Final</label>
                  <input
                    type="url"
                    name="urlFinal"
                    value={formData.urlFinal}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="https://seusite.com.br"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Opção de usar IA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="usarIA"
              name="usarIA"
              checked={formData.usarIA}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 bg-slate-700 border-slate-600 rounded focus:ring-indigo-500 focus:ring-2"
            />
            <label htmlFor="usarIA" className="text-slate-300 font-medium cursor-pointer">
              Usar Inteligência Artificial para melhorar a copy (OpenAI)
            </label>
          </div>
          <p className="text-sm text-slate-400 mt-2 ml-8">
            A IA irá gerar copies mais personalizadas e otimizadas baseadas nos seus parâmetros
          </p>
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Gerando com IA...' : 'Gerar Copy'}
        </motion.button>
      </form>
    </motion.section>
  );
}
