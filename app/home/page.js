"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Components
import TeacherCard from "@/components/TeacherCard";
import axios from "axios";

const App = () => {
  const titlehead = useRef(null);
  const [teachers, setteachers] = useState([]);
  //console.log(teachers);

  const getTeachers = async () => {
    const response = await axios.get("/api/teachers");
    //console.log(response.data.teachers);
    setteachers(response.data.teachers);
  }

  useEffect(() => {
    gsap.fromTo(
      titlehead.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.9 }
    );
  }, []);

  useEffect(() => {
    // getTeachers();
  }, [])
  

  return (
    <div className="flex flex-col items-center mt-[3rem] min-w-screen">
      <div className="flex flex-col items-center" ref={titlehead}>
        <h1 className="titleFont text-cyan-200 text-2xl mb-2">Faculty</h1>
        <hr className="w-[8rem] text-violet-600 border-black -translate-x-1" />
      </div>
      <div className="">
        {
          teachers.map((item) => (
            <TeacherCard key={item._id} data={item} />
          ))
        }
      </div>
    </div>
  );
};

export default App;
