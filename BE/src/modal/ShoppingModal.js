import { connectToDatabase } from "../service/database.js";

export const getShopping = async (UserID) => {
  try {
    const pool = await connectToDatabase();
    const query = `SELECT c.CartID, b.BookID, b.Title,b.Img,  c.Quantity, b.Price, b.sales FROM Books b, Cart c WHERE c.BookID = b.BookID AND c.UserID = '${UserID}'`;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const removeShopping = async (UserID, BookID) => {
  try {
    const pool = await connectToDatabase();
    const query = `DELETE FROM Cart WHERE  UserID = '${UserID}' AND BookID = '${BookID}'`;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    return err;
  }
};
export const countShopping = async (UserID) => {
  try {
    const pool = await connectToDatabase();
    const query = `SELECT SUM(Quantity) as sumQuantity from Cart WHERE UserID = '${UserID}'`;
    const result = await pool.request().query(query);
    return result.recordset[0];
  } catch (error) {
    throw new Error("No item quantity found", error);
  }
};
