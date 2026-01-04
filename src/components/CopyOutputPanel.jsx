import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy as CopyIcon, ChevronDown, ChevronUp, Check, Mic, FileText, Clock } from 'lucide-react';

export default function CopyOutputPanel({ copies, agentName, loading }) {
  const [expandedIndex, setExpandedIndex] = useState(0); // Primeira copy expandida por padrão
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (text, index, section = null) => {
    try {
      await navigator.clipboard.writeText(text);
      const key = section ? `${index}-${section}` : index;
      setCopiedIndex(key);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
      alert('Erro ao copiar texto.');
    }
  };

  const isCopied = (index, section = null) => {
    const key = section ? `${index}-${section}` : index;
    return copiedIndex === key;
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Expandir primeira copy automaticamente quando novas copies são geradas
  useEffect(() => {
    if (copies && copies.length > 0 && expandedIndex === null) {
      setExpandedIndex(0);
    }
  }, [copies, expandedIndex]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Gerando copies...</p>
        </div>
      </div>
    );
  }

  if (!copies || copies.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <CopyIcon className="text-text-muted" size={32} />
          </div>
          <p className="text-text-secondary">Suas copies aparecerão aqui</p>
          <p className="text-text-muted text-sm mt-2">Preencha o formulário e clique em gerar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <h3 className="text-xl font-bold text-white mb-1">Output</h3>
        <p className="text-sm text-text-secondary">
          {copies.length} {copies.length === 1 ? 'Copy gerada' : 'Copies geradas'}
        </p>
      </div>

      {/* Lista de Copies */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
        <AnimatePresence>
          {copies.map((copy, index) => {
            const isExpanded = expandedIndex === index;
            const fullText = `GANCHO: ${copy.gancho}\n\nCORPO: ${copy.corpo}\n\nCTA: ${copy.cta}`.trim();
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card border-white/10 overflow-hidden"
              >
                {/* Header do Card */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary">
                      Versão {index + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(fullText, index)}
                      className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                        ${isCopied(index) 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white border border-white/10'
                        }
                      `}
                      title="Copiar copy completa"
                    >
                      {isCopied(index) ? (
                        <>
                          <Check size={14} />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <CopyIcon size={14} />
                          Copiar Tudo
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => toggleExpand(index)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-all"
                    >
                      {isExpanded ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Conteúdo */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-6">
                        {/* Gancho */}
                        <div className="relative group">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-primary/20 text-primary flex-shrink-0">
                              <Mic size={18} />
                            </div>
                            <span className="text-sm font-bold text-primary uppercase tracking-wider">
                              Gancho
                            </span>
                            <button
                              onClick={() => handleCopy(copy.gancho, index, 'gancho')}
                              className={`
                                ml-auto p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex-shrink-0
                                ${isCopied(index, 'gancho')
                                  ? 'bg-green-500/20 text-green-400 opacity-100' 
                                  : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white'
                                }
                              `}
                              title="Copiar gancho"
                            >
                              {isCopied(index, 'gancho') ? (
                                <Check size={16} />
                              ) : (
                                <CopyIcon size={16} />
                              )}
                            </button>
                          </div>
                          <p className="text-sm text-white leading-relaxed pl-11 pr-8">
                            {copy.gancho}
                          </p>
                        </div>

                        {/* Corpo */}
                        <div className="relative group">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-primary/20 text-primary flex-shrink-0">
                              <FileText size={18} />
                            </div>
                            <span className="text-sm font-bold text-primary uppercase tracking-wider">
                              Corpo
                            </span>
                            <button
                              onClick={() => handleCopy(copy.corpo, index, 'corpo')}
                              className={`
                                ml-auto p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex-shrink-0
                                ${isCopied(index, 'corpo')
                                  ? 'bg-green-500/20 text-green-400 opacity-100' 
                                  : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white'
                                }
                              `}
                              title="Copiar corpo"
                            >
                              {isCopied(index, 'corpo') ? (
                                <Check size={16} />
                              ) : (
                                <CopyIcon size={16} />
                              )}
                            </button>
                          </div>
                          <div className="pl-11 pr-8 space-y-3">
                            {copy.corpo.split('\n\n').filter(p => p.trim()).length > 0 ? (
                              copy.corpo.split('\n\n').filter(p => p.trim()).map((paragraph, pIndex) => (
                                <p key={pIndex} className="text-sm text-text-secondary leading-relaxed">
                                  {paragraph.trim()}
                                </p>
                              ))
                            ) : (
                              <p className="text-sm text-text-secondary leading-relaxed">
                                {copy.corpo}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="relative group">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-primary/20 text-primary flex-shrink-0">
                              <Clock size={18} />
                            </div>
                            <span className="text-sm font-bold text-primary uppercase tracking-wider">
                              CTA
                            </span>
                            <button
                              onClick={() => handleCopy(copy.cta, index, 'cta')}
                              className={`
                                ml-auto p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex-shrink-0
                                ${isCopied(index, 'cta')
                                  ? 'bg-green-500/20 text-green-400 opacity-100' 
                                  : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white'
                                }
                              `}
                              title="Copiar CTA"
                            >
                              {isCopied(index, 'cta') ? (
                                <Check size={16} />
                              ) : (
                                <CopyIcon size={16} />
                              )}
                            </button>
                          </div>
                          <p className="text-sm font-medium text-white leading-relaxed pl-11 pr-8">
                            {copy.cta}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
