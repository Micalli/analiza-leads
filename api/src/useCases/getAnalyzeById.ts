import { Request, Response } from "express";
import { leadStore } from '../store/analysisLead';
import { getAnalysisById } from '../database/repository/getAnalyzeById';

export async function getAnalyzeById(req: Request, res: Response) {
  try {
    const { analyseId } = req.params;

    if (!analyseId) {
      return res.status(400).json({ error: "ID da análise é obrigatório" });
    }

    const analyze = await getAnalysisById(analyseId);

    if (!analyze) {
      return res.status(404).json({ error: "Análise não encontrada" });
    }

    return res.json(analyze);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar análise" });
  }
}
