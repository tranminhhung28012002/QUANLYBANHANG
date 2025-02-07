import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { axiosInstance } from "../Axios";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { openConfirmModal, closeConfirmModal } from "../Store/confirmModal.js";
import { useCart } from "../Context/CartContext.jsx";
function Shopping_Cart({
  id,
  product,
  img,
  price,
  Quantity,
  QuantityChange,
  fetchShopping,
}) {
  const [soluong, setSoluong] = useState(Quantity);
  const [Subtotal, setSubtotal] = useState(price * Quantity);
  const { user } = useSelector((state) => state.auth);
  const modalType = useSelector((state) => state.confirmModal.modalType);
  const isOpen = useSelector((state) => state.confirmModal.isOpen);
  const { updateCartQuantity } = useCart();
  const dispatch = useDispatch();
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
    updateCartQuantity(user.ID);
  };

  const handleSaveItem = async (id) => {
    await axiosInstance.post(`/api/shoppingsave/${user.ID}/${id}`);
    fetchShopping();
    updateCartQuantity(user.ID);
  };

  const handleConfirm = async () => {
    if (modalType === "delete") {
      await handleRemove(id);
    } else if (modalType === "save") {
      await handleSaveItem(id);
    }
    dispatch(closeConfirmModal());
  };
  return (
    <>
      <div className="relative flex text-center gap-[43px]  shadow-custom px-8 py-5 mt-10 items-center  cursor-pointer group">
        <div className="flex  gap-[20px] text-start">
          <img src={img} alt="" className="w-24 h-24 rounded-lg" />
          <div className="w-[200px] flex flex-col justify-between">
            <p className="text-[20px] font-medium ">{product}</p>
            <div className="flex gap-5">
              <button
                className="flex items-center gap-2 text-gray-500 text-lg hover:text-red-500"
                onClick={() => dispatch(openConfirmModal("delete"))}
              >
                <MdDeleteForever className="text-xl" />
                <p>Delete</p>
              </button>
              <button
                className="flex items-center gap-2 text-gray-500 text-lg hover:text-red-500 "
                onClick={() => dispatch(openConfirmModal("save"))}
              >
                <CiHeart />
                <p>Save</p>
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[282px] items-center">
          <p className="text-[20px] ">${price}</p>
          <div className="flex py-3 px-[6px] justify-around border border-gray-500 items-center rounded-md w-[72px] h-[44px]">
            <input
              type="text"
              className="w-[30px] outline-none bg-inherit"
              value={soluong}
              onChange={handleInput}
            />
            <div>
              <FaAngleUp
                className="text-sm cursor-pointer"
                onClick={handleUp}
              />
              <FaAngleDown
                className="text-sm cursor-pointer"
                onClick={handleDown}
              />
            </div>
          </div>
          <p className="text-[18px] ">${Subtotal.toFixed(2)}</p>
        </div>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg font-medium">
                {modalType === "delete"
                  ? "Bạn có chắc chắn muốn xóa?"
                  : "Bạn có muốn lưu sản phẩm này?"}
              </p>
              <div className="flex justify-center gap-5 mt-4">
                <button
                  className="text-lg text-red-500 rounded-lg px-4 py-2"
                  onClick={handleConfirm}
                >
                  {modalType === "delete" ? "Xóa" : "Lưu"}
                </button>
                <button
                  className="text-lg border border-gray-500 rounded-lg px-4 py-2 ml-2"
                  onClick={() => dispatch(closeConfirmModal())}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Shopping_Cart;
