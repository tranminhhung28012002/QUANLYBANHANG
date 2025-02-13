import { Router } from "express";
import {
  addBookCart,
  increaseCartBookController,
  ProductDetailBook,
  showBooksController,
} from "../controllers/booksController.js";

const BooksRouter = Router();

// API để lấy danh sách sach
BooksRouter.get("/books", showBooksController);
BooksRouter.post("/cart/add", addBookCart);
BooksRouter.patch("/cart/update", increaseCartBookController);
BooksRouter.get("/detailBook/:BookID", ProductDetailBook);
export default BooksRouter;
