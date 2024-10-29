"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import Axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Login = () => {
  const mainDiv = useRef(null);
  const login = useRef(null);
  const loginButton = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const redirectionRef = useRef(null);

  const [userData, setuserData] = useState({ email: "", password: "" });
  //console.log(userData);
  const [showPassword, setshowPassword] = useState(false);
  const router = useRouter();
  
  const onLogin = async () => {
    console.log("handleing login");
    try {
      const res = await Axios.post("/api/login", userData);
      console.log(res.data.message);
      if(res.data.success){
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
      if(res.data.isLoggedIn){
        router.push("/home");
      } 
    } catch (error) {
      console.log("error whle handling");
      console.log(error);
    }
  };

  const toggleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  useEffect(() => {
    gsap.fromTo(
      mainDiv.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
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
      redirectionRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen gap-1">
        <div
          className="flex flex-col gap-3 w-[19.3rem] h-[25rem] mt-10 bg-cyan-300 rounded-xl relative -top-14"
          ref={mainDiv}
        >
          <h1
            className="p-2 mx-auto mt-12 text-3xl font-semibold border-b-2 border-black"
            ref={login}
          >
            Login
          </h1>
          {/* USERNAME INPUT */}
          <div
            className="flex flex-col w-[17rem] mx-auto mt-5"
            ref={usernameInput}
          >
            <label htmlFor="userName" className="text-sm">
              E-Mail
            </label>
            <input
              type="text"
              placeholder="email"
              value={userData.email}
              onChange={(e) =>
                setuserData({ ...userData, email: e.target.value })
              }
              className="h-[2.3rem] mt-1 p-4 outline-none rounded-md"
            />
          </div>
          {/* PASSWORD INPUT */}
          <div
            className="flex flex-col w-auto mx-auto mt-4"
            ref={passwordInput}
          >
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="flex mt-1 w-[17rem] h-[2.4rem] bg-white justify-between rounded-md">
              <input
                type={showPassword ? "text" : "password"}
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
          </div>
          {/* LOGIN BUTTON */}
          <button
            onClick={onLogin}
            className="mx-auto mt-8 w-[6rem] h-[2rem] bg-cyan-200 hover:bg-cyan-500 rounded-lg"
            ref={loginButton}
          >
            Login
          </button>
        </div>
        <div className="flex flex-col items-center gap-2" ref={redirectionRef}>
          <p>Don't have an account?</p>
          <Link href="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
