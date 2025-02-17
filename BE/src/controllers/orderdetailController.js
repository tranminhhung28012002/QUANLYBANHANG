import {
  checkQuantity,
  createOrderDetail,
  createOrders,
  getOrder,
  showListOrder,
  updateStockOrder,
} from "../modal/OrderModal.js";

//tạo hóa đơn
export const createOrderController = async (req, res) => {
  const { OrderID, UserID, TotalPrice, Status, cartItems } = req.body;
  try {
    await createOrders(OrderID, UserID, TotalPrice, Status);
    await updateStockOrder(cartItems);
    await createOrderDetail(OrderID, UserID);
    return res.json({
      success: true,
      message: "Order created and stock updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create order and update stock.",
    });
  }
};
//kiểm tra số lượng hàng trước khi thêm vào giỏ hàng
export const checkQuantityController = async (req, res) => {
  const { cartItems } = req.body;
  const insufficientStock = [];
  try {
    for (let item of cartItems) {
      const availableQuantity = await checkQuantity(item.Title);
      if (availableQuantity === null) {
        insufficientStock.push({
          book: item.Title,
          message: "Not found in stock",
        });
      } else if (availableQuantity < item.Quantity) {
        insufficientStock.push({
          book: item.Title,
          message: `Only ${availableQuantity} item available`,
        });
      }
    }
    if (insufficientStock.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Some books do not have enough stock.",
        insufficientStock,
      });
    }
    return res.json({
      success: true,
      message: "Order created and stock updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create order and update stock.",
    });
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

//show toàn bộ sản phẩm trong hóa đơn
export const showListOrderController = async (req, res) => {
  const { UserID, OrderID } = req.query;
  try {
    const data = await showListOrder(UserID, OrderID);
    console.log("data", data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error,
      success: false,
      message: "Failed show data OrderDetail",
    });
  }
};
