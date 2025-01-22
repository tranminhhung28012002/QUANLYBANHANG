import { connectToDatabase } from "../service/database.js";

export const getBooks = async () => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query("SELECT * FROM Books");
    return result.recordset;
  } catch (err) {
    console.error("Error fetching books:", err.message || err);
    throw err;
  }
};
