import { SearchModal } from "../modal/SearchModal.js";

export const searchController = async (req, res) => {
  const { title, author } = req.query;
  try {
    const search = await SearchModal(title, author);
    res.status(200).json(search);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
