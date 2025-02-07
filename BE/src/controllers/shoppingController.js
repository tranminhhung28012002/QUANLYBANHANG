import {
  countShopping,
  getShopping,
  removeShopping,
} from "../modal/ShoppingModal.js";

export const getShoppingCart = async (req, res) => {
  const { UserID } = req.params;
  try {
    const data = await getShopping(UserID);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteShopping = async (req, res) => {
  const { UserID, BookID } = req.params;
  try {
    const data = await removeShopping(UserID, BookID);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const countShoppingController = async (req, res) => {
  const { UserID } = req.params;
  try {
    const data = await countShopping(UserID);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
