import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Plus, 
  Search,
  FileText,
  Calendar,
  Video,
  Image as ImageIcon,
  MousePointer2,
  X,
  Trash2,
  Edit,
  Star,
  User
} from 'lucide-react';
import { SYSTEM_TEMPLATES, getSystemTemplate } from '../../utils/templates';
import { supabase } from '../../services/supabaseClient';
import CreateTemplateModal from './CreateTemplateModal';

export default function Templates({ onUseTemplate, user, templateManager }) {
  const [activeSection, setActiveSection] = useState('system'); // 'system' ou 'user'
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userTemplates, setUserTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentFormData, setCurrentFormData] = useState(null);

  // Carregar templates do usuário
  useEffect(() => {
    if (user && activeSection === 'user') {
      loadUserTemplates();
    }
  }, [user, activeSection]);

  const loadUserTemplates = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_templates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUserTemplates(data || []);
    } catch (error) {
      console.error('Erro ao carregar templates do usuário:', error);
      // Se a tabela não existir, usar array vazio
      setUserTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar templates do sistema
  const filteredSystemTemplates = SYSTEM_TEMPLATES.filter(template => {
    const matchesSearch = template.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Filtrar templates do usuário
  const filteredUserTemplates = userTemplates.filter(template => {
    const matchesSearch = template.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (template.descricao && template.descricao.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Usar template do sistema
  const handleUseSystemTemplate = (templateId) => {
    onUseTemplate(null, true, templateId, null);
  };

  // Usar template do usuário
  const handleUseUserTemplate = (template) => {
    onUseTemplate(null, false, null, template);
  };

  // Criar template do usuário
  const handleCreateTemplate = async (templateData) => {
    if (!user) {
      alert('Você precisa estar logado para criar templates');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_templates')
        .insert([{
          user_id: user.id,
          nome: templateData.nome,
          descricao: templateData.descricao,
          base_template_id: templateData.base_template_id,
          valores_predefinidos: templateData.valores_predefinidos
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      setUserTemplates(prev => [data, ...prev]);
      alert('Template criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar template:', error);
      alert('Erro ao criar template. Verifique se a tabela user_templates existe no Supabase.');
    }
  };

  // Excluir template do usuário
  const handleDeleteTemplate = async (templateId) => {
    if (!confirm('Tem certeza que deseja excluir este template?')) return;

    try {
      const { error } = await supabase
        .from('user_templates')
        .delete()
        .eq('id', templateId)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setUserTemplates(prev => prev.filter(t => t.id !== templateId));
      alert('Template excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir template:', error);
      alert('Erro ao excluir template.');
    }
  };

  // Obter ícone e cor por tipo de template
  const getTemplateIcon = (tipo) => {
    switch (tipo) {
      case 'vsl':
        return { Icon: Video, color: 'text-blue-400' };
      case 'anuncio_meta':
        return { Icon: MousePointer2, color: 'text-emerald-400' };
      case 'sequencia_emails':
        return { Icon: FileText, color: 'text-amber-400' };
      default:
        return { Icon: Layers, color: 'text-purple-400' };
    }
  };

  // Obter nome do template base
  const getBaseTemplateName = (baseTemplateId) => {
    const baseTemplate = getSystemTemplate(baseTemplateId);
    return baseTemplate ? baseTemplate.nome : 'Formulário Completo';
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Templates</h2>
          <p className="text-text-secondary">
            Escolha um template do sistema ou use seus templates personalizados
          </p>
        </div>
        {activeSection === 'user' && (
          <button 
            onClick={() => {
              // Obter dados do formulário atual (precisaria passar como prop)
              // Por enquanto, abrir modal sem dados
              setShowCreateModal(true);
            }}
            className="btn-primary flex items-center gap-2 px-6 py-3"
          >
            <Plus size={20} />
            Criar Template
          </button>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-white/10">
        <button
          onClick={() => setActiveSection('system')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${
            activeSection === 'system'
              ? 'text-primary border-primary'
              : 'text-text-secondary border-transparent hover:text-white'
          }`}
        >
          Templates do Sistema
        </button>
        <button
          onClick={() => setActiveSection('user')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${
            activeSection === 'user'
              ? 'text-primary border-primary'
              : 'text-text-secondary border-transparent hover:text-white'
          }`}
        >
          Meus Templates
        </button>
      </div>

      {/* Busca */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
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

      {/* Templates do Sistema */}
      {activeSection === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSystemTemplates.map((template, index) => {
            const { Icon, color } = getTemplateIcon(template.tipo_saida);
            
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="glass-card p-6 hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5 ${color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                        {template.nome}
                      </h3>
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded">
                        Sistema
                      </span>
                    </div>
                    <span className="text-xs text-text-muted capitalize">
                      {template.tipo_saida.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-text-secondary mb-6 line-clamp-2 leading-relaxed">
                  {template.descricao}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    Validado
                  </div>
                  <button 
                    onClick={() => handleUseSystemTemplate(template.id)}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Usar Template
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Meus Templates */}
      {activeSection === 'user' && (
        <>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredUserTemplates.length === 0 ? (
            <div className="text-center py-20">
              <User size={48} className="mx-auto mb-4 text-text-muted opacity-50" />
              <h3 className="text-xl font-bold text-white mb-2">Nenhum template criado</h3>
              <p className="text-text-secondary mb-6">
                Crie seus próprios templates para agilizar a criação de copies
              </p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn-primary flex items-center gap-2 px-6 py-3 mx-auto"
              >
                <Plus size={20} />
                Criar Primeiro Template
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUserTemplates.map((template, index) => {
                const baseTemplate = getSystemTemplate(template.base_template_id);
                const { Icon, color } = getTemplateIcon(baseTemplate?.tipo_saida || 'default');
                
                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="glass-card p-6 hover:border-primary/30 transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-2xl bg-white/5 ${color}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                            {template.nome}
                          </h3>
                          <span className="px-2 py-0.5 text-xs font-medium bg-purple-500/20 text-purple-400 rounded">
                            Meu Template
                          </span>
                        </div>
                        <span className="text-xs text-text-muted">
                          Base: {getBaseTemplateName(template.base_template_id)}
                        </span>
                      </div>
                    </div>

                    {template.descricao && (
                      <p className="text-sm text-text-secondary mb-6 line-clamp-2 leading-relaxed">
                        {template.descricao}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <Calendar size={14} />
                        {new Date(template.created_at).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleUseUserTemplate(template)}
                          className="text-xs font-bold text-primary hover:underline"
                        >
                          Usar
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="text-xs text-red-400 hover:text-red-300 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Modal de Criação */}
      <CreateTemplateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        currentFormData={currentFormData}
        systemTemplateId={templateManager?.systemTemplateId}
        onSubmit={handleCreateTemplate}
      />
    </div>
  );
}
