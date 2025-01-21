import { connectToDatabase } from "../service/database.js";

export const SearchModal = async (title, author) => {
  try {
    const pool = await connectToDatabase();
    let query = `SELECT * FROM Books WHERE 1=1`;
    if (title && title.trim() !== "") {
      query += ` AND Title LIKE '%${title}%'`;
    }

    if (author && author.trim() !== "") {
      query += ` AND Author LIKE '%${author}%'`;
    }
    const result = await pool.request().query(query);
    const search = result.recordset;
    return search;
  } catch (error) {
    throw error;
  }
};
