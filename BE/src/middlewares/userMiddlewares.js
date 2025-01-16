import { checkEmailExists } from "../modal/userModal.js";

export const checkEmailMiddleware = async (req, res, next) => {
  const { email } = req.body;

  try {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }
    next();
  } catch (err) {
    console.error("Lỗi khi kiểm tra email tồn tại:", err);
    res.status(500).json({
      message: "Lỗi khi kiểm tra email",
    });
  }
};
