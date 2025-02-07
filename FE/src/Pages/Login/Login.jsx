import { useState } from "react";
import bookstore from "../../assets/booklogin.jpg";
import { axiosInstance } from "../../Axios";
import { useDispatch } from "react-redux";
import { login } from "../../Store/authReducer";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/api/loginUser", {
        Email: email,
        Password: password,
      });
      dispatch(
        login({
          user: res.data.user,
          token: res.data.access_token,
        })
      );
      toast.success("Đăng nhập thành công!");
      setTimeout(() => {
        if (res.data.redirect) {
          navigate(res.data.redirect);
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto sm:flex justify-between sm:pr-[135px]  items-center pt-[60px] sm:pb-[140px] ">
        <img
          src={bookstore}
          alt=""
          className="2xl:w-[781px] 2xl:h-[805px] lg:w-[600px] xl:w-[700px] lg:h-[500px] w-[500px] h-[400px] hidden sm:block object-cover"
        />
        <div className="flex flex-col ">
          <h1 className="2xl:text-4xl xl:text-2xl text-xl font-medium">
            Log in to Exclusive
          </h1>
          <p className="2xl:mt-6 xl:mt-4 text-[16px] font-normal">
            Enter your detail below
          </p>
          <div className="2xl:mt-12 lg:mt-6 flex flex-col text-base">
            <p className="text-xl font-normal">Email</p>
            <input
              type="text"
              placeholder="Email on Phone Number"
              className="outline-none border-b border-gray-500 mt-4 "
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xl font-normal mt-5">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="outline-none border-b border-gray-500 mt-4"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && (
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
          </div>
          <div className="mt-10 flex items-center justify-between gap-[87px]">
            <button
              className="bg-red-500 text-white px-[48px] py-4 hover:bg-red-600"
              onClick={handleLogin}
            >
              Log in
            </button>
            <span className="text-red-500 cursor-pointer hover:text-red-600">
              Sign Up with Google
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
