import { useEffect, useState } from "react";
import Roadmap from "../../Components/Roadma";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../Axios";
import { useNavigate } from "react-router";
import { BarChart } from "@mui/x-charts/BarChart";
function MyAccount() {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("My Profile"); // Quản lý tab hiện tại
  const [ListOrder, setListOrder] = useState([]);
  const [date, setDate] = useState(null);
  const [filterType, setFilterType] = useState("week");
  const [dataSellingBook, setDataSellingBook] = useState([]);
  const [dataUserBuyBook, setdataUserBuyBook] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchGetOrder = async () => {
      const res = await axiosInstance.get(`/api/showListOrder/${user.ID}`);
      setListOrder(res.data);
      if (Array.isArray(res.data)) {
        res.data.forEach((order) => {
          if (order.OrderTime) {
            const formattedDate = new Date(order.OrderTime).toLocaleDateString(
              "vi-VN"
            );
            setDate(formattedDate);
            console.log(`Order ID: ${order.OrderID}, Ngày: ${formattedDate}`);
          }
        });
      }
    };
    fetchGetOrder();
  }, []);

  useEffect(() => {
    const fetchSellingBooks = async () => {
      try {
        const resSellingBooks = await axiosInstance.get(
          `/api/best-selling?filterType=${filterType}`
        );
        setDataSellingBook(resSellingBooks.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    const fetchUserBuyBooks = async () => {
      try {
        const resSellingBooks = await axiosInstance.get(
          `/api/bestUserBuyBook?filterType=${filterType}`
        );
        setdataUserBuyBook(resSellingBooks.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserBuyBooks();
    fetchSellingBooks();
  }, [filterType]);

  const formattedDataSellingBook = dataSellingBook.map((book) => {
    const orderDate = new Date(book.saleDate);
    return {
      ...book,
      saleDate: orderDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  });

  const formattedDataUserBuyBook = dataUserBuyBook.map((book) => {
    const orderDate = new Date(book.purchaseDate);
    return {
      ...book,
      purchaseDate: orderDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      monthOfyear: `Tháng ${orderDate.getMonth() + 1}`,
    };
  });
  console.log("formattedDataUserBuyBook", formattedDataUserBuyBook);
  return (
    <div className="w-full">
      <Roadmap />
      <div className="w-[1440px] mx-auto px-[150px] flex gap-[100px] pl-[135px] mt-10 mb-[140px]">
        <div className="w-[250px]">
          <div>
            <h4 className="text-[16px] font-medium">Manage My Account</h4>
            <div className="mt-4 gap-2 flex flex-col ml-[35px] cursor-pointer">
              <p
                className={`text-gray-500 focus:text-red-500 ${
                  activeTab === "My Profile" ? "text-red-500" : ""
                }`}
                onClick={() => setActiveTab("My Profile")}
              >
                My Profile
              </p>
              <p
                className={`text-gray-500 focus:text-red-500 ${
                  activeTab === "addressBook" ? "text-red-500" : ""
                }`}
                onClick={() => setActiveTab("addressBook")}
              >
                Address Book
              </p>
              <p
                className={`text-gray-500 focus:text-red-500 ${
                  activeTab === "paymentOption" ? "text-red-500" : ""
                }`}
                onClick={() => setActiveTab("paymentOption")}
              >
                My Payment Option
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-[16px] font-medium">My order</h4>
            <div className="mt-4 gap-2 flex flex-col ml-[35px] cursor-pointer">
              <p
                className={`text-gray-500 focus:text-red-500 ${
                  activeTab === "Order history" ? "text-red-500" : ""
                }`}
                onClick={() => setActiveTab("Order history")}
              >
                Order history
              </p>
              <p className="text-gray-500 focus:text-red-500">
                My Cancellations
              </p>
            </div>
          </div>
          {user?.Role === "ADMIN" && (
            <div className="mt-6">
              <h4 className="text-[16px] font-medium">My Admin</h4>
              <div className="mt-4 gap-2 flex flex-col ml-[35px] cursor-pointer">
                <p
                  className={`text-gray-500 focus:text-red-500 ${
                    activeTab === "Best-selling book statistics"
                      ? "text-red-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("Best-selling book statistics")}
                >
                  Best-selling book statistics
                </p>
                <p
                  className={`text-gray-500 focus:text-red-500 ${
                    activeTab === "Customers buy the most books"
                      ? "text-red-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("Customers buy the most books")}
                >
                  Customers buy the most books
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Nội dung bên phải */}
        <div className="shadow-custom py-10 px-20 w-full h-[630px]">
          {activeTab === "My Profile" && (
            <>
              <h2 className="text-red-500 text-[20px] font-medium">
                Edit Your Profile
              </h2>
              <div className="grid grid-cols-2 gap-[30px] mt-4">
                <div>
                  <p>User Name</p>
                  <input
                    type="text"
                    placeholder={user.Username}
                    className="mt-2 py-[13px] pl-[16px] pr-[140px] outline-none bg-slate-200"
                  />
                </div>
                <div>
                  <p>Full Name</p>
                  <input
                    type="text"
                    className="mt-2 py-[13px] pr-[140px] pl-[16px] outline-none bg-slate-200"
                    placeholder={user.FullName}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[30px] mt-6">
                <div>
                  <p>Email</p>
                  <input
                    type="text"
                    placeholder={user.Email}
                    className="mt-2 py-[13px] pl-[16px] pr-[140px] outline-none bg-slate-200"
                  />
                </div>
                <div>
                  <p>Address</p>
                  <input
                    type="text"
                    className="mt-2 py-[13px] pr-[140px] pl-[16px] outline-none bg-slate-200"
                    placeholder={user.Address}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 mt-6 gap-4">
                <p>Password Change</p>
                <input
                  type="password"
                  placeholder="Current Password"
                  className="py-[13px] pr-[140px] pl-[16px] outline-none bg-slate-200 w-full"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="py-[13px] pr-[140px] pl-[16px] outline-none bg-slate-200 w-full"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="py-[13px] pr-[140px] pl-[16px] outline-none bg-slate-200 w-full"
                />
              </div>
              <div className="flex gap-10 mt-6 justify-end">
                <button className="py-4 px-12 hover:bg-slate-200">
                  Cancel
                </button>
                <button className="bg-red-500 py-4 px-12 text-white hover:bg-red-600">
                  Save Changes
                </button>
              </div>
            </>
          )}

          {activeTab === "addressBook" && (
            <div>
              <h2 className="text-red-500 text-[20px] font-medium">
                Edit Your Address Book
              </h2>
              {/* Nội dung quản lý địa chỉ */}
            </div>
          )}

          {activeTab === "paymentOption" && (
            <div>
              <h2 className="text-red-500 text-[20px] font-medium">
                Edit Your Payment Option
              </h2>
              {/* Nội dung quản lý phương thức thanh toán */}
            </div>
          )}
          {activeTab === "Order history" && (
            <div>
              <h2 className="text-red-500 text-[20px] font-medium">
                Order history
              </h2>
              <div className="w-full mt-4">
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          Order ID
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          Order Date
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          Total Amount
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {ListOrder.map((order) => (
                        <tr key={order.OrderID} className="border-b">
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {order.OrderID}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {date}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {order.Status}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {order.TotalPrice}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() =>
                                navigate(`/OrderDetail/${order.OrderID}`)
                              }
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Best-selling book statistics" && (
            <div>
              <h2 className="text-red-500 text-[20px] font-medium mb-4">
                Best-selling book statistics
              </h2>
              <div className="flex space-x-4 mb-4">
                <button
                  className={`px-4 py-2 rounded ${
                    filterType === "week"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setFilterType("week")}
                >
                  Tuần
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    filterType === "month"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setFilterType("month")}
                >
                  Tháng
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    filterType === "year"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setFilterType("year")}
                >
                  Năm
                </button>
              </div>

              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: formattedDataSellingBook.map((book) => {
                      if (filterType === "week") {
                        return `${book.Title}`; // Hiển thị ngày + sách
                      } else if (filterType === "month") {
                        return `${book.saleDate} - ${book.Title}`;
                      } else if (filterType === "year") {
                        return `Tháng ${book.saleMonth} - ${book.Title}`; // Hiển thị tháng + sách
                      }
                      return book.Title;
                    }),
                    label:
                      filterType === "year"
                        ? "Tháng - Tên sách"
                        : "Ngày - Tên sách",
                  },
                ]}
                series={[
                  {
                    data: formattedDataSellingBook.map(
                      (book) => book.totalQuantityBook
                    ),
                    label: "Số lượng bán",
                  },
                ]}
                width={700}
                height={450}
              />
            </div>
          )}
          {activeTab === "Customers buy the most books" && (
            <div>
              <h2 className="text-red-500 text-[20px] font-medium mb-4">
                Customers buy the most books
              </h2>
              <div className="flex space-x-4 mb-4">
                <button
                  className={`px-4 py-2 rounded ${
                    filterType === "week"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setFilterType("week")}
                >
                  Tuần
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    filterType === "month"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setFilterType("month")}
                >
                  Tháng
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    filterType === "year"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setFilterType("year")}
                >
                  Năm
                </button>
              </div>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: formattedDataUserBuyBook.map((book) => {
                      if (filterType === "week") {
                        return `${book.purchaseDate} -  ${book.Username}`;
                      } else if (filterType === "month") {
                        return `${book.purchaseDate} - ${book.Username}`;
                      } else if (filterType === "year") {
                        return `${book.monthOfyear} - ${book.Username}`;
                      }
                      return book.Username;
                    }),
                    label:
                      filterType === "year"
                        ? "Tháng - Tên sách"
                        : "Ngày - Tên sách",
                  },
                ]}
                series={[
                  {
                    data: formattedDataUserBuyBook.map(
                      (book) => book.totalBooksPurchased
                    ),
                    label: "Số lượng bán",
                  },
                ]}
                width={700}
                height={450}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
