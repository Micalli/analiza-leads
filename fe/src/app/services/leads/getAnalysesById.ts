import type { AnalysisItem } from '../../../types';
import { httpClient } from "../httpClient";

export async function getAnalysesById(analyseId: string | undefined) {
  const { data } = await httpClient.get<AnalysisItem>(`/analyse/${analyseId}`);

  return data;
}
