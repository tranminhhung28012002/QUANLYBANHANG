import { Router } from "express";
import {
  deleteShopping,
  getShoppingCart,
} from "../controllers/shoppingController.js";

const ShoppingRouter = Router();
ShoppingRouter.get("/shopping/:UserID", getShoppingCart);
ShoppingRouter.delete("/shoppingdelete/:UserID/:BookID", deleteShopping);
export default ShoppingRouter;
