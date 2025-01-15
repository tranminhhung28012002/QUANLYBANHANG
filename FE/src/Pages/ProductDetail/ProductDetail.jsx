import { useState } from "react";
import Roadmap from "../../Components/Roadma";
import frieren1 from "../../assets/ProductDetail/frieren1.jpg";
import frieren2 from "../../assets/ProductDetail/frieren2.jpg";
import frieren3 from "../../assets/ProductDetail/frieren3.jpg";
import frieren from "../../assets/card/fantasy.jpg";
import { GrDeliver } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { MdKeyboardReturn } from "react-icons/md";
import FlashSales from "../../Components/Flashsales";

function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(frieren);
  const [quantity, setQuantity] = useState(1);
  const handleUp = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDown = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleInput = (e) => {
    if (e.target.value < 1) {
      setQuantity(1);
    }
  };
  return (
    <div className="w-full">
      <Roadmap />
      <div className="max-w-[1440px] mx-auto px-[135px] mb-[140px]">
        {/* Danh sách ảnh bên trái */}
        <div className="flex justify-between mt-20 items-center mb-[140px]">
          <div className="grid grid-cols-1 gap-4">
            {[frieren, frieren1, frieren2, frieren3].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-[170px] h-[138px] object-cover rounded-lg cursor-pointer ${
                  selectedImage === image ? "border-4 border-gray-300" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>

          {/* Ảnh hiển thị chính giữa */}
          <div>
            <div className="flex space-y-4">
              <img
                src={selectedImage}
                alt="Main Product"
                className="w-[500px] h-[600px] rounded-lg"
              />
            </div>
          </div>

          {/* Chi tiết sản phẩm */}
          <div className="max-w-[400px]">
            <h1 className="text-2xl font-semibold">Frieren Book Novel</h1>
            <div className="flex items-center space-x-2 my-4">
              <span className="text-yellow-500">★★★★</span>
              <span>(150 Reviews)</span>
              <span className="text-green-500">In Stock</span>
            </div>
            <p className="text-2xl font-base mb-4">$192.00</p>
            <p className="text-gray-600 mt-6 text-sm">
              Dive into an enchanting fantasy world with this captivating novel.
              Explore tales of magic, heroism, and unforgettable adventures that
              will transport you to realms beyond imagination
            </p>
            <span className="block w-full h-[1px] border border-gray-400 my-6"></span>
            <div className="my-4">
              <div className="flex space-x-4 mt-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="border px-4 py-2 rounded focus:bg-red-500"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="my-4 flex items-center gap-4 ">
              <div className="rounded-lg">
                <button
                  className="px-4 py-2 hover:bg-red-500 border border-black rounded-l-md hover:text-white "
                  onClick={handleDown}
                >
                  -
                </button>
                <input
                  type="text"
                  className="max-w-[60px] px-4 py-2 outline-none text-center border-y border-black "
                  value={quantity}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
                <button
                  className="px-4 py-2 hover:bg-red-500 border border-black rounded-r-md hover:text-white "
                  onClick={handleUp}
                >
                  +
                </button>
              </div>
              <button className="px-12 py-[10px] bg-red-500 text-white rounded hover:bg-red-600 ">
                Buy Now
              </button>
              <CiHeart className="border border-black py-[5px] px-[5px] w-10 h-10 rounded-md cursor-pointer hover:bg-red-500 hover:text-white" />
            </div>

            <div className="max-w-[400px] mt-10 py-6 pl-4 border border-gray-500 rounded-md">
              <div className="flex items-center gap-4">
                <GrDeliver className="text-3xl" />
                <div className="">
                  <p className="text-base font-medium">Free Delivery</p>
                  <p className="text-xs font-medium mt-2">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <span className="block w-full h-[1px] bg-gray-500 my-4"></span>
              <div className="flex items-center gap-4">
                <MdKeyboardReturn className="text-3xl" />
                <div className="">
                  <p className="text-base font-medium">Return Delivery</p>
                  <p className="text-xs font-medium mt-2">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <FlashSales title="Related Item" />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
