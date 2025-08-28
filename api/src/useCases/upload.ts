import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { GroupChatI, ChatsI } from "../types";
import { clearMessage } from "../utils/clearMessage";
import { Request, Response } from "express";
import { removeFilesInFolder } from "../utils/removeFilesInFolder";
import { validateFormatFile } from "../utils/validateFormatFile";
import { saveAnalysisToFile } from "../database/repository/saveToFile";
import { getAnalyseFromLeadMessages } from "../service/openAIClient";
import fs from "fs";
import { delay } from '../utils/delay';
import { formatCurrency } from '../utils/formatCurrency';

export async function uploadFile(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }
    await validateFormatFile(req.file);
    const { analyzeName } = req.body;
    console.log("🚀 ~ uploadFile ~ analyzeName:", analyzeName);

    const filePath = req.file.path;
    const csvContent = await fs.promises.readFile(filePath, "utf8");

    const groupChat = await parseFileToJson(csvContent);
    console.log("🚀 ~ uploadFile ~ groupChat:", groupChat.length);

    const batchSize = 500; // tamanho de cada batch, pode ajustar ou usar função dinâmica getBatchSize(groupChat.length)
    const batches = chunkArray(groupChat, batchSize);
    console.log("Tamanho do Batch: ", batches.length);

    let allResults: any[] = [];
    let bacthesTotalCost = 0;

    for (let i = 0; i < batches.length; i++) {
      console.log(`🔎 Processando batch ${i + 1} de ${batches.length}...`);

      try {
        const { json, totalCostBatch } = await getAnalyseFromLeadMessages(
          batches[i]
        );

        allResults = allResults.concat(json);
        bacthesTotalCost += Number(totalCostBatch);
      } catch (err) {
        console.error(`❌ Erro no batch ${i + 1}:`, err);
      }

      if (i < batches.length - 1) {
        console.log("⏳ Aguardando antes do próximo batch...");
        await delay(1500); // 1.5 segundos, pode ajustar
      }
    }
    console.log(`✅ Processando de batches finalizado!`);
    console.log(
      "💲 Custo total aproximado: ",
      formatCurrency(bacthesTotalCost)
    );

    const analyseId = uuidv4();
    const newAnalysis = {
      id: analyseId,
      fileName: analyzeName || req.file.originalname,
      analyzedAt: new Date().toISOString(),
      analysis: allResults,
    };

    await saveAnalysisToFile(analyseId, newAnalysis);
    return res.status(201).json(groupChat);
  } catch (err) {
    console.error("Erro ao processar arquivo:", err);
    return res
      .status(500)
      .json({ error: err || "Erro ao processar a planilha" });
  } finally {
    removeFilesInFolder("uploads");
  }
}

async function parseFileToJson(csvContent: string): Promise<GroupChatI[]> {
  const workbook = XLSX.read(csvContent, { type: "string" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  console.log(`📈 Parse de ${data.length} linhas.`);

  const chats: ChatsI[] = (data as any[])
    .filter((item) => {
      return ![
        "LinkedIn Member",
        "LinkedIn Talent Solutions",
        "Sponsored Conversation",
      ].includes(item.FROM);
    })
    .map((row) => ({
      id: row["CONVERSATION ID"],
      nome: row["FROM"],
      to: row["TO"],
      mensagem: clearMessage(row["CONTENT"]),
      linkedinUrl:
        row["RECIPIENT PROFILE URLS"] ===
        "https://www.linkedin.com/in/pedro-esquerdo"
          ? row["SENDER PROFILE URL"]
          : row["RECIPIENT PROFILE URLS"],
    }));

  const agrupadoMap = chats.reduce<Record<string, GroupChatI>>((acc, msg) => {
    const isPedroSender = msg.nome === "Pedro Esquerdo";
    if (!acc[msg.id]) {
      acc[msg.id] = {
        id: msg.id,
        name: isPedroSender ? msg.to : msg.nome,
        linkedinUrl: msg.linkedinUrl,
        messages: [],
      };
    }

    acc[msg.id].messages.push({
      content: msg.mensagem,
      from: isPedroSender ? "Pedro" : msg.nome.split(" ")[0],
    });

    return acc;
  }, {});

  const groupChat: GroupChatI[] = Object.values(agrupadoMap);

  return groupChat;
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function getBatchSize(groupChatLength: number): number {
  if (groupChatLength <= 20) return groupChatLength; // tudo de uma vez
  if (groupChatLength <= 200) return 50;
  if (groupChatLength <= 1000) return 100;
  if (groupChatLength <= 2000) return 250;
  if (groupChatLength <= 3000) return 300;
  if (groupChatLength <= 4000) return 400;
  if (groupChatLength <= 5000) return 500;

  return 750; // acima de 5000, divide em 750
}