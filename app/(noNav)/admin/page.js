"use client";
import React, { useState } from "react";
import AddTeacherUi from "@/components/AddTeacherUi";
import { IoCloseCircle } from "react-icons/io5";
import { setAdmin } from "@/lib/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const page = () => {
  const [isAddTeacherVisible, setisAddTeacherVisible] = useState(false);

  const admin = useSelector((state) => state.user.isAdmin);
  // console.log(admin);

  const dispatch = useDispatch();
  const router = useRouter();

  const toggleAddTeacher = () => {
    setisAddTeacherVisible(!isAddTeacherVisible);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center overflow-y-hidden">
      <div className="overflow-y-hidden">
        {isAddTeacherVisible ? (
          <div>
            <div className="" onClick={toggleAddTeacher}>
              <IoCloseCircle
                className="absolute right-[89vw] mt-2 ml-1"
                size={24}
              />
            </div>
            <AddTeacherUi />
          </div>
        ) : (
          <button className="bg-cyan-600 text-white text-center h-10 px-4 rounded-2xl hover:bg-cyan-800 transition ease-in-out duration-100" onClick={toggleAddTeacher}>Add Teacher</button>
        )}

        {/* add teacher ui component */}
      </div>
    </div>
  );
};

export default page;
