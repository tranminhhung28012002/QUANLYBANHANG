import NavItem from "../Components/NavItem";
import unplash from "../assets/bookunplash.jpg";
import CateGr from "../Components/CateGR";
import Selling from "../Components/Selling";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerServiceFill } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";
import Feadture from "../Components/Fearture";
import { useEffect, useState } from "react";
import { axiosInstance } from "../Axios";
import ProductShowcase from "../Components/ProductShowcase ";
function Home() {
  const [book, setBooks] = useState([]);
  const [flashsales, setFlashsales] = useState([]);
  const [fearture, setFeadture] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axiosInstance("/api/books");
      setBooks(res.data);
      const filterFlashsales = res.data.filter((item) => item.sales !== null);
      setFlashsales(filterFlashsales);
      const sortedBooks = res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setFeadture(sortedBooks);
    };
    fetchBooks();
  }, []);
  return (
    <div className="w-full">
      {book && book.length > 0 ? (
        <div className="max-w-[1440px] mx-auto px-[135px] mb-[140px] ">
          <NavItem />
          <ProductShowcase
            data={flashsales}
            title={"Flash Sales"}
            desc={"Today"}
            limit={4}
          />
          <span className="bg-gray-500 w-full mx-auto h-[1px] mt-[60px] mb-[80px] block"></span>
          <CateGr />
          <span className="bg-gray-500 w-full mx-auto h-[1px] mt-[60px] mb-[80px] block"></span>
          <Selling />
          <span className="bg-gray-500 w-full mx-auto h-[1px] mt-[60px] mb-[80px] block"></span>
          <img src={unplash} alt="" />
          <ProductShowcase
            data={book}
            title={"Explore Our Products"}
            desc={"Our Products"}
            limit={8}
            link={"/BookAll"}
          />
          <span className="bg-gray-500 w-full mx-auto h-[1px] mt-[60px] mb-[80px] block"></span>
          <Feadture data={fearture} title={""} />
          <div className="flex justify-center gap-[88px] mt-[140px]">
            <div className=" flex flex-col justify-center items-center">
              <TbTruckDelivery className="text-[55px] p-1 border-spacing-5 border-gray-500 bg-black text-white rounded-full border-8" />
              <h3 className="text-[20px] font-semibold mt-6">
                FREE AND FAST DELIVERY
              </h3>
              <p className="mt-2">Free delivery for all orders over $140</p>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <RiCustomerServiceFill className="text-[55px] p-1 border-spacing-5 border-gray-500 bg-black text-white rounded-full border-8" />
              <h3 className="text-[20px] font-semibold mt-6">
                24/7 CUSTOMER SERVICE
              </h3>
              <p className="mt-2">Friendly 24/7 customer support</p>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <MdOutlineSecurity className="text-[55px] p-1 border-spacing-5 border-gray-500 bg-black text-white rounded-full border-8" />
              <h3 className="text-[20px] font-semibold mt-6">
                MONEY BACK GUARANTEE
              </h3>
              <p className="mt-2">We reurn money within 30 days</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default Home;
