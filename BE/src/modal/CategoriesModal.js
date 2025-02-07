import { connectToDatabase } from "../service/database.js";

export const getCategories = async () => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query("SELECT * FROM Categories");
    return result.recordsets[0];
  } catch (error) {
    console.error("Error fetching users:", error.message || error);
    throw new Error("Khong tim thay muc luc");
  }
};

export const BooksCategories = async (CategoryID) => {
  try {
    const pool = await connectToDatabase();
    const query = `SELECT b.BookID, b.Title , b.Author,b.Img, b.created_at,b.Price , c.CategoryName , c.CategoryID   from Books b , Categories c where c.CategoryID = b.CategoryID and c.CategoryID = '${CategoryID}'`;
    const result = await pool.request().query(query);
    return result.recordsets[0];
  } catch (error) {
    console.log(error);
    throw new Error("Khong tim thay sach cung muc luc");
  }
};
