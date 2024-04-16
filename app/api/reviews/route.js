import { connect } from "@/dbconfig/dbconfig";
import Reviews from "@/models/reviewModel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

connect();

export async function GET() {

  let reviews = [];
  let userInfo = null;

  
  try {
    const cookieStore = cookies();

    try {
      const { id } = jwt.verify(cookieStore.get("token").value, process.env.JWT_SECRET);
      userInfo = id;
      //console.log(id);
    } catch (error) {
      console.log("jwt error");
      console.log(error);
    }

    reviews = await Reviews.find({}).sort({ _id: -1 });
    //console.log("this is all review");
    //console.log(reviews);

    return NextResponse.json({
      message: "loged succes full",
      success: true,
      reviews: reviews,
      userInfo: userInfo,
    });
  } catch (error) {
    console.log("error in reviwes route");
    console.log(error);
    return NextResponse.json({
      message: "failed in review route",
      success: false,
      error: error,
    });
  }
}
