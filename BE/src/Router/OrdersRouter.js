import { Router } from "express";
import {
  createOrderControllerPaypal,
  paymentCancelController,
  paymentSuccessController,
} from "../controllers/paypalController.js";
import {
  createOrderController,
  getOrderController,
} from "../controllers/orderdetailController.js";
const OrdersRouter = Router();
OrdersRouter.get("/showListOrder/:UserID", getOrderController);
OrdersRouter.post("/create-order", createOrderControllerPaypal);
OrdersRouter.post("/create", createOrderController);
OrdersRouter.post("/success", paymentSuccessController);
OrdersRouter.get("/cancel", paymentCancelController);
export default OrdersRouter;
