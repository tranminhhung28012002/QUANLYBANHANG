import { config } from "dotenv";
import { createServer } from "http";
import cors from "cors";
import UserRouter from "./src/Router/UserRouter.js";
import express from "express";
import CategoriesRouter from "./src/Router/CategoriesRouter.js";
import cookieParser from "cookie-parser";
import BooksRouter from "./src/Router/BooksRouter.js";
import ShoppingRouter from "./src/Router/ShoppingRouter.js";
import ReviewRouter from "./src/Router/ReviewRouter.js";
import OrdersRouter from "./src/Router/OrdersRouter.js";
import AdminRouter from "./src/Router/AdminRouter.js";

const app = express();
config();

const httpServer = createServer(app);
app.use(
  cors({
    origin: "http://localhost:3003",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 3000;
app.use("/api", UserRouter);
app.use("/api", CategoriesRouter);
app.use("/api", BooksRouter);
app.use("/api", ShoppingRouter);
app.use("/api", ReviewRouter);
app.use("/api", OrdersRouter);
app.use("/api", AdminRouter);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
