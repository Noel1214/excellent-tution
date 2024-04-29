"use client";
import React, { useState } from "react";
import AddTeacherUi from "@/components/AddTeacherUi";
import { IoCloseCircle } from "react-icons/io5";

const page = () => {
  const [isAddTeacherVisible, setisAddTeacherVisible] = useState(true);

  const toggleAddTeacher = () => {
    setisAddTeacherVisible(!isAddTeacherVisible);
  };

  return (
    <div>
      <button className="h-[3rem] w-[7rem] p-2 rounded-2xl bg-green-700">Add Teacher</button>

      {/*   <div className={`${isAddTeacherVisible ? "" : "hidden"}`}>
        <div className="mx-2" onClick={toggleAddTeacher}>
          <IoCloseCircle
            className="absolute right-[92vw] mt-2 ml-1"
            size={24}
          />
        </div>
        <AddTeacherUi />
      </div>
    */}
    </div>
  );
};

export default page;
