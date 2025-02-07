import { useState } from "react";
import booksignup from "../../assets/booksignup.jpg";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../Axios";
import { toast } from "react-toastify";
function SignUp() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleCreateAccount = async () => {
    try {
      await axiosInstance.post("http://localhost:3000/api/users", {
        username: name,
        password: password,
        fullName: fullname,
        email: email,
        phone: phone,
        address: adress,
      });
      toast.success("Đăng ký thành công");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto sm:flex justify-between sm:pr-[135px]  items-center pt-[60px] sm:pb-[140px]">
        <img
          src={booksignup}
          alt=""
          className="2xl:w-[781px] 2xl:h-[805px] lg:w-[600px] xl:w-[700px] lg:h-[500px] w-[500px] h-[400px] hidden sm:block object-cover"
        />
        <div className="flex flex-col ">
          <h1 className="2xl:text-4xl xl:text-2xl text-xl font-medium">
            Create an account
          </h1>
          <p className="2xl:mt-6 xl:mt-4 text-[16px] font-normal">
            Enter your detail below
          </p>
          <form
            action="#"
            className="2xl:mt-12 lg:mt-6 flex flex-col 2xl:gap-y-10 xl:gap-y-6 gap-y-3 text-base"
          >
            <input
              type="text"
              placeholder="Name"
              className="outline-none border-b border-gray-500"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="outline-none border-b border-gray-500"
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="outline-none border-b border-gray-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="outline-none border-b border-gray-500"
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="outline-none border-b border-gray-500"
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className="outline-none border-b border-gray-500"
              onChange={(e) => setAddress(e.target.value)}
            />
            {errorMessage && (
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
          </form>
          <button
            className="bg-red-500 text-white 2xl:px-[122px]  py-4 mt-10"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
          <button className="border-gray-500 border 2xl:px-[122px]  lg:px-[80px] py-4 mt-4">
            Sign Up with Google
          </button>
          <div className="flex justify-center gap-4 mt-8">
            <p className="text-base font-normal text-gray-700 cursor-pointer">
              Already have account?
            </p>
            <p
              className="text-base font-normal border-gray-500 border-b cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
