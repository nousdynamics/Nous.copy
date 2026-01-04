import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Plus, 
  Search,
  FileText,
  Sparkles,
  Calendar,
  MoreVertical,
  Video,
  Image as ImageIcon,
  MousePointer2,
  Filter,
  X
} from 'lucide-react';

export default function Templates({ onUseTemplate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const categories = ['Todos', 'Vendas', 'Anúncios', 'Vídeo', 'Social Media', 'E-mail'];

  const templates = [
    {
      id: 1,
      name: 'VSL de Alta Conversão',
      description: 'Estrutura completa para vídeos de vendas usando a metodologia RMBC.',
      category: 'Vídeo',
      created: '2024-01-15',
      icon: Video,
      color: 'text-blue-400',
      prefill: { nicho: 'Infoprodutos', publico: 'Empreendedores', dor: 'Falta de vendas', plataforma: 'YouTube' }
    },
    {
      id: 2,
      name: 'Anúncio Meta Ads (Direto)',
      description: 'Copy focada em cliques imediatos para produtos de ticket baixo.',
      category: 'Anúncios',
      created: '2024-01-10',
      icon: MousePointer2,
      color: 'text-emerald-400',
      prefill: { nicho: 'E-commerce', publico: 'Compradores impulsivos', dor: 'Desejo de consumo', plataforma: 'Facebook/Instagram' }
    },
    {
      id: 3,
      name: 'Sequência de Aquecimento',
      description: '3 e-mails para preparar a audiência antes de uma oferta.',
      category: 'E-mail',
      created: '2024-01-05',
      icon: FileText,
      color: 'text-amber-400',
      prefill: { nicho: 'Serviços', publico: 'Leads frios', dor: 'Desconfiança', plataforma: 'E-mail Marketing' }
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || template.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Templates de Elite</h2>
          <p className="text-text-secondary">Escolha uma estrutura validada para começar sua copy.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2 px-6 py-3"
        >
          <Plus size={20} />
          Criar Template
        </button>
      </motion.div>

      {/* Filtros e Busca */}
      <div className="flex flex-col lg:flex-row gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
        >
          <Search size={18} className="text-text-muted mr-3" />
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-text-muted"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar"
        >
          <Filter size={18} className="text-text-muted mr-2 hidden lg:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white/5 text-text-secondary hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Grid de Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="glass-card p-6 hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${template.color}`}>
                <template.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                  {template.name}
                </h3>
                <span className="text-xs text-text-muted">{template.category}</span>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-6 line-clamp-2 leading-relaxed">
              {template.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Calendar size={14} />
                {new Date(template.created).toLocaleDateString('pt-BR')}
              </div>
              <button 
                onClick={() => onUseTemplate(template.prefill)}
                className="text-xs font-bold text-primary hover:underline"
              >
                Usar Template
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de Criação (Simulado) */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card w-full max-w-lg p-8 relative"
            >
              <button 
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-6">Criar Novo Template</h3>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowCreateModal(false); alert('Template criado com sucesso!'); }}>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Nome do Template</label>
                  <input type="text" className="dashboard-input w-full" placeholder="Ex: Copy para Lançamento" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Categoria</label>
                  <select className="dashboard-input w-full">
                    {categories.filter(c => c !== 'Todos').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Descrição</label>
                  <textarea className="dashboard-input w-full h-24 resize-none" placeholder="Descreva o objetivo deste template..."></textarea>
                </div>
                <button type="submit" className="btn-primary w-full py-3 mt-4">
                  Salvar Template
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
