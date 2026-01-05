import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Sparkles, 
  Anchor, 
  Play, 
  Lightbulb, 
  HelpCircle,
  ArrowRight,
  Check,
  Eye
} from 'lucide-react';

const AGENTS = [
  {
    id: 'pagina_vendas',
    name: 'Página de Vendas',
    icon: FileText,
    cost: 4,
    description: 'Páginas que vendem de verdade. Com copy estratégica, provas e narrativa que guia o lead até o clique.',
    color: 'from-purple-500 to-purple-700',
    fields: ['profissional_nome', 'negocio_nome', 'oferta_nome', 'oferta_descricao', 'oferta_preco_principal', 'publico_descricao', 'principal_dor', 'provas_sociais', 'diferencial', 'metodologia_base', 'gatilho_principal']
  },
  {
    id: 'criativo',
    name: 'Criativo',
    icon: Sparkles,
    cost: 2,
    description: 'Crie anúncios que param o dedo no feed e fazem o lead esquecer que tá vendo propaganda. É emoção, dor e solução em segundos, direto no fígado.',
    color: 'from-blue-500 to-blue-700',
    fields: ['profissional_nome', 'oferta_nome', 'oferta_descricao', 'publico_descricao', 'principal_dor', 'oferta_preco_principal', 'formato_criativo', 'duracao_video', 'tamanho_texto_arte', 'gatilho_principal', 'tom_de_voz', 'estilo_linguagem']
  },
  {
    id: 'ganchos',
    name: 'Ganchos',
    icon: Anchor,
    cost: 1,
    description: 'Ganchos que quebram o padrão, mordem a curiosidade e puxam o clique. Se não prender em 3 segundos, tá errado.',
    color: 'from-green-500 to-green-700',
    fields: ['profissional_nome', 'oferta_nome', 'publico_descricao', 'principal_dor', 'gatilho_principal', 'curiosidade_ou_dor', 'nivel_consciencia']
  },
  {
    id: 'mini_vsl',
    name: 'Mini VSL',
    icon: Play,
    cost: 6,
    description: 'Receba o script completo de uma VSL curta, pronta pra gravar e vender. Gancho, conexão, mecanismo, prova e pitch montados para só gerar o áudio e subir.',
    color: 'from-orange-500 to-orange-700',
    fields: ['profissional_nome', 'negocio_nome', 'oferta_nome', 'oferta_descricao', 'oferta_conteudo_principal', 'publico_descricao', 'principal_dor', 'provas_sociais', 'diferencial', 'oferta_preco_principal', 'oferta_garantia_tipo', 'metodologia_base', 'gatilho_principal', 'duracao_vsl', 'oferta_condicoes_pagamento']
  },
  {
    id: 'promessas',
    name: 'Promessas',
    icon: Lightbulb,
    cost: 1,
    description: 'Crie promessas tão específicas e emocionais que o lead sinta se burro por não comprar.',
    color: 'from-pink-500 to-pink-700',
    fields: ['oferta_nome', 'oferta_descricao', 'publico_descricao', 'principal_dor', 'principais_desejos', 'oferta_conteudo_principal', 'gatilho_principal']
  },
  {
    id: 'quiz',
    name: 'Quiz',
    icon: HelpCircle,
    cost: null,
    status: 'Em breve',
    description: 'Em breve você poderá criar quizzes interativos para engajar seus leads.',
    color: 'from-gray-500 to-gray-700',
    disabled: true
  },
  {
    id: 'estrutura_invisivel',
    name: 'Estrutura Invisível',
    icon: Eye,
    cost: 3,
    description: 'Revele o esqueleto dos anúncios dos seus concorrentes. Modele, adapte e aplique sem inventar nada do zero.',
    color: 'from-purple-500 to-indigo-700',
    fields: ['copy_concorrente', 'observacoes_adaptacao']
  }
];

export default function AgentsSelection({ onSelectAgent }) {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const handleSelectAgent = (agent) => {
    if (agent.disabled) return;
    setSelectedAgent(agent);
    if (onSelectAgent) {
      onSelectAgent(agent);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Escolha seu Agente de Copy</h2>
        <p className="text-text-secondary">Cada agente é especializado em um tipo específico de copy para maximizar seus resultados.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AGENTS.map((agent, index) => {
          const IconComponent = agent.icon;
          const isSelected = selectedAgent?.id === agent.id;
          
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelectAgent(agent)}
              className={`
                glass-card p-6 cursor-pointer border-2 transition-all relative overflow-hidden
                ${agent.disabled 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'hover:border-primary/50 hover:scale-[1.02]'
                }
                ${isSelected ? 'border-primary shadow-lg shadow-primary/20' : 'border-white/10'}
              `}
            >
              {/* Badge de status ou créditos */}
              <div className="absolute top-4 right-4">
                {agent.status ? (
                  <span className="px-3 py-1 bg-white/10 text-text-muted text-xs font-medium rounded-full border border-white/10">
                    {agent.status}
                  </span>
                ) : agent.cost ? (
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full border border-primary/30">
                    {agent.cost} créditos
                  </span>
                ) : null}
              </div>

              {/* Ícone */}
              <div className={`
                w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4
                ${agent.disabled ? 'opacity-50' : ''}
              `}>
                <IconComponent className="text-white" size={28} />
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-white mb-2">{agent.name}</h3>

              {/* Descrição */}
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {agent.description}
              </p>

              {/* Indicador de seleção */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check size={18} className="text-white" />
                </motion.div>
              )}

              {/* Botão de ação (se não estiver desabilitado) */}
              {!agent.disabled && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-primary text-sm font-medium mt-4"
                >
                  <span>Começar agora</span>
                  <ArrowRight size={16} />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Informação sobre créditos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6 border-primary/20 bg-primary/5"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/20 text-primary">
            <Lightbulb size={24} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Como funciona?</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Cada agente gera um tipo específico de copy otimizado para seu propósito. 
              Os créditos são consumidos apenas quando a copy é gerada com sucesso. 
              Você pode gerar quantas copies precisar dentro do seu plano.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
