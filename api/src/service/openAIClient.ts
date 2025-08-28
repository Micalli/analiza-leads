import OpenAI from "openai";
import { GroupChatI } from "../types";
import { formatCurrency } from "../utils/formatCurrency";
const prompt = `
Você é um especialista em análise de leads e mensagens(em inglês e portugues) comerciais no LinkedIn.
Sua tarefa é analisar os contatos abaixo e atribuir a cada um um score de 0 a 100, representando o nível de interesse ou potencial de negócio:

- 0 a 30 → Frio (baixa chance de negócio).
- 31 a 60 → Morno (interesse moderado ou pouco claro).
- 61 a 100 → Quente (alto interesse, intenção de avançar).
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
  "linkedinUrl": "url_perfil_linkedin",
  "title": "Resumo curto da conversa"
}
- Não inclua blocos de código, markdown, comentários ou explicações adicionais.
- A saída deve ser sempre um JSON estritamente válido.

### Modelo de saída (exemplo de formato, não copie os dados):
[
  {
    "name": "NOME_DO_CONTATO",
    "score": 85,
    "linkedinUrl": "URL_DO_PERFIL_LINKEDIN",
    "title": "Pedido de proposta comercial"
  }
]
`;

export async function getAnalyseFromLeadMessages(messages: GroupChatI[]) {
  try {

    const client = new OpenAI();
    console.log("🤖 Analisando mensagens...");
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
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

    if (response.usage) {
      console.log("🪙  Tokens prompt: ", response.usage.prompt_tokens);
      console.log("🪙  Tokens resposta: ", response.usage.completion_tokens);
      console.log("🪙  Tokens total: ", response.usage.total_tokens);

      console.log(
        "💲 Custos aproximado ≅ ",
        calculateGpt4MiniCost(
          response.usage.prompt_tokens,
          response.usage.completion_tokens
        )
      );
    }

    return JSON.parse(json);
  } catch (error) {
    return "Erro ao processar resposta.";
  }
}

function calculateGpt4MiniCost(inputTokens: number, outputTokens: number) {
  const inputCostPerToken = 0.00000015; // USD
  const outputCostPerToken = 0.0000006; // USD

  const inputCost = inputTokens * inputCostPerToken;
  const outputCost = outputTokens * outputCostPerToken;

  return {
    custoDeEntrada: formatCurrency(inputCost),
    custoDeResposta: formatCurrency(outputCost),
    custoTotal: formatCurrency(inputCost + outputCost),
  };
}
