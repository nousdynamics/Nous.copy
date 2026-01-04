// Componente para renderizar um campo de formulário dinamicamente
import { Lock } from 'lucide-react';

export default function DynamicFormField({ field, value, onChange, required = false, locked = false, templateManager = null }) {
  const fieldId = field.id;
  const fieldType = field.tipo;
  
  const baseInputClasses = `dashboard-input w-full ${locked ? 'bg-white/5 cursor-not-allowed opacity-60' : ''}`;
  const labelClasses = `flex items-center gap-2 text-sm font-medium ${required ? 'text-white' : 'text-text-secondary'} mb-2`;
  
  const handleChange = (e) => {
    if (locked) return;
    
    const { value, type, checked } = e.target;
    if (onChange) {
      onChange(fieldId, type === 'checkbox' ? checked : value);
    }
  };
  
  const inputValue = value || '';
  
  // Renderizar diferentes tipos de campos
  switch (fieldType) {
    case 'text':
      return (
        <div>
          <label className={labelClasses}>
            {locked && <Lock size={14} className="text-text-muted" />}
            {field.label}
            {required && <span className="text-primary">*</span>}
          </label>
          <input
            type="text"
            name={fieldId}
            value={inputValue}
            onChange={handleChange}
            required={required}
            disabled={locked}
            className={baseInputClasses}
            placeholder={field.placeholder || ''}
          />
        </div>
      );
      
    case 'textarea':
      return (
        <div>
          <label className={labelClasses}>
            {locked && <Lock size={14} className="text-text-muted" />}
            {field.label}
            {required && <span className="text-primary">*</span>}
          </label>
          <textarea
            name={fieldId}
            value={inputValue}
            onChange={handleChange}
            required={required}
            disabled={locked}
            rows={field.rows || 3}
            className={`${baseInputClasses} resize-none`}
            placeholder={field.placeholder || ''}
          />
        </div>
      );
      
    case 'number':
      return (
        <div>
          <label className={labelClasses}>
            {locked && <Lock size={14} className="text-text-muted" />}
            {field.label}
            {required && <span className="text-primary">*</span>}
          </label>
          <input
            type="number"
            name={fieldId}
            value={inputValue}
            onChange={handleChange}
            required={required}
            disabled={locked}
            className={baseInputClasses}
            placeholder={field.placeholder || ''}
          />
        </div>
      );
      
    case 'select':
      return (
        <div>
          <label className={labelClasses}>
            {locked && <Lock size={14} className="text-text-muted" />}
            {field.label}
            {required && <span className="text-primary">*</span>}
          </label>
          <select
            name={fieldId}
            value={inputValue}
            onChange={handleChange}
            required={required}
            disabled={locked}
            className={`${baseInputClasses} appearance-none`}
          >
            <option value="">Selecione...</option>
            {field.opcoes?.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.label}
              </option>
            ))}
          </select>
        </div>
      );
      
    case 'multiselect':
      return (
        <div>
          <label className={labelClasses}>
            {locked && <Lock size={14} className="text-text-muted" />}
            {field.label}
            {required && <span className="text-primary">*</span>}
          </label>
          <select
            name={fieldId}
            multiple
            value={Array.isArray(inputValue) ? inputValue : (inputValue ? [inputValue] : [])}
            onChange={(e) => {
              if (locked) return;
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              if (onChange) {
                onChange(fieldId, selected);
              }
            }}
            required={required}
            disabled={locked}
            className={`${baseInputClasses} appearance-none min-h-[100px]`}
          >
            {field.opcoes?.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.label}
              </option>
            ))}
          </select>
        </div>
      );
      
    default:
      return null;
  }
}
