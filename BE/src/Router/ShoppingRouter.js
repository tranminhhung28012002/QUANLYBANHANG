import { Router } from "express";
import {
  countShoppingController,
  deleteShopping,
  getShoppingCart,
} from "../controllers/shoppingController.js";

const ShoppingRouter = Router();
ShoppingRouter.get("/shopping/:UserID", getShoppingCart);
ShoppingRouter.delete("/shoppingdelete/:UserID/:BookID", deleteShopping);
ShoppingRouter.get("/shoppingCount/:UserID", countShoppingController);
export default ShoppingRouter;
