import { Router } from "express";
import {
  addBookCart,
  showBooksAll,
  showBooksPage,
} from "../controllers/booksController.js";

const BooksRouter = Router();

// API để lấy danh sách sach
BooksRouter.get("/books", showBooksPage);
BooksRouter.get("/booksshow", showBooksAll);
BooksRouter.post("/cart/add", addBookCart);
export default BooksRouter;
