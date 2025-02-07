import { Router } from "express";
import {
  categories,
  getBooksCategories,
} from "../controllers/categoriesController.js";

const CategoriesRouter = Router();

CategoriesRouter.get("/categories", categories);
CategoriesRouter.get("/bookcategories/:CategoryID", getBooksCategories);
export default CategoriesRouter;
