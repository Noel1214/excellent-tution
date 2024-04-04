"use client";
import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";

const ReviewPage = () => {
  const [stars, setstars] = useState([false, false, false, false, false]);
  const [rating, setrating] = useState(0);

  useEffect(() => {
    setrating(stars.filter((item) => item === true).length);
  }, [stars]);

  console.log(rating);

  const handleStarClick = (item, index) => {
    setstars((prev) => {
      const newStarArray = [...prev];
      newStarArray[index] = !item;
      return newStarArray;
    });
  };

  return (
    <div className="flex flex-col gap-[6rem]">
      <div className="relative h-3">
        <IoCloseCircle className="absolute left-[90vw] mt-2 ml-1" size={30} />
      </div>
      <div className="flex flex-col items-center gap-9">
        <div className="flex flex-col gap-9">
          <h1 className="font-bold text-2xl text-center w-[14rem]">
            We appreciate your feedback.
          </h1>
          <div className="w-[14rem] font-semibold text-center text-xm text-zinc-600">
            we are always looking for ways to improve your experience. Please
            take a moment to evaluate and share what you think about
            <p>nameofteacherhere</p>
          </div>
        </div>
        <p className="flex gap-2">
          {stars.map((item, index) => (
            <IoIosStar
              size={26}
              key={index}
              className={`${item ? "text-yellow-400" : null}`}
              onClick={() => handleStarClick(item, index)}
            />
          ))}
        </p>
        <div className="flex flex-col gap-5 items-center">
          <textarea
            name="reviewinput"
            className="w-[19rem] min-h-[9rem] p-4 outline-none rounded-lg"
            placeholder="Please tell us any improvement that we can make.."
          />
          <button className="w-[19rem] p-2 rounded-lg font-semibold text-x  m bg-cyan-600">
            Submit My Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
