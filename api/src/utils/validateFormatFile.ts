export async function validateFormatFile(file: Express.Multer.File) {
  if (!file) return;
  // Tipos aceitos de Excel
  const allowedMimes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
    "text/csv", // .csv
    "application/csv",
  ];

  const allowedExts = [".xlsx", ".xls", ".csv"];

  const path = require("path");
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedMimes.includes(file.mimetype) || !allowedExts.includes(ext)) {
    throw new Error(
      "Formato inválido, envie apenas arquivos Excel (.xls, .xlsx ou .csv)"
    );
  }
}
