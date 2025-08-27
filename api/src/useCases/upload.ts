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
import { parse } from "csv-parse/sync";

export async function uploadFile(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }
    await validateFormatFile(req.file);
    const { analyzeName } = req.body;

    const filePath = req.file.path;
    const content = await fs.promises.readFile(filePath, "utf8");

    const parsedCsvFile = await parseLinkedinCsv(content);
    const chats: ChatsI[] = parsedCsvFile
      .map((item: any) => {
        if (
          item["FROM"] === "LinkedIn Member" ||
          item["FROM"] === "LinkedIn Talent Solutions" ||
          item["FROM"] === "Sponsored Conversation" ||
          item["FROM"] === "Pedro Esquerdo"
        ) {
          return;
        }
        return {
          id: item["CONVERSATION ID"]?.trim() || "",
          nome: item["FROM"]?.trim() || "",
          linkedinUrl: item["SENDER PROFILE URL"]?.trim() || "",
          mensagem: clearMessage(item["CONTENT"]?.trim() || ""),
        };
      })
      .filter((item: any): item is ChatsI => Boolean(item)); // remove undefined e força o tipo

    const agrupadoMap = chats.reduce<Record<string, GroupChatI>>((acc, msg) => {
      if (!acc[msg.nome]) {
        acc[msg.nome] = {
          name: msg.nome,
          linkedinUrl: msg.linkedinUrl,
          messages: [],
        };
      }

      acc[msg.nome].messages.push({ message: msg.mensagem });

      return acc;
    }, {});
    const groupChat: GroupChatI[] = Object.values(agrupadoMap);

    const result = await getAnalyseFromLeadMessages(groupChat);

    const analyseId = uuidv4();
    const newAnalysis = {
      id: analyseId,
      fileName: analyzeName || req.file.originalname,
      analyzedAt: new Date().toISOString(),
      analysis: result,
    };

    await saveAnalysisToFile(analyseId, newAnalysis);
    return res.status(201).json(parsedCsvFile);
  } catch (err) {
    console.error("Erro ao processar arquivo:", err);
    return res
      .status(500)
      .json({ error: err || "Erro ao processar a planilha" });
  } finally {
    removeFilesInFolder("uploads");
  }
}

async function parseLinkedinCsv(csvContent: string) {
  const records = parse(csvContent, { columns: true, skip_empty_lines: true });
  return records.map((row: any) => ({
    "CONVERSATION ID": row["CONVERSATION ID"],
    "CONVERSATION TITLE": row["CONVERSATION TITLE"],
    FROM: row["FROM"],
    "SENDER PROFILE URL": row["SENDER PROFILE URL"] || null,
    TO: row["TO"],
    "RECIPIENT PROFILE URLS": row["RECIPIENT PROFILE URLS"],
    DATE: row["DATE"],
    SUBJECT: row["SUBJECT"],
    CONTENT: row["CONTENT"],
    FOLDER: row["FOLDER"],
    "IS MESSAGE DRAFT": row["IS MESSAGE DRAFT"],
  }));
}

// const EXPECTED_COLUMNS = 11;

// async function cleanAndParseCsv(filePath: string) {
//   let raw = await fs.promises.readFile(filePath, "utf8");

//   // 🔹 Garante quebra após cada INBOX,No (LinkedIn usa isso como final de registro)
//   raw = raw.replace(/,INBOX,No\s*/g, ",INBOX,No\n");

//   // 🔹 Divide em linhas
//   const lines = raw.split("\n").filter((l) => l.trim() !== "");

//   const fixedLines: string[] = [];
//   let buffer = "";

//   for (const line of lines) {
//     const current = buffer ? buffer + line : line;

//     // Conta colunas (simples: split por vírgula, mas poderia ser mais robusto com regex)
//     const columnCount = current.split(",").length;

//     if (columnCount === EXPECTED_COLUMNS) {
//       fixedLines.push(current);
//       buffer = ""; // limpa buffer
//     } else {
//       // ainda não chegou em 11 colunas → acumula
//       buffer = current + ",";
//     }
//   }

//   // sobrescreve com linhas corrigidas
//   await fs.promises.writeFile(filePath, fixedLines.join("\n"), "utf8");

//   // 🔹 Agora parseia de fato
//   const rows: any[] = [];
//   await new Promise<void>((resolve, reject) => {
//     fs.createReadStream(filePath)
//       .pipe(parse({ headers: true, ignoreEmpty: true }))
//       .on("error", reject)
//       .on("data", (row) => rows.push(row))
//       .on("end", () => resolve());
//   });

//   return rows;
// }
