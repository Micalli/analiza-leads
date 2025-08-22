import express from "express";
import dotenv from "dotenv";
import { router } from './router';
import cors from "cors";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(router);
app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
