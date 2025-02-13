import {
  CiHeart,
  CiLogout,
  CiShoppingCart,
  CiStar,
  CiUser,
} from "react-icons/ci";
import { FaShopify } from "react-icons/fa";
import User from "../assets/user.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoCloseCircle } from "react-icons/io5";
import { closeModal, openModal } from "../Store/SlideModal.js";
import { Link, useLocation, useNavigate } from "react-router";
import { logout } from "../Store/authReducer.js";
import { axiosInstance } from "../Axios.js";
import Search from "./Search.jsx";
import { useCart } from "../Context/CartContext.jsx";
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

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectTab, setSelectTab] = useState("Home");
  const isOpen = useSelector((state) => state.modal.isOpen);
  const { user } = useSelector((state) => state.auth);
  const dispath = useDispatch();
  const modalRef = useRef(null);
  const { cartQuantity, updateCartQuantity } = useCart();
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispath(closeModal());
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedTab = Item.find((item) => item.Navigate === currentPath)?.name;
    if (matchedTab) {
      setSelectTab(matchedTab);
    }
    if (user && user.ID) {
      updateCartQuantity(user.ID);
    }
  }, [location.pathname, user]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/logoutUser");
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
    dispath(logout());
  };
  const [hovered, setHovered] = useState(false);
  return (
    <div className="w-full sticky top-0 z-50 bg-slate-100 ">
      <div className="max-w-[1440px] mx-auto sm:flex py-[8px] justify-between px-[135px] items-center hidden pt-10 pb-4 border-gray-500 border-b  ">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Exclusive</h1>
        </div>
        <div className="flex gap-12 ">
          {Item.map(
            (item) =>
              (item.name !== "Sign Up" || !user) && (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() =>
                    item.name === "Sign Up" && setHovered(true)
                  }
                  onMouseLeave={() =>
                    item.name === "Sign Up" && setHovered(false)
                  }
                >
                  <Link
                    to={item.Navigate}
                    className={`text-lg cursor-pointer hover:border-b-2 border-gray-500  ${
                      selectTab === item.name
                        ? "font-bold border-b-2 border-gray-500"
                        : ""
                    }`}
                    onClick={() => setSelectTab(item.name)}
                  >
                    {item.name}
                  </Link>
                  {item.name === "Sign Up" && hovered && (
                    <div className="absolute top-[30px] -left-3 bg-white shadow-md rounded-lg z-10 w-[90px]">
                      <Link
                        to="/Signup"
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700 "
                      >
                        Sign Up
                      </Link>
                      <Link
                        to="/Login"
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              )
          )}
        </div>
        <div className="flex items-center">
          <Search />
          {!(selectTab === "Sign Up" || selectTab === "Login") && (
            <div className="ml-6 flex gap-4">
              <CiHeart className="h-[30px] w-[30px] cursor-pointer" />
              <div className="relative">
                <Link to={"/Shopping"}>
                  <CiShoppingCart className="h-[30px] w-[30px] cursor-pointer" />
                </Link>
                {cartQuantity > 0 && user && (
                  <span className="block absolute w-6 h-5 text-sm bg-red-500 rounded-full text-center -top-1 -right-2 text-white">
                    {cartQuantity}
                  </span>
                )}
              </div>
              {user && (
                <div
                  className="relative cursor-pointer z-50"
                  onClick={handleClickOutside}
                >
                  <img src={User} onClick={() => dispath(openModal())} />
                  {isOpen && (
                    <div
                      ref={modalRef}
                      className="text-white w-[225px] top-10 bg-red-500 absolute right-0  rounded-lg bg-blend-color-burn"
                    >
                      <div
                        className="flex cursor-pointer p-3 mt-2 hover:bg-red-600"
                        onClick={() => navigate("/account")}
                      >
                        <CiUser className="h-[28px] w-[28px]" />
                        <p>Manage My Account</p>
                      </div>
                      <div
                        className="flex cursor-pointer p-3 hover:bg-red-600"
                        onClick={() => navigate("/Shopping")}
                      >
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
                      <div
                        className="flex cursor-pointer p-3 mb-2 hover:bg-red-600"
                        onClick={handleLogout}
                      >
                        <CiLogout className="h-[28px] w-[28px]" />
                        <p>Logout</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
