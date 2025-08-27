import * as cheerio from "cheerio";

export function clearMessage(html: string) {
  if (!html) return "";
  const $ = cheerio.load(html.toString());
  let texto = $.text(); 
  texto = texto.replace(/\s+/g, " ").trim(); 
  return texto;
}
