import { useEffect, useState } from "react";
import Roadmap from "../../Components/Roadma";
import Shopping_Cart from "../../Components/Shopping_Cart";
import { axiosInstance } from "../../Axios";
import { useSelector } from "react-redux";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router";
import ModalError from "../../Components/ModalError";

function Shopping() {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorData, setErrorData] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [shopping, setShopping] = useState([]);
  const { cartCheckout, setCartCheckout, updateCartQuantity } = useCart();
  const navigate = useNavigate();
  const fetchShopping = async () => {
    const res = await axiosInstance.get(`/api/shopping/${user.ID}`);
    setShopping(res.data);
  };

  useEffect(() => {
    fetchShopping();
  }, []);

  const handleQuantityChange = async (id, newQuantity) => {
    const updatedProducts = shopping.map((product) => {
      if (product.BookID === id) {
        return { ...product, Quantity: newQuantity };
      }
      return product;
    });
    await axiosInstance.patch("/api/cart/update", {
      UserID: user.ID,
      BookID: id,
      quantity: newQuantity,
    });
    updateCartQuantity(user.ID);
    setShopping(updatedProducts);
  };

  const totalAmount = Array.isArray(shopping)
    ? shopping.reduce((total, product) => {
        const price = product.sales || product.Price;
        return total + price * product.Quantity;
      }, 0)
    : 0;

  const checkout = async (item) => {
    console.log("item", item);
    try {
      await axiosInstance.post("/api/checkQuantity", {
        cartItems: item,
      });
      if (item) {
        setCartCheckout([...cartCheckout, item]);
      }
      navigate("/checkout");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setErrorData(error.response.data.insufficientStock);
      setShowModal(true);
    }
  };
  console.log(showModal);
  return (
    <div className="w-full">
      <Roadmap />
      <div className="max-w-[1440px] mx-auto mt-10 px-[135px] mb-20">
        {/* Header */}
        <div className="grid grid-cols-4 gap-[284px] text-center px-10 py-6 bg-slate-100 ">
          <p className="text-[16px]">Product</p>
          <p className="text-[16px]">Price</p>
          <p className="text-[16px]">Quantity</p>
          <p className="text-[16px]">Subtotal</p>
        </div>

        {/* Shopping Cart Items */}
        {shopping.length > 0 ? (
          <div className="relative">
            {shopping.map((e) => (
              <Shopping_Cart
                key={e.BookID}
                id={e.BookID}
                product={e.Title}
                img={e.Img}
                price={e.sales || e.Price}
                Quantity={e.Quantity}
                QuantityChange={handleQuantityChange}
                fetchShopping={fetchShopping}
              />
            ))}
          </div>
        ) : (
          <p className="text-4xl text-center mt-10 min-h-[356px]">
            You have no products in your cart, please return to the home page to
            add products to your cart
          </p>
        )}

        {/* Cart Actions */}
        <div className="flex justify-between mt-6">
          <button
            className="py-4 px-12 border border-gray-500 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => navigate("/")}
          >
            Return to shop
          </button>
          <button className="py-4 px-12 border border-gray-500 rounded-md cursor-pointer hover:bg-gray-100">
            Update Cart
          </button>
        </div>

        {/* Coupon and Cart Summary */}
        <div className="mt-20 flex justify-between">
          <div className="flex gap-4 max-h-[56px]">
            <input
              type="text"
              className="outline-none text-[16px] border border-gray-400 py-4 pl-6 pr-[104px] rounded-md"
              placeholder="Coupon Code"
            />
            <button className="px-12 py-4 bg-red-500 text-white rounded-md hover:bg-red-600">
              Apply Coupon
            </button>
          </div>
          <div className="border border-gray-500 py-8 px-6 w-[470px]">
            <h6 className="text-xl font-medium mb-6">Cart Total</h6>
            <div className="flex justify-between">
              <p className="text-base">Subtotal</p>
              <p className="text-base">${totalAmount.toFixed(2)}</p>
            </div>
            <span className="block w-full h-[1px] bg-gray-400 my-4"></span>
            <div className="justify-between flex">
              <p className="text-base">Shipping</p>
              <p className="text-base">Free</p>
            </div>
            <span className="block w-full h-[1px] bg-gray-400 my-4"></span>
            <div className="flex justify-between">
              <p className="text-base">Total</p>
              <p className="text-base">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-center">
              <button
                className="py-4 px-12 bg-red-500 text-white font-medium text-base mt-4 hover:bg-red-600 rounded-md"
                onClick={() => checkout(shopping)}
              >
                Procees to checkout
              </button>
              {showModal && (
                <ModalError
                  message={errorMessage}
                  data={errorData}
                  onClose={() => setShowModal(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shopping;
