import * as XLSX from "xlsx";
import {  Messages } from "../types";
import { clearMessage } from "../utils/clearMessage";
import { Request, Response } from "express";
import { GeminiAIService } from "../service/ai";

export async function uploadFile(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const linhas: string[] = XLSX.utils
      .sheet_to_csv(sheet)
      .split("\n")
      .filter((linha) => linha.trim());

    const mensagens: Messages[] = linhas.map((linha) => {
      const col = linha.split(/,(?! )/);
      return {
        id: col[0]?.trim() || "",
        nome: col[2]?.trim() || "",
        mensagem: clearMessage(col[8]?.trim() || ""),
      };
    });

    const geminiService = new GeminiAIService();


    const result = await geminiService.getResponse(mensagens);

    return res.status(201).json(result); 
  } catch (err) {
    console.error("Erro ao processar uploadFile:", err);
    return res.status(500).json({ error: "Erro ao processar a planilha" });
  }
}
