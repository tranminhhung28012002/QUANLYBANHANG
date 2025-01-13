import { CiMail } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import Roadmap from "../../Components/Roadma";

function Contact() {
  return (
    <div className="w-full">
      <Roadmap />
      <div className="max-w-[1440px] mx-auto flex pt-[80px] pb-[140px] px-[135px] gap-[30px]">
        <div className="px-[35px] py-[40px] shadow-custom w-[340px]">
          <div className="">
            <div className="flex gap-4 items-center">
              <IoIosCall className="w-[40px] h-[40px] bg-red-500 text-white rounded-full p-1" />
              <h5 className="text-[16px] font-medium">Call to Us</h5>
            </div>
            <p className="text-[16px] font-normal mt-6">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-[16px] font-normal mt-4">
              Phone: +8801611112222
            </p>
          </div>
          <span className="h-[1px] bg-gray-500 w-[270px] mx-auto block my-8"></span>
          <div>
            <div className="flex gap-4 items-center">
              <CiMail className="w-[40px] h-[40px] bg-red-500 text-white rounded-full p-1" />
              <h5 className="text-[16px] font-medium">Write To US</h5>
            </div>
            <p className="text-[16px] font-normal mt-6">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-[16px] font-normal mt-4">
              Emails: customer@exclusive.com
            </p>
            <p className="text-[16px] font-normal mt-4">
              Emails: support@exclusive.com
            </p>
          </div>
        </div>
        <div className="py-10 w-[800px]  px-8 shadow-custom">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              className="py-[13px] pl-[16px] pr-[38px] outline-none bg-slate-200"
              placeholder="Your Name"
            />

            <input
              type="text"
              className="py-[13px] pl-[16px] pr-[38px] outline-none bg-slate-200"
              placeholder="Your Email"
            />

            <input
              type="text"
              className="py-[13px] pl-[16px] pr-[38px] outline-none bg-slate-200"
              placeholder="Your Phone"
            />
          </div>
          <div className="mt-12 ">
            <textarea
              className="w-full h-[220px] p-4 border border-gray-300  bg-gray-200 text-gray-700 outline-none "
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="flex justify-end mt-8">
            <button className="bg-red-500 text-white py-4 px-12">
              Send Massage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
