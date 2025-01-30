import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Reviews from "@/models/reviewModel";
import CustomError from "@/utils/errors";

export async function DELETE(req, { params }) {
  await connect();
  try {
    const reviewID = await params.reviewID;
    console.log(reviewID);
    console.log("this is rotue ");
    

    return NextResponse.json(
      {
        message: "Review deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";
    console.log("error in delete-review\n", error);

    return NextResponse.json(
      {
        message: message,
        success: false,
      },
      { status: statusCode }
    );
  }
}
