import { createOrderPaypal, capturePayment } from "../service/paypal.js";

//tạo đơn hàng paypal
export const createOrderControllerPaypal = async (req, res) => {
  const { totalAmount, cartItems } = req.body;
  try {
    const { OrderID, approvalLink } = await createOrderPaypal(
      totalAmount,
      cartItems
    );
    if (!OrderID) {
      return res.status(400).json({ error: "No orderId returned from PayPal" });
    }
    return res.status(200).json({
      approvalUrl: approvalLink,
      OrderID: OrderID,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to create PayPal order" });
  }
};

// Controller để xử lý khi thanh toán thành công paypal
export const paymentSuccessController = async (req, res) => {
  const { OrderID } = req.body;
  try {
    const paymentDetails = await capturePayment(OrderID);
    res.json({
      message: "Payment successful",
      paymentDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in payment" });
  }
};

// Controller để xử lý khi thanh toán bị hủy
export const paymentCancelController = (req, res) => {
  res.status(400).json({ message: "Payment Cancelled" });
};
