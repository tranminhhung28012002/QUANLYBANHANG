import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaAngleDown, FaAngleUp, FaEye } from "react-icons/fa";
import { axiosInstance } from "../Axios";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useCart } from "../Context/CartContext";
import ModalAdmin from "./ModalAdmin";
import { openConfirmModal, closeConfirmModal } from "../Store/confirmModal.js";

function Card({
  id,
  price,
  img,
  title,
  sales,
  desc,
  quantity,
  author,
  cateName,
  cateID,
  reload,
}) {
  const [bookUpdate, setBookUpdate] = useState({
    id: id,
    Title: title,
    Author: author,
    Price: sales || price,
    Quantity: quantity,
    Description: desc,
    Img: img,
    CategoryID: cateID,
    Sales: sales ? price : null,
  });
  const { user } = useSelector((state) => state.auth);
  const [soluong, setSoluong] = useState(1);
  const navigate = useNavigate();
  const { updateCartQuantity } = useCart();
  const [modal, setModal] = useState(false);
  const { modalType, idModal, isOpen } = useSelector(
    (state) => state.confirmModal
  );
  const dispatch = useDispatch();

  const handleUp = () => {
    setSoluong((prev) => prev + 1);
  };

  const handleDown = () => {
    if (soluong > 1) {
      setSoluong((prev) => prev - 1);
    }
  };

  const handleinput = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!newQuantity > 0 && isNaN(newQuantity)) {
      return;
    }
    setSoluong(newQuantity);
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/api/deleteBook/${id}`);
  };

  const handleConfirm = async () => {
    if (modalType === "delete") {
      await handleDelete(idModal);
    }
    reload();
    dispatch(closeConfirmModal());
  };

  const fetchAddCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (soluong == 0) {
      toast.error("Please enter a quantity greater than 0");
      return;
    }
    try {
      await axiosInstance.post("/api/cart/add", {
        UserID: user.ID,
        BookID: id,
        quantity: soluong,
      });
      updateCartQuantity(user.ID);
      toast.success("Add to cart successfully!");
    } catch (error) {
      toast.error(error?.response?.data.message || "error");
    }
  };
  const handleDetail = async (e) => {
    try {
      navigate(`/productDetail/${e}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-[270px] h-[350px] group hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer rounded-xl border border-gray-200">
        <div className="relative bg-gray-100 w-[269px] h-[250px] flex items-center justify-center rounded-t-xl overflow-hidden">
          <img src={img} alt="" className="object-contain" />
          <div className="flex flex-col absolute top-[17px] right-[17px] gap-2">
            <CiHeart className="w-[30px] h-[30px] p-1 bg-white rounded-full cursor-pointer" />
            <FaEye
              className="w-[30px] h-[30px] p-1 bg-white rounded-full cursor-pointer"
              onClick={() => handleDetail(id)}
            />
          </div>

          <div className="absolute bottom-[-50px] left-0 w-full flex justify-between items-center bg-black text-white py-2 transition-all duration-300 ease-in-out group-hover:bottom-0">
            <button
              className="px-4 py-2 text-sm font-semibold"
              onClick={fetchAddCart}
            >
              Add to Cart
            </button>
            <div className="flex py-3 px-[6px] mr-4 justify-around border border-gray-500 items-center rounded-md w-[70px] h-[34px] cursor-pointer">
              <input
                type="text"
                className="w-[40px] outline-none bg-inherit"
                value={soluong}
                onChange={handleinput}
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
          </div>
        </div>
        <div className="mt-4 relative">
          <p className="text-[16px] font-medium">{title}</p>
          <div className="flex mt-2 gap-3">
            <p className="text-black font-medium">${price}</p>
            {sales && (
              <p className="text-gray-400 font-medium line-through">${sales}</p>
            )}
          </div>
          <div className="flex gap-2 absolute -bottom-3 right-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
              onClick={() => setModal(true)}
            >
              Sửa
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
              onClick={() =>
                dispatch(openConfirmModal({ modalType: "delete", id }))
              }
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <ModalAdmin onClose={setModal} bookData={bookUpdate} cate={cateName} />
      )}
      {isOpen && idModal === id && (
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
  );
}

export default Card;
