"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TeacherCard from "@/components/TeacherCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setTeacherData } from "@/lib/features/teacher/teacherSlice";
import toast from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  const titlehead = useRef(null);

  const dataFromRedux = useSelector((state) => state.teacher.teacherData);

  useEffect(() => {
    gsap.fromTo(
      titlehead.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    if (dataFromRedux.length) return;

    (async function () {
      try {
        const response = await axios.get("/api/teachers");
        dispatch(setTeacherData(response.data.teachers));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center mt-[3rem] min-w-screen">
      <div className="flex flex-col items-center" ref={titlehead}>
        <h1 className="titleFont text-cyan-200 text-2xl mb-2">Faculty</h1>
        <hr className="w-[8rem] text-violet-600 border-black -translate-x-1" />
      </div>
      <div className="-translate-x-1">
        {dataFromRedux.map((item, index) => (
          <TeacherCard key={item._id} index={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default App;
