import Roadmap from "../../Components/Roadma";

function MyAccount() {
  return (
    <>
      <Roadmap />
      <div className="flex gap-[100px] pl-[135px] mt-20 mb-[140px]">
        <div>
          <div>
            <h4 className="text-[16px] font-medium">Manage My Account</h4>
            <div className="mt-4 gap-2 flex flex-col ml-[35px]">
              <p className="text-gray-500 focus:text-red-500">My Profile</p>
              <p className="text-gray-500 focus:text-red-500">Address Book</p>
              <p className="text-gray-500 focus:text-red-500">
                My Payment Option
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-[16px] font-medium">My order</h4>
            <div className="mt-4 gap-2 flex flex-col ml-[35px]">
              <p className="text-gray-500 focus:text-red-500">My Returns</p>
              <p className="text-gray-500 focus:text-red-500">
                My Cancellations
              </p>
            </div>
          </div>
        </div>
        <div className="shadow-custom py-10 px-20">
          <h2 className="text-red-500 text-[20px] font-medium">
            Edit Your Profile
          </h2>
          <div className="grid grid-cols-2 gap-[30px] mt-4">
            <div>
              <p>First Name</p>
              <input
                type="text"
                placeholder="First Name"
                className="mt-2 py-[13px] pl-[16px] pr-[100px] outline-none bg-slate-200"
              />
            </div>
            <div>
              <p>Last Name</p>
              <input
                type="text"
                className="mt-2 py-[13px] pr-[100px] pl-[16px] outline-none bg-slate-200"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[30px] mt-6">
            <div>
              <p>Email</p>
              <input
                type="text"
                placeholder="Email"
                className="mt-2 py-[13px] pl-[16px] pr-[100px] outline-none bg-slate-200"
              />
            </div>
            <div>
              <p>Address</p>
              <input
                type="text"
                className="mt-2 py-[13px] pr-[100px] pl-[16px] outline-none bg-slate-200"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mt-6 gap-4">
            <p>Password Change</p>
            <input
              type="password"
              placeholder="Current Password"
              className="py-[13px] pr-[100px] pl-[16px] outline-none bg-slate-200 w-full"
            />
            <input
              type="password"
              placeholder="New Password"
              className="py-[13px] pr-[100px] pl-[16px] outline-none bg-slate-200 w-full"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="py-[13px] pr-[100px] pl-[16px] outline-none bg-slate-200 w-full"
            />
          </div>
          <div className="flex gap-10 mt-6 justify-end">
            <button className="py-4 px-12 hover:bg-slate-200">Cancel</button>
            <button className="bg-red-500 py-4 px-12 text-white hover:bg-red-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
