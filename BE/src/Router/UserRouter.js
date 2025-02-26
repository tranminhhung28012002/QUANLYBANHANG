import { Router } from "express";
import {
  showUsers,
  addUser,
  LoginUser,
  LogoutUser,
  getMe,
} from "../controllers/UserController.js";
import { checkEmailMiddleware } from "../middlewares/userMiddlewares.js";
import { searchController } from "../controllers/searchController.js";
import { verifyAdmin } from "../middlewares/verifyAdminMiddlewares.js";

const UserRouter = Router();

// API để lấy danh sách người dùng
UserRouter.get("/users", showUsers);
// API để thêm người dùng
UserRouter.get("/me", verifyAdmin, getMe);
UserRouter.post("/users", checkEmailMiddleware, addUser);
//Đăng nhập
UserRouter.post("/loginUser", LoginUser);
UserRouter.post("/logoutUser", LogoutUser);
//tim kiem
UserRouter.get("/search", searchController);
export default UserRouter;
