import { SearchModal } from "../modal/SearchModal.js";

//tìm kiếm sách
export const searchController = async (req, res) => {
  try {
    const { query } = req.query;
    const search = await SearchModal(query, query);
    res.status(200).json(search);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
