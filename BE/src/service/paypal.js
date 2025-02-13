import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PAYPAL_API_URL = "https://api-m.sandbox.paypal.com";
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

// Lấy access token từ PayPal
const getAccessToken = async () => {
  const response = await axios.post(
    `${PAYPAL_API_URL}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`
        ).toString("base64")}`,
      },
    }
  );
  return response.data.access_token;
};

// Tạo đơn hàng
export const createOrderPaypal = async (totalAmount, itemsCart) => {
  const accessToken = await getAccessToken();
  const invoiceId = "INV-" + Date.now();
  const orderData = {
    intent: "CAPTURE",
    purchase_units: [
      {
        invoice_id: invoiceId,
        amount: {
          currency_code: "USD",
          value: totalAmount.toString(),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: totalAmount.toString(),
              shipping: "0",
            },
          },
        },
        items: itemsCart,
      },
    ],
    application_context: {
      return_url: "http://localhost:3000/api/success",
      cancel_url: "http://localhost:3000/api/cancel",
    },
  };
  try {
    const response = await axios.post(
      `${PAYPAL_API_URL}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const OrderID = response.data.id;
    const approvalLink = response.data.links.find(
      (link) => link.rel === "approve"
    ).href;
    return { OrderID, approvalLink };
  } catch (error) {
    console.error(
      "Error creating PayPal order:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
//thanh toan
export const capturePayment = async (OrderID) => {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.post(
      `${PAYPAL_API_URL}/v2/checkout/orders/${OrderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error capturing payment:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
