import { RouterProvider } from "react-router";
import "./App.css";
import Router from "./Router/Router";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./Context/CartContext";
function App() {
  useEffect(() => {
    const controller = new AbortController();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <CartProvider>
        <RouterProvider router={Router} />
      </CartProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
