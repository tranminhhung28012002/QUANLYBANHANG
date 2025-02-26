import { connectToDatabase } from "../service/database.js";

export const CreateBooks = async (
  Title,
  Author,
  Price,
  Quantity,
  Description,
  Img,
  CategoryID,
  Sales
) => {
  try {
    const pool = await connectToDatabase();
    const query = `
      INSERT INTO Books (Title, Author, Price, Quantity, Description, Img, CategoryID, Sales) 
      VALUES ('${Title}', '${Author}', ${Price}, ${Quantity}, N'${Description}', N'${Img}', ${CategoryID}, ${Sales})
    `;
    await pool.request().query(query);

    return { success: true, message: "Thêm sách thành công!" };
  } catch (error) {
    console.error("Lỗi khi thêm sách:", error);
    return { success: false, message: "Lỗi khi thêm sách!" };
  }
};

//chỉnh sửa sách
export const EditBooks = async (
  BookID,
  Title,
  Author,
  Price,
  Quantity,
  Description,
  Img,
  CategoryID,
  Sales
) => {
  try {
    const pool = await connectToDatabase();
    const query = `UPDATE Books SET Title ='${Title}' , Author = '${Author}' , Price= '${Price}',Quantity= '${Quantity}',
                   Description= '${Description}',Img ='${Img}', CategoryID='${CategoryID}',sales='${Sales}' Where BookID= '${BookID}'`;
    await pool.request().query(query);
    return { success: true, message: "Chinh sách thành công!" };
  } catch (error) {
    return { success: false, message: "Lỗi khi edit sách!" };
  }
};

//xóa sáchsách
export const DeleteBooks = async (BookID) => {
  try {
    const pool = await connectToDatabase();
    const query = `DELETE FROM Books WHERE BookID = '${BookID}' `;
    await pool.request().query(query);
    return { success: true, message: "Xóa sách thành công!" };
  } catch (error) {
    return { success: false, message: "Lỗi khi xóa sách!" };
  }
};

//lọc theo ngày tháng năm của top 10 cuốn sách được bán
export const BestSellingBooks = async (filterType) => {
  try {
    const pool = await connectToDatabase();

    let whereCondition = "";
    let selectFields = `b.BookID, b.Title, od.UnitPrice as price,
                        SUM(od.Quantity) AS totalQuantityBook,
                        SUM(od.Quantity * od.UnitPrice) AS totalPrice`;
    let groupByFields = `b.BookID, b.Title, od.UnitPrice`;
    let orderByFields = `totalQuantityBook DESC, totalPrice DESC`;

    if (filterType === "week") {
      whereCondition = "o.OrderTime >= DATEADD(DAY, -7, GETDATE())";
    } else if (filterType === "month") {
      whereCondition = `
        MONTH(o.OrderTime) = MONTH(GETDATE()) 
        AND YEAR(o.OrderTime) = YEAR(GETDATE())`;
      selectFields = `CAST(o.OrderTime AS DATE) AS saleDate, ` + selectFields;
      groupByFields = `CAST(o.OrderTime AS DATE), ` + groupByFields;
      orderByFields = `saleDate DESC, ` + orderByFields;
    } else if (filterType === "year") {
      whereCondition = "YEAR(o.OrderTime) = YEAR(GETDATE())";
      selectFields = `MONTH(o.OrderTime) AS saleMonth, ` + selectFields;
      groupByFields = `MONTH(o.OrderTime), ` + groupByFields;
      orderByFields = `saleMonth DESC, ` + orderByFields;
    } else {
      return { success: false, message: "Lựa chọn lọc không hợp lệ!" };
    }

    const query = `
      SELECT TOP 10 ${selectFields}
      FROM OrderDetails od ,Books b ,Orders o
      WHERE ${whereCondition} and od.BookID = b.BookID and od.OrderID = o.OrderID
      GROUP BY ${groupByFields}
      ORDER BY ${orderByFields};
    `;

    const result = await pool.request().query(query);
    return { success: true, data: result.recordset };
  } catch (error) {
    return { success: false, message: "Lỗi khi thống kê sách!", error };
  }
};

export const BestUserBuyBooks = async (filterType) => {
  try {
    const pool = await connectToDatabase();

    let whereCondition = "";
    if (filterType === "week") {
      whereCondition = "o.OrderTime >= DATEADD(DAY, -7, GETDATE())";
    } else if (filterType === "month") {
      whereCondition =
        "MONTH(o.OrderTime) = MONTH(GETDATE()) AND YEAR(o.OrderTime) = YEAR(GETDATE())";
    } else if (filterType === "year") {
      whereCondition = "YEAR(o.OrderTime) = YEAR(GETDATE())";
    } else {
      return { success: false, message: "Lựa chọn lọc không hợp lệ!" };
    }

    const query = `
      SELECT TOP 10 
          u.UserID,
          u.Username,
          SUM(od.Quantity) AS totalBooksPurchased, 
          SUM(od.Quantity * od.UnitPrice) AS totalSpent,
          FORMAT(o.OrderTime, 'yyyy-MM-dd') AS purchaseDate
      FROM OrderDetails od ,  Orders o ,Users u
      WHERE ${whereCondition} and o.UserID = u.UserID and od.OrderID = o.OrderID
      GROUP BY u.UserID, u.Username, FORMAT(o.OrderTime, 'yyyy-MM-dd')
      ORDER BY totalBooksPurchased DESC, totalSpent DESC;
    `;

    const result = await pool.request().query(query);
    return { success: true, data: result.recordset };
  } catch (error) {
    return { success: false, message: "Lỗi khi thống kê khách hàng!", error };
  }
};
