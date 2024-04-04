"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";

const Login = () => {
  const mainDiv = useRef(null);
  const login = useRef(null);
  const loginButton = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const redirectionRef = useRef(null);

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);

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
    // <div className="flex justify-center items-center h-screen" ref={mainDiv}>
    //   <div className="flex justify-center items-center bg-cyan-400 flex-col gap-4 h-[20rem] w-[20rem] rounded-2xl  -translate-y-[5rem]">
    //     <h1 className="text-2xl font-bold" ref={title}>USER LOGIN</h1>
    //     <div className="flex items-center relative right-2" ref={userNameInput}  >
    //       <div className="bg-white rounded-full h-[4rem] w-[4rem] flex items-center justify-center relative left-3" >
    //         <FaRegUser size={22}  />
    //       </div>
    //       <input
    //         type="text"
    //         placeholder="Username"
    //         className="h-[3rem] w-[14rem] rounded-r-3xl p-5 bg bg-gray-600"
    //       />
    //     </div>
    //     <div className="flex items-center relative left-2" ref={passwordInput}>
    //       <input
    //         type={visible ? "text" : "password"}
    //         placeholder="Password"
    //         className="h-[3rem] w-[14rem] rounded-l-3xl p-5 bg bg-gray-600"
    //       />
    //       <button className="bg-white rounded-full h-[4rem] w-[4rem] flex items-center justify-center relative right-3" onClick={() => setvisible(!visible)}>
    //         {
    //           (visible ? <MdOutlineLockOpen size={25} /> : <MdOutlineLock size={25} /> )
    //         }
    //       </button>
    //     </div>
    //     <div className="flex justify-center items-center">
    //     <button className="bg-cyan-300 p-2 w-[5rem] rounded-xl font-bold text-sm" ref={login}>LOGIN</button>
    //     </div>
    //   </div>
    // </div>
    // MODerN
    // <div className="flex justify-center">
    //   <div className="bg-cyan-300 flex flex-col items-center h-[27rem] w-[20rem] rounded-xl translate-y-[7rem]">
    //     <div className=" flex justify-betwee itme h-[4rem] mt-2  w-[18rem] text-xl text-white font-bold">
    //       <button className="px-12 w-[9rem] border-zinc-400 border-b-2 focus:border-black">
    //         Login
    //       </button>
    //       <button className="px-10 w-[9rem] border-zinc-400 border-b-2 focus:border-black">
    //         Sign in
    //       </button>
    //     </div>
    //     <form className="flex flex-col mt-[3rem] w-[15rem] gap-[3rem]">
    //       <input
    //         type="text"
    //         name="username"
    //         placeholder="Name"
    //         className="mt-5 outline-none border-black pb-4 border-b-2 bg-cyan-300"
    //       />

    //       <input
    //         type="text"
    //         name="password"
    //         placeholder="Password"
    //         className="mt-5 outline-none border-black pb-4 border-b-2 bg-cyan-300"
    //       />
    //     </form>
    //     <button className="mt-[2rem] w-[3rem] bg-green-400">Login</button>
    //   </div>
    // </div>
    <div>
      <div className="flex flex-col justify-center gap-1 items-center h-screen">
        <form
          action=""
          className="flex flex-col gap-3 w-[19.3rem] h-[25rem] mt-10 bg-cyan-300 rounded-xl relative -top-14"
          ref={mainDiv}
        >
          <h1
            className="mx-auto mt-12 p-2 font-semibold text-3xl border-black border-b-2"
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
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
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
                value={password}
                onChange={(e) => setpassword(e.target.value)}
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
            type=""
            className="mx-auto mt-8 w-[6rem] h-[2rem] bg-cyan-200 hover:bg-cyan-500 rounded-lg"
            ref={loginButton}
          >
            Login
          </button>
        </form>
        <div className="flex flex-col gap-2 items-center" ref={redirectionRef}>
          <p>Don't have an account?</p>
          <Link href="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
