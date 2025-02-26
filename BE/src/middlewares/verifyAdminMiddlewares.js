import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { getUser } from "../modal/userModal.js";

config();
export const verifyAdmin = async (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    if (!access_token) {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }

    const decoded = jwt.verify(access_token, process.env.JWTKEY);

    const user = await getUser(decoded.user_id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: "Phiên đăng nhập không hợp lệ" });
  }
};
