import { useEffect, useState } from "react";
import wallpage from "../assets/bookwallper/bookwallper.jpg";
import wallpage1 from "../assets/bookwallper/bookwallper3.jpg";
import wallpage2 from "../assets/bookwallper/bookwallper2.jpg";
import wallpage3 from "../assets/bookwallper/bookwallper4.jpg";
import { GoChevronRight } from "react-icons/go";

const item = [
  { id: 1, name: "Top 100 Book", icon: <GoChevronRight /> },
  { id: 2, name: "Men's Fashion" },
  { id: 3, name: "Children Book", icon: <GoChevronRight /> },
  { id: 4, name: "Computers & Technology", icon: <GoChevronRight /> },
  { id: 5, name: "Medical Books", icon: <GoChevronRight /> },
  { id: 6, name: "Sports & Outdoor", icon: <GoChevronRight /> },
  { id: 7, name: "Arts & Photography", icon: <GoChevronRight /> },
  { id: 8, name: "Test Preparation", icon: <GoChevronRight /> },
  { id: 9, name: "Self-Help" },
];

const images = [wallpage, wallpage1, wallpage2, wallpage3];

function NavItem() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Tự động chuyển ảnh sau 3 giây
    return () => clearTimeout(interval);
  }, [currentImageIndex]);

  return (
    <div className="flex justify-between">
      {/* Sidebar danh sách */}
      <div className="flex flex-col w-[317px] border-r border-gray-300 pt-6">
        {item.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between pr-4 hover:bg-gray-200 cursor-pointer"
          >
            <p className="text-black py-2 cursor-pointer text-xl font-[450]">
              {e.name}
            </p>
            <p>{e.icon}</p>
          </div>
        ))}
      </div>

      {/* Slider */}
      <div className="pt-6 ml-[40px] w-[892px] overflow-hidden relative">
        {/* Container ảnh */}
        <div
          className="flex transition-transform duration-1000"
          style={{
            transform: `translateX(-${currentImageIndex * 110}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="min-w-[893px] h-[410px] object-cover !important"
            />
          ))}
        </div>

        {/* Dấu chấm */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentImageIndex(index)} // Cho phép click vào dấu chấm để chuyển slide
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentImageIndex === index ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavItem;
