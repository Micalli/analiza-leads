import { httpClient } from "../httpClient";

export async function uploadFile(file: File, analyzeName?: string) {
  console.log("🚀 ~ uploadFile ~ analyzeName:", analyzeName)
  const formData = new FormData();
  formData.append("file", file);
  if (analyzeName) formData.append("analyzeName", analyzeName);
  


  const { data } = await httpClient.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}
