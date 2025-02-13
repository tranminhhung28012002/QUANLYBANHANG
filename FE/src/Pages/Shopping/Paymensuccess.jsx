// PaymentSuccess.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    // Tạo một bộ đếm thời gian
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl text-red-500 font-semibold mb-4">
        Thanh toán thành công!
      </h1>
      <p className="text-xl text-gray-700 mb-6">
        Cảm ơn bạn đã mua hàng! Đơn hàng của bạn sẽ được xử lý ngay lập tức.
      </p>

      <div className="text-xl text-gray-600 mb-6">
        Thời gian chuẩn bị còn lại:{" "}
        <span className="font-bold text-red-600">{formatTime(timeLeft)}</span>
      </div>

      <button
        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        onClick={() => navigate("/home")} // Điều hướng đến trang chủ ngay khi nhấn nút
      >
        Trở về trang chủ
      </button>
    </div>
  );
}

export default PaymentSuccess;
