"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TeacherCard from "@/components/TeacherCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setTeacherData } from "@/lib/features/teacher/teacherSlice";
import toast from "react-hot-toast";
import ConfirmationBox from "@/components/ConfirmationBox";
import LoadingCircle from "@/components/LoadingCircle";
import SimpleLoadingCircle from "@/components/SimpleLoadingCircle";

const App = () => {
  const dispatch = useDispatch();

  const titlehead = useRef(null);

  const dataFromRedux = useSelector((state) => state.teacher.teacherData);
  const showConfirmationBox = useSelector(
    (state) => state.displayConfirmAndLoading.showConfirmationBox
  );
  const showLoading = useSelector(
    (state) => state.displayConfirmAndLoading.showLoadingScreen
  );
  const [loadingOnDataFetching, setloadingOnDataFetching] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      titlehead.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    if (dataFromRedux.length) return;
    setloadingOnDataFetching(true);
    (async function () {
      try {
        const response = await axios.get("/api/teachers");
        dispatch(setTeacherData(response.data.teachers));
        setloadingOnDataFetching(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setloadingOnDataFetching(false);
      }
    })();
  }, []);

  return (
    <div>
      <div
        className={`${showLoading ? "blur-md" : ""} ${
          showConfirmationBox ? "blur-md" : ""
        } flex flex-col items-center mt-[3rem] min-w-screen`}
      >
        <div className="flex flex-col items-center" ref={titlehead}>
          <h1 className="titleFont text-cyan-200 text-2xl mb-2">Faculty</h1>
          <hr className="w-[8rem] text-violet-600 border-black -translate-x-1" />
        </div>
        <div className="-translate-x-1">
          {dataFromRedux.map((item, index) => (
            <TeacherCard key={item._id} index={index} data={item} />
          ))}
          {loadingOnDataFetching && <SimpleLoadingCircle />}
        </div>
      </div>
      {showConfirmationBox && (
        <div className="fixed top-[55%] -translate-y-[80%] -translate-x-[50%] left-[50%] drop-shadow-2xl rounded-lg">
          <ConfirmationBox text="Are you sure you want to delete this? " />
        </div>
      )}
      {showLoading && (
        <div className="fixed z-20 top-[50%] -translate-y-[80%] -translate-x-[50%] left-[50%] drop-shadow-2xl rounded-lg">
          <LoadingCircle text="deleting" />
        </div>
      )}
    </div>
  );
};

export default App;
