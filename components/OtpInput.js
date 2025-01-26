import React from "react";

const OtpInput = ({ otp, setotp, onVerifyOtp, email }) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h2 className="text-lg font-semibold text-center text-gray-700 mb-6">
            OTP sent to {email}
          </h2>
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium mb-2"
              >
                Enter OTP:
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setotp(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              <p className="scale-75 text-center">Please check spam folder</p>
            </div>
            <button
              onClick={onVerifyOtp}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
