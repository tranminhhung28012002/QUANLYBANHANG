import { createOrder, capturePayment } from "../service/paypal.js";

// Controller để tạo đơn hàng
export const createOrderController = async (req, res) => {
  const { totalAmount, itemsCart } = req.body;
  try {
    const { OrderID, approvalLink } = await createOrder(totalAmount, itemsCart); // Lấy orderId và approvalLink từ createOrder
    console.log("OrderID", OrderID);
    if (!OrderID) {
      return res
        .status(400)
        .json({ error: "Không có orderId trả về từ PayPal" });
    }
    return res.status(200).json({
      approvalUrl: approvalLink,
      OrderID: OrderID,
    });
  } catch (error) {
    res.status(500).json({ error: "Không thể tạo đơn hàng PayPal" });
  }
};

// Controller để xử lý khi thanh toán thành công
export const paymentSuccessController = async (req, res) => {
  const { OrderID } = req.body;

  try {
    const paymentDetails = await capturePayment(OrderID);
    res.json({
      message: "Thanh toán thành công",
      paymentDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thanh toán" });
  }
};

// Controller để xử lý khi thanh toán bị hủy
export const paymentCancelController = (req, res) => {
  res.status(400).json({ message: "Thanh toán bị hủy" });
};
