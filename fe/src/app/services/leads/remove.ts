import { httpClient } from "../httpClient";

export async function remove(analyzeId: string) {
  const { data } = await httpClient.delete(`analyse/${analyzeId}`);

  return data;
}
