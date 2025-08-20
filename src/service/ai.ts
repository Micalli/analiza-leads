import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from "@google/generative-ai";
import { Messages } from "../types";

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

  async getResponse(messages: Messages[]): Promise<string> {
    try {
      if (!this.chat) return "IA ainda está carregando.";
      const prompt = `
Você é um especialista em análise de leads e mensagens comerciais. 
Sua tarefa é classificar a seguinte mensagem de LinkedIn em uma das categorias abaixo:

1. Sem Interesse – a mensagem não indica potencial para negócio.
2. Lead Frio – a mensagem mostra algum interesse, mas ainda é pouco provável gerar negócio.
3. Oportunidade de Negócio – a mensagem indica claramente interesse ou potencial para fechamento.

Mensagem a ser analisada:
${JSON.stringify(messages, null, 2)}


Instruções:
- Use exatamente um dos termos: "Sem Interesse", "Lead Frio" ou "Oportunidade de Negócio".
- Retorne **um único array JSON**, onde cada item é um objeto com as chaves: id, nome, classificacao.
- Não inclua blocos de código, markdown, comentários ou explicações.
- Remova quaisquer aspas desnecessárias dos campos id e nome.
- Exemplo de saída esperada:
[
  {
    "id": "2-ZTdlZDY0MzYtOGQ3Yy00OTU1LWI0YTMtMTM1NTVhNWNhMzE3XzEwMA==",
    "nome": "Diego Mondini",
    "classificacao": "Lead Frio"
  },
  {
    "id": "2-YjFjZTYyMWQtNDBhYi00YWU1LWIzYjUtZjAxYjA0ODM3YTlkXzEwMA==",
    "nome": "LinkedIn Talent Solutions",
    "classificacao": "Sem Interesse"
  }
]
`;

      const result = await this.chat.sendMessage(prompt);
      const response = await result.response;

      const cleanText = await response
        .text()
        .replace(/```(json)?/g, "")
        .trim();
      return JSON.parse(cleanText);
    } catch (error) {
      console.error("Erro GeminiAIService:", error);
      return "Erro ao processar resposta.";
    }
  }
}
