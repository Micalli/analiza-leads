import { Request, Response } from "express";
import { leadStore } from "../store/analysisLead";

export async function getHistory(req: Request, res: Response) {
  try {
    const history = Array.from(leadStore.values()); // transforma Map em array
    return res.json(history);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar histórico" });
  }
}
