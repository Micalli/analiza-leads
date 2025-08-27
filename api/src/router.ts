import { Router } from "express";
import { uploadFile } from "./useCases/upload";
import multer from "multer";
import { getHistory } from './useCases/getHistory';
import { getAnalyzeById } from './useCases/getAnalyzeById';
import { deleteAnalyzeById } from './useCases/deleteAnalyzeById';

export const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.post("/upload", upload.single("file"), uploadFile);

router.get("/history", getHistory);

router.get("/analyse/:analyseId", getAnalyzeById);

router.delete("/analyse/:analyseId", deleteAnalyzeById);


