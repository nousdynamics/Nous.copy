import { useState, useEffect } from 'react';
import { applySystemTemplate } from '../utils/templates';

// Hook para gerenciar template ativo (sistema e usuário)
export const useTemplate = () => {
  const [systemTemplateId, setSystemTemplateId] = useState(null);
  const [userTemplate, setUserTemplate] = useState(null);
  const [templateConfig, setTemplateConfig] = useState({
    visibleFields: [],
    requiredFields: [],
    extraFields: [],
    lockedFields: []
  });

  // Aplicar template do sistema
  const applySystemTemplateId = (templateId, currentFormData = {}) => {
    const result = applySystemTemplate(templateId, currentFormData);
    setSystemTemplateId(templateId);
    setUserTemplate(null); // Limpar template do usuário ao aplicar template do sistema
    setTemplateConfig({
      visibleFields: result.visibleFields,
      requiredFields: result.requiredFields,
      extraFields: result.extraFields,
      lockedFields: []
    });
    return result.formData;
  };

  // Aplicar template do usuário
  const applyUserTemplate = (template, currentFormData = {}) => {
    // Primeiro aplicar o template base do sistema
    const baseResult = applySystemTemplate(template.base_template_id, currentFormData);
    setSystemTemplateId(template.base_template_id);
    
    // Depois aplicar valores predefinidos do template do usuário
    const newFormData = { ...baseResult.formData };
    const lockedFields = [];
    const requiredFields = [...baseResult.requiredFields];
    
    if (template.valores_predefinidos) {
      template.valores_predefinidos.forEach(item => {
        if (item.value !== undefined) {
          newFormData[item.campo_id] = item.value;
        }
        if (item.locked) {
          lockedFields.push(item.campo_id);
        }
        if (item.obrigatorio) {
          if (!requiredFields.includes(item.campo_id)) {
            requiredFields.push(item.campo_id);
          }
        }
      });
    }
    
    setUserTemplate(template);
    setTemplateConfig({
      visibleFields: baseResult.visibleFields,
      requiredFields,
      extraFields: baseResult.extraFields,
      lockedFields
    });
    
    return newFormData;
  };

  // Limpar templates
  const clearTemplates = () => {
    setSystemTemplateId(null);
    setUserTemplate(null);
    setTemplateConfig({
      visibleFields: [],
      requiredFields: [],
      extraFields: [],
      lockedFields: []
    });
  };

  // Verificar se um campo está visível
  const isFieldVisible = (fieldId) => {
    if (templateConfig.visibleFields.length === 0) {
      return true; // Se não há template ativo, todos os campos são visíveis
    }
    return templateConfig.visibleFields.includes(fieldId);
  };

  // Verificar se um campo é obrigatório
  const isFieldRequired = (fieldId) => {
    return templateConfig.requiredFields.includes(fieldId);
  };

  // Verificar se um campo está travado
  const isFieldLocked = (fieldId) => {
    return templateConfig.lockedFields.includes(fieldId);
  };

  // Obter campos extras
  const getExtraFields = () => {
    return templateConfig.extraFields;
  };

  return {
    systemTemplateId,
    userTemplate,
    templateConfig,
    applySystemTemplateId,
    applyUserTemplate,
    clearTemplates,
    isFieldVisible,
    isFieldRequired,
    isFieldLocked,
    getExtraFields
  };
};
