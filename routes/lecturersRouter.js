import express from "express";
import { getAllLecturers, addLecture, deleteLecture } from "../controllers/lecturerController.js";

const lecturersRouter = express.Router();

lecturersRouter.get('/', getAllLecturers);
lecturersRouter.post('/add-lecture', addLecture);
lecturersRouter.post('/delete-lecture/:id', deleteLecture);

export default lecturersRouter;