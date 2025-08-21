import { Router } from "express";
import { uploadFile } from "./useCases/upload";
import multer from "multer";

export const router = Router();
const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.single("file"), uploadFile);
