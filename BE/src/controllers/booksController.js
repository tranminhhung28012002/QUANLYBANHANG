import {
  AddCartBooks,
  countBooks,
  DetailBooks,
  getBooks,
  getQuantityBooks,
  increaseCartBook,
  showBooks,
} from "../modal/BooksModal.js";

//show toàn bộ danh sách ra
export const showBooksController = async (req, res) => {
  const { page, limit } = req.query;
  try {
    if (page && limit) {
      const books = await getBooks(page, limit);
      if (!books || books.length === 0) {
        return res.status(404).json({
          message: "Không có sách nào trong cơ sở dữ liệu",
        });
      }
      const total = await countBooks();
      const booksData = books.map((book) => ({
        Title: book.Title,
        Author: book.Author,
        Price: book.Price,
        Description: book.Description,
        Img: book.Img,
        sales: book.sales,
        created_at: book.created_at,
      }));
      return res.status(200).json({
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
        booksData,
        total,
      });
    } else {
      const books = await showBooks();
      return res.status(200).json(books);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//thêm sách vào giỏ hàng
export const addBookCart = async (req, res) => {
  const { UserID, BookID, quantity } = req.body;
  if (!UserID || !BookID || !quantity) {
    return res.status(400).json({
      success: false,
      UserID,
      BookID,
      quantity,
      message: "Missing required fields.",
    });
  }
  try {
    const stockResult = await getQuantityBooks(BookID);
    if (stockResult.Quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient quantity! Only ${stockResult.Quantity} items available.`,
      });
    }
    const result = await AddCartBooks(UserID, BookID, quantity);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

//cập nhật lại số lượng sách trong giỏ hàng
export const increaseCartBookController = async (req, res) => {
  const { UserID, BookID, quantity } = req.body;
  if (!UserID || !BookID || !quantity) {
    return res.status(400).json({
      success: false,
      UserID,
      BookID,
      quantity,
      message: "Missing required fields.",
    });
  }
  try {
    const result = await increaseCartBook(UserID, BookID, quantity);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

//chi tiết sách
export const ProductDetailBook = async (req, res) => {
  const { BookID } = req.params;
  try {
    const result = await DetailBooks(BookID);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json(error);
  }
};
