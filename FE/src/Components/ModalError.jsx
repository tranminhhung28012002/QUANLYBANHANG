import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router";

function ModalError({ message, data, onClose }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 xl:w-1/3">
        <MdErrorOutline
          className=" bg-red-500/30 rounded-full p-2 text-red-500 mb-4"
          size={50}
        />

        <div className="flex flex-col ">
          <h3 className="text-3xl font-bold">{message}</h3>
          <div className="mt-4 flex flex-col gap-5">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-3 text-left bg-gray-200  rounded-lg px-2"
              >
                <p className="">{item.book}</p>
                <p>{item.message}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <button
            className="py-3 px-6 text-center w-[150px] bg-red-500 text-white font-medium text-base mt-4 hover:bg-red-600 rounded-md"
            onClick={() => navigate("/")}
          >
            Back to home
          </button>
          <button
            className="py-3 px-6 text-center w-[150px] bg-gray-200 font-medium text-base mt-4 hover:bg-gray-300 rounded-md"
            onClick={() => onClose(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalError;
