import { httpClient } from "../httpClient";

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await httpClient.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}
