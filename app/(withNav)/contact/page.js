"use client";
import React, { useEffect, useRef } from "react";
import { MdOutlineMail } from "react-icons/md";
import { TbPhoneCall } from "react-icons/tb";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import gsap from "gsap";

const Contact = () => {
  const contact = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      contact.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, delay: 0.5 }
    );
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div
        className="w-[80vw] xl:w-[50vw] xl:h-[40vh] h-[30vh] flex flex-col xl:items-center justify-center gap-5 bg-gradient-to-bl shadow-2xl from-cyan-200 to-cyan-400  mt-16 p-5 rounded-lg xl:rounded-2xl"
        ref={contact}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <MdOutlineMail size={30} className="" />
            <p className="text-lg">mail@example.com</p>
          </div>
          <div className="flex items-center gap-3">
            <TbPhoneCall size={30} className="" />
            <p className="text-lg">+91 9394908439</p>
          </div>
          <div className="flex items-center gap-3">
            <BsWhatsapp size={30} className="" />
            <p className="text-lg">3482384834</p>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineAccessTime size={30} className="" />
            <p className="text-lg">8:00 - 20:00</p>
          </div>
        </div>

        {/* <div className="flex items-center gap-3">
          <MdOutlineMail size={42} className="p-2 relative right-1" />
          <p className="text-lg">mail@example.com</p>
        </div>
        <div className="flex items-center gap-3 xl:relative xl:right-7">
          <TbPhoneCall size={42} className="p-2 relative right-1" />
          <p className="text-lg">+91 9394908439</p>
        </div>
        <div className="flex items-center gap-3 xl:relative xl:right-11">
          <BsWhatsapp size={40} className="p-2 relative right-0" />
          <p className="text-lg">3482384834</p>
        </div>
        <div className="flex items-center gap-3 xl:relative xl:right-12">
          <MdOutlineAccessTime size={42} className="p-2 relative right-1" />
          <p className="text-lg">8:00 - 20:00</p>
        </div> */}
      </div>
    </div>
  );
};

export default Contact;
