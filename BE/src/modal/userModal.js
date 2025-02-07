import { sql, connectToDatabase } from "../service/database.js";
import bcrypt from "bcryptjs";
export const getUsers = async () => {
  try {
    console.log(connectToDatabase);
    const pool = await connectToDatabase();
    const result = await pool.request().query("SELECT * FROM Users");
    return result.recordset;
  } catch (err) {
    console.error("Error fetching users:", err.message || err);
    throw err;
  }
};

export const createUser = async (
  username,
  password,
  fullName,
  email,
  phone,
  address
) => {
  const role = "KHACHHANG";
  try {
    const pool = await connectToDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO Users (Username, Password, FullName, Email, Phone, Address, Role)
      VALUES ('${username}', '${hashedPassword}', '${fullName}', '${email}', '${phone}', '${address}', '${role}')
    `;
    await pool.request().query(query);
    const user = { username, fullName, email, phone, address };
    return user;
  } catch (err) {
    console.log("lỗi", err);
    throw new Error("Đăng ký thất bại");
  }
};
export const loginUser = async (email, password) => {
  try {
    const pool = await connectToDatabase();
    const query = `SELECT * FROM Users WHERE EMAIL = '${email}'`;
    const result = await pool.request().query(query);
    const user = result.recordset[0];
    if (result.recordset.length === 0) {
      throw new Error("Email không tồn tại");
    } else {
      const isMatch = await bcrypt.compare(password, user.Password);
      if (!isMatch) {
        throw new Error("Mật khẩu sai");
      }
    }
    return user;
  } catch (err) {
    throw err;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const pool = await connectToDatabase();
    const query = `SELECT COUNT(*) AS count FROM Users WHERE Email = '${email}'`;
    const result = await pool.request().query(query);
    return result.recordset[0].count > 0;
  } catch (err) {
    console.error("Lỗi khi kiểm tra email:", err);
    throw new Error("Lỗi khi kiểm tra email");
  }
};
