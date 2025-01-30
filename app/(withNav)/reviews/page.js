"use client";
import React, { useEffect, useRef, useState } from "react";
import ReviewCard from "@/components/ReviewCard";
import LoadingCircle from "@/components/LoadingCircle";
import ConfirmationBox from "@/components/ConfirmationBox";
import gsap from "gsap";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setReviewsData } from "@/lib/features/review/reviewSlice";

const Reviews = () => {
  const titlehead = useRef(null);

  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.review.reviewsData);
  
  const [confirmed, setconfirmed] = useState(false);
  const [showLoading, setshowLoading] = useState(false);
  const [showConfirmationBox, setshowConfirmationBox] = useState(false);

  useEffect(() => {
    if (reviews.length) return;
    (async function () {
      try {
        const res = await axios.get("/api/reviews");
        dispatch(setReviewsData(res.data.reviews));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      titlehead.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <div className="relative">
      <div
        className={`${
          showLoading || showConfirmationBox ? "blur-md" : ""
        } flex flex-col items-center mt-8 pb-14`}
      >
        {/* Reviews */}
        <div
          className="w-24 text-center border-b-[2.5px] border-b-cyan-900"
          ref={titlehead}
        >
          <h1 className="titleFont text-xl text-white mx-auto mb-2 ">
            Reviews
          </h1>
        </div>
        {/* Render Reviews */}
        <div>
          {reviews.map((item, index) => (
            <ReviewCard
              key={item._id}
              index={index}
              data={item}
              setshowLoading={setshowLoading}
              setshowConfirmationBox={setshowConfirmationBox}
              confirmed={confirmed}
              setconfirmed={setconfirmed}
            />
          ))}
        </div>
      </div>
      {showLoading && (
        <div className="absolute z-20 top-[50%] -translate-y-[80%] -translate-x-[50%] left-[50%] drop-shadow-2xl rounded-lg">
          <LoadingCircle text="deleting" />
        </div>
      )}
      {showConfirmationBox && (
        <div className="absolute top-[50%] -translate-y-[80%] -translate-x-[50%] left-[50%] drop-shadow-2xl  rounded-lg">
          <ConfirmationBox
            showConfirmationBox={showConfirmationBox}
            setshowConfirmationBox={setshowConfirmationBox}
            setconfirmed={setconfirmed}
            setshowLoading={setshowLoading}
            text="Are you sure you want to delete this? "
          />
        </div>
      )}
    </div>
  );
};

export default Reviews;
