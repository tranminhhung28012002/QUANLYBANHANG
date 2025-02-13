import { connectToDatabase } from "../service/database.js";

//tạo hóa đơn
export const createOrders = async (OrderID, UserID, TotalPrice, Status) => {
  try {
    const pool = await connectToDatabase();
    const query = `
        INSERT INTO Orders (OrderID,UserID,TotalPrice,Status)
        VALUES ('${OrderID}','${UserID}', '${TotalPrice}', '${Status}')
      `;
    const result = await pool.request().query(query);
    return result.recordsets[0];
  } catch (error) {
    throw new Error("Add failed order");
  }
};

//lấy hóa đơn dựa vào userID
export const getOrder = async (UserID) => {
  try {
    const pool = await connectToDatabase();
    const query = `SELECT * FROM Orders WHERE UserID = ${UserID}`;
    const result = await pool.request().query(query);
    return result.recordsets[0];
  } catch (error) {
    throw new Error("get failed order list");
  }
};
