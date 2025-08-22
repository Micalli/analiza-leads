# Classificador de Leads

Uma aplicação React moderna para classificação e análise de leads através de upload de arquivos Excel e CSV.

## 🎨 Design

- **Tema**: Dark mode com paleta de cores personalizada
- **Cor principal**: #00DBD5 (azul ciano)
- **Header**: #1F1F1F (cinza escuro)
- **Fundo**: #121212 (preto suave)
- **Tipografia**: Clara para máximo contraste

## ✨ Funcionalidades

### Tela de Upload
- Upload de arquivos .xls, .xlsx e .csv
- Validação de tipos de arquivo
- Spinner de loading durante processamento
- Redirecionamento automático para histórico após upload

### Tela de Histórico
- Lista de arquivos analisados em cards
- Informações: nome do arquivo, data da análise, número de mensagens
- Botão para visualizar detalhes (console.log por enquanto)
- Layout responsivo com grid adaptativo

## 🚀 Tecnologias

- **React 19** com TypeScript
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Vite** como bundler

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse http://localhost:5173

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── Header.tsx          # Cabeçalho fixo com navegação integrada
│   ├── UploadForm.tsx      # Formulário de upload
│   └── HistoryList.tsx     # Lista de histórico
├── App.tsx                 # Componente principal com roteamento
├── index.css               # Estilos globais e Tailwind
└── main.tsx               # Ponto de entrada
```

## 🎯 Rotas

- `/` → Redireciona para `/upload`
- `/upload` → Tela de upload de arquivos
- `/historico` → Tela de histórico de análises

## 🔧 Personalização

As cores podem ser facilmente alteradas no arquivo `tailwind.config.js`:

```javascript
colors: {
  primary: '#00DBD5',    // Cor principal
  header: '#1F1F1F',    // Cor do header
  background: '#121212', // Cor de fundo
}
```

## 📱 Responsividade

- **Design mobile-first**
- **Header responsivo**: Título e navegação se adaptam ao tamanho da tela
- **Mobile**: Layout vertical com título acima da navegação
- **Desktop**: Layout horizontal com título e navegação lado a lado
- **Grid adaptativo** para diferentes tamanhos de tela
- **Navegação otimizada** para dispositivos móveis

## 🎨 Animações

- Transições suaves nos botões
- Hover effects com transformações
- Spinner de loading animado
- Transições de página fluidas
- Botões de navegação com estados ativos destacados

## 🔮 Próximos Passos

- Integração com API real para upload
- Sistema de autenticação
- Dashboard com métricas detalhadas
- Exportação de relatórios
- Filtros e busca no histórico
