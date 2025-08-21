import * as XLSX from "xlsx";
import { GroupChatI, ChatsI } from "../types";
import { clearMessage } from "../utils/clearMessage";
import { Request, Response } from "express";
import { removeFilesInFolder } from '../utils/removeFilesInFolder';
import { GeminiAIService } from '../service/geminiClient';
import { validateFormatFile } from '../utils/validateFormatFile';

export async function uploadFile(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }

   await validateFormatFile(req.file)

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const linhas: string[] = XLSX.utils
      .sheet_to_csv(sheet)
      .split("\n")
      .filter((linha) => linha.trim());

    const chats: ChatsI[] = linhas.map((linha) => {
      const col = linha.split(/,(?! )/);
      return {
        id: col[0]?.trim() || "",
        nome: col[2]?.trim() || "",
        mensagem: clearMessage(col[8]?.trim() || ""),
      };
    });

    const agrupadoMap = chats.reduce<Record<string, GroupChatI>>((acc, msg) => {
      if (!acc[msg.nome]) {
        acc[msg.nome] = {
          name: msg.nome,
          messages: [],
        };
      }

      acc[msg.nome].messages.push({ message: msg.mensagem });

      return acc;
    }, {});
    const groupChat: GroupChatI[] = Object.values(agrupadoMap);

    const geminiService = new GeminiAIService();

    const result = await geminiService.getResponse(groupChat);
    removeFilesInFolder("uploads");

    return res.status(201).json(result);
  } catch (err) {
    console.error("Erro ao processar arquivo:", err);
    return res.status(500).json({ error: err || "Erro ao processar a planilha" });
  }
}
