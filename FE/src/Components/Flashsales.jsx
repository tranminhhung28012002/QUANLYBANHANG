import { useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Card from "./Card";

function FlashSales({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //   );
  // };

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  return (
    <div className="mt-[140px] ">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] h-[40px] bg-red-500 rounded-md"></span>
            <p className="text-red-500 font-semibold">Today</p>
          </div>
          <div>
            <h3 className="text-4xl font-semibold mt-6">Flash Sales</h3>
          </div>
        </div>
        <div className="flex gap-2">
          <IoArrowBack className="text-[50px]  bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-700" />

          <IoArrowForward className="text-[50px] bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-700" />
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between ">
          {data.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="group hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <Card
                id={item.BookID}
                price={item.Price}
                title={item.Title}
                img={item.Img}
                sales={item.sales}
                Evaluate={item.comment}
                icon={item.start}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-[60px]">
          <button className="py-4 px-12 bg-red-500 text-white font-medium hover:bg-red-600">
            View All Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlashSales;
