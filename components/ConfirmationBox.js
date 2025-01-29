import React from "react";

const ConfirmationBox = ({
  setshowConfirmationBox,
  setclicked,
  setshowLoading,
  onForgotPassword,
  email,
}) => {
  const confirm = async () => {
    setclicked(true);
    setshowConfirmationBox(false);
    setshowLoading(true);
    onForgotPassword();
  };

  return (
    <div>
      <div className="w-[20rem] mx-auto p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-center mb-6 font-semibold text-gray-800">
          Send OTP to {email}
        </h2>
        <div className="w-full flex justify-center">
          <div className="w-[13rem] flex flex-col gap-4">
            <button
              onClick={confirm}
              className="w-full py-2 px-4 bg-teal-400 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none"
            >
              Confirm
            </button>
            <button
              onClick={() => setshowConfirmationBox(false)}
              className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
