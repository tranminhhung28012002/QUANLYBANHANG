import PropTypes from "prop-types";
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { axiosInstance } from "../Axios";
import { useSelector } from "react-redux";

function Shopping_Cart({
  id,
  product,
  img,
  price,
  Quantity,
  QuantityChange,
  fetchShopping,
}) {
  console.log("Quantity", Quantity);
  const [soluong, setSoluong] = useState(Quantity);
  const [Subtotal, setSubtotal] = useState(price * Quantity);
  const { user } = useSelector((state) => state.auth);
  const handleUp = () => {
    const newQuantity = soluong + 1;
    setSoluong(newQuantity);
    setSubtotal(newQuantity * price);
    QuantityChange(id, newQuantity); // Cập nhật số lượng trong ShoppingCartList
  };

  const handleDown = () => {
    if (soluong > 1) {
      const newQuantity = soluong - 1;
      setSoluong(newQuantity);
      setSubtotal(newQuantity * price);
      QuantityChange(id, newQuantity); // Cập nhật số lượng trong ShoppingCartList
    }
  };

  const handleInput = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setSoluong(newQuantity);
      setSubtotal(newQuantity * price);
      QuantityChange(id, newQuantity); // Cập nhật số lượng trong ShoppingCartList
    }
  };
  const handleRemove = async (id) => {
    await axiosInstance.delete(`/api/shoppingdelete/${user.ID}/${id}`);
    fetchShopping();
  };
  return (
    <div className="relative flex text-center gap-[180px]  shadow-custom px-10 py-6 mt-10 items-center hover:bg-gray-100 cursor-pointer group">
      <MdDeleteForever
        className="absolute text-xl text-red-500 top-3 left-7"
        onClick={() => handleRemove(id)}
      />
      <div className="flex items-center gap-[20px] text-start">
        <img src={img} alt="" className="w-12 h-12" />
        <p className="text-[16px] w-[100px]">{product}</p>
      </div>
      <div className="grid grid-cols-3 gap-[282px] items-center">
        <p className="text-[16px] ">${price}</p>
        <div className="flex py-3 px-[6px] justify-around border border-gray-500 items-center rounded-md w-[72px] h-[44px]">
          <input
            type="text"
            className="w-[20px] outline-none"
            value={soluong}
            onChange={handleInput}
          />
          <div>
            <FaAngleUp className="text-sm cursor-pointer" onClick={handleUp} />
            <FaAngleDown
              className="text-sm cursor-pointer"
              onClick={handleDown}
            />
          </div>
        </div>
        <p className="text-[16px] ">${Subtotal}</p>
      </div>
    </div>
  );
}
Shopping_Cart.propTypes = {
  id: PropTypes.number,
  price: PropTypes.number,
  img: PropTypes.string,
  product: PropTypes.string,
  Quantity: PropTypes.number,
  subtotal: PropTypes.number,
  QuantityChange: PropTypes.func.isRequired,
};
export default Shopping_Cart;
