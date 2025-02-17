import { Router } from "express";
import {
  createOrderControllerPaypal,
  paymentCancelController,
  paymentSuccessController,
} from "../controllers/paypalController.js";
import {
  checkQuantityController,
  createOrderController,
  getOrderController,
  showListOrderController,
} from "../controllers/orderdetailController.js";
const OrdersRouter = Router();
OrdersRouter.get("/showListOrder/:UserID", getOrderController);
OrdersRouter.post("/create-order", createOrderControllerPaypal);
OrdersRouter.post("/checkQuantity", checkQuantityController);
OrdersRouter.post("/create", createOrderController);
OrdersRouter.post("/success", paymentSuccessController);
OrdersRouter.get("/cancel", paymentCancelController);
OrdersRouter.get("/getOrderDetail", showListOrderController);
export default OrdersRouter;
