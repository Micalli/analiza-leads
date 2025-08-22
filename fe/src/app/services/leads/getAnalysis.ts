import { httpClient } from "../httpClient";

export async function getAnalysis() {

  const { data } = await httpClient.get("/history");

  return data;
}
