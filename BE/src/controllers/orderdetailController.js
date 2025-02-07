import { createOrders } from "../modal/OrderModal.js";

export const createOrderController = async (req, res) => {
  const { UserID, TotalPrice, Status } = req.body;
  try {
    const data = await createOrders(UserID, TotalPrice, Status);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};
