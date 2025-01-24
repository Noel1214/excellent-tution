import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { cookies } from "next/headers";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "@/utils/errors";

export async function POST(req) {
  await connect();
  try {
    const cookieStore = cookies();
    const otpStatus = cookieStore.get("otpStatus")?.value;

    const formData = await req.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (!otpStatus) {
      throw new CustomError("time out", 400);
    }

    const { isOtpVerified } = jwt.verify(otpStatus, process.env.JWT_SECRET);
    if (!isOtpVerified) {
      throw new CustomError("validation failed", 400);
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword, otpVerified: false } },
      { new: true }
    );

    cookieStore.delete("otpStatus");
    return NextResponse.json(
      {
        success: true,
        message: "password changed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";
    console.log("retirinig from wwer");
    console.log(error);

    return NextResponse.json(
      { message: message, success: false },
      { status: statusCode }
    );
  }
}
