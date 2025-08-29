import OpenAI from "openai";
import { GroupChatI } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

const prompt = `
Você é um especialista em análise de leads e mensagens (em inglês e português) comerciais no LinkedIn.  
Sua tarefa é analisar os contatos abaixo e atribuir a cada um:

- um **score** de 0 a 100, representando o nível de interesse ou potencial de negócio:
  - 0 a 30 → Frio (baixa chance de negócio).  
  - 31 a 60 → Morno (interesse moderado ou pouco claro).  
  - 61 a 100 → Quente (alto interesse, intenção de avançar).  
- um **título curto e objetivo** (máximo 6 palavras) que resuma o tema principal da conversa.  
- uma **mensagem sugerida** (atributo suggestedMessage) apenas para leads quentes (score > 60); para os demais, o valor deve ser string vazia.  

Você receberá um array JSON onde cada item representa uma pessoa com suas mensagens agrupadas, incluindo o nome do remetente de cada mensagem.

 ### Sobre a empresa  
 [INSERIR AQUI uma breve descrição da empresa e o momento atual do negócio]

### Instruções obrigatórias

- Analise todas as mensagens de cada pessoa em conjunto antes de definir o score.  
- Cada pessoa deve receber apenas um score numérico entre 0 e 100.  
- Retorne um único array JSON válido, onde cada elemento siga este formato:

{
  "name": "valor_nome",
  "score": 0-100,
  "linkedinUrl": "url_perfil_linkedin",
  "title": "Resumo curto da conversa",
  "suggestedMessage": "Mensagem sugerida || "",
  "lastMessageDate": [lastMessageDate],
  "lastSender": [lastSender],
}

`;

export async function getAnalyseFromLeadMessages(messages: GroupChatI[]) {
  try {
    const client = new OpenAI();
    console.log("🤖 Analisando mensagens...");
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini", // Modelo, pode alterar. "gpt-4.1-nano" | "gpt-4o" |  "gpt-4.1" |  "gpt-4-turbo"
      messages: [
        {
          role: "system",
          content: `
          ${prompt}
        `,
        },
        {
          role: "user",
          content: `
         ${JSON.stringify(messages, null, 2)}
        `,
        },
      ],
    });
    console.log("✅ Analise finalizada!");

    const json = response.choices[0].message.content;

    if (!json) {
      throw new Error("Failed to process meal.");
    }
    let totalCostBatch;

    if (response.usage) {
      console.log("🪙  Tokens prompt: ", response.usage.prompt_tokens);
      console.log("🪙  Tokens resposta: ", response.usage.completion_tokens);
      console.log("🪙  Tokens total: ", response.usage.total_tokens);

      const { totalCost, costInput, responseCost } = calculateGpt4MiniCost(
        response.usage.prompt_tokens,
        response.usage.completion_tokens
      );
      totalCostBatch = totalCost;
      console.log(`💲 Custos desse batch aproximado ≅ 
          Custo do Input: ${costInput}
          Custo da Resposta: ${responseCost}
          Custo do Total:${formatCurrency(totalCost)}
        `);
    }

    return {
      totalCostBatch,
      json: JSON.parse(json),
    };
  } catch (error) {
    return { error: (error as Error).message || "Erro ao processar resposta." };
  }
}

function calculateGpt4MiniCost(inputTokens: number, outputTokens: number) {
  const inputCostPerToken = 0.00000015; // USD
  const outputCostPerToken = 0.0000006; // USD

  const inputCost = inputTokens * inputCostPerToken;
  const outputCost = outputTokens * outputCostPerToken;

  return {
    costInput: formatCurrency(inputCost),
    responseCost: formatCurrency(outputCost),
    totalCost: inputCost + outputCost,
  };
}
