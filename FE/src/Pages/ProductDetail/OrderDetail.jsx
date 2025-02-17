import { useEffect, useState } from "react";
import Roadmap from "../../Components/Roadma";
import { axiosInstance } from "../../Axios";
import OrderCardDetail from "../../Components/OrderCardDetail";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import Error404 from "../404Error/Error";
function OrderDetail() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const formatEmail = (email) => {
    const firstChar = email.charAt(0);
    const lastThreeChars = email.slice(-3);
    const maskedEmail = firstChar + "*****" + lastThreeChars;
    return maskedEmail;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/getOrderDetail?UserID=${user.ID}&OrderID=${id}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
  }, [id, user.ID]);

  if (loading) {
    return <Error404 />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full text-center mt-10 min-h-[356px]">
        <p className="text-4xl">
          No order details found. Please check the order ID and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Roadmap />
      <div className="max-  w-[1440px] mx-auto px-[135px] mb-[140px] mt-10">
        <div className="flex gap-5 items-center">
          <IoArrowBack
            size={30}
            onClick={() => navigate("/account")}
            className="cursor-pointer"
          />
          <h2 className="text-4xl font-bold">Order {id}</h2>
        </div>

        {data.map((e, index) => (
          <OrderCardDetail
            key={index}
            id={e.BookID}
            product={e.Title}
            Description={e.Description}
            img={e.Img}
            price={e.sales || e.Price}
            Quantity={e.Quantity}
            Total={e.total}
            Address={e.Address}
            Email={formatEmail(e.Email)}
            OrderTime={e.OrderTime}
          />
        ))}
      </div>
    </div>
  );
}

export default OrderDetail;
