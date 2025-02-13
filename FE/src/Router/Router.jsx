import { createBrowserRouter } from "react-router";
import Layout from "../Components/Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/SignUp";
import Error404 from "../Pages/404Error/Error";
import About from "../Pages/About/about";
import Contact from "../Pages/Contact/Contact";
import MyAccount from "../Pages/Account/MyAccount";
import Shopping from "../Pages/Shopping/Shopping";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import AllBook from "../Pages/AllBook/AllBook";
import CheckOut from "../Pages/Shopping/CheckOut";
import PaymentSuccess from "../Pages/Shopping/Paymensuccess";
const Router = new createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/Signup",
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/Error",
    element: (
      <Layout>
        <Error404 />
      </Layout>
    ),
  },
  {
    path: "/About",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: "/account",
    element: (
      <Layout>
        <MyAccount />
      </Layout>
    ),
  },
  {
    path: "/Shopping",
    element: (
      <Layout>
        <Shopping />
      </Layout>
    ),
  },
  {
    path: "/ProductDetail/:id",
    element: (
      <Layout>
        <ProductDetail />
      </Layout>
    ),
  },
  {
    path: "/BookAll",
    element: (
      <Layout>
        <AllBook />
      </Layout>
    ),
  },
  {
    path: "/Checkout",
    element: (
      <Layout>
        <CheckOut />
      </Layout>
    ),
  },
  {
    path: "/Success",
    element: (
      <Layout>
        <PaymentSuccess />
      </Layout>
    ),
  },
  {
    path: "/admin",
  },
]);
export default Router;
