"use client";
import { setEmail } from "@/lib/features/forgot-password/forgotPasswordSlice";
import { passwordSchema } from "@/zod/validationSchema";
import Axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, seterror] = useState("");
  const email = useSelector((state) => state.forgotPassword.email);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    seterror("");
  }, [newPassword, confirmPassword]);

  const onResetPassword = async () => {
    if (email === "") {
      toast.error("verification failed!");
      router.push("/login");
      return;
    }
    if (newPassword !== confirmPassword) {
      seterror("password not match");
      return;
    }
    const result = passwordSchema.safeParse(newPassword);
    if (!result.success) {
      seterror(result.error.issues[0].message);
      return;
    }

    const formData = new FormData();
    formData.append("password", newPassword);
    formData.append("email", email);

    try {
      const res = await Axios.post(
        "api/forgot-password/set-new-password",
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
      dispatch(setEmail(""));
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      router.push("/");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="max-w-[19rem] mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Reset Password
        </h2>
        <div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Password:
            </label>
            <input
              type="email"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600 font-medium mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div className="mt-3 flex flex-col items-center gap-3">
            {error && (
              <p className="w-[14rem] text-center text-balance break-words scale-90 font-semibold text-red-600">
                {error}
              </p>
            )}
            <button
              onClick={onResetPassword}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
