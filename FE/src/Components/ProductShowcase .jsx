import Card from "./Card";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ModalAdmin from "./ModalAdmin";
import { axiosInstance } from "../Axios";

function ProductShowcase({ data, title, desc, limit, link, reload }) {
  const { user } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const [cate, setCate] = useState([]);
  useEffect(() => {
    try {
      const fetchCate = async () => {
        const res = await axiosInstance.get("/api/categories");
        setCate(res.data.data);
      };
      fetchCate();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="mt-[140px] ">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] h-[40px] bg-red-500 rounded-md"></span>
            <p className="text-red-500 font-semibold">{desc}</p>
          </div>
          <div>
            <h3 className="text-4xl font-semibold mt-6">{title}</h3>
          </div>
        </div>
        <div className="flex gap-2">
          {user?.Role === "ADMIN" ? (
            <button
              className="py-4 px-12 bg-red-500 text-white font-medium hover:bg-red-600"
              onClick={() => setModal(true)}
            >
              Thêm
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-4 gap-y-14 ">
          {data.slice(0, limit).map((item, index) => (
            <div key={index} className="">
              <Card
                id={item.BookID}
                price={item.sales || item.Price}
                title={item.Title}
                img={item.Img}
                sales={item.sales === null ? null : item.Price}
                desc={item.Description}
                quantity={item.Quantity}
                author={item.Author}
                Evaluate={item.comment}
                cateID={item.CategoryID}
                cateName={cate}
                reload={reload}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-[60px]">
          <Link to={link}>
            <button className="py-4 px-12 bg-red-500 text-white font-medium hover:bg-red-600">
              View All Product
            </button>
          </Link>
        </div>
      </div>
      {modal && <ModalAdmin onClose={setModal} cate={cate} />}
    </div>
  );
}

export default ProductShowcase;
