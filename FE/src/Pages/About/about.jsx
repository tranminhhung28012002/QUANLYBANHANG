import muasam from "../../assets/shop.png";
import { FaHome, FaMoneyBill, FaShoppingCart } from "react-icons/fa";
import { MdAttachMoney, MdOutlineSecurity } from "react-icons/md";
import tom from "../../assets/Frame874.png";
import emma from "../../assets/Frame875.png";
import will from "../../assets/Frame876.png";
import { CiInstagram, CiLinkedin, CiTwitter } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerServiceFill } from "react-icons/ri";
import Roadmap from "../../Components/Roadma";
function About() {
  return (
    <div className="w-full">
      <Roadmap />
      <div className="max-w-[1440px] mx-auto px-[135px] pt-[42px] pb-[140px]">
        <div className="flex items-center justify-between ">
          <div className="w-[525px]">
            <h2 className="text-[54px] font-semibold">Our Story</h2>
            <p className="text-[16px] font-normal mt-10">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.
            </p>
            <p className="text-[16px] font-normal mt-6">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
          <img src={muasam} alt="1" className="pr-[-135px]" />
        </div>
        <div className="flex mt-[140px] justify-between">
          <div className="w-[270px] h-[230px] flex items-center justify-center flex-col border border-gray-700 hover:bg-red-500 hover:border-none hover:text-white group hover:shadow-custom">
            <FaHome className="text-[55px] p-1 border-spacing-5 border-gray-500 bg-black text-white rounded-full border-8 group-hover:bg-white group-hover:text-black group-hover:border-red-500/50" />
            <h3 className="text-[32px] font-bold mt-6">10.5K</h3>
            <p className="text-[16px] font-normal mt-3">
              Sallers active our site
            </p>
          </div>
          <div className="w-[270px] h-[230px]  flex items-center justify-center flex-col border border-gray-700 hover:bg-red-500 hover:border-none hover:text-white group hover:shadow-custom ">
            <MdAttachMoney className="text-[55px] p-1 border-spacing-5 border-gray-500 bg-black text-white rounded-full border-8 group-hover:bg-white group-hover:text-black group-hover:border-red-500/50" />
            <h3 className="text-[32px] font-bold mt-6">33K</h3>
            <p className="text-[16px] font-normal mt-3">
              Mopnthly Produduct Sale
            </p>
          </div>
          <div className="w-[270px] h-[230px]  flex items-center justify-center flex-col border border-gray-700 hover:bg-red-500 hover:border-none hover:text-white group hover:shadow-custom ">
            <FaShoppingCart className="text-[55px] p-1 border-spacing-5 border-gray-500 bg-black text-white rounded-full border-8 group-hover:bg-white group-hover:text-black group-hover:border-red-500/50" />
            <h3 className="text-[32px] font-bold mt-6">45.5K</h3>
            <p className="text-[16px] font-normal mt-3">
              Customer active in our site
            </p>
          </div>
          <div className="w-[270px] h-[230px]  flex items-center justify-center flex-col border border-gray-700 hover:bg-red-500 hover:border-none hover:text-white group hover:shadow-custom ">
            <FaMoneyBill className="text-[55px] p-1 border-spacing-5 border-gray-500 bg-black text-white rounded-full border-8 group-hover:bg-white group-hover:text-black group-hover:border-red-500/50" />
            <h3 className="text-[32px] font-bold mt-6">25k</h3>
            <p className="text-[16px] font-normal mt-3">
              Anual gross sale in our site
            </p>
          </div>
        </div>
        <div className="mt-[140px] flex justify-between ">
          <div>
            <img src={tom} alt="" />
            <h1 className="text-[32px] font-medium mt-8">Tom Cruise</h1>
            <p className="text-[16px] font-normal mt-2">Founder & Chairman</p>
            <div className="flex gap-4 mt-4">
              <CiTwitter className="text-[30px]" />
              <CiInstagram className="text-[30px]" />
              <CiLinkedin className="text-[30px]" />
            </div>
          </div>
          <div>
            <img src={emma} alt="" />
            <h1 className="text-[32px] font-medium mt-8">Emma Watson</h1>
            <p className="text-[16px] font-normal mt-2">Managing Director</p>
            <div className="flex gap-4 mt-4">
              <CiTwitter className="text-[30px]" />
              <CiInstagram className="text-[30px]" />
              <CiLinkedin className="text-[30px]" />
            </div>
          </div>
          <div>
            <img src={will} alt="" />
            <h1 className="text-[32px] font-medium mt-8">Will Smith</h1>
            <p className="text-[16px] font-normal mt-2">Product Designer</p>
            <div className="flex gap-4 mt-4">
              <CiTwitter className="text-[30px]" />
              <CiInstagram className="text-[30px]" />
              <CiLinkedin className="text-[30px]" />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5 mt-10">
          <span className="w-[15px] h-[15px] hover:bg-red-500 bg-gray-500 rounded-full"></span>
          <span className="w-[15px] h-[15px] hover:bg-red-500 bg-gray-500 rounded-full"></span>
          <span className="w-[15px] h-[15px] hover:bg-red-500 bg-red-500 rounded-full"></span>
          <span className="w-[15px] h-[15px] hover:bg-red-500 bg-gray-500 rounded-full"></span>
          <span className="w-[15px] h-[15px] hover:bg-red-500 bg-gray-500 rounded-full"></span>
        </div>
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

export default About;
