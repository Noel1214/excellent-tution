import { connect } from "@/dbconfig/dbconfig";
import Reviews from "@/models/reviewModel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import CustomError from "@/utils/errors";

export async function GET() {
  await connect();

  let reviews = [];

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if(!token){
      throw new CustomError("not logged in", 400);
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    if(!email){
      throw new CustomError("invalid credentials", 401);
    }

    reviews = await Reviews.find({}).sort({ _id: -1 });

    return NextResponse.json({
      message: "successfully retrieved reviews",
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    console.log("error in reviwes route");

    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "internal server error";

    console.log(error.message);
    console.log(error);

    return NextResponse.json({
      message: errorMessage,
      success: false,
    }, { status: statusCode});
  }
}
