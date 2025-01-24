import {
  AddCartBooks,
  countBooks,
  getBooks,
  showBooks,
} from "../modal/BooksModal.js";

export const showBooksPage = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
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
      created_at: book.created_at,
    }));

    res.status(200).json({
      currentPage: parseInt(page),
      pageSize: parseInt(limit),
      booksData,
      total,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const showBooksAll = async (req, res) => {
  try {
    const books = await showBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
    const result = await AddCartBooks(UserID, BookID, quantity);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
