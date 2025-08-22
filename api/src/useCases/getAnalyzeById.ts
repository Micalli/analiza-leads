import { Request, Response } from "express";
import { leadStore } from '../store/analysisLead';

export function getAnalyzeById(req: Request, res: Response) {
  try {
    const { analyseId } = req.params;

    if (!analyseId) {
      return res.status(400).json({ error: "ID da análise é obrigatório" });
    }

    const analysis = leadStore.get(analyseId);
    console.log("🚀 ~ getAnalyzeById ~ analysis:", analysis)

    if (!analysis) {
      return res.status(404).json({ error: "Análise não encontrada" });
    }

    return res.json(analysis);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar análise" });
  }
}
