import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Target, 
  Zap, 
  Cpu, 
  Layout, 
  Sparkles,
  X,
  Lock,
  AlertCircle,
  Save
} from 'lucide-react';
import { BASE_FIELDS, FORM_BLOCKS, BLOCK_LABELS, getFieldsByBlock, getFieldById } from '../utils/formSchema';
import DynamicFormField from './DynamicFormField';
import { adaptFormDataToLegacy } from '../utils/formDataAdapter';
import CreateTemplateModal from './pages/CreateTemplateModal';
import AccordionCard from './AccordionCard';

const BLOCK_ICONS = {
  [FORM_BLOCKS.DADOS_NEGOCIO]: Briefcase,
  [FORM_BLOCKS.PUBLICO_ALVO]: Target,
  [FORM_BLOCKS.OFERTA]: Zap,
  [FORM_BLOCKS.ESTRATEGIA_VENDA]: Layout,
  [FORM_BLOCKS.CONFIGURACOES_COPY]: Cpu
};

export default function CopyForm({ onSubmit, loading = false, prefilledData = null, templateManager = null, onSaveAsTemplate = null }) {
  // Inicializar formData vazio com todos os campos do schema
  const initializeFormData = () => {
    const data = {};
    BASE_FIELDS.forEach(field => {
      // Para campos select, usar string vazia; para outros, string vazia ou valor padrão
      if (field.defaultValue !== undefined) {
        data[field.id] = field.defaultValue;
      } else if (field.tipo === 'select' || field.tipo === 'multiselect') {
        data[field.id] = '';
      } else {
        data[field.id] = '';
      }
    });
    return data;
  };

  const [formData, setFormData] = useState(() => initializeFormData());
  const [errors, setErrors] = useState({});
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);

  // Atualizar o formulário quando dados de template são recebidos
  useEffect(() => {
    if (prefilledData) {
      setFormData(prev => ({
        ...initializeFormData(),
        ...prev,
        ...prefilledData
      }));
      setErrors({});
    }
  }, [prefilledData]);

  // Atualizar quando templateManager muda
  useEffect(() => {
    if (templateManager && prefilledData) {
      // Reaplicar template se necessário
      const newFormData = { ...initializeFormData(), ...prefilledData };
      setFormData(newFormData);
    }
  }, [templateManager?.systemTemplateId, templateManager?.userTemplate]);

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({ 
      ...prev, 
      [fieldId]: value 
    }));
    // Limpar erro do campo quando o usuário começar a digitar
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
    
    // Validar campos obrigatórios do template
    BASE_FIELDS.forEach(field => {
      const isVisible = templateManager ? templateManager.isFieldVisible(field.id) : true;
      const isRequired = templateManager ? templateManager.isFieldRequired(field.id) : false;
      
      if (isVisible && isRequired) {
        const value = formData[field.id];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field.id] = `${getFieldById(field.id)?.label || field.id} é obrigatório`;
        }
      }
    });
    
    // Validar campos extras do template
    if (templateManager) {
      const extraFields = templateManager.getExtraFields();
      extraFields.forEach(field => {
        if (field.visivel && field.obrigatorio) {
          const value = formData[field.id];
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrors[field.id] = `${field.label} é obrigatório`;
          }
        }
      });
    }
    
    // Se não há templateManager, validar campos mínimos essenciais
    if (!templateManager) {
      const essentialFields = [
        'profissional_nome',
        'publico_descricao',
        'oferta_nome'
      ];
      
      let hasAtLeastOne = false;
      essentialFields.forEach(fieldId => {
        const value = formData[fieldId];
        if (value && typeof value === 'string' && value.trim() !== '') {
          hasAtLeastOne = true;
        }
      });
      
      if (!hasAtLeastOne) {
        // Não bloquear, apenas avisar - permitir gerar mesmo assim
        console.warn('Formulário com poucos dados preenchidos');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Mostrar os erros específicos em vez de apenas alerta genérico
      const errorMessages = Object.values(errors);
      if (errorMessages.length > 0) {
        alert(`Por favor, corrija os seguintes erros:\n\n${errorMessages.join('\n')}`);
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
      return;
    }
    
    // Converter dados para formato legado se necessário
    try {
      const legacyData = adaptFormDataToLegacy(formData);
      console.log('Dados enviados para geração:', legacyData);
      onSubmit(legacyData);
    } catch (error) {
      console.error('Erro ao adaptar dados do formulário:', error);
      alert('Erro ao processar o formulário. Verifique os dados e tente novamente.');
    }
  };

  const handleClearTemplate = () => {
    if (templateManager) {
      templateManager.clearTemplates();
    }
    setFormData(initializeFormData());
    setErrors({});
  };

  // Obter blocos visíveis
  const getVisibleBlocks = () => {
    const blocks = Object.values(FORM_BLOCKS);
    if (!templateManager) return blocks;
    
    // Filtrar blocos que têm pelo menos um campo visível
    return blocks.filter(block => {
      const fields = getFieldsByBlock(block);
      return fields.some(field => templateManager.isFieldVisible(field.id));
    });
  };

  // Obter campos visíveis de um bloco
  const getVisibleFieldsInBlock = (blockId) => {
    const fields = getFieldsByBlock(blockId);
    const extraFields = templateManager ? templateManager.getExtraFields().filter(f => f.bloco === blockId) : [];
    
    // Filtrar campos visíveis
    const visibleFields = fields.filter(field => {
      if (!templateManager) return true;
      return templateManager.isFieldVisible(field.id);
    });
    
    // Adicionar campos extras visíveis
    const visibleExtraFields = extraFields.filter(extraField => extraField.visivel);
    
    return [...visibleFields, ...visibleExtraFields];
  };

  // Renderizar bloco de campos como accordion
  const renderBlock = (blockId, index) => {
    const allFields = getVisibleFieldsInBlock(blockId);
    
    if (allFields.length === 0) return null;
    
    const BlockIcon = BLOCK_ICONS[blockId];
    const blockLabel = BLOCK_LABELS[blockId];
    
    return (
      <AccordionCard
        key={blockId}
        title={blockLabel}
        icon={BlockIcon}
        defaultOpen={index === 0} // Primeiro bloco aberto por padrão
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allFields.map(field => {
            const fieldConfig = getFieldById(field.id) || field;
            const isRequired = templateManager ? templateManager.isFieldRequired(field.id) : false;
            const isLocked = templateManager ? templateManager.isFieldLocked(field.id) : false;
            const fieldError = errors[field.id];
            
            return (
              <div key={field.id}>
                <DynamicFormField
                  field={fieldConfig}
                  value={formData[field.id]}
                  onChange={handleFieldChange}
                  required={isRequired}
                  locked={isLocked}
                  templateManager={templateManager}
                />
                {fieldError && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                    <AlertCircle size={12} />
                    <span>{fieldError}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </AccordionCard>
    );
  };

  const visibleBlocks = getVisibleBlocks();

  return (
    <div className="space-y-6 pb-10">
      {/* Informações do Template Ativo */}
      {(templateManager?.systemTemplateId || templateManager?.userTemplate) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 border border-primary/30 bg-primary/5"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-primary" />
                <h3 className="text-sm font-bold text-white">Template Ativo</h3>
              </div>
              {templateManager?.systemTemplateId && (
                <p className="text-xs text-text-secondary mb-1">
                  Template do Sistema: <span className="text-primary font-medium">
                    {templateManager.systemTemplateId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </p>
              )}
              {templateManager?.userTemplate && (
                <p className="text-xs text-text-secondary">
                  Meu Template: <span className="text-purple-400 font-medium">{templateManager.userTemplate.nome}</span>
                </p>
              )}
              <p className="text-xs text-text-muted mt-2">
                Este template já preencheu alguns campos para você. Revise e complete o que faltar.
              </p>
            </div>
            <button
              onClick={handleClearTemplate}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              title="Limpar template"
            >
              <X size={14} />
              Limpar
            </button>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {visibleBlocks.map((blockId, index) => renderBlock(blockId, index))}
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {onSaveAsTemplate && (
            <button
              type="button"
              onClick={() => setShowCreateTemplateModal(true)}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-colors"
            >
              <Save size={18} />
              Salvar como Meu Template
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-3 px-8 py-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Gerando Copy...</span>
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Gerar Copy
              </>
            )}
          </button>
        </div>
      </form>

      {/* Modal de Criar Template */}
      {onSaveAsTemplate && (
        <CreateTemplateModal
          isOpen={showCreateTemplateModal}
          onClose={() => setShowCreateTemplateModal(false)}
          currentFormData={formData}
          systemTemplateId={templateManager?.systemTemplateId}
          onSubmit={(templateData) => {
            onSaveAsTemplate(templateData);
            setShowCreateTemplateModal(false);
          }}
        />
      )}
    </div>
  );
}
