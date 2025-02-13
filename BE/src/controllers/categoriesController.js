import { BooksCategories, getCategories } from "../modal/CategoriesModal.js";

//show toàn bộ mục lục sách
export const categories = async (req, res) => {
  try {
    const data = await getCategories();
    res.status(200).json({
      message: "lấy mục lục thành công",
      data,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

//lấy sách dựa vào danh mục
export const getBooksCategories = async (req, res) => {
  const { CategoryID } = req.params;
  try {
    const data = await BooksCategories(CategoryID);
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
