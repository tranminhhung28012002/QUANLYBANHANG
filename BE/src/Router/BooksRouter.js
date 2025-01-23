import { Router } from "express";
import { showBooksAll, showBooksPage } from "../controllers/booksController.js";

const BooksRouter = Router();

// API để lấy danh sách sach
BooksRouter.get("/books", showBooksPage);
BooksRouter.get("/booksshow", showBooksAll);
export default BooksRouter;
