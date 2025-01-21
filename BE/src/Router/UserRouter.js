import { Router } from "express";
import {
  showUsers,
  addUser,
  LoginUser,
  LogoutUser,
} from "../controllers/UserController.js";
import { checkEmailMiddleware } from "../middlewares/userMiddlewares.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddlewares.js";
import { searchController } from "../controllers/searchController.js";

const UserRouter = Router();

// API để lấy danh sách người dùng
UserRouter.get("/users", showUsers);
// API để thêm người dùng
UserRouter.post("/users", checkEmailMiddleware, addUser);
//Đăng nhập
UserRouter.post("/loginUser", LoginUser);
UserRouter.post("/logoutUser", LogoutUser);
UserRouter.get("/search", searchController);
export default UserRouter;
