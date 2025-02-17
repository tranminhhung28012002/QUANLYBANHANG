import { connectToDatabase } from "../service/database.js";

//tạo hóa đơn
export const createOrders = async (OrderID, UserID, TotalPrice, Status) => {
  try {
    const pool = await connectToDatabase();
    const query = `
       INSERT INTO Orders (OrderID, UserID, TotalPrice, Status)
       VALUES ('${OrderID}', '${UserID}', '${TotalPrice}', '${Status}')
   `;
    await pool.request().query(query);
  } catch (error) {
    throw new Error("Tao hoa don that bai");
  }
};

//tạo hóa đơn chi tiết
export const createOrderDetail = async (OrderID, UserID) => {
  try {
    const pool = await connectToDatabase();
    const query = `INSERT INTO OrderDetails(OrderID,BookID,Quantity) 
                   SELECT o.OrderID,b.BookID, c.Quantity from Orders o , Users u , Books b , Cart c 
                   where o.UserID = u.UserID and  c.BookID =  b.BookID and o.OrderID = '${OrderID}' and u.UserID = '${UserID}'
 `;
    await pool.request().query(query);
  } catch (error) {}
};

//kiểm tra số lượng hàng trước khi thanh toán
export const checkQuantity = async (name) => {
  try {
    const pool = await connectToDatabase();
    const query = `SELECT Quantity FROM Books WHERE Title = '${name}'`;
    const stockResult = await pool.request().query(query);

    if (stockResult.recordset.length === 0) return null;
    return stockResult.recordset[0].Quantity;
  } catch (error) {
    return { message: "khong tim thay quantity cua name" };
  }
};

//cập nhật lại số lượng hàng sau khi thanh toán thành công
export const updateStockOrder = async (cartItems) => {
  const pool = await connectToDatabase();
  for (let item of cartItems) {
    const updateStockQuery = `
      UPDATE Books
      SET Quantity = Quantity - ${item.quantity}
      WHERE Title = '${item.name}'
    `;
    await pool.request().query(updateStockQuery);
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

//show toàn bộ sản phẩm trong hóa đơn
export const showListOrder = async (UserID, OrderID) => {
  try {
    const pool = await connectToDatabase();
    const query = `select b.BookID, b.Title ,b.Img,b.Description ,b.Price,b.sales,od.Quantity, (od.Quantity * b.Price) as total , u.Address , u.Email 
                   from Users u , Books b , OrderDetails od 
                   where od.BookID = b.BookID and od.OrderID = '${OrderID}' and u.UserID = '${UserID}'`;
    const result = await pool.request().query(query);
    console.log("result", result);
    return result.recordsets[0];
  } catch (error) {}
};
