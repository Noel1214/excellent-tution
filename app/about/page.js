"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const About = () => {
  const Cards = useRef([]);



  useEffect(() => {

    gsap.fromTo(Cards.current, {opacity:0, y:100}, {opacity:1, y:20, stagger:0.5, delay:0.5});

  }, [])
  

  return (
    // OUR MISSON CARD
    <div className="flex flex-col justify-center items-center h-full">
      <div
        className="bg-gradient-to-r from-cyan-200 to-cyan-300 flex flex-col gap-2 justify-center items-center p-2 mx-3 w-[92vw] xl:h-[15rem] xl:w-[30rem] rounded-lg translate-y-6"
        ref={e => Cards.current.push(e)}
      >
        <h1 className="text-lg xl:text-2xl border-b-2 border-black p-2">OUR MISSION</h1>
        <p className="text-center">
          At Excellent Tuition Center, we are dedicated to providing top-notch
          educational support to students worldwide. Our convenient online
          tutoring platform allows students to access high-quality tuition from
          anywhere in the world, at any time.
        </p>
      </div>

      {/* OUR VISION CARD  */}
      <div
        className="bg-gradient-to-r from-cyan-200 to-cyan-300 flex flex-col gap-2 justify-center items-center p-2 xl:w-[30rem] w-[92vw] rounded-lg translate-y-6 m-3"
        ref={e => Cards.current.push(e)}
      >
        <h1 className="text-lg xl:text-2xl border-b-2 border-black p-2">OUR VISION</h1>
        <div className="text-center">
          <p className="text-base">
            Comprehensive Coverage: All Subjects, All Classes, All Syllabus
          </p>
          At Excellent Tuition Center, we understand that every student has
          unique learning needs. That's why we offer a wide range of subjects,
          catering to students from all academic backgrounds and levels. From
          elementary to advanced courses, we cover it all. Whether you're
          studying mathematics, science, languages, or humanities, our
          experienced tutors are here to help you succeed.
        </div>
      </div>

      {/* JOIN US */}
      <div
        className="bg-gradient-to-r from-cyan-200 to-cyan-300 flex flex-col gap-2 justify-center items-center p-2 xl:w-[30rem] w-[92vw] rounded-lg translate-y-6  mx-3 mb-20"
        ref={e => Cards.current.push(e)}
      >
        <h1 className="text-lg xl:text-2xl border-b-2 border-black p-2">Join Us Today</h1>
        <p className="text-center">
          Experience the difference that Excellent Tuition Center can make in
          your academic journey. Join our community of motivated learners and
          dedicated tutors today, and unlock your full potential.
        </p>
      </div>
    </div>
  );
};

export default About;
