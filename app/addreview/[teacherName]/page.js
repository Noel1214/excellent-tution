"use client";
import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import Link from "next/link";
import Axios from "axios";
import { useParams } from "next/navigation";

const ReviewPage = () => {

  const params = useParams();
  const [review, setreview] = useState("");
  const [stars, setstars] = useState([false, false, false, false, false]);
  const [rating, setrating] = useState(0);
  const [data, setdata] = useState({rating, review});
  console.log(data);
  
  useEffect(() => {
    setrating(stars.filter((item) => item === true).length);
    setdata({...data, rating: rating, review: review});
  }, [stars, review]);

  const handleStarClick = (item, index) => {
    setstars((prev) => {
      const newStarArray = [...prev];
      newStarArray[index] = !item;
      return newStarArray;
    });
  };

  const submitHandler = async () => {
    try {
      console.log("this is data log" +data);
      const dataResponse = await Axios.post("/api/addreview", data);
      console.log("review added sucessfully");
      console.log(dataResponse.data.message);
      
    } catch (error) {
      console.log("error in subimt click in add review page");
      console.log(error);
    }
  };  
  

  return (
    <div className="flex flex-col gap-[6rem]">
      <Link href="/home">
        <div className="relative h-3">
          <IoCloseCircle className="absolute left-[90vw] mt-2 ml-1" size={30} />
        </div>
      </Link>
      <div className="flex flex-col items-center gap-9">
        <div className="flex flex-col gap-9">
          <h1 className="font-bold text-2xl text-center w-[14rem]">
            We appreciate your feedback.
          </h1>
          <div className="w-[14rem] font-semibold text-center text-xm text-zinc-600">
            we are always looking for ways to improve your experience. Please
            take a moment to evaluate and share what you think about
            <p>{params.teacherName}</p>
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
            value={review}
            onChange={(e) => setreview(e.target.value)}
          />
          <button className="w-[19rem] p-2 rounded-lg font-semibold text-x  m bg-cyan-600" onClick={submitHandler}>
            Submit My Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
