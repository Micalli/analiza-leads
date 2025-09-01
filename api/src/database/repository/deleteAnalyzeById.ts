import { promises as fs } from "fs";
import path from "path";
const ANALYSES_FOLDER = path.join(__dirname, "../analysis"); 


export async function deleteAnalyseById(id: string): Promise<boolean> {
  try {
    const filePath = path.join(ANALYSES_FOLDER, `analyse-${id}.json`);
    await fs.unlink(filePath);
    console.log(`Análise ${id} deletada com sucesso.`);
    return true;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      console.warn(`Arquivo analyse-${id}.json não encontrado.`);
      return false;
    }
    console.error("Erro ao deletar análise:", err);
    throw err;
  }
}
