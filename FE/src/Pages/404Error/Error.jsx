import { Navigate, useNavigate } from "react-router";

function Error404() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center pt-[241px] pb-[140px]">
      <h1 className="text-[110px] font-medium">404 Not Found</h1>
      <p className="text-[16px]">
        Your visited page not found. You may go home page.
      </p>
      <button
        className="py-4 px-12 bg-red-500 text-white mt-20"
        onClick={() => navigate("/")}
      >
        Back to home Page
      </button>
    </div>
  );
}

export default Error404;
