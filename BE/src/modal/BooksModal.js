import { connectToDatabase } from "../service/database.js";

export const getBooks = async (page = 1, limit = 10) => {
  try {
    const pool = await connectToDatabase();
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM Books ORDER BY created_at DESC
      OFFSET ${offset} ROWS
      FETCH NEXT ${limit} ROWS ONLY`;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("Error fetching books:", err.message || err);
    throw err;
  }
};

export const countBooks = async () => {
  const pool = await connectToDatabase();
  try {
    const totalResult = await pool
      .request()
      .query("SELECT COUNT(*) AS total FROM Books");
    const total = totalResult.recordset[0].total;
    return total;
  } catch (error) {
    throw error;
  }
};

export const showBooks = async () => {
  try {
    const pool = await connectToDatabase();
    const query = `SELECT * FROM Books`;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};
