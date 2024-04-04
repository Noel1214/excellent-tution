import React, { useEffect, useRef, useState } from "react";
import person from "@/public/person.jpg";
import TeacherImage from "@/public/Teacher.jpeg";
import { FaStar } from "react-icons/fa";
import gsap from "gsap";
import Image from "next/image";

const ReviewCard = () => {
  const reviewCardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      reviewCardRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.3 }
    );
  }, []);

  return (
    <div className="flex" ref={reviewCardRef}>
      <div className="bg-white h-auto mx-auto mt-9 w-[18rem] rounded-2xl">
        <div className="flex p-3 h-[6rem] ">
          <Image
            src={TeacherImage}
            width={300}
            height={300}
            className="h-[4rem] w-[4rem] m-2 rounded-full object-none object-top"
            alt="IMG"
          />
          <div className="p-5 pt-4">
            <h1 className="font-semibold text-xl">Joel Sebastian</h1>
            <p className="flex text-yellow-400 mt-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mt-1 mb-4">
          <h2 className="text-[1.1rem] relative right-[rem] mb-1">
            by Noel Sebu
          </h2>
          <p className=" h-auto w-[15rem] break-words text-sm p-2 bg-cyan-200 rounded-lg">
            "Joel Sebastian is an exceptional teacher who brings enthusiasm and
            expertise to the classroom. With a deep understanding of the subject
            matter, he is able to explain complex concepts in a simple and
            engaging way. Highly recommended!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
