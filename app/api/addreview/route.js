import { connect } from "@/dbconfig/dbconfig";
import Reviews from "@/models/reviewModel";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import CustomError from "@/utils/errors";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { rating, review, teacherId } = reqBody;

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if(!token){
        throw new CustomError("please login first", 401)
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET);    
    const user = await User.findOne({ email });

    if (!user) {
      console.log("could not get data of user adding the review");
      throw new CustomError("user not found", 400);
    }

    const newReview = new Reviews({
      userID: user._id,
      username: user.username,
      teacherId: teacherId,
      rating: rating,
      reviewString: review,
    });

    const savedReview = await newReview.save();

    return NextResponse.json(
      {
        message: "review added successfully",
        success: true,
        savedReview,
      },
      { status: 200 }
    );
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "internal server error";
    
    console.log("Error in add reviews Route \n", error);
    return NextResponse.json(
      { message: message },
      { status: statusCode }
    );
  }
}
