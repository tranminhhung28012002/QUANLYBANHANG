import { Router } from "express";
import {
  createOrderController,
  paymentCancelController,
  paymentSuccessController,
} from "../controllers/paypalController.js";
const OrdersRouter = Router();
OrdersRouter.post("/create-order", createOrderController);
OrdersRouter.post("/success", paymentSuccessController);
OrdersRouter.get("/cancel", paymentCancelController);
export default OrdersRouter;
