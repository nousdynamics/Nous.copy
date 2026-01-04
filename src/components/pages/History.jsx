import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  History as HistoryIcon, 
  Search, 
  Calendar, 
  Copy, 
  Trash2, 
  ExternalLink,
  Filter,
  CheckCircle2
} from 'lucide-react';

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');

  const historyItems = [
    {
      id: 1,
      title: 'Copy VSL - Dr. João Silva',
      date: '2024-01-04T14:30:00',
      platform: 'Meta Ads - Vídeo',
      method: 'RMBC',
      status: 'Finalizado'
    },
    {
      id: 2,
      title: 'Anúncio Estático - Curso de Inglês',
      date: '2024-01-03T10:15:00',
      platform: 'Meta Ads - Imagem',
      method: 'Light Copy',
      status: 'Finalizado'
    },
    {
      id: 3,
      title: 'Roteiro Reels - Nutricionista',
      date: '2024-01-02T18:45:00',
      platform: 'Instagram - Reels',
      method: 'Resposta Direta',
      status: 'Finalizado'
    },
    {
      id: 4,
      title: 'Google Search - Advocacia',
      date: '2023-12-30T09:00:00',
      platform: 'Google Ads - Pesquisa',
      method: '5 Níveis',
      status: 'Finalizado'
    }
  ];

  const filteredHistory = historyItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <button className="sidebar-item !py-2 bg-white/5 border border-white/10">
            <Filter size={18} />
            <span>Filtrar</span>
          </button>
          <button className="sidebar-item !py-2 bg-red-400/10 text-red-400 border border-red-400/20 hover:bg-red-400/20">
            <Trash2 size={18} />
            <span>Limpar Tudo</span>
          </button>
        </div>
      </motion.div>

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
                        {new Date(item.date).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-secondary border border-white/10">
                      {item.platform}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-text-secondary">
                    {item.method}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                      <CheckCircle2 size={14} />
                      {item.status}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-all" title="Visualizar">
                        <ExternalLink size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-all" title="Copiar">
                        <Copy size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-400/10 text-text-secondary hover:text-red-400 transition-all" title="Excluir">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredHistory.length === 0 && (
          <div className="p-20 text-center">
            <HistoryIcon size={48} className="mx-auto mb-4 text-text-muted opacity-20" />
            <p className="text-text-secondary">Nenhum registro encontrado no histórico.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
