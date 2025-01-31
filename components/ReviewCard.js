import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import gsap from "gsap";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowConfirmationBox,
  setShowLoadingScreen,
  setConfirmed,
} from "@/lib/features/confirmation-and-loading/confirmationAndLoadingSlice";

const ReviewCard = (props) => {
  const dispatch = useDispatch();

  const reviewCardRef = useRef(null);

  const [data, setdata] = useState(props.data);
  const [stars, setstars] = useState([]);
  const [enableDelete, setenableDelete] = useState(false);
  const [itemTodelete, setitemTodelete] = useState("");

  const LoggedInUsersId = useSelector((state) => state.user.id);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isConfirmed = useSelector(
    (state) => state.displayConfirmAndLoading.isConfirmed
  );

  const handleDelete = () => {
    document.body.style.overflow = "hidden";
    setitemTodelete(data._id);
    dispatch(setShowConfirmationBox(true));
  };

  useEffect(() => {
    if (!isConfirmed) return;
    if (itemTodelete === "") return;
    setitemTodelete("");
    dispatch(setConfirmed(false));

    (async function () {
      try {
        let res = await axios.delete(`/api/delete-review/${data._id}`);
        toast.success(res.data.message);
        window.location.reload();
        dispatch(setShowLoadingScreen(false));
      } catch (error) {
        toast.error(error.response.data.message);
        props.setshowLoading(false);
      }
    })();
  }, [isConfirmed]);

  useEffect(() => {
    const tempStars = [];
    for (let i = 0; i < data.rating; i++) {
      tempStars.push(<FaStar key={`star_${i}`} />);
    }
    setstars(tempStars);

    if (data.userID === LoggedInUsersId || isAdmin) {
      setenableDelete(true);
    }
  }, [isAdmin]);

  useEffect(() => {
    gsap.fromTo(
      reviewCardRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8 + props.index * 0.3 }
    );
  }, []);

  return (
    <div>
      <div className="hover:scale-105 transition-all ease-in-out duration-300">
        <div className="flex" ref={reviewCardRef}>
          <div className="bg-white h-auto mx-auto mt-9 w-[17rem] rounded-2xl">
            <div className="flex p-3 h-[6rem] ">
              <Image
                src={data.imageUrl}
                width={500}
                height={500}
                className="h-[3rem] w-[3rem] m-1 rounded-full object-cover"
                alt="IMG"
              />
              <div className="p-3 pt-4">
                <h1 className="font-semibold text-base">
                  {data.teacherId.teacherName}
                </h1>
                {data.rating ? (
                  <p className="flex text-yellow-400 mt-1">{stars}</p>
                ) : (
                  <p className="flex text-black text-sm mt-1">
                    no rating given
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center mb-4">
              <div className="flex">
                <h2 className="text-base relative font-semibold mb-2">
                  by {data.username}
                </h2>
                {enableDelete && (
                  <MdDelete
                    className="relative -top-[4.4rem] left-[3.5rem] text-red-700"
                    size={27}
                    onClick={handleDelete}
                  />
                )}
              </div>
              <p className="min-h-[5rem] h-auto w-[15rem] break-words text-sm p-2 bg-cyan-300 rounded-lg">
                "{data.reviewString}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
