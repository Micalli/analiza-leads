import { Request, Response } from "express";
import { deleteAnalyseById } from "../database/repository/deleteAnalyzeById";

export async function deleteAnalyzeById(req: Request, res: Response) {
  try {
    const { analyseId } = req.params;

    if (!analyseId) {
      return res.status(400).json({ error: "ID da análise é obrigatório" });
    }

    await deleteAnalyseById(analyseId);

    return res.status(200).json({ message: "Análise deletada com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao deletar análise" });
  }
}
