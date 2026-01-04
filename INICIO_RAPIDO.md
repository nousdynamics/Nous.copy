# 🚀 Início Rápido - Nous.Copy

## Problema Resolvido ✅

Os arquivos antigos (`script.js` e `styles.css`) foram removidos. O projeto agora está 100% React com Vite.

## Como Iniciar o Projeto

### 1. Instalar Dependências (se ainda não instalou)
```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

### 3. Acessar no Navegador
O Vite irá mostrar uma URL, geralmente:
```
http://localhost:5173
```

## ⚠️ Se o Projeto Não Abrir

### Solução 1: Limpar Cache do Navegador
1. Pressione `Ctrl + Shift + Delete`
2. Selecione "Imagens e arquivos em cache"
3. Limpe o cache
4. Recarregue a página com `Ctrl + F5`

### Solução 2: Parar e Reiniciar o Servidor
```bash
# Parar o servidor (Ctrl + C no terminal)
# Depois reiniciar:
npm run dev
```

### Solução 3: Limpar e Reinstalar
```bash
# Remover node_modules
rm -rf node_modules
# ou no Windows PowerShell:
Remove-Item -Recurse -Force node_modules

# Reinstalar
npm install

# Iniciar novamente
npm run dev
```

## 📁 Estrutura do Projeto

```
Nous.Copy/
├── index.html          # Ponto de entrada (React)
├── src/
│   ├── main.jsx        # Entry point do React
│   ├── App.jsx         # Componente principal
│   ├── index.css       # Estilos globais (Tailwind)
│   ├── components/     # Componentes React
│   ├── hooks/          # Hooks customizados
│   ├── services/       # Serviços (OpenAI)
│   └── utils/           # Utilitários
├── package.json
└── vite.config.js
```

## ✅ Verificação

Se você ver a tela com:
- ✅ Título "Nous.Copy"
- ✅ Formulário de parâmetros
- ✅ Design moderno com gradientes

Então está funcionando corretamente! 🎉

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "Port already in use"
```bash
# Matar processo na porta 5173
npx kill-port 5173
# ou mudar a porta no vite.config.js
```

### Página em branco
1. Abra o Console do navegador (F12)
2. Verifique se há erros
3. Verifique se o servidor está rodando
4. Tente acessar http://localhost:5173 diretamente

---

**Nota**: O projeto usa React + Vite, não mais HTML puro. Certifique-se de que o servidor Vite está rodando!
