"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import Axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const TeacherCard = (props) => {
  const teacherCardRef = useRef(null);
  const [data, setdata] = useState(props.data);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const onDelete = async () => {
    try {
      const res = await Axios.delete(`api/delete-teacher/${data._id}`);
      toast.success(res.data.message);
      window.location.reload();
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      teacherCardRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, delay: 1 + props.index * 0.3 }
    );
  }, []);

  return (
    <div
      className="TeacherProfile flex justify-center h-auto mt-[2rem] mb-[2rem]"
      ref={teacherCardRef}
    >
      <div className="DetailsCard bg-cyan-200 min-h-[20rem] h-auto min-w-[18rem] flex flex-col gap-2 pb-5 items-center rounded-xl shadow-2xl">
        <div className="TeacherImage flex justify-center mt-4 mb-0 p-2 h-[12rem] rounded-xl overflow-hidden">
          <Image
            src={data.imageUrl}
            alt="Teacher Image"
            width={265}
            height={190}
            style={{ objectFit: "cover" }}
            className="min-h-[12rem] min-w-full rounded-xl border-2"
          />
        </div>
        <ul className="BioData list-disc flex flex-col gap-1 font-bold text-sm w-[14rem]">
          <li>{data.teacherName}</li>
          <li>{data.subject}</li>
          <li>{data.education}</li>
        </ul>

        <Link href={`/addreview/${data.teacherName}/${data._id}`}>
          <button className="bg-green-400 w-[14rem] h-[2rem] rounded-xl flex justify-center items-center font-semibold p-2 mt-2">
            Review
          </button>
        </Link>
        {isAdmin && (
          <div>
            <button
              onClick={onDelete}
              className="bg-red-400 w-[14rem] h-[2rem] rounded-xl flex justify-center items-center font-semibold p-2 mt-2"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
