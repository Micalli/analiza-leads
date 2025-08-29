import { Request, Response } from "express";
import { getAllAnalyses } from '../database/repository/getAllAnalyses';

export async function getHistory(req: Request, res: Response) {
  try {
    const history = await getAllAnalyses();
    return res.json(history);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar histórico" });
  }
}
