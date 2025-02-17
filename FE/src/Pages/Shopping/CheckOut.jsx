import Roadmap from "../../Components/Roadma";
import PayPal from "../../Components/Paypal";
import { useCart } from "../../Context/CartContext";
import { FaCcPaypal } from "react-icons/fa";
import { useEffect, useState } from "react";
import Error404 from "../404Error/Error";
import { useSelector } from "react-redux";
function CheckOut() {
  const { user } = useSelector((state) => state.auth);
  const { cartCheckout } = useCart();
  console.log("cartCheckout", cartCheckout);
  const totalAmount = Array.isArray(cartCheckout[0])
    ? cartCheckout[0].reduce((total, product) => {
        const price = product.sales || product.Price;
        return total + price * product.Quantity;
      }, 0)
    : 0;
  const [modal, setModal] = useState(false);
  const [paypal, setPaypal] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("bank");
  useEffect(() => {
    const defaultRadio = document.getElementById(selectedPayment);
    if (defaultRadio) {
      defaultRadio.checked = true;
    }
  }, [selectedPayment]);
  const handleRadioChange = (event) => {
    setSelectedPayment(event.target.id);
    if (event.target.id === "bank") {
      setPaypal(true);
      setModal(false);
    } else if (event.target.id === "cash-on-delivery") {
      setPaypal(false);
      setModal(true);
    }
  };
  const cartItem = Array.isArray(cartCheckout[0])
    ? cartCheckout[0].map((item) => {
        const itemPrice = item.sales ? item.sales : item.Price;
        const unitAmount = itemPrice ? parseFloat(itemPrice.toString()) : 0;
        const quantity = item.Quantity ? item.Quantity.toString() : "1";
        return {
          name: item.Title,
          sku: item.BookID.toString(),
          unit_amount: {
            currency_code: "USD",
            value: unitAmount.toFixed(2),
          },
          quantity: quantity,
          category: "PHYSICAL_GOODS",
        };
      })
    : 0;

  return (
    <div className="w-full">
      <Roadmap />
      {cartCheckout[0] && cartCheckout[0].length ? (
        <div className="px-[135px] w-[1440px] mx-auto mt-20 flex justify-between  mb-[140px]">
          <div>
            <h1 className="text-4xl font-medium">Billing Details</h1>
            <div className="flex flex-col gap-8 mt-12">
              <div>
                <p className="text-base text-gray-500">First Name</p>
                <input
                  type="text"
                  className="mt-2 w-full outline-none bg-gray-300 py-2 px-2"
                />
              </div>
              <div>
                <p className="text-base text-gray-500">Street Address*</p>
                <input
                  type="text"
                  className="mt-2 w-full outline-none bg-gray-300 py-2 px-2"
                />
              </div>
              <div>
                <p className="text-base text-gray-500">Town/City*</p>
                <input
                  type="text"
                  className="mt-2 w-full outline-none bg-gray-300 py-2 px-2"
                />
              </div>
              <div>
                <p className="text-base text-gray-500">Phone Number*</p>
                <input
                  type="text"
                  className="mt-2 w-full outline-none bg-gray-300 py-2 px-2"
                />
              </div>
              <div>
                <p className="text-base text-gray-500">Email Address*</p>
                <input
                  type="text"
                  className="mt-2 w-full outline-none bg-gray-300 py-2 px-2"
                />
              </div>
              <div className="flex items-center gap-4">
                <input type="checkbox" className="w-6 h-6 accent-red-500" />
                <p className="text-base ">
                  Save this information for faster check-out next time
                </p>
              </div>
            </div>
          </div>
          <div className="w-[527px]">
            <div className="grid gap-8">
              {cartCheckout[0].map((item, index) => (
                <div key={index} className="">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                      <img src={item.Img} alt="" className="w-16 h-16" />
                      <p className="text-lg ">{item.Title}</p>
                    </div>
                    <p className="text-black">
                      $
                      {item.sales * item.Quantity || item.Price * item.Quantity}
                    </p>
                  </div>
                </div>
              ))}
              <div className="grid gap-4">
                <div className="flex justify-between">
                  <p className="text-lg">Subtotal</p>
                  <p className="text-lg">${totalAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg">Shipping</p>
                  <p>Free</p>
                </div>
                <span className="block w-full h-[1px] bg-gray-500"></span>
                <div className="flex justify-between">
                  <p className="text-lg">Total</p>
                  <p>${totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid gap-8 mb-8">
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      className="w-6 h-6 accent-black"
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="bank">Bank</label>
                  </div>
                  <FaCcPaypal className="w-10 h-10" />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="cash-on-delivery"
                      name="paymentMethod"
                      className="w-6 h-6 accent-black"
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                  </div>
                </div>
              </div>
            </div>
            {modal && (
              <div>
                <div className="flex gap-4 max-h-[56px]">
                  <input
                    type="text"
                    className="outline-none text-[16px] border border-gray-400 py-4 pl-6 pr-[104px] rounded-md "
                    placeholder="Coupon Code"
                  />
                  <button className="px-12 py-4 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Apply Coupon
                  </button>
                </div>
                <button className="py-4 px-12 bg-red-500 text-white rounded-md mt-8">
                  Place Order
                </button>
              </div>
            )}
            {paypal && (
              <PayPal
                total={totalAmount.toFixed(2)}
                userID={user.ID}
                listCart={cartItem}
              />
            )}
          </div>
        </div>
      ) : (
        <Error404 />
      )}
    </div>
  );
}

export default CheckOut;
