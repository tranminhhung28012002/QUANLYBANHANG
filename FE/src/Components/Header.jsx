import {
  CiHeart,
  CiLogout,
  CiSearch,
  CiShoppingCart,
  CiStar,
  CiUser,
} from "react-icons/ci";
import { FaShopify } from "react-icons/fa";
import User from "../assets/user.png";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoCloseCircle } from "react-icons/io5";
import { closeModal, openModal } from "../Store/SlideModal.js";
import { Link, Navigate, useNavigate } from "react-router";
const Item = [
  {
    id: 1,
    name: "Home",
    Navigate: "/",
  },
  {
    id: 2,
    name: "Contact",
    Navigate: "/Contact",
  },
  {
    id: 3,
    name: "About",
    Navigate: "/About",
  },
  {
    id: 4,
    name: "Sign Up",
    Navigate: "/Signup",
  },
];
console.log(Item);
function Header() {
  const navigate = useNavigate();
  const [selectTab, setSelectTab] = useState("Home");
  const isOpen = useSelector((state) => state.modal.isOpen);
  const [user, setUser] = useState();
  const dispath = useDispatch();
  const modalRef = useRef(null); // Tạo ref cho modal nội dung

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispath(closeModal());
    }
  };
  return (
    <div className="w-full ">
      <div className="max-w-[1440px] mx-auto sm:flex py-[8px] justify-between px-[135px] items-center hidden pt-10 pb-4 border-gray-500 border-b ">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Exclusive</h1>
        </div>
        <div className="flex gap-12 ">
          {Item.map((item) => (
            <Link
              key={item.id}
              to={item.Navigate}
              className={`text-lg cursor-pointer hover:border-b-2 border-gray-500 h-[30px] ${
                selectTab === item.name
                  ? "font-bold border-b-2 border-gray-500"
                  : ""
              }`}
              onClick={() => setSelectTab(item.name)}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          <div className="w-[243px] flex bg-neutral-200 py-[7px] pl-[20px] pr-[12px]">
            <input
              type="text"
              placeholder="What are you looking for? "
              className="bg-neutral-200 w-[153px] outline-none"
            />
            <CiSearch className="h-[30px] w-[30px] outline-none ml-[34px] cursor-pointer" />
          </div>
          {!(selectTab === "Sign Up" || selectTab === "Login") && (
            <div className="ml-6 flex gap-4">
              <CiHeart className="h-[30px] w-[30px] cursor-pointer" />
              <Link to={"/Shopping"}>
                <CiShoppingCart className="h-[30px] w-[30px] cursor-pointer" />
              </Link>
              <div
                className="relative cursor-pointer"
                onClick={handleClickOutside}
              >
                <img src={User} onClick={() => dispath(openModal())} />
                {isOpen && (
                  <div
                    ref={modalRef}
                    className="text-white w-[225px] top-10 bg-red-500 absolute right-0  rounded-lg bg-blend-color-burn"
                  >
                    <div className="flex cursor-pointer p-3 mt-2 hover:bg-red-600">
                      <CiUser className="h-[28px] w-[28px]" />
                      <p onClick={() => navigate("/account")}>
                        Manage My Account
                      </p>
                    </div>
                    <div className="flex cursor-pointer p-3 hover:bg-red-600">
                      <FaShopify className="h-[28px] w-[28px]" />
                      <p>My Order</p>
                    </div>
                    <div className="flex cursor-pointer p-3 hover:bg-red-600">
                      <IoCloseCircle className="h-[28px] w-[28px]" />
                      <p>My Cancellations</p>
                    </div>
                    <div className="flex cursor-pointer p-3 hover:bg-red-600">
                      <CiStar className="h-[28px] w-[28px]" />
                      <p>My Reviews</p>
                    </div>
                    <div className="flex cursor-pointer p-3 mb-2 hover:bg-red-600">
                      <CiLogout className="h-[28px] w-[28px]" />
                      <p>Logout</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
