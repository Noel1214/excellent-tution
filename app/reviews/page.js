"use client";
import React, { useEffect, useRef, useState } from "react";
import ReviewCard from "@/components/ReviewCard";
import gsap from "gsap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setReviewsData } from "@/lib/features/review/reviewSlice";

const Reviews = () => {
  const titlehead = useRef(null);
  const [reviewsData, setreviewsData] = useState([]);  

  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviewsData);
  console.log(reviews);
  

  useEffect(() => {
    gsap.fromTo(
      titlehead.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
  }, []);

  const getReviews = async () => {
    try {
      const response = await axios.get("/api/reviews");      
      setreviewsData(response.data.reviews);
      dispatch(setReviewsData(response.data.reviews));
    } catch (error) {
      console.log("error in reviews response");
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="flex flex-col items-center mt-8 pb-14">
      {/* Reviews */}
      <div className="flex flex-col items-center" ref={titlehead}>
        <h1 className="titleFont text-xl text-cyan-200 mx-auto mb-2">
          Reviews
        </h1>
        <hr className="w-[8rem] text-violet-600 border-black" />
      </div>

      <div>
        {reviews.map((item, index) => (
          <ReviewCard key={item._id} index={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
