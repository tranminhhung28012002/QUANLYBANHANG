import { connectToDatabase } from "../service/database.js";

export const createOrders = async (OrderID, UserID, TotalPrice, Status) => {
  try {
    const pool = await connectToDatabase();
    const query = `
        INSERT INTO Orders (OrderID,UserID,TotalPrice,Status)
        VALUES ('${OrderID}','${UserID}', '${TotalPrice}', '${Status}')
      `;
    const result = await pool.request().query(query);
    return result.recordset[0];
  } catch (error) {
    throw new Error("Tao hoa don that bai");
  }
};
