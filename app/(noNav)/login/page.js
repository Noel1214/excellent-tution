"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Axios from "axios";
import toast from "react-hot-toast";
import { loginSchema } from "@/zod/validationSchema";
import { setEmail } from "@/lib/features/forgot-password/forgotPasswordSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { emailSchema } from "@/zod/validationSchema";
import { setAdmin, setId, setLoginState } from "@/lib/features/user/userSlice";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import ConfirmationBox from "@/components/ConfirmationBox";
import LoadingCircle from "@/components/LoadingCircle";

const Login = () => {
  const mainDiv = useRef(null);
  const login = useRef(null);
  const loginButton = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const redirectionRef = useRef(null);
  const toastedOrNot = useRef(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const [userData, setuserData] = useState({ email: "", password: "" });
  const [showConfirmationBox, setshowConfirmationBox] = useState(false);
  const [showLoading, setshowLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [error, seterror] = useState("");

  useEffect(() => {
    seterror("");
  }, [userData]);

  const onLogin = async () => {
    setclicked(true);
    setshowLoading(true);

    const result = loginSchema.safeParse(userData);
    if (!result.success) {
      seterror(result.error.issues[0].message);
      setclicked(false);
      setshowLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", userData.email);
      formData.append("password", userData.password);

      const res = await Axios.post("/api/login", formData);

      dispatch(setLoginState(res.data.isLoggedIn || false));
      dispatch(setAdmin(res.data.isAdmin || false));
      dispatch(setId(res.data.id || null));
      toast.success(res.data.message);
      setclicked(false);
      if (res.data.isLoggedIn) {
        router.push("/home");
      }
      setshowLoading(false);
    } catch (error) {
      dispatch(setAdmin(false));
      dispatch(setLoginState(false));
      dispatch(setId(""));
      toast.error(error.response.data.message);
      setclicked(false);
      setshowLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const onForgotPassword = async () => {
    try {
      const result = emailSchema.safeParse(userData.email);
      if (!result.success) {
        seterror(result.error.issues[0].message);
        setshowLoading(false);
        setclicked(false);
        return;
      }

      const formData = new FormData();
      formData.append("email", userData.email);

      await Axios.post("api/forgot-password", formData);

      dispatch(setEmail(userData.email));
      setshowLoading(false);
      setclicked(false);
      router.push("/verify-otp");
    } catch (error) {
      setclicked(false);
      setshowLoading(false);
      toast.error(error.response.data.message || "network error");
    }
  };

  useEffect(() => {
    if (toastedOrNot.current) return;
    (function () {
      toast.error("You are not logged in");
    })();
    toastedOrNot.current = true;
  }, []);

  useEffect(() => {
    gsap.fromTo(
      mainDiv.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );

    gsap.fromTo(
      login.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    gsap.fromTo(
      loginButton.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    gsap.fromTo(
      emailInput.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      passwordInput.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      redirectionRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.5 }
    );
  }, []);

  return (
    <div className="relative">
      <div
        className={`${showConfirmationBox ? "blur-md" : ""} ${
          showLoading ? "blur-md" : ""
        } flex flex-col items-center justify-center h-screen gap-1`}
      >
        <div
          className="flex flex-col gap-3 w-[19.3rem] min-h-[25rem] mt-10 bg-cyan-300 rounded-xl relative -top-14"
          ref={mainDiv}
        >
          <h1
            className="p-2 mx-auto mt-12 text-3xl font-semibold border-b-2 border-black"
            ref={login}
          >
            Login
          </h1>
          {/* EMAIL INPUT */}
          <div
            className="flex flex-col w-[17rem] mx-auto mt-5"
            ref={emailInput}
          >
            <label htmlFor="userName" className="text-sm pl-1">
              E-Mail
            </label>
            <input
              type="email"
              disabled={clicked}
              placeholder="email"
              value={userData.email}
              onChange={(e) =>
                setuserData({ ...userData, email: e.target.value })
              }
              className="h-[2.3rem] bg-white mt-1 p-4 outline-none rounded-md"
            />
          </div>
          {/* PASSWORD INPUT */}
          <div
            className="flex flex-col w-auto mx-auto mt-4"
            ref={passwordInput}
          >
            <label type="password" className="text-sm pl-1">
              Password
            </label>
            <div className="flex mt-1 w-[17rem] h-[2.4rem] bg-white justify-between rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                disabled={clicked}
                placeholder="password"
                value={userData.password}
                onChange={(e) =>
                  setuserData({ ...userData, password: e.target.value })
                }
                className="h-[2.2rem] w-[18rem] p-3 outline-none translate-x-1"
              />
              {showPassword ? (
                <IoEyeSharp
                  size={40}
                  onClick={toggleShowPassword}
                  className="p-1 pr-3"
                />
              ) : (
                <BsEyeSlashFill
                  onClick={toggleShowPassword}
                  size={40}
                  className="p-1 pr-3"
                />
              )}
            </div>
            <button
              className="text-start mt-1 text-xs"
              onClick={() => {
                setshowConfirmationBox(true);
              }}
            >
              <p className="pl-1">Forgot password</p>
            </button>
          </div>
          {/* LOGIN BUTTON */}
          <div className="w-full my-2 flex flex-col items-center">
            {error && (
              <p className="text-red-600 scale-90 font-semibold text-center text-balance">
                {error && error}
              </p>
            )}

            <button
              onClick={onLogin}
              className="my-2 mb-5 w-[6rem] h-[2rem] bg-cyan-200 hover:bg-cyan-500 rounded-lg"
              ref={loginButton}
            >
              Login
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2" ref={redirectionRef}>
          <p>Don't have an account?</p>
          <Link href="/register">Sign Up</Link>
        </div>
      </div>
      {showConfirmationBox && (
        <div className="absolute top-[50%] -translate-y-[80%] -translate-x-[50%] left-[50%] drop-shadow-2xl  rounded-lg">
          <ConfirmationBox
            email={userData.email}
            setshowConfirmationBox={setshowConfirmationBox}
            setclicked={setclicked}
            setshowLoading={setshowLoading}
            onForgotPassword={onForgotPassword}
          />
        </div>
      )}
      {showLoading && (
        <div className="absolute z-20 top-[50%] -translate-y-[80%] -translate-x-[50%] left-[50%] drop-shadow-2xl rounded-lg">
          <LoadingCircle />
        </div>
      )}
    </div>
  );
};

export default Login;
