import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdminMiddlewares.js";
import {
  BestSellingBooksController,
  BestUserBuyBooksController,
  CreateBooksController,
  DeleteBooksController,
  EditBooksController,
} from "../controllers/AdminController.js";

const AdminRouter = Router();

AdminRouter.post("/createBooks", verifyAdmin, CreateBooksController);
AdminRouter.put("/editBooks/:BookID", verifyAdmin, EditBooksController);
AdminRouter.delete("/deleteBook/:BookID", verifyAdmin, DeleteBooksController);
AdminRouter.get("/best-selling", verifyAdmin, BestSellingBooksController);
AdminRouter.get("/bestUserBuyBook", verifyAdmin, BestUserBuyBooksController);

export default AdminRouter;
