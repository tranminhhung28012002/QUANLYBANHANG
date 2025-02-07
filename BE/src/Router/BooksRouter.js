import { Router } from "express";
import {
  addBookCart,
  ProductDetailBook,
  showBooksController,
} from "../controllers/booksController.js";

const BooksRouter = Router();

// API để lấy danh sách sach
BooksRouter.get("/books", showBooksController);
BooksRouter.post("/cart/add", addBookCart);
BooksRouter.get("/detailBook/:BookID", ProductDetailBook);
export default BooksRouter;
