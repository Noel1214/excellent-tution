"use client";
import Axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const page = () => {
  const router = useRouter();
  const [otp, setotp] = useState("");
  const email = useSelector((state) => state.forgotPassword.email);

  const verifyOtp = async () => {
    if (otp === "") {
      toast.error("please enter otp");
      return;
    }
    if (email === "") {
      toast.error("verification failed!");
      router.push("/login");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp);

      const res = await Axios.post("api/forgot-password/verify-otp", formData);
      if (res.data.success) {
        toast.success("otp verified successfully!");
        router.push("/set-new-password");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="h-screen w-screen flex items-center justify-center">
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
            </div>
            <button
              onClick={verifyOtp}
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

export default page;
