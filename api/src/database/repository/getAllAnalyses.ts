import { promises as fs } from "fs";
import path from "path";

const ANALYSES_FOLDER = path.join(__dirname, "../analysis"); 

export async function getAllAnalyses() {
  try {
    const files = await fs.readdir(ANALYSES_FOLDER);

    // pega só os arquivos que seguem o padrão analyse-{id}.json
    const analyseFiles = files.filter(
      (f) => f.startsWith("analyse-") && f.endsWith(".json")
    );

    const analyses = await Promise.all(
      analyseFiles.map(async (file) => {
        const filePath = path.join(ANALYSES_FOLDER, file);
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
      })
    );

    analyses.sort(
      (a, b) =>
        new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime()
    );

    return analyses;
  } catch (err) {
    console.error("Erro ao ler análises:", err);
    return [];
  }
}
