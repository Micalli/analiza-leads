# Análise de Leads do LinkedIn com Node.js e Gemini AI

## Descrição

Este projeto é um serviço backend em **Node.js/Express** que permite:

- Ler uma planilha Excel contendo mensagens enviadas via LinkedIn.
- Classificar automaticamente cada mensagem como **Sem Interesse**, **Lead Frio** ou **Oportunidade de Negócio**.
- Retornar os resultados em formato JSON com o **ID da conversa**, **nome do contato** e **classificação**.

O serviço utiliza a **Gemini AI** da Google para analisar o conteúdo das mensagens e determinar a classificação do lead.

---

## Tecnologias

- Node.js
- React
- Express
- TypeScript
- React query
- React Router
- XLSX (para leitura de planilhas Excel)
- Gemini AI (`@google/generative-ai`)

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Micalli/analiza-leads.git

cd analyze-leads-gemini
```
### Back end

## Instale as dependências:

```bash
cd api/
npm install
```

## Variável de ambiente:
```bash
GEMINI_API_KEY=YOUR_API_KEY
```
## Rodando o servidor

```bash
npm run dev
```
### Front end

## Instale as dependências:

```bash
cd fe/
npm install
```

## Variável de ambiente:
```bash
VITE_API_URL=YOUR_API_URL
```
## Rodando o servidor

```bash
npm run dev
```

Faça uma requisição POST para /upload enviando um arquivo Excel (multipart/form-data):
- O Excel deve ter as mensagens na primeira coluna, com informações de ID e nome do contato.
- O serviço extrai o conteúdo, limpa a mensagem e envia para o Gemini AI.

