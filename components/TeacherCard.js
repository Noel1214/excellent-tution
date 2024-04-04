"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

// Images
import TeacherImage from "@/public/Teacher.jpeg";

const TeacherCard = () => {
  const teacherCardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      teacherCardRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, delay:0.9 }
    );
  }, []);

  return (
    <div className="TeacherProfile flex justify-center h-auto mt-[2rem]" ref={teacherCardRef}>
      <div className="DetailsCard bg-cyan-200 min-h-[20rem] h-auto w-[18rem] flex flex-col gap-2 items-center rounded-xl shadow-2xl">
        <div className="TeacherImage flex justify-center mt-4 mb-0 p-2 h-[12rem] rounded-xl overflow-hidden">
          <Image
            src={TeacherImage}
            width={300}
            height={365}
            alt="Teacher Image"
            className="h-[12rem] w-full object-none object-top rounded-xl border-2 "
            priority
          />
        </div>
        <ul className="BioData list-disc flex flex-col gap-1 font-bold text-sm w-[14rem]">
          <li>Joel Sebastian</li>
          <li> Mathematics</li>
          <li>B-tech, M.Sc., PhD. M-tech, mphill</li>
        </ul>

        <Link href="/addreview">
          <button className="bg-green-400 w-[14rem] h-[2rem] rounded-xl flex justify-center items-center p-2 mb-5 mt-2">Review</button>
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;
