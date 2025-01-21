import { Router } from "express";
import { categories } from "../controllers/categoriesController.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddlewares.js";

const CategoriesRouter = Router();

CategoriesRouter.get("/categories", verifyTokenMiddleware, categories);

export default CategoriesRouter;
