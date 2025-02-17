import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { axiosInstance } from "../Axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
// This value is from the props in the UI
const style = { shape: "rect", layout: "vertical" };

export default function Paypal({ userID, listCart, total }) {
  const navigate = useNavigate();
  const createOrder = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: listCart,
          totalAmount: total,
        }),
      });
      const orderData = await res.json();
      return orderData.OrderID;
    } catch (error) {
      console.log(error);
    }
  };

  const onApprove = async (data) => {
    try {
      const res = await fetch(`http://localhost:3000/api/success`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          OrderID: data.orderID,
        }),
      });

      const details = await res.json();
      if (details) {
        await axiosInstance.post("/api/create", {
          OrderID: data.orderID,
          UserID: userID,
          TotalPrice: total,
          Status: details.paymentDetails.status,
          cartItems: listCart,
        });
      }
      if (details) {
        navigate("/Success");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message || "error");
    }
  };
  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </>
    );
  };
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          clientId:
            "AT5vWHcmBw-qB9iDkCYrKeXKyryJrWgEKPt3ckHjJK6oK2Eo9FYWBXCqCf2PT1A97gA9LZLCf1pu3gh6",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper
          showSpinner={false}
          cartData={listCart}
          totalCart={total}
        />
      </PayPalScriptProvider>
    </div>
  );
}
