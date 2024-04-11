"use client";
import React, { useEffect, useRef } from "react";
import ReviewCard from "@/components/ReviewCard";
import gsap from "gsap";

const Reviews = () => {
  const titlehead = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titlehead.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 1 }
    );
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      {/* Reviews */}
      <div className="flex flex-col items-center" ref={titlehead}>
        <h1 className="titleFont text-xl text-cyan-200 mx-auto mb-2">
          Reviews
        </h1>
        <hr className="w-[8rem] text-violet-600 border-black" />
      </div>

      <div>
        <ReviewCard />
      </div>
    </div>
  );
};

export default Reviews;
