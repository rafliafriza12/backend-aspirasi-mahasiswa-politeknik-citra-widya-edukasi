import express from "express";
import { getAllRespondents, getDetailRespondent, createRespondent } from "../controllers/respondentController.js";
// import { upload } from "../middleware/index.js";

const respondentsRouter = express.Router();

// Mendapatkan semua responden
respondentsRouter.get("/", getAllRespondents);

// Mendapatkan detail responden berdasarkan ID
respondentsRouter.get("/:id", getDetailRespondent);

// Menambahkan responden baru (dengan upload file)
respondentsRouter.post("/create-respondent", createRespondent);

export default respondentsRouter;