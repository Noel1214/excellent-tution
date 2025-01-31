"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setReviewsData } from "@/lib/features/review/reviewSlice";
import { setShowLoadingScreen } from "@/lib/features/confirmation-and-loading/confirmationAndLoadingSlice";
import { IoClose } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import Axios from "axios";
import toast from "react-hot-toast";
import LoadingCircle from "@/components/LoadingCircle";

const ReviewPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const [clicked, setclicked] = useState(false);
  const [review, setreview] = useState("");
  const [stars, setstars] = useState([false, false, false, false, false]);
  const [rating, setrating] = useState(0);
  const [data, setdata] = useState({ rating, review });
  const [error, seterror] = useState("");

  const showLoading = useSelector(
    (state) => state.displayConfirmAndLoading.showLoadingScreen
  );

  useEffect(() => {
    seterror("");
  }, [review]);

  useEffect(() => {
    setrating(stars.filter((item) => item === true).length);
    setdata({
      ...data,
      rating: rating,
      review: review,
      teacherId: params.teacherData[1],
    });
  }, [stars, review]);

  const handleStarClick = (item, index) => {
    setstars((prev) => {
      const newStarArray = [...prev];
      newStarArray[index] = !item;
      return newStarArray;
    });
  };

  const submitHandler = async () => {
    if (clicked) return;
    setclicked(true);
    dispatch(setShowLoadingScreen(true));
    try {
      if (review === "") {
        seterror("please give a review before submiting");
        dispatch(setShowLoadingScreen(true));
        return;
      }
      const res = await Axios.post("/api/addreview", data);
      dispatch(setReviewsData([]));
      toast.success(res.data.message);
      router.push("/reviews");
      dispatch(setShowLoadingScreen(false));
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(setShowLoadingScreen(false));
    }
  };

  return (
    <div className="relative">
      <div
        className={`${showLoading ? "blur-md" : ""} flex flex-col gap-[3rem]`}
      >
        <Link href="/home">
          <div className="relative h-3">
            <IoClose className="absolute left-[93vw] mt-6 -ml-1" size={32} />
          </div>
        </Link>
        <div className="flex flex-col items-center gap-9">
          <div className="flex flex-col gap-9">
            <h1 className="font-bold text-2xl text-center w-[14rem]">
              We appreciate your feedback.
            </h1>
            <div className="w-[14rem] font-semibold text-center text-xm text-zinc-600">
              we are always looking for ways to improve your experience. Please
              take a moment to evaluate and share what you feel about
              <p className="text-xl text-black">{params.teacherData[0]}</p>
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
          <div className="flex flex-col gap-3 items-center mb-14">
            <textarea
              name="reviewinput"
              className="w-[19rem] min-h-[9rem] p-4 outline-none rounded-lg"
              placeholder="Please tell us any improvement that we can make.."
              value={review}
              onChange={(e) => setreview(e.target.value)}
            />
            <div>
              <p className="text-center text-red-600 font-semibold pb-2">
                {error && error}
              </p>
              <button
                className="w-[19rem] p-2 rounded-lg font-semibold bg-cyan-600"
                onClick={submitHandler}
              >
                Submit My Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
      {showLoading && (
        <div className="absolute z-20 top-[50%] -translate-y-[80%] -translate-x-[50%] left-[50%] drop-shadow-2xl rounded-lg">
          <LoadingCircle text="adding" />
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
