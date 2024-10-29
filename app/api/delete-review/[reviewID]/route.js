import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Reviews from "@/models/reviewModel";

connect();
//this [id ] router
export async function DELETE(req, { params }) {
  try {
    const reviewID = params.reviewID;
    console.log(reviewID);

    const deletedReview = await Reviews.findByIdAndDelete(reviewID);

    console.log("going to revalidate");
    if (deletedReview) {
      console.log(deletedReview);
      return NextResponse.json({
        message: "Review deleted successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log("error in review deleting route");
    console.log(error);
    return NextResponse.json({
      error: error,
      message: "Could not delete review",
      success: false,
    });
  }
}
