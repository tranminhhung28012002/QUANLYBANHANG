import { getCategories } from "../modal/categories.js";

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
