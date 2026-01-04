import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Plus, 
  Search,
  FileText,
  Sparkles,
  Calendar,
  MoreVertical
} from 'lucide-react';

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const templates = [
    {
      id: 1,
      name: 'Template de Vendas',
      description: 'Template para campanhas de vendas diretas',
      category: 'Vendas',
      created: '2024-01-15',
      icon: Sparkles
    },
    {
      id: 2,
      name: 'Template de Engajamento',
      description: 'Template para aumentar engajamento nas redes sociais',
      category: 'Engajamento',
      created: '2024-01-10',
      icon: FileText
    }
  ];

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Templates</h2>
          <p className="text-text-secondary">Gerencie seus templates de copy</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-6 py-3">
          <Plus size={20} />
          Criar Template
        </button>
      </motion.div>

      {/* Barra de Busca */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3"
      >
        <Search size={18} className="text-text-muted mr-3" />
        <input
          type="text"
          placeholder="Buscar templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-text-muted"
        />
      </motion.div>

      {/* Grid de Templates */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6 hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/20 text-primary">
                  <template.icon size={24} />
                </div>
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical size={18} className="text-text-secondary" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{template.name}</h3>
              <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                {template.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary">
                  {template.category}
                </span>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Calendar size={14} />
                  {new Date(template.created).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card p-12 text-center"
        >
          <Layers size={64} className="mx-auto mb-4 text-text-muted opacity-30" />
          <h3 className="text-xl font-bold text-white mb-2">
            {searchTerm ? 'Nenhum template encontrado' : 'Nenhum template ainda'}
          </h3>
          <p className="text-text-secondary mb-6">
            {searchTerm 
              ? 'Tente buscar com outros termos'
              : 'Crie seu primeiro template para começar'
            }
          </p>
          {!searchTerm && (
            <button className="btn-primary inline-flex items-center gap-2">
              <Plus size={20} />
              Criar Primeiro Template
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}