import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from "@google/generative-ai";
import { GroupChatI } from "../types";

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

  async getResponse(messages: GroupChatI[]): Promise<string> {
    try {
      if (!this.chat) return "IA ainda está carregando.";

      const prompt = `
Você é um especialista em análise de leads e mensagens comerciais no LinkedIn. 
Sua tarefa é analisar os contatos abaixo e classificar cada um em uma das seguintes categorias:

1. Sem Interesse – A pessoa não demonstra nenhum potencial de negócio. Exemplo: recusas diretas, mensagens automáticas, conteúdo irrelevante.
2. Lead Frio – Existe algum interesse, mas ainda distante ou pouco claro. Exemplo: respostas vagas, curiosidade inicial, solicitações de mais informações sem urgência.
3. Oportunidade de Negócio – Há interesse concreto e direto em avançar. Exemplo: solicitação de proposta, pedido de reunião, demonstração clara de necessidade do serviço.

### Dados de entrada
Você receberá um **array JSON** onde cada item representa uma pessoa com suas mensagens agrupadas.  

### Instruções obrigatórias
- Analise **todas as mensagens de cada pessoa em conjunto** antes de definir a classificação.
- Cada pessoa deve receber **apenas uma única classificação**.
- Use **exatamente um dos termos**: "Sem Interesse", "Lead Frio" ou "Oportunidade de Negócio".
- Retorne **um único array JSON válido**, onde cada elemento siga este formato:
  {
    "name": "valor_nome",
    "classification": "Sem Interesse | Lead Frio | Oportunidade de Negócio"
  }
- Não inclua blocos de código, markdown, comentários ou explicações adicionais.
- A saída deve ser sempre um JSON estritamente válido.

### Modelo de saída (exemplo de formato, não copie os dados):
[
  {
    "name": "NOME_DO_CONTATO",
    "classification": "Lead Frio"
  }
]

### Agora classifique os contatos abaixo:
${JSON.stringify(messages, null, 2)}

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
