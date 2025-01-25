import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import CustomError from "@/utils/errors";

export async function POST(req) {
  await connect();
  try {
    const cookieStore = cookies();
    const formData = await req.formData();
    const email = formData.get("email");
    const otp = formData.get("otp");

    const user = await User.findOne({ email });
    if (!(user.otp === otp)) {
      console.log("wrong otp");
      throw new CustomError("wrong otp entered", 400);
    }

    await User.findOneAndUpdate({ email: email }, { $set: { otp: "" } });

    const cookieData = {
      isOtpVerified: true,
      email: email,
    };
    const expiry = 5 * 60 * 1000;

    const otpStatus = jwt.sign(cookieData, process.env.JWT_SECRET, {
      expiresIn: expiry,
    });
    cookieStore.set("otpStatus", otpStatus, { maxAge: expiry, httpOnly: true });

    return NextResponse.json(
      { message: "message otp sent", success: true },
      { status: 200 }
    );
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";
    console.log(error);

    return NextResponse.json(
      { message: message, success: false },
      { status: statusCode }
    );
  }
}
