// Modal para criar template do usuário
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Check, AlertCircle } from 'lucide-react';
import { BASE_FIELDS, getFieldById } from '../../utils/formSchema';

export default function CreateTemplateModal({ 
  isOpen, 
  onClose, 
  currentFormData, 
  systemTemplateId,
  onSubmit 
}) {
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [fieldSettings, setFieldSettings] = useState({});
  
  // Inicializar configurações de campos
  useEffect(() => {
    if (!isOpen || !currentFormData) return;
    
    const settings = {};
    BASE_FIELDS.forEach(field => {
      const value = currentFormData[field.id];
      if (value !== undefined && value !== null && value !== '') {
        settings[field.id] = {
          usarComoDefault: true,
          locked: false,
          obrigatorio: false,
          value: value
        };
      }
    });
    setFieldSettings(settings);
  }, [isOpen, currentFormData]);

  const handleToggleSetting = (fieldId, setting) => {
    setFieldSettings(prev => ({
      ...prev,
      [fieldId]: {
        ...prev[fieldId],
        [setting]: !prev[fieldId]?.[setting]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!templateName.trim()) {
      alert('Por favor, informe um nome para o template');
      return;
    }
    
    const valoresPredefinidos = Object.entries(fieldSettings)
      .filter(([_, settings]) => settings.usarComoDefault)
      .map(([fieldId, settings]) => ({
        campo_id: fieldId,
        value: settings.value,
        locked: settings.locked || false,
        obrigatorio: settings.obrigatorio || false
      }));
    
    const templateData = {
      nome: templateName.trim(),
      descricao: templateDescription.trim() || '',
      base_template_id: systemTemplateId || 'formulario_completo',
      valores_predefinidos: valoresPredefinidos
    };
    
    onSubmit(templateData);
    onClose();
    
    // Reset form
    setTemplateName('');
    setTemplateDescription('');
    setFieldSettings({});
  };

  if (!isOpen) return null;

  const visibleFields = BASE_FIELDS.filter(field => {
    // Se há um template do sistema ativo, mostrar apenas campos visíveis
    // Por enquanto, mostrar todos os campos que têm valor preenchido
    return currentFormData?.[field.id] !== undefined && 
           currentFormData?.[field.id] !== null && 
           currentFormData?.[field.id] !== '';
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <h3 className="text-2xl font-bold text-white mb-6">Criar Meu Template</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome e Descrição */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Nome do Template <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="dashboard-input w-full"
                  placeholder="Ex: Clínica Dr. João – VSL Padrão"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Descrição (Opcional)
                </label>
                <input
                  type="text"
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  className="dashboard-input w-full"
                  placeholder="Breve descrição do template"
                />
              </div>
            </div>

            {/* Lista de Campos */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-4">
                Campos Preenchidos (marque como deseja usar)
              </label>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {visibleFields.length === 0 ? (
                  <div className="flex items-center gap-2 text-text-muted py-8 text-center justify-center">
                    <AlertCircle size={20} />
                    <span>Nenhum campo preenchido no formulário atual</span>
                  </div>
                ) : (
                  visibleFields.map((field) => {
                    const fieldData = getFieldById(field.id);
                    const settings = fieldSettings[field.id] || {
                      usarComoDefault: true,
                      locked: false,
                      obrigatorio: false,
                      value: currentFormData?.[field.id] || ''
                    };
                    
                    return (
                      <div
                        key={field.id}
                        className="glass-card p-4 border border-white/5 hover:border-primary/20 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-white mb-1">
                              {fieldData?.label || field.id}
                            </h4>
                            <p className="text-xs text-text-muted truncate">
                              {settings.value || 'Sem valor'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {/* Usar como Default */}
                          <button
                            type="button"
                            onClick={() => handleToggleSetting(field.id, 'usarComoDefault')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              settings.usarComoDefault
                                ? 'bg-primary/20 text-primary border border-primary/30'
                                : 'bg-white/5 text-text-secondary border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <Check size={14} className={settings.usarComoDefault ? 'opacity-100' : 'opacity-50'} />
                            Usar como Padrão
                          </button>

                          {/* Travar Campo */}
                          <button
                            type="button"
                            onClick={() => handleToggleSetting(field.id, 'locked')}
                            disabled={!settings.usarComoDefault}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              settings.locked && settings.usarComoDefault
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : settings.usarComoDefault
                                ? 'bg-white/5 text-text-secondary border border-white/10 hover:bg-white/10'
                                : 'bg-white/5 text-text-muted border border-white/5 cursor-not-allowed opacity-50'
                            }`}
                          >
                            <Lock size={14} className={settings.locked ? 'opacity-100' : 'opacity-50'} />
                            Travar Campo
                          </button>

                          {/* Tornar Obrigatório */}
                          <button
                            type="button"
                            onClick={() => handleToggleSetting(field.id, 'obrigatorio')}
                            disabled={!settings.usarComoDefault}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              settings.obrigatorio && settings.usarComoDefault
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : settings.usarComoDefault
                                ? 'bg-white/5 text-text-secondary border border-white/10 hover:bg-white/10'
                                : 'bg-white/5 text-text-muted border border-white/5 cursor-not-allowed opacity-50'
                            }`}
                          >
                            <AlertCircle size={14} className={settings.obrigatorio ? 'opacity-100' : 'opacity-50'} />
                            Obrigatório
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-white/5 text-text-secondary hover:bg-white/10 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary px-6 py-2"
              >
                Salvar Template
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
