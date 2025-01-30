import { connect } from "@/dbconfig/dbconfig";
import Teacher from "@/models/teacherModel";
import Reviews from "@/models/reviewModel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import CustomError from "@/utils/errors";
import { getObjectUrl } from "@/utils/awsClient";

export async function GET() {
  await connect();

  let reviews = [];

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new CustomError("not logged in", 400);
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    if (!email) {
      throw new CustomError("invalid credentials", 401);
    }

    const reviews = await Reviews.find({})
      .sort({ _id: -1 }) // Sort reviews by ID in descending order
      .populate({
        path: "teacherId", // The field in the Reviews schema to populate
        model: Teacher, // The model to populate from
        select: "teacherName key", // Fields to include from the Teacher model
      });

    const reviewsWithImageData = await Promise.all(
      reviews.map(async (item) => {
        const imageUrl = await getObjectUrl(item.teacherId.key);
        return {
          ...item.toObject(),
          imageUrl: imageUrl,
        };
      })
    );
    // console.log(reviewsWithImageData);

    return NextResponse.json({
      message: "successfully retrieved reviews",
      success: true,
      reviews: reviewsWithImageData,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "internal error";
    console.log("error in reviwes route\n", error);

    return NextResponse.json(
      {
        message: errorMessage,
        success: false,
      },
      { status: statusCode }
    );
  }
}
