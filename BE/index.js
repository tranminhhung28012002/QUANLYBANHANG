import { config } from "dotenv";
import { createServer } from "http";
import cors from "cors";
import UserRouter from "./src/Router/UserRouter.js";
import express from "express";

const app = express();
config();

const httpServer = createServer(app);
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());
const port = process.env.PORT || 3000;
app.use("/api", UserRouter);
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
