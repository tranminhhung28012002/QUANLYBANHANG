import { createOrders, getOrder } from "../modal/OrderModal.js";

//tạo hóa đơn
export const createOrderController = async (req, res) => {
  const { OrderID, UserID, TotalPrice, Status } = req.body;
  try {
    const data = await createOrders(OrderID, UserID, TotalPrice, Status);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

//lấy hóa đơn dựa vào userID
export const getOrderController = async (req, res) => {
  const { UserID } = req.params;
  try {
    const data = await getOrder(UserID);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};
