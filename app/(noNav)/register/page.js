"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Axios from "axios";
import gsap from "gsap";
import toast from "react-hot-toast";
import { signUpSchema } from "@/zod/validationSchema";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoadingScreen } from "@/lib/features/confirmation-and-loading/confirmationAndLoadingSlice";
import OtpInput from "@/components/OtpInput";
import LoadingCircle from "@/components/LoadingCircle";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const mainDiv = useRef(null);
  const signIn = useRef(null);
  const signInButton = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const emailInput = useRef(null);
  const phoneNumberInput = useRef(null);
  const redirectionRef = useRef(null);

  const [signUpData, setsignUpData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [clicked, setclicked] = useState(false);
  const [showOtpInputBox, setshowOtpInputBox] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [otpValidated, setotpValidated] = useState(false);
  const [otp, setotp] = useState("");
  const [error, seterror] = useState("");

  const showLoading = useSelector(
    (state) => state.displayConfirmAndLoading.showLoadingScreen
  );

  useEffect(() => {
    seterror("");
  }, [signUpData]);

  //validate user
  const onSignUp = async () => {
    setclicked(true);
    dispatch(setShowLoadingScreen(true));

    const result = signUpSchema.safeParse(signUpData);
    if (!result.success) {
      seterror(result.error.issues[0].message);
      setclicked(false);
      dispatch(setShowLoadingScreen(false));
      return;
    }
    
    const formData = new FormData();
    formData.append("username", signUpData.username);
    formData.append("email", signUpData.email);
    formData.append("phoneNumber", signUpData.phoneNumber);
    formData.append("password", signUpData.password);

    try {
      const res = await Axios.post("/api/register/validate-user", formData);

      toast.success(res.data.message);
      dispatch(setShowLoadingScreen(false));
      setshowOtpInputBox(true);
      // setclicked(false);
    } catch (error) {
      setclicked(false);
      dispatch(setShowLoadingScreen(false));
      if (error.response.data.redirectTo) {
        router.push(error.response.data.redirectTo);
      }
      toast.error(error.response.data.message);
    }
  };

  // validate otp
  const onVerifyOtp = async () => {
    dispatch(setShowLoadingScreen(true));
    try {
      const formData = new FormData();
      formData.append("otp", otp);

      const res = await Axios.post("/api/register/verify-otp", formData);

      toast.success(res.data.message);
      setshowOtpInputBox(false);
      setotpValidated(true);
    } catch (error) {
      dispatch(setShowLoadingScreen(false));
      toast.error(error.response.data.message);
    }
  };

  // Registering user
  useEffect(() => {
    if (!otpValidated) return;
    setotpValidated(false);

    (async function () {
      try {
        const formData = new FormData();
        formData.append("username", signUpData.username);
        formData.append("email", signUpData.email);
        formData.append("phoneNumber", signUpData.phoneNumber);
        formData.append("password", signUpData.password);

        const res = await Axios.post("/api/register", formData);

        toast.success(res.data.message);
        dispatch(setShowLoadingScreen(false));
        router.push("/login");
      } catch (error) {
        dispatch(setShowLoadingScreen(false));
        toast.error(error.response.data.message);
      }
    })();
  }, [otpValidated]);

  const toggleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  //element animations
  useEffect(() => {
    gsap.fromTo(
      mainDiv.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      usernameInput.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      passwordInput.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      emailInput.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      phoneNumberInput.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      redirectionRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <div className="relative">
      <div
        className={`${
          showOtpInputBox || showLoading ? "blur-md" : ""
        } flex flex-col items-center justify-center h-screen gap-1 overflow-y-hidden`}
      >
        {/* SIGN UP */}
        <div
          className="flex flex-col gap-2 w-[19.5rem] min-h-[25rem] h-auto mt-10 bg-cyan-300 rounded-xl relative -top-[3.4rem]"
          ref={mainDiv}
        >
          <h1
            className="p-2 mx-auto mt-10 text-3xl font-semibold border-b-2 border-black"
            ref={signIn}
          >
            Sign up
          </h1>
          {/* USERNAME INPUT */}
          <div
            className="flex flex-col w-[17rem] mx-auto mt-5"
            ref={usernameInput}
          >
            <label htmlFor="userName" className="text-sm">
              Username
            </label>
            <input
              type="text"
              disabled={clicked}
              placeholder="username"
              value={signUpData.username}
              onChange={(e) =>
                setsignUpData({ ...signUpData, username: e.target.value })
              }
              className="bg-white h-[2.3rem] mt-1 p-4 outline-none rounded-md"
            />
          </div>
          {/* Email INPUT */}
          <div
            className="flex flex-col w-[17rem] mx-auto mt-5"
            ref={emailInput}
          >
            <label htmlFor="email" className="text-sm">
              E-Mail
            </label>
            <input
              type="text"
              disabled={clicked}
              placeholder="example@gmail.com"
              value={signUpData.email}
              onChange={(e) =>
                setsignUpData({ ...signUpData, email: e.target.value })
              }
              className="bg-white h-[2.3rem] mt-1 p-4 outline-none rounded-md"
            />
          </div>
          <div
            className="flex flex-col w-[17rem] mx-auto mt-5"
            ref={phoneNumberInput}
          >
            <label htmlFor="email" className="text-sm">
              Phone No.
            </label>
            <input
              type="text"
              disabled={clicked}
              placeholder="9449499494"
              value={signUpData.phoneNumber}
              onChange={(e) =>
                setsignUpData({ ...signUpData, phoneNumber: e.target.value })
              }
              className="bg-white h-[2.3rem] mt-1 p-4 outline-none rounded-md"
            />
          </div>
          {/* PASSWORD INPUT */}
          <div
            className="flex flex-col w-[17rem] mx-auto mt-4"
            ref={passwordInput}
          >
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="flex mt-1 w-[17rem] h-[2.4rem] bg-white justify-between rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                disabled={clicked}
                placeholder="password"
                value={signUpData.password}
                onChange={(e) =>
                  setsignUpData({ ...signUpData, password: e.target.value })
                }
                className="bg-white h-[2.2rem] w-[17rem] p-3 outline-none translate-x-1"
              />
              {showPassword ? (
                <BsEyeSlashFill
                  onClick={toggleShowPassword}
                  size={40}
                  className="p-1 pr-3"
                />
              ) : (
                <IoEyeSharp
                  size={40}
                  onClick={toggleShowPassword}
                  className="p-1 pr-3"
                />
              )}
            </div>
          </div>
          {/* REGISTER BUTTON  */}
          <div className="flex flex-col justify-center items-center w-full">
            {error && (
              <p className="w-[14rem] text-center text-balance break-words scale-90 font-semibold text-red-600">
                {error}
              </p>
            )}
            <button
              type="button"
              className="my-4 w-[6rem] h-[2rem] bg-cyan-200 hover:bg-cyan-500 rounded-lg"
              ref={signInButton}
              onClick={onSignUp}
            >
              Sign in
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2" ref={redirectionRef}>
          <p>Aldready have an account?</p>
          <Link href="/login">
            <button className="bg-blue-400 px-5 py-1 text-center text-white font-semibold rounded-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
      {/* OTP INPUT BOX */}
      {showOtpInputBox && (
        <div
          className={`${
            showLoading ? "blur-md" : ""
          } absolute top-[50%] -translate-x-[50%] -translate-y-[80%] left-[50%] shadow-2xl shadow-gray-900 rounded-lg`}
        >
          <OtpInput
            otp={otp}
            setotp={setotp}
            onVerifyOtp={onVerifyOtp}
            email={signUpData.email}
          />
        </div>
      )}
      {showLoading && (
        <div className="absolute z-20 top-[50%] -translate-y-[80%] -translate-x-[50%] left-[50%] drop-shadow-2xl rounded-lg">
          <LoadingCircle text="Processing..." />
        </div>
      )}
    </div>
  );
};

export default Register;
