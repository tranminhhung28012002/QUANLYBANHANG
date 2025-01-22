import fantasy from "../assets/card/fantasy.jpg";
import giadinh from "../assets/card/giadinh.jpg";
import history from "../assets/card/history.jpg";
import kinhte from "../assets/card/kinhte.jpg";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Card from "./Card";
import start from "../assets/start.svg";
import { Link, Navigate, useNavigate } from "react-router";
const images = [
  {
    img: fantasy,
    name: "Frieren",
    money: "$160",
    sales: "$120",
    comment: "88",
    start: start,
  },
  {
    img: giadinh,
    name: "Trong gia dinh",
    money: "$1160",
    sales: "$960",
    comment: "75",
    start: start,
  },
  {
    img: history,
    name: "Bách khoa thư lịch sử",
    money: "$400",
    sales: "$370",
    comment: "99",
    start: start,
  },
  {
    img: kinhte,
    name: "Kinh tế tài chính ",
    money: "$400",
    sales: "$375",
    comment: "99",
    start: start,
  },
  {
    img: giadinh,
    name: "Trong gia dinh",
    money: "$1160",
    sales: "$960",
    comment: "75",
    start: start,
  },
  {
    img: history,
    name: "Bách khoa thư lịch sử",
    money: "$400",
    sales: "$370",
    comment: "99",
    start: start,
  },
  {
    img: kinhte,
    name: "Kinh tế tài chính ",
    money: "$400",
    sales: "$375",
    comment: "99",
    start: start,
  },
  {
    img: kinhte,
    name: "Kinh tế tài chính ",
    money: "$400",
    sales: "$375",
    comment: "99",
    start: start,
  },
];

function ListProduct() {
  return (
    <div className="mt-[140px] ">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] h-[40px] bg-red-500 rounded-md"></span>
            <p className="text-red-500 font-semibold">Our Products</p>
          </div>
          <div>
            <h3 className="text-4xl font-semibold mt-6">
              Explore Our Products
            </h3>
          </div>
        </div>
        <div className="flex gap-2">
          <IoArrowBack className="text-[50px]  bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-700" />

          <IoArrowForward className="text-[50px] bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-700" />
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-4 gap-y-14 ">
          {images.map((item, index) => (
            <div
              key={index}
              className="group hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <Card
                price={item.money}
                title={item.name}
                img={item.img}
                sales={item.sales}
                Evaluate={item.comment}
                icon={item.start}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-[60px]">
          <Link to={"/BookAll"}>
            <button className="py-4 px-12 bg-red-500 text-white font-medium hover:bg-red-600">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
