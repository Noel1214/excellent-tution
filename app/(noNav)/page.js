"use client";
import React, { useEffect, useRef } from "react";
import PosterImage from "@/public/poster.avif";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

const Poster = () => {
  const button = useRef(null);
  const image = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      image.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      button.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className=" h-full w-full flex flex-col justify-center items-center gap-4 translate-y-14 xl:translate-y-9">
        <div className="" ref={image}>
          <Image
            src={PosterImage}
            width={300}
            height={300}
            className="h-[28rem] w-[19rem] m-2  xl:h-[32rem] xl:w-[31rem] rounded-xl border-2 border-sky-700 shadow-2xl"
            alt="Error"
          />
        </div>

        <Link href="/home">
        <button
          className="bg-blue-300 hover:bg-blue-400 rounded-full w-[10rem] h-[3rem] border-2 border-blue-400 shadow-xl"
          ref={button}
        >
          {/* Intentionally anchor tag for updation of states which is assigned pathname */}
          EXPLORE MORE !
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Poster;
