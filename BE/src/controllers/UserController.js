import { getUsers, createUser, loginUser } from "../modal/userModal.js";
import { signToken } from "../until/jwt.js";
import { config } from "dotenv";
config();

export const showUsers = async (req, res) => {
  const users = await getUsers();
  res.json(users);
};

export const accesstoken = async (user_id) => {
  try {
    const token = await signToken({
      payload: { user_id },
      key: process.env.JWTKEY,
      option: JSON.parse(process.env.HET || "{}"),
    });
    console.log(token);
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error; // Ném lỗi nếu có vấn đề
  }
};

export const addUser = async (req, res) => {
  const { username, password, fullName, email, phone, address } = req.body;
  try {
    const user = await createUser(
      username,
      password,
      fullName,
      email,
      phone,
      address
    );

    res.status(201).json({
      message: "Đăng ký thành công",
      user,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const LoginUser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await loginUser(Email, Password);
    const access_token = await accesstoken(user.UserID);
    res.status(200).json({
      message: "Đăng nhập thành công",
      access_token,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};
