import { useEffect, useState } from "react";
import Roadmap from "../../Components/Roadma";
import { GrDeliver } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { MdKeyboardReturn } from "react-icons/md";
import { useParams } from "react-router";
import { axiosInstance } from "../../Axios";
import Card from "../../Components/Card";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import iconuser from "../../assets/iconuser.svg";
import ProductShowcase from "../../Components/ProductShowcase ";
function ProductDetail() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [dataCateGories, setDataCateGories] = useState(null);
  const [dataReview, setDataReview] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleToggleShowMore = () => {
    setShowAll(!showAll);
  };

  const reviewsToShow = showAll
    ? dataReview
    : dataReview
    ? dataReview.slice(0, 3)
    : [];
  useEffect(() => {
    const fetchDetailBook = async () => {
      try {
        const res = await axiosInstance.get(`/api/detailBook/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchDetailBook();
    }
  }, [id]);

  useEffect(() => {
    const fetchBooksCategories = async () => {
      if (!product) return;
      try {
        const res = await axiosInstance.get(
          `/api/bookcategories/${product.CategoryID}`
        );
        setDataCateGories(res.data);
        const review = await axiosInstance.get(`/api/Review/${id}`);
        setDataReview(review.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooksCategories();
  }, [product]);

  const handleUp = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDown = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleInput = (e) => {
    if (e.target.value < 1) {
      setQuantity(1);
    }
  };
  const handleBuy = async () => {
    try {
      await axiosInstance.post("/api/cart/add", {
        UserID: user.ID,
        BookID: id,
        quantity: quantity,
      });

      toast.success("Add to cart successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Add to cart failed!");
    }
  };
  if (!product) return <div>Loading...</div>;
  console.log(product.Quantity);
  return (
    <div className="w-full">
      <Roadmap />
      <div className="max-w-[1440px] mx-auto px-[135px] mb-[140px]">
        <div className="flex justify-between mt-10 items-center mb-[140px]">
          <div>
            <div className="flex space-y-4">
              <img
                src={product.Img}
                alt="Main Product"
                className="w-[500px] h-[600px] rounded-lg"
              />
            </div>
          </div>
          <div className="w-[600px]">
            <div className="flex gap-10">
              <div className="w-[300px]">
                <h1 className="text-2xl font-semibold">{product.Title}</h1>
                <div className="flex items-center space-x-2 my-4">
                  <span className="text-green-500">
                    {product.Quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="flex gap-6">
                  <p className="text-2xl font-base mb-4">
                    ${product.sales || product.Price}
                  </p>
                  <p className="text-2xl text-gray-500 font-base line-through mb-4">
                    {product.sales === null ? null : `$${product.Price}`}
                  </p>
                </div>
                <p className="text-gray-600 mt-6 text-sm">
                  {product.Description}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-red-500">Review</h3>
                {dataReview && dataReview.length > 0 ? (
                  <div>
                    {reviewsToShow.map((review, index) => (
                      <div key={index} className="mt-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={review.Img || iconuser}
                            alt=""
                            className="w-10 h-10 bg-gray-200 p-2 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{review.Username}</p>
                            <span className="text-yellow-500">
                              {"★".repeat(review.Rating)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span>
                            {review.Comment.length > 25
                              ? `${review.Comment.slice(0, 25)}...`
                              : review.Comment}
                          </span>
                        </div>
                      </div>
                    ))}
                    {dataReview.length > 3 && (
                      <button
                        onClick={handleToggleShowMore}
                        className="text-red-500 mt-2 underline"
                      >
                        {showAll ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                ) : (
                  <span>Chưa có đánh giá nào</span>
                )}
              </div>
            </div>
            <span className="block w-full h-[1px] border border-gray-400 my-6"></span>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Product Details</h3>
                <ul className="list-disc pl-5 text-base">
                  <li>Size: 15 x 10 x 5 cm</li>
                  <li>Categories: {product.CategoryName}</li>
                  <li>Author: {product.Author}</li>
                </ul>
              </div>
              <div>
                <div className=" flex items-center gap-4 ">
                  <div className="rounded-lg">
                    <button
                      className="px-4 py-2 hover:bg-red-500 border border-black rounded-l-md hover:text-white "
                      onClick={handleDown}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="max-w-[60px] px-4 py-2 outline-none text-center border-y border-black "
                      value={quantity}
                      onChange={handleInput}
                    />
                    <button
                      className="px-4 py-2 hover:bg-red-500 border border-black rounded-r-md hover:text-white "
                      onClick={handleUp}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="px-12 py-[10px] bg-red-500 text-white rounded hover:bg-red-600 "
                    onClick={handleBuy}
                  >
                    Buy Now
                  </button>
                  <CiHeart className="border border-black py-[5px] px-[5px] w-10 h-10 rounded-md cursor-pointer hover:bg-red-500 hover:text-white" />
                </div>
                <div className="max-w-[400px] mt-10  border border-gray-500 rounded-md ">
                  <div className="flex items-center gap-4 cursor-pointer pt-6 pl-4 pb-4 hover:bg-slate-100  rounded-md ">
                    <GrDeliver className="text-3xl" />
                    <div className="">
                      <p className="text-base font-medium">Free Delivery</p>
                      <p className="text-xs font-medium mt-2">
                        Enter your postal code for Delivery Availability
                      </p>
                    </div>
                  </div>
                  <span className="block w-full h-[1px] bg-gray-500 "></span>
                  <div className="flex items-center gap-4 pt-6 pl-4 pb-4 cursor-pointer hover:bg-slate-100  rounded-md ">
                    <MdKeyboardReturn className="text-3xl" />
                    <div className="">
                      <p className="text-base font-medium">Return Delivery</p>
                      <p className="text-xs font-medium mt-2">
                        Free 30 Days Delivery Returns. Details
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[140px] ">
          {dataCateGories && dataCateGories.length > 0 ? (
            <div>
              <ProductShowcase
                data={dataCateGories}
                limit={4}
                title={"Same kind"}
                desc={"Today"}
              />
            </div>
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
