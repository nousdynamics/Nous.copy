import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  Target, 
  Zap, 
  Cpu, 
  Layout, 
  Clock, 
  Type, 
  Link as LinkIcon,
  Sparkles
} from 'lucide-react';

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

  const inputGroupStyle = "glass-card p-6 space-y-4 border-white/5 hover:border-primary/20 transition-colors";
  const labelStyle = "flex items-center gap-2 text-sm font-medium text-text-secondary mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna 1: Dados do Negócio */}
        <div className="space-y-6">
          <div className={inputGroupStyle}>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Briefcase className="text-primary" size={20} />
              Dados do Negócio
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}><User size={16} /> Profissional</label>
                <input
                  type="text"
                  name="nomeProfissional"
                  value={formData.nomeProfissional}
                  onChange={handleChange}
                  required
                  className="dashboard-input w-full"
                  placeholder="Ex: Dr. João Silva"
                />
              </div>
              <div>
                <label className={labelStyle}><Clock size={16} /> Experiência (anos)</label>
                <input
                  type="number"
                  name="anosExperiencia"
                  value={formData.anosExperiencia}
                  onChange={handleChange}
                  required
                  className="dashboard-input w-full"
                  placeholder="Ex: 15"
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}><Target size={16} /> Resultados</label>
              <input
                type="text"
                name="resultadosComprovados"
                value={formData.resultadosComprovados}
                onChange={handleChange}
                required
                className="dashboard-input w-full"
                placeholder="Ex: 400+ pacientes curados"
              />
            </div>

            <div>
              <label className={labelStyle}><Zap size={16} /> Diferencial</label>
              <textarea
                name="diferencialCompetitivo"
                value={formData.diferencialCompetitivo}
                onChange={handleChange}
                required
                rows="2"
                className="dashboard-input w-full resize-none"
                placeholder="Seu protocolo exclusivo..."
              />
            </div>

            <div>
              <label className={labelStyle}><User size={16} /> Público-alvo</label>
              <input
                type="text"
                name="publicoAlvo"
                value={formData.publicoAlvo}
                onChange={handleChange}
                required
                className="dashboard-input w-full"
                placeholder="Ex: Mães com filhos APLV"
              />
            </div>
          </div>

          <div className={inputGroupStyle}>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Cpu className="text-primary" size={20} />
              Inteligência Artificial
            </h3>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="usarIA"
                  checked={formData.usarIA}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full transition-colors ${formData.usarIA ? 'bg-primary' : 'bg-white/10'}`}></div>
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.usarIA ? 'translate-x-6' : ''}`}></div>
              </div>
              <span className="text-text-secondary group-hover:text-white transition-colors">Ativar geração com IA (GPT-4)</span>
            </label>
          </div>
        </div>

        {/* Coluna 2: Estratégia e Formato */}
        <div className="space-y-6">
          <div className={inputGroupStyle}>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Target className="text-primary" size={20} />
              Estratégia de Venda
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={labelStyle}>Nível de Consciência</label>
                <select
                  name="nivelConsciencia"
                  value={formData.nivelConsciencia}
                  onChange={handleChange}
                  required
                  className="dashboard-input w-full appearance-none"
                >
                  <option value="">Selecione...</option>
                  <option value="inconsciente">Inconsciente</option>
                  <option value="consciente-problema">Consciente do Problema</option>
                  <option value="consciente-solucao">Consciente da Solução</option>
                  <option value="consciente-produto">Consciente do Produto</option>
                  <option value="totalmente-consciente">Totalmente Consciente</option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>Gatilho (Pecado Capital)</label>
                <select
                  name="pecadoCapital"
                  value={formData.pecadoCapital}
                  onChange={handleChange}
                  required
                  className="dashboard-input w-full appearance-none"
                >
                  <option value="">Selecione...</option>
                  <option value="gula">Gula</option>
                  <option value="avareza">Avareza</option>
                  <option value="luxuria">Luxúria</option>
                  <option value="inveja">Inveja</option>
                  <option value="ira">Ira</option>
                  <option value="preguica">Preguiça</option>
                  <option value="soberba">Soberba</option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>Metodologia Raiz</label>
                <select
                  name="metodologia"
                  value={formData.metodologia}
                  onChange={handleChange}
                  required
                  className="dashboard-input w-full appearance-none"
                >
                  <option value="">Selecione...</option>
                  <option value="light-copy">Light Copy (Ladeira)</option>
                  <option value="rmbc">RMBC (Georgi)</option>
                  <option value="resposta-direta">Resposta Direta</option>
                  <option value="5-niveis">5 Níveis (Schwartz)</option>
                </select>
              </div>
            </div>
          </div>

          <div className={inputGroupStyle}>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Layout className="text-primary" size={20} />
              Plataforma e Formato
            </h3>
            
            <div className="space-y-4">
              <select
                name="plataforma"
                value={formData.plataforma}
                onChange={handleChange}
                required
                className="dashboard-input w-full appearance-none"
              >
                <option value="">Selecione a plataforma...</option>
                <option value="meta-ads-video">Meta Ads - Vídeo</option>
                <option value="meta-ads-imagem">Meta Ads - Imagem</option>
                <option value="google-ads-pesquisa">Google Ads - Pesquisa</option>
                <option value="instagram-reels">Instagram - Reels</option>
              </select>

              <AnimatePresence>
                {isVideo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className={labelStyle}><Clock size={16} /> Duração (segundos)</label>
                    <select name="duracao" value={formData.duracao} onChange={handleChange} className="dashboard-input w-full">
                      <option value="15">15s</option>
                      <option value="30">30s</option>
                      <option value="60">60s</option>
                    </select>
                  </motion.div>
                )}
                {isImage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className={labelStyle}><Type size={16} /> Nível de Texto</label>
                    <select name="densidade" value={formData.densidade} onChange={handleChange} className="dashboard-input w-full">
                      <option value="minimalista">Minimalista</option>
                      <option value="informativo">Informativo</option>
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className={labelStyle}><LinkIcon size={16} /> URL Final</label>
                <input
                  type="url"
                  name="urlFinal"
                  value={formData.urlFinal}
                  onChange={handleChange}
                  className="dashboard-input w-full"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center gap-3 px-12 py-4 text-lg"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Sparkles size={24} />
              Gerar Copy de Elite
            </>
          )}
        </button>
      </div>
    </form>
  );
}
