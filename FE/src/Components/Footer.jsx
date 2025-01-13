import { TbPlayerTrackNext } from "react-icons/tb";
import qrcode from "../assets/Qrcode.png";
import ggplay from "../assets/googleplay.png";
import appstore from "../assets/appstore.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
function Footer() {
  return (
    <div className="bg-black w-full sm:block hidden">
      <div className="max-w-[1440px] mx-auto flex justify-between px-[135px] py-[80px] ">
        <div className="max-w-[175px] text-white ">
          <h1 className="text-2xl font-bold ">Exclusive</h1>
          <p className="text-xl font-medium mt-6">Subscribe</p>
          <div className="text-lg mt-6 gap-4 grid">
            <p className="text-lg ">Get 10% off your first order</p>
            <div className="flex border-white border py-[10px] pl-[10px] max-w-[220px] items-center">
              <input
                type="text"
                placeholder="Enter your email"
                className=" bg-black text-gray-500 outline-none w-[150px] "
              />
              <TbPlayerTrackNext className="text-2xl text-white ml-3" />
            </div>
          </div>
        </div>
        <div className="max-w-[175px] text-white">
          <h2 className="text-xl font-medium">Support</h2>
          <div className="text-lg mt-6 gap-4 grid">
            <p className="">
              38 điện biên phủ Quận Thanh khê Thành phố Đà Nẵng
            </p>
            <p className="">himden9999@gmail.com</p>
            <p className="">+84 382129323</p>
          </div>
        </div>
        <div className="max-w-[175px]  text-white ">
          <h2 className="text-xl font-medium">Account</h2>
          <div className="text-lg mt-6 gap-4 grid">
            <p className="">My Account</p>
            <p className="">Login / Register</p>
            <p className="">Cart</p>
            <p className="">Wishlist</p>
            <p className="">Shop</p>
          </div>
        </div>
        <div className="max-w-[175px] text-white ">
          <h2 className="text-xl font-medium">Quick Link</h2>
          <div className="text-lg mt-6 gap-4 grid">
            <p className="">Privacy Policy</p>
            <p className="">Terms Of Use</p>
            <p className="">FAQ</p>
            <p className="">Contact</p>
          </div>
        </div>
        <div className="max-w-[175px] text-white">
          <h2 className="text-xl font-medium">DownLoad App</h2>
          <div className="mt-6">
            <p className="text-sm text-gray-500 font-medium">
              Save $3 with App New User Only
            </p>
            <div className="flex mt-3 gap-[11px] items-center">
              <img src={qrcode} alt="" />
              <div className="flex flex-col gap-[7px]">
                <img src={ggplay} alt="" />
                <img src={appstore} alt="" />
              </div>
            </div>
            <div className="flex gap-6 mt-6">
              <FaFacebook className="w-[24px] h-[24px]" />
              <FaYoutube className="w-[24px] h-[24px]" />
              <FaLinkedin className="w-[24px] h-[24px]" />
              <FaInstagram className="w-[24px] h-[24px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
