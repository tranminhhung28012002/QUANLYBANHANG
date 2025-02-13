import { connectToDatabase } from "../service/database.js";

//show toàn bộ danh sách ra theo trang
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
//đếm tổng số lượng sách trong kho
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

//show toàn bộ danh sách
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

//kiểm tra số lượng sách
export const getQuantityBooks = async (BookID) => {
  try {
    const pool = await connectToDatabase();
    const stockQuery = `SELECT Quantity FROM Books WHERE BookID = '${BookID}'`;
    const resultSockQuery = await pool.request().query(stockQuery);
    return resultSockQuery.recordset[0];
  } catch (error) {
    console.log(error);
  }
};

//thêm sách vào giỏ hàng
export const AddCartBooks = async (UserID, BookID, quantity) => {
  try {
    const pool = await connectToDatabase();
    let query = `SELECT * FROM Cart WHERE UserID = '${UserID}' AND BookID = '${BookID}'`;
    const result = await pool.request().query(query);
    if (result.recordset.length > 0) {
      const updatequery = `UPDATE Cart SET Quantity = Quantity + '${quantity}' WHERE UserID = '${UserID}' AND BookID = '${BookID}'`;
      await pool.request().query(updatequery);
    } else {
      const insertQuery = `
      INSERT INTO Cart (UserID, BookID, Quantity, CreatedDate)
      VALUES ('${UserID}', '${BookID}', '${quantity}', GETDATE())
    `;
      await pool.request().query(insertQuery);
    }
    return { success: true, message: "Book added to cart successfully." };
  } catch (error) {
    return { success: false, message: "Failed to add book to cart.", error };
  }
};

//cập nhật lại số lượng sách trong giỏ hàng
export const increaseCartBook = async (UserID, BookID, quantity) => {
  try {
    const pool = await connectToDatabase();
    let query = `UPDATE Cart SET Quantity ='${quantity}' WHERE UserID = '${UserID}' AND BookID = '${BookID}'`;
    await pool.request().query(query);
    return { success: true, message: "Number of books successfully updated" };
  } catch (error) {}
};

//chi tiết sách
export const DetailBooks = async (BookID) => {
  try {
    const pool = await connectToDatabase();
    const query = `select b.BookID, b.Title , b.Price,b.sales , b.Quantity, c.CategoryName , b.CategoryID , b.Author ,b.created_at , b.Description , b.Img from Books b , Categories c  where c.CategoryID = b.CategoryID AND b.BookID = '${BookID}'`;
    const result = await pool.request().query(query);
    return result.recordset[0];
  } catch (error) {
    throw new Error("Không tìm thấy sách");
  }
};
