import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useEffect, useState } from "react";
import { axiosInstance } from "../Axios";

function CateGr() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const show = async () => {
      try {
        const res = await axiosInstance.get("/api/categories");
        console.log("res", res.data.data);
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    show();
  }, []);
  return (
    <div className="mt-[140px] ">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] h-[40px] bg-red-500 rounded-md"></span>
            <p className="text-red-500 font-semibold">Categories</p>
          </div>
          <div>
            <h3 className="text-4xl font-semibold mt-6">Browse By Category</h3>
          </div>
        </div>
        <div className="flex gap-2">
          <IoArrowBack className="text-[50px]  bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-700" />

          <IoArrowForward className="text-[50px] bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-700" />
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between">
          {categories ? (
            categories.map((item, index) => (
              <div
                key={index}
                className="relative w-[145px] h-[170px] rounded-xl cursor-pointer"
              >
                <img
                  src={item.Img}
                  alt={item.CategoryName}
                  className="absolute inset-0 w-full h-full rounded-xl object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <p className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
                  {item.CategoryName}
                </p>
              </div>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
        <div className="text-center mt-[60px]">
          <button className="py-4 px-12 bg-red-500 text-white font-medium hover:bg-red-600">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default CateGr;
