import React from "react";
import "../app/globals.css";

const LoadingCircle = () => {
  return (
    <div className="h-[7rem] w-[7rem] p-5 rounded-lg scale-90 flex flex-col items-center justify-center bg-white shadow-2xl">
      <div className="loader">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
        <div className="bar10"></div>
        <div className="bar11"></div>
        <div className="bar12"></div>
      </div>
      <h1 className="font-semibold translate-x-1 ">Loading...</h1>
    </div>
  );
};

export default LoadingCircle;
