import { PECADOS_CAPITAIS, NIVEL_CONSCIENCIA, VELOCIDADE_FALA } from './constants';

export { VELOCIDADE_FALA };

// Análise estratégica
export function analiseEstrategica(dados) {
  const pecado = PECADOS_CAPITAIS[dados.pecadoCapital];
  const nivel = NIVEL_CONSCIENCIA[dados.nivelConsciencia];
  
  // Identificar ponto de dor baseado no público-alvo
  let pontoDor = '';
  if (dados.publicoAlvo.toLowerCase().includes('mãe') || dados.publicoAlvo.toLowerCase().includes('pai')) {
    pontoDor = 'Sofrimento do filho e frustração por não conseguir ajudar';
  } else if (dados.publicoAlvo.toLowerCase().includes('dor') || dados.publicoAlvo.toLowerCase().includes('sofrimento')) {
    pontoDor = 'Dor física ou emocional constante';
  } else {
    pontoDor = 'Problema não resolvido apesar de múltiplas tentativas';
  }
  
  // Premissa lógica baseada no pecado capital
  let premissa = '';
  switch(dados.pecadoCapital) {
    case 'avareza':
      premissa = 'O tratamento certo reduz custos, não aumenta';
      break;
    case 'ira':
      premissa = 'O problema não é você, é o método desatualizado';
      break;
    case 'preguica':
      premissa = 'A solução mais simples é a mais eficaz';
      break;
    case 'gula':
      premissa = 'Você merece mais do que está recebendo';
      break;
    case 'luxuria':
      premissa = 'O conforto que você busca está ao alcance';
      break;
    case 'inveja':
      premissa = 'Outros já conseguiram, você também pode';
      break;
    case 'soberba':
      premissa = 'Apenas os melhores merecem a melhor solução';
      break;
    default:
      premissa = 'A solução existe e está ao seu alcance';
  }
  
  return { pontoDor, premissa, pecado, nivel };
}

// Gerar gancho
export function gerarGancho(dados, estrategia) {
  const nivel = estrategia.nivel;
  
  let gancho = '';
  
  switch(dados.pecadoCapital) {
    case 'ira':
      gancho = 'Você está com raiva. E você tem todo o direito de estar. Essa raiva é o seu corpo dizendo que você merece melhor.';
      break;
    case 'avareza':
      gancho = 'Quanto custa sua incerteza? Cada dia sem solução é dinheiro jogado fora. Você merece um investimento que realmente funcione.';
      break;
    case 'luxuria':
      gancho = 'Imagine a vida sem essa dor. Sem esse desconforto constante. Você merece sentir o alívio que sempre buscou.';
      break;
    case 'inveja':
      gancho = 'Outros já conseguiram. Eles têm o que você quer. Por que não você? A diferença não é sorte, é método.';
      break;
    case 'preguica':
      gancho = 'Sem complicações. Sem espera. Sem esforço desnecessário. A solução mais simples é a mais eficaz.';
      break;
    case 'soberba':
      gancho = 'Apenas os melhores conseguem. Você é especial. Você merece o tratamento que poucos têm acesso.';
      break;
    case 'gula':
      gancho = 'Você quer mais. Sempre mais. Não se contente com menos. Você merece o máximo que a vida pode oferecer.';
      break;
    default:
      gancho = 'Você merece uma solução que realmente funcione.';
  }
  
  // Ajustar baseado no nível de consciência
  if (nivel.nome === 'Inconsciente') {
    gancho = gancho.replace('você', 'você pode não saber, mas você');
  }
  
  return gancho;
}

// Gerar corpo
export function gerarCorpo(dados, estrategia) {
  const premissa = estrategia.premissa;
  const nivel = estrategia.nivel;
  
  let corpo = '';
  
  // Frase de transição
  switch(dados.pecadoCapital) {
    case 'ira':
      corpo = 'Essa raiva não é sua culpa. Ela nasce de tentar tudo e ver seu problema persistir. ';
      break;
    case 'avareza':
      corpo = 'Essa incerteza está custando caro. Você está gastando fortunas em soluções que não funcionam. ';
      break;
    case 'luxuria':
      corpo = 'Esse desconforto não precisa ser permanente. O alívio que você busca existe. ';
      break;
    case 'inveja':
      corpo = 'A diferença entre você e eles não é sorte ou destino. É método. É protocolo. ';
      break;
    case 'preguica':
      corpo = 'A complexidade não é necessária. A solução mais simples é a mais eficaz. ';
      break;
    case 'soberba':
      corpo = 'Você não é qualquer pessoa. Você merece o que poucos têm acesso. ';
      break;
    case 'gula':
      corpo = 'Você não precisa se contentar com menos. Você merece o máximo. ';
      break;
    default:
      corpo = 'A solução existe. ';
  }
  
  // Premissa lógica
  corpo += premissa + ' ';
  
  // Autoridade do especialista
  corpo += `Em ${dados.anosExperiencia} anos de experiência, ${dados.resultadosComprovados.toLowerCase()}. `;
  corpo += dados.diferencialCompetitivo + '. ';
  
  // Urgência ou esperança
  if (nivel.nome === 'Totalmente Consciente') {
    corpo += 'Não perca mais tempo. A solução está aqui.';
  } else {
    corpo += 'Você merece uma solução que realmente funcione.';
  }
  
  return corpo;
}

// Gerar CTA
export function gerarCTA(dados, estrategia) {
  let cta = '';
  
  switch(dados.pecadoCapital) {
    case 'ira':
      cta = 'Chega de raiva. Clique em "Saiba Mais" e transforme sua frustração em resultado.';
      break;
    case 'avareza':
      cta = 'Pare de perder. Clique em "Saiba Mais" e invista no protocolo que funciona.';
      break;
    case 'luxuria':
      cta = 'Liberte-se do sofrimento. Clique em "Saiba Mais" e sinta o alívio que você merece.';
      break;
    case 'inveja':
      cta = 'Não fique para trás. Clique em "Saiba Mais" e tenha o que os outros têm.';
      break;
    case 'preguica':
      cta = 'Sem complicações. Clique em "Saiba Mais" e tenha a solução mais simples.';
      break;
    case 'soberba':
      cta = 'Você merece o melhor. Clique em "Saiba Mais" e tenha acesso exclusivo.';
      break;
    case 'gula':
      cta = 'Você quer mais. Clique em "Saiba Mais" e tenha o máximo que você merece.';
      break;
    default:
      cta = 'Clique em "Saiba Mais" e transforme sua situação.';
  }
  
  return cta;
}

// Contar palavras
export function contarPalavras(texto) {
  return texto.trim().split(/\s+/).filter(p => p.length > 0).length;
}

// Calcular tempo de fala
export function calcularTempoFala(palavras) {
  const minutos = palavras / VELOCIDADE_FALA;
  return Math.round(minutos * 60 * 10) / 10;
}

// Ajustar texto para duração
export function ajustarParaDuracao(texto, duracaoAlvo) {
  const palavrasAtuais = contarPalavras(texto);
  const tempoAtual = calcularTempoFala(palavrasAtuais);
  const palavrasAlvo = Math.floor((duracaoAlvo / 60) * VELOCIDADE_FALA);
  
  if (tempoAtual <= duracaoAlvo) {
    return texto;
  }
  
  const palavras = texto.split(/\s+/);
  const fatorReducao = palavrasAlvo / palavrasAtuais;
  const novasPalavras = Math.floor(palavras.length * fatorReducao);
  
  return palavras.slice(0, novasPalavras).join(' ') + '...';
}
