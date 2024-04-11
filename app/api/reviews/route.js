import { connect } from "@/dbconfig/dbconfig";
import Reviews from "@/models/reviewModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {

    const reviews = await Reviews.find({});
    console.log("this is all review i could find");
    console.log(reviews);

    return NextResponse.json({
      message: "loged succes full",
      success: true,
      reviews: reviews,
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
