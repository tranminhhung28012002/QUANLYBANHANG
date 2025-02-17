import { useNavigate } from "react-router";

export default function OrderCardDetail({
  id,
  product,
  img,
  Quantity,
  Total,
  price,
  Description,
  Address,
  Email,
}) {
  const navigate = useNavigate();
  return (
    <div
      className="relative flex justify-between items-start gap-5 shadow-custom px-8 py-5 mt-10 cursor-pointer w-full"
      onClick={() => navigate(`/productDetail/${id}`)}
    >
      <div className="flex gap-5 w-[50%]">
        <img src={img} alt={product} className="w-40 h-40 rounded" />
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-800 text-lg">{product}</h3>
          <p className="text-gray-600 text-base">${price}</p>
          <p className="text-gray-500 text-base w-[250px]">{Description}</p>
        </div>
      </div>

      <div className="w-[40%]">
        <h4 className="font-semibold text-gray-800 text-lg">
          Delivery address
        </h4>
        <p className="text-gray-600 text-lg mt-3">{Address}</p>
      </div>

      <div className="flex flex-col gap-9 w-[10%]">
        <div>
          <h4 className="font-semibold text-gray-800 text-lg">Shipping</h4>
          <p className="text-gray-600 text-base mt-3">{Email}</p>
        </div>
        <div>
          <p className="text-black font-bold text-lg">
            Quantity:{" "}
            <span className="font-semibold text-gray-600">{Quantity}</span>
          </p>
          <p className="text-black font-bold text-lg">
            Total: <span className="font-semibold text-gray-600">${Total}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
