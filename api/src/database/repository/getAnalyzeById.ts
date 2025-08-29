import { promises as fs } from "fs";
import path from "path";

const ANALYSES_FOLDER = path.join(__dirname, "../analysis"); 

export async function getAnalysisById(analyseId: string) {
  try {
    const filePath = path.join(ANALYSES_FOLDER, `analyse-${analyseId}.json`);
    const fileData = await fs.readFile(filePath, "utf-8");
    const analysis = JSON.parse(fileData);
    return analysis;
  } catch (err) {
    console.error(`Erro ao ler análise ${analyseId}:`, err);
    return null; 
  }
}
