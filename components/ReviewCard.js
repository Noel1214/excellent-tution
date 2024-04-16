import React, { useEffect, useRef, useState } from "react";
import TeacherImage from "@/public/Teacher.jpeg";
import { FaStar } from "react-icons/fa";
import gsap from "gsap";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const ReviewCard = (props) => {
  const [data, setdata] = useState(props.data);
  const [userInfo, setuserInfo] = useState(props.userInfo);
  //const { _id, userID, username, rating, reviewString } = data;
  const [enableDelete, setenableDelete] = useState(false);
  const [reviewID, setreviewID] = useState(data._id);

  const [stars, setstars] = useState([]);

  const reviewCardRef = useRef(null);

  useEffect(() => {
    const tempStars = [];
    for (let i = 0; i < data.rating; i++) {
      tempStars.push(<FaStar key={`star_${i}`} />);
    }
    setstars(tempStars);

    if (data.userID === userInfo) {
      setenableDelete(true);
    }
  }, []);

  const handleDelete = async () => {
    try {
      let deleted = await axios.delete(`/api/delete-review/${reviewID}`);
      console.log(deleted.data.message);
      toast.success(deleted.data.message);
    } catch (error) {
      console.log("error in delete review page");
      toast.error("failed to delete review!")
      console.log(error);
    }
  };

  return (
    <div className="flex" ref={reviewCardRef}>
      <div className="relative"></div>
      <div className="bg-white h-auto mx-auto mt-9 w-[17rem] rounded-2xl">
        <div className="flex p-3 h-[6rem] ">
          <Image
            src={TeacherImage}
            width={500}
            height={500}
           // className="h-[3rem] w-[3rem] m-1 rounded-full object-none object-top"
            className="h-[3rem] w-[3rem] m-1 rounded-full object-cover"
            alt="IMG"
          />
          <div className="p-3 pt-4">
            <h1 className="font-semibold text-base">Joel Sebastian</h1>
            <p className="flex text-yellow-400 mt-1">{stars}</p>
          </div>
        </div>
        <div className="flex flex-col items-center mb-4">
          <div className="flex">
            <h2 className="text-base relative font-semibold mb-2">
              by {data.username}
            </h2>
            {enableDelete ? (
              <MdDelete
                className="relative -top-[4.4rem] left-[4.5rem] text-red-700"
                size={27}
                onClick={handleDelete}
              />
            ) : null}
          </div>
          <p className="min-h-[5rem] h-auto w-[15rem] break-words text-sm p-2 bg-cyan-300 rounded-lg">
            "{data.reviewString}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
