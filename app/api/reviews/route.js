import { connect } from "@/dbconfig/dbconfig";
import Reviews from "@/models/reviewModel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

connect();

export async function GET() {
  try {

    const cookieStore = cookies();
    const { id } = jwt.verify(cookieStore.get("token").value, process.env.JWT_SECRET);
    //console.log(id);


    //const reviews = await Reviews.find({});
    const reviews = await Reviews.find({}).sort({ _id: -1 });
    //console.log("this is all review i could find");
    //console.log(reviews);

    return NextResponse.json({
      message: "loged succes full",
      success: true,
      reviews: reviews,
      userInfo: id,
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
