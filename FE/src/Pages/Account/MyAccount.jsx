import { useEffect, useState } from "react";
import Roadmap from "../../Components/Roadma";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../Axios";

function MyAccount() {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("My Profile"); // Quản lý tab hiện tại
  const [ListOrder, setListOrder] = useState([]);
  const [date, setDate] = useState(null);
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
        </div>

        {/* Nội dung bên phải */}
        <div className="shadow-custom py-10 px-20 w-full">
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
                            <button className="text-blue-500 hover:text-blue-700">
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
          {/* Các trường thay đổi mật khẩu */}

          <div className="flex gap-10 mt-6 justify-end">
            <button className="py-4 px-12 hover:bg-slate-200">Cancel</button>
            <button className="bg-red-500 py-4 px-12 text-white hover:bg-red-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
