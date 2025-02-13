"use client";
import React, { useEffect, useState } from "react";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import Axios from "axios";
import axios from "axios";

const page = () => {
  const userId = useSelector((state) => state.user.id);

  const [userData, setuserData] = useState({});
  console.log(userData);
  const [showPassword, setshowPassword] = useState(false);
  const [disableEdit, setdisableEdit] = useState(true);
  const [clicked, setclicked] = useState(false);
  const [signUpData, setsignUpData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const toggleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };

  const onEdit = () => {
    setdisableEdit((prev) => !prev);
  };

  useEffect(() => {
    if (!userId) return;
    (async function () {
      try {
        const res = await axios.get(`api/data-update/get-user/${userId}`);
        console.log(res);
        setuserData(res.data.userDetails);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    })();
  }, [userId]);

  return (
    <div>
      <div className="pt-10">
        <div className="bg-white h-[30rem] w-[20rem] mx-auto rounded-lg flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold underline underline-offset-[6px]">
            My Profile
          </h1>
          <div className="flex flex-col w-[17rem] mx-auto pt-9">
            <label htmlFor="userName" className="text-sm">
              Username
            </label>
            <input
              type="text"
              disabled={disableEdit}
              placeholder="YouruserName"
              value={userData.username || ""}
              onChange={(e) =>
                setsignUpData({ ...signUpData, username: e.target.value })
              }
              className="bg-white h-[2.8rem] mt-1 p-4 outline-none rounded-full border-[1px] border-black"
            />
          </div>
          {/* Email INPUT */}
          <div className="flex flex-col w-[17rem] mx-auto mt-5">
            <label htmlFor="email" className="text-sm">
              E-Mail
            </label>
            <input
              type="text"
              disabled={disableEdit}
              placeholder="example@gmail.com"
              value={userData.email || ""}
              onChange={(e) =>
                setsignUpData({ ...signUpData, email: e.target.value })
              }
              className="bg-white h-[2.3rem] mt-1 p-4 outline-none rounded-full border-[1px] border-black"
            />
          </div>
          <div className="flex flex-col w-[17rem] mx-auto mt-5">
            <label htmlFor="email" className="text-sm">
              Phone No.
            </label>
            <input
              type="text"
              disabled={disableEdit}
              placeholder="9449499494"
              value={userData.phoneNumber || ""}
              onChange={(e) =>
                setsignUpData({ ...signUpData, phoneNumber: e.target.value })
              }
              className="bg-white h-[2.3rem] mt-1 p-4 outline-none rounded-full border-[1px] border-black"
            />
          </div>
          {/* PASSWORD INPUT */}
          {/* <div className="flex flex-col w-[17rem] mx-auto mt-4">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="flex mt-1 w-[17rem] h-[2.4rem] bg-white justify-between  rounded-full border-[1px] border-black overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                disabled={disableEdit}
                placeholder="password"
                value={userData.password}
                onChange={(e) =>
                  setsignUpData({ ...signUpData, password: e.target.value })
                }
                className="bg-white h-[2.2rem] w-[17rem] p-3 outline-none translate-x-1"
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
          </div> */}
          {/* Buttons  */}
          <div className="flex justify-around w-[17rem] mt-5 text-white">
            <button
              className="scale-105 hover:scale-110 active:scale-125 active:bg-cyan-500 bg-cyan-400 px-4 py-1 rounded-lg shadow-lg transition-all ease-in-out" 
              onClick={onEdit}
            >
              Edit
            </button>
            <button className="scale-105 hover:scale-110 active:scale-125 active:bg-teal-600 bg-teal-500 px-4 py-1 rounded-lg shadow-lg transition-all ease-in-out">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
