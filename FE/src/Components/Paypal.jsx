import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

// This value is from the props in the UI
const style = { shape: "rect", layout: "vertical" };

export default function Paypal({ listCart, total }) {
  const createOrder = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemsCart: data.cart,
          totalAmount: data.total,
        }),
      });
      const orderData = await res.json();
      return orderData.OrderID;
    } catch (error) {
      console.log(error);
    }
  };

  const onApprove = async (data) => {
    const res = await fetch(`http://localhost:3000/api/success`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        OrderID: data.orderID,
      }),
    });
    const details = await res.json();
    alert(`Transaction completed by thanh cong`);
  };
  const ButtonWrapper = ({ showSpinner, cartData, totalCart }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
          createOrder={(data, actions) =>
            createOrder({ cart: cartData, total: totalCart }, actions)
          }
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
