import { Router } from "express";
import {
  showUsers,
  addUser,
  LoginUser,
} from "../controllers/UserController.js";
import { checkEmailMiddleware } from "../middlewares/userMiddlewares.js";

const UserRouter = Router();

// API để lấy danh sách người dùng
UserRouter.get("/users", showUsers);
// API để thêm người dùng
UserRouter.post("/users", checkEmailMiddleware, addUser);
//Đăng nhập
UserRouter.post("/loginUser", LoginUser);
export default UserRouter;
