import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import CustomError from "@/utils/errors";

export async function GET(req) {
  await connect();
  try {
    const cookieStore = cookies();
    const token = await cookieStore.get("token")?.value;
    if (!token) {
      // throw new CustomError("not logged in", 401);
      return NextResponse.json(
        {
          message: "success",
          isAdmin: false,
          isLoggedIn: false,
          id: "",
        },
        { status: 200 }
      );
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: tokenData.email });
    if (!user) {
      throw new CustomError("no user found", 404);
    }

    return NextResponse.json(
      {
        message: "success",
        isAdmin: user.isAdmin,
        isLoggedIn: true,
        id: user._id.toString(),
      },
      { status: 200 }
    );
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";
    console.log("Error in authorization\n", error);

    return NextResponse.json(
      { message: message, success: false },
      { status: statusCode }
    );
  }
}
