"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const [stars, setstars] = useState([]);
  console.log(stars);
  const [reviewsData, setreviewsData] = useState([]);
  console.log(reviewsData);

  useEffect(() => {
    const tempStars = [];
    for (let i = 0; i < 5; i++) {
      tempStars.push(<div key={`star_${i}`}>star</div>);
    }
    setstars(tempStars);
  }, []);

  const getReviews = async () => {
    try {
      const response = await axios.get("/api/reviews");
      const { message, success, reviews } = response.data;
      console.log(message);
      console.log(success);


      setreviewsData(reviews)

    } catch (error) {
      console.log("error in client side lol page");
      console.log(error);
    }
  };

  return (
    <div>
      lol
      {stars}
      <button onClick={getReviews} >Click to get Review</button>
      <h1>THIS IS DATA</h1>
      {
        reviewsData.map((item) => (
          <div key={item._id} className="bg-green-500 m-5" >
            <h1>{item.username}</h1>
            <h1>{item.rating}</h1>
            <h1>{item.reviewString}</h1>
          </div>
        ))
      }

    </div>
  );
};

export default page;
