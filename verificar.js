// Script de verificação do projeto
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Verificando estrutura do projeto Nous.Copy...\n');

const arquivosObrigatorios = [
  'index.html',
  'package.json',
  'vite.config.js',
  'src/main.jsx',
  'src/App.jsx',
  'src/index.css',
  'tailwind.config.js',
  'postcss.config.js'
];

let tudoOk = true;

arquivosObrigatorios.forEach(arquivo => {
  const caminho = join(__dirname, arquivo);
  if (existsSync(caminho)) {
    console.log(`✅ ${arquivo}`);
  } else {
    console.log(`❌ ${arquivo} - FALTANDO!`);
    tudoOk = false;
  }
});

// Verificar se arquivos antigos foram removidos
const arquivosAntigos = ['script.js', 'styles.css'];
arquivosAntigos.forEach(arquivo => {
  const caminho = join(__dirname, arquivo);
  if (existsSync(caminho)) {
    console.log(`⚠️  ${arquivo} - ARQUIVO ANTIGO AINDA EXISTE! Deve ser removido.`);
    tudoOk = false;
  } else {
    console.log(`✅ ${arquivo} - Removido corretamente`);
  }
});

// Verificar package.json
try {
  const packageJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));
  console.log(`\n📦 Dependências principais:`);
  console.log(`   React: ${packageJson.dependencies.react}`);
  console.log(`   Vite: ${packageJson.devDependencies.vite}`);
  console.log(`   Tailwind: ${packageJson.devDependencies.tailwindcss}`);
  console.log(`   Framer Motion: ${packageJson.dependencies['framer-motion']}`);
  console.log(`   OpenAI: ${packageJson.dependencies.openai}`);
} catch (e) {
  console.log('❌ Erro ao ler package.json');
  tudoOk = false;
}

// Verificar index.html
try {
  const indexHtml = readFileSync(join(__dirname, 'index.html'), 'utf-8');
  if (indexHtml.includes('id="root"') && indexHtml.includes('/src/main.jsx')) {
    console.log(`\n✅ index.html configurado corretamente para React`);
  } else {
    console.log(`\n❌ index.html não está configurado corretamente`);
    tudoOk = false;
  }
} catch (e) {
  console.log('❌ Erro ao ler index.html');
  tudoOk = false;
}

console.log('\n' + '='.repeat(50));
if (tudoOk) {
  console.log('✅ TUDO OK! O projeto está configurado corretamente.');
  console.log('\n🚀 Para iniciar, execute: npm run dev');
} else {
  console.log('❌ HÁ PROBLEMAS! Verifique os erros acima.');
}
console.log('='.repeat(50));
