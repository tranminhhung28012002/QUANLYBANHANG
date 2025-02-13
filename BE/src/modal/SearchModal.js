import { connectToDatabase } from "../service/database.js";

//tìm kiếm sách
export const SearchModal = async (query) => {
  try {
    const pool = await connectToDatabase();
    let searchQuery = `SELECT * FROM Books WHERE 1=1`;
    if (query && query.trim() !== "") {
      searchQuery += ` AND (Title LIKE '%${query}%' OR Author LIKE '%${query}%')`;
    }
    const result = await pool.request().query(searchQuery);
    const search = result.recordset;
    return search;
  } catch (error) {
    throw error;
  }
};
