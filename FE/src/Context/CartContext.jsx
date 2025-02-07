import { createContext, useState, useContext } from "react";
import { axiosInstance } from "../Axios";

// Tạo Context
const CartContext = createContext();

// Hook để dùng dễ dàng hơn
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartCheckout, setCartCheckout] = useState([]);
  // Hàm cập nhật số lượng
  const updateCartQuantity = async (userID) => {
    if (!userID) {
      console.error("Không có userID, không thể lấy số lượng giỏ hàng.");
      return;
    }
    try {
      const res = await axiosInstance.get(`/api/shoppingCount/${userID}`);
      setCartQuantity(res.data.sumQuantity || 0);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng giỏ hàng:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartQuantity,
        updateCartQuantity,
        cartCheckout,
        setCartCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
