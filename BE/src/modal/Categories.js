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
