import { getUsers, createUser, loginUser } from "../modal/userModal.js";
import { signToken } from "../until/jwt.js";
import { config } from "dotenv";
config();

export const showUsers = async (req, res) => {
  const users = await getUsers();
  res.json(users);
};

export const accesstoken = async (user_id, Verify) => {
  try {
    const token = await signToken({
      payload: { user_id, Verify },
      key: process.env.JWTKEY,
      option: JSON.parse(process.env.HET || "{expiresIn:'1d'}"),
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
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
    const access_token = await accesstoken(user.UserID, user.Verify);
    res.cookie("access_token", access_token, {
      httpOnly: true,
    });
    if (user.Role === "ADMIN") {
      return res.status(200).json({
        message: "Đăng nhập admin thành công",
        access_token,
        redirect: "/admin",
        user: {
          Username: user.Username,
          FullName: user.FullName,
          Email: user.Email,
          Img: user.Img,
          Phone: user.Phone,
          Address: user.Address,
        },
      });
    } else {
    }
    res.status(200).json({
      message: "Đăng nhập thành công",
      access_token,
      user: {
        Username: user.Username,
        FullName: user.FullName,
        Email: user.Email,
        Img: user.Img,
        Phone: user.Phone,
        Address: user.Address,
      },
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      path: "/",
    });
    res.status(200).json({
      message: "Đăng xuất thành công",
    });
  } catch (err) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi đăng xuất",
    });
  }
};
