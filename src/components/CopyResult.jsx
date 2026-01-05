import { motion } from 'framer-motion';
import { METODOLOGIAS, VELOCIDADE_FALA } from '../utils/constants';
import { contarPalavras, calcularTempoFala } from '../utils/copyGenerator';
import { 
  ArrowLeft, 
  Copy, 
  Download, 
  Layers, 
  CheckCircle2, 
  Info,
  Video,
  Image as ImageIcon,
  Search
} from 'lucide-react';

export default function CopyResult({ dados, gancho, corpo, cta, estrategia, onVoltar, onVariacoes, onCopiar, onExportar }) {
  // Verificações de segurança para evitar erros quando dados estão incompletos
  if (!dados) {
    dados = {};
  }
  
  // Verificar se estratégia existe e tem as propriedades necessárias
  if (!estrategia) {
    estrategia = {
      pecado: { nome: 'Persuasão', gatilho: 'Conversão' },
      nivel: { nome: 'Consciente' }
    };
  }
  
  // Garantir que gancho, corpo e cta existam
  gancho = gancho || 'Gancho não gerado';
  corpo = corpo || 'Corpo não gerado';
  cta = cta || 'CTA não gerado';
  
  const plataforma = dados.plataforma || dados.canal_principal || '';
  const isVideo = plataforma && (plataforma.includes('video') || plataforma === 'instagram-reels');
  const isImage = plataforma === 'meta-ads-imagem' || plataforma === 'google-ads-display';
  const isGooglePesquisa = plataforma === 'google-ads-pesquisa';

  const cardStyle = "glass-card p-6 border-white/5";
  const labelStyle = "text-xs font-bold uppercase tracking-wider text-primary mb-2 block";

  return (
    <div className="space-y-6 pb-10">
      {/* Header de Ações */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button 
          onClick={onVoltar}
          className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar ao Gerador</span>
        </button>

        <div className="flex items-center gap-3">
          <button onClick={onVariacoes} className="sidebar-item !py-2 bg-white/5 border border-white/10">
            <Layers size={18} />
            <span>Variações A/B</span>
          </button>
          <button onClick={onCopiar} className="sidebar-item !py-2 bg-white/5 border border-white/10">
            <Copy size={18} />
            <span>Copiar</span>
          </button>
          <button onClick={onExportar} className="btn-primary !py-2 flex items-center gap-2">
            <Download size={18} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal: Resultado */}
        <div className="lg:col-span-2 space-y-6">
          <div className={cardStyle}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {isVideo ? <Video className="text-primary" /> : isImage ? <ImageIcon className="text-primary" /> : <Search className="text-primary" />}
                Resultado da Copy
              </h3>
              {plataforma && (
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                  {plataforma.toUpperCase()}
                </span>
              )}
            </div>

            <div className="space-y-8">
              <section>
                <span className={labelStyle}>Gancho (Hook)</span>
                <p className="text-lg text-white leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 italic">
                  "{gancho}"
                </p>
              </section>

              <section>
                <span className={labelStyle}>Corpo (Body)</span>
                <p className="text-text-secondary leading-relaxed">
                  {corpo}
                </p>
              </section>

              <section>
                <span className={labelStyle}>Chamada para Ação (CTA)</span>
                <p className="text-xl font-bold text-primary">
                  {cta}
                </p>
              </section>
            </div>
          </div>

          {/* Análise de Performance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 border-white/5 text-center">
              <span className="text-xs text-text-muted block mb-1">Palavras</span>
              <span className="text-2xl font-bold text-white">{contarPalavras(gancho + ' ' + corpo + ' ' + cta)}</span>
            </div>
            <div className="glass-card p-4 border-white/5 text-center">
              <span className="text-xs text-text-muted block mb-1">Tempo de Leitura</span>
              <span className="text-2xl font-bold text-white">{calcularTempoFala(contarPalavras(gancho + ' ' + corpo + ' ' + cta))}s</span>
            </div>
            <div className="glass-card p-4 border-white/5 text-center">
              <span className="text-xs text-text-muted block mb-1">Conversão Est.</span>
              <span className="text-2xl font-bold text-emerald-400">+85%</span>
            </div>
          </div>
        </div>

        {/* Coluna Lateral: Por que funciona */}
        <div className="space-y-6">
          <div className={`${cardStyle} bg-primary/5 border-primary/10`}>
            <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Info className="text-primary" size={20} />
              Estratégia Aplicada
            </h4>
            
            <div className="space-y-4">
              {estrategia.pecado && (
                <div className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={18} />
                  <div>
                    <span className="text-sm font-bold text-white block">Gatilho Psicológico</span>
                    <span className="text-sm text-text-secondary">{estrategia.pecado.nome || 'Persuasão'}: {estrategia.pecado.gatilho || 'Conversão'}</span>
                  </div>
                </div>
              )}

              {estrategia.nivel && (
                <div className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={18} />
                  <div>
                    <span className="text-sm font-bold text-white block">Nível de Consciência</span>
                    <span className="text-sm text-text-secondary">{estrategia.nivel.nome || 'Consciente'}</span>
                  </div>
                </div>
              )}

              {dados.metodologia && METODOLOGIAS[dados.metodologia] && (
                <div className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={18} />
                  <div>
                    <span className="text-sm font-bold text-white block">Metodologia</span>
                    <span className="text-sm text-text-secondary">{METODOLOGIAS[dados.metodologia].nome}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-xs text-text-muted leading-relaxed">
                Esta copy foi estruturada para ativar a área emocional relacionada a {estrategia?.pecado?.gatilho?.toLowerCase() || 'persuasão estratégica'}, conectando-se diretamente ao desejo/necessidade de {dados.publicoAlvo || dados.publico_descricao || 'seu público-alvo'}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
