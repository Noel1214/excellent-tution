"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const router = useRouter();

  const mainDiv = useRef(null);
  const signIn = useRef(null);
  const signInButton = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const emailInput = useRef(null);
  const redirectionRef = useRef(null);

  const [signUpData, setsignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setshowPassword] = useState(false);

  const onSignUp = async () => {

    if (signUpData.username === "") {
      toast.error("Please enter username!");
    }
    
    if (signUpData.email === "") {
      toast.error("Please enter email!");
    }
    
    if (signUpData.password === "") {
      toast.error("Please enter password!");
    }
    

    try {
      const dataResponse = await Axios.post("/api/register", signUpData);
      console.log(dataResponse.message);

      if (dataResponse.data.success){
        toast.success(dataResponse.data.message);
      } else {
        toast.error(dataResponse.data.message);
      }

      router.push("/login");

    } catch (error) {
      console.log("SignUp failed ", error.message);
    }
  };

  const toggleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  //Animations
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
      redirectionRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen gap-1">
        {/* SIGN UP */}
        <div
          className="flex flex-col gap-3 w-[19.5rem] min-h-[25rem] h-auto mt-10 bg-cyan-300 rounded-xl relative -top-14"
          ref={mainDiv}
        >
          <h1
            className="p-2 mx-auto mt-12 text-3xl font-semibold border-b-2 border-black"
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
              placeholder="username"
              value={signUpData.username}
              onChange={(e) =>
                setsignUpData({ ...signUpData, username: e.target.value })
              }
              className="h-[2.3rem] mt-1 p-4 outline-none rounded-md"
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
                placeholder="password"
                value={signUpData.password}
                onChange={(e) =>
                  setsignUpData({ ...signUpData, password: e.target.value })
                }
                className="h-[2.2rem] w-[17rem] p-3 outline-none translate-x-1"
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
              placeholder="example@gmail.com"
              value={signUpData.email}
              onChange={(e) =>
                setsignUpData({ ...signUpData, email: e.target.value })
              }
              className="h-[2.3rem] mt-1 p-4 outline-none rounded-md"
            />
          </div>
          {/* LOGIN BUTTON */}
          <button
            type=""
            className="mx-auto m-6 w-[6rem] h-[2rem] bg-cyan-200 hover:bg-cyan-500 rounded-lg"
            onClick={onSignUp}
            ref={signInButton}
          >
            Sign in
          </button>
        </div>
        <div className="flex flex-col items-center gap-2" ref={redirectionRef}>
          <p>Aldready have an account?</p>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
