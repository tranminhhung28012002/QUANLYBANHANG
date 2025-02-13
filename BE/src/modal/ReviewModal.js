import { connectToDatabase } from "../service/database.js";

//lấy thông tin người review dựa vào sách
export const getUserReviewBook = async (BookID) => {
  try {
    const pool = await connectToDatabase();
    const query = `select u.Username , r.Rating , r .Comment from Reviews r , Books b , Users u where r.BookID = b.BookID and r.UserID = u.UserID and  b.BookID = '${BookID}'`;
    const result = await pool.request().query(query);
    return result.recordsets[0];
  } catch (error) {
    throw new Error("Khong co Review", error);
  }
};
