import { Router } from "express";
import { uploadFile } from "./useCases/upload";
import multer from "multer";
import { getHistory } from "./useCases/getHistory";
import { getAnalyzeById } from "./useCases/getAnalyzeById";
import { deleteAnalyzeById } from "./useCases/deleteAnalyzeById";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
});
router.post("/upload", upload.single("file"), uploadFile);

router.get("/history", getHistory);

router.get("/analyse/:analyseId", getAnalyzeById);

router.delete("/analyse/:analyseId", deleteAnalyzeById);
