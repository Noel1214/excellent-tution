"use client";
import React from "react";
import { FaStar } from "react-icons/fa";

export default function useStars(value = 0) {
  const renderStars = () => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: value }, (_, index) => {
          return <FaStar className="text-yellow-400" key={index} size={18} />;
        })}
      </div>
    );
  };

  return { renderStars };
}
