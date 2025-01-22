import { Router } from "express";
import { showBooks } from "../controllers/booksController.js";

const BooksRouter = Router();

// API để lấy danh sách sach
BooksRouter.get("/books", showBooks);
export default BooksRouter;
