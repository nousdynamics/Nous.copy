import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  History as HistoryIcon, 
  Search, 
  Calendar, 
  Copy as CopyIcon, 
  Trash2, 
  ExternalLink,
  Filter,
  CheckCircle2,
  X,
  Eye
} from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

export default function History({ user, onViewCopy }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar histórico do Supabase
  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('copy_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setHistoryItems(data || []);
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
      setError('Erro ao carregar histórico. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('copy_history')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setHistoryItems([]);
      alert('Histórico limpo com sucesso!');
    } catch (err) {
      console.error('Erro ao limpar histórico:', err);
      alert('Erro ao limpar histórico. Tente novamente.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este item do histórico?')) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('copy_history')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setHistoryItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Erro ao excluir item:', err);
      alert('Erro ao excluir item. Tente novamente.');
    }
  };

  const handleView = (item) => {
    const copyData = {
      dados: item.form_data || {},
      estrategia: item.estrategia || {},
      gancho: item.gancho || '',
      corpo: item.corpo || '',
      cta: item.cta || '',
      geradoComIA: true
    };
    
    if (onViewCopy) {
      onViewCopy(copyData);
    }
  };

  const handleCopy = async (item) => {
    const texto = `GANCHO: ${item.gancho}\n\nCORPO: ${item.corpo}\n\nCTA: ${item.cta}`.trim();
    try {
      await navigator.clipboard.writeText(texto);
      alert('Copy copiada para a área de transferência!');
    } catch (err) {
      console.error('Erro ao copiar:', err);
      alert('Erro ao copiar texto.');
    }
  };

  const formatPlatform = (platform) => {
    if (!platform) return 'Não especificado';
    const mapping = {
      'vsl': 'VSL',
      'pagina_vendas': 'Página de Vendas',
      'anuncio_meta_ads': 'Meta Ads',
      'sequencia_emails': 'E-mail',
      'post_redes_sociais': 'Redes Sociais',
      'titulos_google_ads': 'Google Ads'
    };
    return mapping[platform] || platform;
  };

  const formatMethod = (method) => {
    if (!method) return 'Não especificado';
    const mapping = {
      'rmbc': 'RMBC',
      'aida': 'AIDA',
      'pas': 'PAS',
      'storytelling': 'Storytelling',
      'ladeira': 'Ladeira',
      'halbert': 'Halbert',
      'schwartz': 'Schwartz'
    };
    return mapping[method] || method;
  };

  const filteredHistory = historyItems.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatPlatform(item.platform)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatMethod(item.method)?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-8 pb-10">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">Carregando histórico...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Histórico</h2>
          <p className="text-text-secondary">Acesse e gerencie todas as suas copies geradas.</p>
        </div>
        <div className="flex gap-3">
          {historyItems.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="sidebar-item !py-2 bg-red-400/10 text-red-400 border border-red-400/20 hover:bg-red-400/20"
            >
              <Trash2 size={18} />
              <span>Limpar Tudo</span>
            </button>
          )}
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 border-red-400/20 bg-red-400/10"
        >
          <div className="flex items-center gap-3">
            <X className="text-red-400" size={20} />
            <p className="text-red-400">{error}</p>
            <button 
              onClick={loadHistory}
              className="ml-auto text-xs text-red-400 hover:text-red-300 underline"
            >
              Tentar novamente
            </button>
          </div>
        </motion.div>
      )}

      {/* Busca */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
      >
        <Search size={18} className="text-text-muted mr-3" />
        <input
          type="text"
          placeholder="Buscar no histórico..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-text-muted"
        />
      </motion.div>

      {/* Tabela de Histórico */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden border-white/5"
      >
        {filteredHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted">Título / Data</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted">Plataforma</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted">Método</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted">Status</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.title}</span>
                        <span className="text-xs text-text-muted flex items-center gap-1 mt-1">
                          <Calendar size={12} />
                          {new Date(item.created_at).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-secondary border border-white/10">
                        {formatPlatform(item.platform)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-text-secondary">
                      {formatMethod(item.method)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                        <CheckCircle2 size={14} />
                        Finalizado
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleView(item)}
                          className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-all" 
                          title="Visualizar"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleCopy(item)}
                          className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-all" 
                          title="Copiar"
                        >
                          <CopyIcon size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg hover:bg-red-400/10 text-text-secondary hover:text-red-400 transition-all" 
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 text-center">
            <HistoryIcon size={48} className="mx-auto mb-4 text-text-muted opacity-20" />
            <p className="text-text-secondary">
              {historyItems.length === 0 
                ? 'Nenhuma copy gerada ainda. Comece criando sua primeira copy!'
                : 'Nenhum registro encontrado com esses termos de busca.'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
