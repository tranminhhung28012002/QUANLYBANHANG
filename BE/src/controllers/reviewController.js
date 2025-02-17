import { getUserReviewBook } from "../modal/ReviewModal.js";

//lấy người dùng review sách dựa vào BookID
export const getUserReviewBookController = async (req, res) => {
  const { BookID } = req.params;
  try {
    const data = await getUserReviewBook(BookID);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};
