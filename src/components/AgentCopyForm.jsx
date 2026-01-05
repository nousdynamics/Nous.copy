import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft, Save } from 'lucide-react';
import { BASE_FIELDS, getFieldById } from '../utils/formSchema';
import DynamicFormField from './DynamicFormField';
import { adaptFormDataToLegacy } from '../utils/formDataAdapter';
import CreateTemplateModal from './pages/CreateTemplateModal';
import AccordionCard from './AccordionCard';
import CopyOutputPanel from './CopyOutputPanel';
import { 
  Briefcase, 
  Target, 
  Zap, 
  Layout, 
  Cpu
} from 'lucide-react';

const BLOCK_ICONS = {
  dados_negocio: Briefcase,
  publico_alvo: Target,
  oferta: Zap,
  estrategia_venda: Layout,
  configuracoes_copy: Cpu
};

export default function AgentCopyForm({ 
  agent, 
  onSubmit, 
  loading = false, 
  onBack,
  onSaveAsTemplate = null,
  user = null,
  supabaseClient = null
}) {
  // Inicializar formData vazio apenas com os campos do agente
  const initializeFormData = () => {
    const data = {};
    agent.fields.forEach(fieldId => {
      const field = getFieldById(fieldId);
      if (field) {
        if (field.defaultValue !== undefined) {
          data[fieldId] = field.defaultValue;
        } else if (field.tipo === 'select' || field.tipo === 'multiselect') {
          data[fieldId] = '';
        } else {
          data[fieldId] = '';
        }
      }
    });
    return data;
  };

  const [formData, setFormData] = useState(() => initializeFormData());
  const [errors, setErrors] = useState({});
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [generatedCopies, setGeneratedCopies] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false); // Estado local de loading

  // Organizar campos por bloco
  const organizeFieldsByBlock = () => {
    const blocks = {};
    
    agent.fields.forEach(fieldId => {
      const field = getFieldById(fieldId);
      if (field) {
        const blockId = field.bloco || 'outros';
        if (!blocks[blockId]) {
          blocks[blockId] = [];
        }
        blocks[blockId].push(field);
      }
    });

    // Ordenar campos dentro de cada bloco
    Object.keys(blocks).forEach(blockId => {
      blocks[blockId].sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
    });

    // Ordenar blocos por ordem de aparição
    const blockOrder = ['dados_negocio', 'publico_alvo', 'oferta', 'estrategia_venda', 'configuracoes_copy', 'outros'];
    const sortedBlocks = {};
    blockOrder.forEach(blockId => {
      if (blocks[blockId] && blocks[blockId].length > 0) {
        sortedBlocks[blockId] = blocks[blockId];
      }
    });
    
    // Adicionar blocos não listados
    Object.keys(blocks).forEach(blockId => {
      if (!sortedBlocks[blockId] && blocks[blockId].length > 0) {
        sortedBlocks[blockId] = blocks[blockId];
      }
    });

    return sortedBlocks;
  };

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({ 
      ...prev, 
      [fieldId]: value 
    }));
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validação especial para Estrutura Invisível
    if (agent.id === 'estrutura_invisivel') {
      if (!formData.copy_concorrente || formData.copy_concorrente.trim() === '') {
        newErrors.copy_concorrente = 'Copy do concorrente é obrigatória';
      }
      // observacoes_adaptacao é opcional
      return Object.keys(newErrors).length === 0;
    }
    
    // Validação padrão para outros agentes
    agent.fields.forEach(fieldId => {
      const field = getFieldById(fieldId);
      if (field) {
        // Campos select vazios são considerados inválidos se não tiverem valor padrão
        if (field.tipo === 'select' && !formData[fieldId]) {
          newErrors[fieldId] = `${field.label} é obrigatório`;
        }
        // Para outros campos, verificar se estão vazios
        else if (field.tipo !== 'select' && field.tipo !== 'multiselect') {
          const value = formData[fieldId];
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            // Não tornar todos obrigatórios, apenas alguns essenciais
            const essentialFields = ['profissional_nome', 'oferta_nome', 'publico_descricao'];
            if (essentialFields.includes(fieldId)) {
              newErrors[fieldId] = `${field.label} é obrigatório`;
            }
          }
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const errorMessages = Object.values(errors);
      if (errorMessages.length > 0) {
        alert(`Por favor, corrija os seguintes erros:\n\n${errorMessages.join('\n')}`);
      } else {
        alert('Por favor, preencha os campos obrigatórios.');
      }
      return;
    }
    
    // Limpar copies anteriores e definir loading
    setGeneratedCopies([]);
    setIsGenerating(true);
    
    try {
      // Para estrutura invisível, usar formData diretamente (não adaptar)
      let dataToSubmit;
      if (agent.id === 'estrutura_invisivel') {
        dataToSubmit = formData;
      } else {
        // Adaptar para formato legado, mas preservar canal_principal
        dataToSubmit = adaptFormDataToLegacy(formData);
        // Garantir que canal_principal esteja presente (é necessário para geradores por formato)
        if (formData.canal_principal && !dataToSubmit.canal_principal) {
          dataToSubmit.canal_principal = formData.canal_principal;
        }
        // Garantir que agentId seja preservado
        dataToSubmit.agentId = agent.id;
      }
      console.log('Dados enviados para geração:', dataToSubmit);
      
      // Gerar múltiplas copies sequencialmente
      const copies = [];
      for (let i = 0; i < quantity; i++) {
        try {
          // Passar showLoading apenas para a primeira para não interferir com estado global
          // agent.id é passado para que handleGenerate saiba que é do AgentCopyForm
          const result = await onSubmit(dataToSubmit, i === 0, agent.id);
          console.log(`Copy ${i + 1} gerada:`, result);
          if (result && result.gancho && result.corpo && result.cta) {
            copies.push(result);
            // Atualizar estado a cada copy gerada para mostrar progresso
            setGeneratedCopies([...copies]);
          }
        } catch (err) {
          console.error(`Erro ao gerar copy ${i + 1}:`, err);
          // Continuar gerando outras copies mesmo se uma falhar
        }
      }
      
      // Garantir que todas as copies foram adicionadas
      if (copies.length > 0) {
        setGeneratedCopies(copies);
        
        // Salvar todas as copies no histórico
        if (copies.length > 0 && supabaseClient && user) {
        const historyPromises = copies.map(copy => {
          const formDataCopy = copy.dados;
          const title = formDataCopy.oferta_nome || formDataCopy.negocio_nome || formDataCopy.profissional_nome || `${agent.name} - Copy gerada`;
          const platform = formDataCopy.canal_principal || 'Não especificado';
          const method = formDataCopy.metodologia_base || 'Não especificado';
          
          return supabaseClient.from('copy_history').insert([{
            user_id: user.id,
            title: title,
            form_data: formDataCopy,
            gancho: copy.gancho,
            corpo: copy.corpo,
            cta: copy.cta,
            estrategia: copy.estrategia,
            platform: platform,
            method: method
          }]);
        });
        
          Promise.all(historyPromises).catch(err => {
            console.error('Erro ao salvar histórico:', err);
          });
        }
      } else {
        console.warn('Nenhuma copy foi gerada com sucesso');
        alert('Não foi possível gerar as copies. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao processar formulário:', error);
      setGeneratedCopies([]);
      const errorMessage = error.message || 'Erro desconhecido';
      alert(`Erro ao gerar copies:\n\n${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const blocks = organizeFieldsByBlock();
  const blockLabels = {
    dados_negocio: 'Dados do Negócio',
    publico_alvo: 'Público-Alvo',
    oferta: 'Oferta',
    estrategia_venda: 'Estratégia de Venda',
    configuracoes_copy: 'Configurações de Copy',
    outros: 'Outras Informações'
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      {/* Header com botão de voltar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4 pb-4 border-b border-white/10"
      >
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h2 className="text-xl font-bold text-white">{agent.name}</h2>
            <p className="text-text-secondary text-xs">{agent.description}</p>
          </div>
        </div>
        {agent.cost && (
          <div className="px-4 py-2 bg-primary/20 text-primary text-sm font-bold rounded-full border border-primary/30">
            {agent.cost} créditos
          </div>
        )}
      </motion.div>

      {/* Layout de 2 painéis */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden min-h-0" style={{ minHeight: '600px' }}>
        {/* Painel Esquerdo - Input */}
        <div className="flex flex-col overflow-hidden min-h-0">
          <div className="mb-4 pb-2 border-b border-white/10 flex-shrink-0">
            <h3 className="text-lg font-bold text-white">Input</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Seletor de Quantidade */}
              <div className="glass-card p-4 border-primary/20 bg-primary/5">
                <label className="block text-sm font-medium text-white mb-2">
                  Quantas copies gerar?
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="dashboard-input w-full py-2"
                  disabled={loading}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Copy' : 'Copies'}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-text-muted mt-2">
                  Custo: {agent.cost * quantity} créditos ({quantity} {quantity === 1 ? 'copy' : 'copies'} × {agent.cost} créditos)
                </p>
              </div>

              <div className="space-y-4">
                {/* Layout especial para Estrutura Invisível */}
                {agent.id === 'estrutura_invisivel' ? (
                  <div className="space-y-4">
                    {agent.fields.map(fieldId => {
                      const field = getFieldById(fieldId);
                      if (!field) return null;
                      
                      const fieldError = errors[fieldId];
                      const isRequired = fieldId === 'copy_concorrente';
                      
                      return (
                        <div key={fieldId} className="glass-card p-4">
                          <DynamicFormField
                            field={field}
                            value={formData[fieldId]}
                            onChange={handleFieldChange}
                            required={isRequired}
                            locked={false}
                            templateManager={null}
                          />
                          {fieldError && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-red-400">
                              <span>{fieldError}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Layout padrão com accordions para outros agentes */
                  Object.entries(blocks).map(([blockId, fields], index) => {
                    if (fields.length === 0) return null;
                    
                    const BlockIcon = BLOCK_ICONS[blockId] || Briefcase;
                    const blockLabel = blockLabels[blockId] || blockId;

                    return (
                      <AccordionCard
                        key={blockId}
                        title={blockLabel}
                        icon={BlockIcon}
                        defaultOpen={index === 0}
                      >
                        <div className="grid grid-cols-1 gap-4">
                          {fields.map(field => {
                            const fieldError = errors[field.id];
                            const isEssential = ['profissional_nome', 'oferta_nome', 'publico_descricao'].includes(field.id);
                            
                            return (
                              <div key={field.id}>
                                <DynamicFormField
                                  field={field}
                                  value={formData[field.id]}
                                  onChange={handleFieldChange}
                                  required={isEssential}
                                  locked={false}
                                  templateManager={null}
                                />
                                {fieldError && (
                                  <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                                    <span>{fieldError}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </AccordionCard>
                    );
                  })
                )}
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col gap-3 pt-4 pb-4 sticky bottom-0 bg-dashboard-bg">
                {onSaveAsTemplate && (
                  <button
                    type="button"
                    onClick={() => setShowCreateTemplateModal(true)}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-colors"
                  >
                    <Save size={18} />
                    Salvar como Template
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isGenerating || loading}
                  className="btn-primary flex items-center justify-center gap-3 px-8 py-3 w-full"
                >
                  {(isGenerating || loading) ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Gerando {quantity} {quantity === 1 ? 'Copy' : 'Copies'}...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Gerar {agent.name} ({agent.cost * quantity} créditos)
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Painel Direito - Output */}
        <div className="flex flex-col overflow-hidden min-h-0">
          <CopyOutputPanel 
            copies={generatedCopies} 
            agentName={agent.name}
            loading={isGenerating || loading}
          />
        </div>
      </div>

      {/* Modal de Criar Template */}
      {onSaveAsTemplate && (
        <CreateTemplateModal
          isOpen={showCreateTemplateModal}
          onClose={() => setShowCreateTemplateModal(false)}
          currentFormData={formData}
          systemTemplateId={null}
          onSubmit={(templateData) => {
            onSaveAsTemplate(templateData);
            setShowCreateTemplateModal(false);
          }}
        />
      )}
    </div>
  );
}
