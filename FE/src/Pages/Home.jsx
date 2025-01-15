import FlashSales from "../Components/Flashsales";
import NavItem from "../Components/NavItem";
import unplash from "../assets/bookunplash.jpg";
import CateGr from "../Components/CateGR";
import Selling from "../Components/Selling";
import ListProduct from "../Components/ListProduct";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerServiceFill } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";
import Feadture from "../Components/Fearture";
function Home() {
  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto px-[135px] mb-[140px]">
        <NavItem />
        <FlashSales
          title="Today's"
          name="Flash Sales"
          button="View All Products"
        />
        <span className="bg-gray-500 w-full mx-auto h-[1px] mt-[60px] mb-[80px] block"></span>
        <CateGr />
        <span className="bg-gray-500 w-full mx-auto h-[1px] mt-[60px] mb-[80px] block"></span>
        <Selling />
        <span className="bg-gray-500 w-full mx-auto h-[1px] mt-[60px] mb-[80px] block"></span>
        <img src={unplash} alt="" />
        <ListProduct />
        <span className="bg-gray-500 w-full mx-auto h-[1px] mt-[60px] mb-[80px] block"></span>
        <Feadture />
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
    </div>
  );
}

export default Home;
