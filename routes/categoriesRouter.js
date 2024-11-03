import { getAllCategories, addCategory, deleteCategory } from "../controllers/categoryController.js";
import express from "express";

const categoriesRouter = express.Router();

categoriesRouter.get('/', getAllCategories);
categoriesRouter.post('/add-category', addCategory);
categoriesRouter.post('/delete-category/:id', deleteCategory);

export default categoriesRouter;