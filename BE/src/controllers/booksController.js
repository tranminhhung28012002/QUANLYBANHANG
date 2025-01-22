import { getBooks } from "../modal/BooksModal.js";

export const showBooks = async (req, res) => {
  try {
    const books = await getBooks();
    if (!books || books.length === 0) {
      return res.status(404).json({
        message: "Không có sách nào trong cơ sở dữ liệu",
      });
    }
    const booksData = books.map((book) => ({
      Title: book.Title,
      Author: book.Author,
      Price: book.Price,
      Description: book.Description,
      Img: book.Img,
      created_at: book.created_at,
    }));

    res.status(200).json(booksData);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
