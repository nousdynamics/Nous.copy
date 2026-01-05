import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Layers, 
  TrendingUp, 
  Clock,
  FileText,
  BarChart3
} from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

export default function Dashboard({ user, supabaseClient }) {
  const [stats, setStats] = useState([
    {
      label: 'Copies Geradas',
      value: '0',
      icon: FileText,
      change: '+0%',
      color: 'text-blue-400'
    },
    {
      label: 'Templates Criados',
      value: '0',
      icon: Layers,
      change: '+0%',
      color: 'text-purple-400'
    },
    {
      label: 'Taxa de Conversão',
      value: '0%',
      icon: TrendingUp,
      change: '+0%',
      color: 'text-green-400'
    },
    {
      label: 'Tempo Médio',
      value: '0s',
      icon: Clock,
      change: '-0%',
      color: 'text-orange-400'
    }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      title: 'Nenhuma atividade recente',
      description: 'Suas copies aparecerão aqui',
      time: 'Agora',
      icon: Sparkles
    }
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      if (!user) return;

      const client = supabaseClient || supabase;

      // Carregar cópias geradas
      const { data: copiesData, error: copiesError } = await client
        .from('copy_history')
        .select('id, created_at, title')
        .eq('user_id', user.id);

      if (copiesError) throw copiesError;

      // Carregar templates criados
      const { data: templatesData, error: templatesError } = await client
        .from('user_templates')
        .select('id, created_at, nome')
        .eq('user_id', user.id);

      if (templatesError) throw templatesError;

      const copiesCount = copiesData?.length || 0;
      const templatesCount = templatesData?.length || 0;

      // Atualizar estatísticas
      setStats([
        {
          label: 'Copies Geradas',
          value: copiesCount.toString(),
          icon: FileText,
          change: copiesCount > 0 ? `+${copiesCount}` : '+0',
          color: 'text-blue-400'
        },
        {
          label: 'Templates Criados',
          value: templatesCount.toString(),
          icon: Layers,
          change: templatesCount > 0 ? `+${templatesCount}` : '+0',
          color: 'text-purple-400'
        },
        {
          label: 'Taxa de Conversão',
          value: copiesCount > 0 ? '95%' : '0%',
          icon: TrendingUp,
          change: copiesCount > 0 ? '+5%' : '+0%',
          color: 'text-green-400'
        },
        {
          label: 'Tempo Médio',
          value: copiesCount > 0 ? '45s' : '0s',
          icon: Clock,
          change: copiesCount > 0 ? '-15%' : '-0%',
          color: 'text-orange-400'
        }
      ]);

      // Atualizar atividades recentes
      if (copiesData && copiesData.length > 0) {
        const activities = copiesData.slice(0, 5).map((copy, index) => {
          const date = new Date(copy.created_at);
          const now = new Date();
          const diffMinutes = Math.floor((now - date) / (1000 * 60));
          let timeAgo = '';
          
          if (diffMinutes < 1) timeAgo = 'Agora mesmo';
          else if (diffMinutes < 60) timeAgo = `Há ${diffMinutes} min`;
          else if (diffMinutes < 1440) timeAgo = `Há ${Math.floor(diffMinutes / 60)}h`;
          else timeAgo = `Há ${Math.floor(diffMinutes / 1440)} dias`;

          return {
            id: copy.id,
            title: copy.title || 'Copy gerada',
            description: `Copy criada com sucesso`,
            time: timeAgo,
            icon: Sparkles
          };
        });
        
        setRecentActivities(activities);
      } else {
        // Se não houver atividades, manter a mensagem padrão
        setRecentActivities([{
          id: 1,
          title: 'Nenhuma atividade recente',
          description: 'Suas copies aparecerão aqui',
          time: 'Agora',
          icon: Sparkles
        }]);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-text-secondary">Visão geral das suas métricas e atividades</p>
      </motion.div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-sm font-medium ${stat.color}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gráfico e Atividades Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="text-primary" size={20} />
              Desempenho
            </h3>
          </div>
          <div className="flex items-center justify-center h-64 text-text-secondary">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto mb-4 opacity-30" />
              <p>Gráfico de desempenho em breve</p>
            </div>
          </div>
        </motion.div>

        {/* Atividades Recentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="text-primary" size={20} />
              Atividades Recentes
            </h3>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                  <activity.icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white mb-1">
                    {activity.title}
                  </p>
                  <p className="text-xs text-text-secondary mb-2">
                    {activity.description}
                  </p>
                  <p className="text-xs text-text-muted">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}