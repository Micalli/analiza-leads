import { promises as fs } from "fs";
import path from "path";

// caminho do arquivo JSON

// função para salvar a análise
export async function saveAnalysisToFile(analyseId: string, data: any) {
  const ANALYSES_FILE = path.join(
    __dirname,
    `../analysis/analyse-${analyseId}.json`
  );
 

  // salva de volta no arquivo
  await fs.writeFile(ANALYSES_FILE, JSON.stringify(data, null, 2), "utf-8");
}
