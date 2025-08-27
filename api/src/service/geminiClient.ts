import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from "@google/generative-ai";
import { GroupChatI } from "../types";
import { formatCurrency } from '../utils/formatCurrency';

interface ResponseGemini {
  name: string;
  score: string;
  title: string;
}

export class GeminiAIService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private chat: ChatSession;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    this.chat = this.model.startChat({
      history: [],
    });
  }

  async getResponse(
    messages: GroupChatI[]
  ): Promise<ResponseGemini[] | string> {
    try {
      if (!this.chat) return "IA ainda está carregando.";
      this.analyseMessagesGemini(messages);

      const prompt = `
Você é um especialista em análise de leads e mensagens comerciais no LinkedIn.
Sua tarefa é analisar os contatos abaixo e atribuir a cada um um score de 0 a 100, representando o nível de interesse ou potencial de negócio:

- 0 a 30 → Frio (baixa chance de negócio).
- 31 a 70 → Morno (interesse moderado ou pouco claro).
- 71 a 100 → Quente (alto interesse, intenção de avançar).
- Um título curto e objetivo (máximo 6 palavras) que resuma o tema principal da conversa.

### Dados de entrada

Você receberá um array JSON onde cada item representa uma pessoa com suas mensagens agrupadas.

### Instruções obrigatórias

- Analise todas as mensagens de cada pessoa em conjunto antes de definir o score.
- Cada pessoa deve receber apenas um score numérico entre 0 e 100.
- Gere também um **título resumido (máximo 6 palavras)** para a conversa.  
- Retorne um único array JSON válido, onde cada elemento siga este formato:
{
  "name": "valor_nome",
  "score": 0-100
  "title": "Resumo curto da conversa"
}
- Não inclua blocos de código, markdown, comentários ou explicações adicionais.
- A saída deve ser sempre um JSON estritamente válido.

### Modelo de saída (exemplo de formato, não copie os dados):
[
  {
    "name": "NOME_DO_CONTATO",
    "score": 85
    "title": "Pedido de proposta comercial"
  }
]

### Agora classifique os contatos abaixo:
${JSON.stringify(messages, null, 2)}
`;
      const result = await this.chat.sendMessage(prompt);
      const response = result.response;

      const cleanText = response
        .text()
        .replace(/```(json)?/g, "")
        .trim();

      return JSON.parse(cleanText);
    } catch (error) {
      console.error("Erro GeminiAIService:", error);
      return "Erro ao processar resposta.";
    }
  }

  async analyseMessagesGemini(messages: GroupChatI[]) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Você é um especialista em análise de leads e mensagens comerciais no LinkedIn.
Sua tarefa é analisar os contatos abaixo e atribuir a cada um um score de 0 a 100, representando o nível de interesse ou potencial de negócio:

0 a 30 → Frio (baixa chance de negócio).

31 a 70 → Morno (interesse moderado ou pouco claro).

71 a 100 → Quente (alto interesse, intenção de avançar).
Um título curto e objetivo (máximo 6 palavras) que resuma o tema principal da conversa.

### Dados de entrada

Você receberá um array JSON onde cada item representa uma pessoa com suas mensagens agrupadas.

### Instruções obrigatórias

Analise todas as mensagens de cada pessoa em conjunto antes de definir o score.

Cada pessoa deve receber apenas um score numérico entre 0 e 100.

Retorne um único array JSON válido, onde cada elemento siga este formato:
{
  "name": "valor_nome",
  "score": 0-100
  "title": "Resumo curto da conversa"
}
- Não inclua blocos de código, markdown, comentários ou explicações adicionais.
- A saída deve ser sempre um JSON estritamente válido.

### Modelo de saída (exemplo de formato, não copie os dados):
[
  {
    "name": "NOME_DO_CONTATO",
    "score": 85
    "title": "Pedido de proposta comercial"
  }
]

### Agora classifique os contatos abaixo:
${JSON.stringify(messages, null, 2)}

`;

    const result = await model.generateContent(prompt);
    if (result.response.usageMetadata) {
      const inputTokens = result.response.usageMetadata.promptTokenCount;
      const outputTokens = result.response.usageMetadata.candidatesTokenCount;
      console.log(
        "🪙  Tokens prompt:",
        result.response.usageMetadata.promptTokenCount
      );
      console.log(
        "🪙  Tokens resposta:",
        result.response.usageMetadata.candidatesTokenCount
      );
      console.log(
        "🪙  Tokens total:",
        result.response.usageMetadata.totalTokenCount
      );

      const inputCostPerToken = 0.000000075; // USD
      const outputCostPerToken = 0.0000003; // USD

      const inputCost = inputTokens * inputCostPerToken;
      const outputCost = outputTokens * outputCostPerToken;

      console.log("💲  Custo do Input:", formatCurrency(inputCost));
      console.log("💲  Custo da Resposta:", formatCurrency(outputCost));
      console.log(
        "💲  Custo da Total:",
        formatCurrency(outputCost + inputCost)
      );

    }

    return result.response.text();
  }
}
