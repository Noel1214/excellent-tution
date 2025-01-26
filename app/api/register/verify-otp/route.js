import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import CustomError from "@/utils/errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("registration-token")?.value;
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    const formData = await req.formData();
    const otpfromUser = formData.get("otp");

    if (!tokenData || !tokenData.token) {
      throw new CustomError("time out", 400);
    }

    const isOtpCorrect = await bcrypt.compare(otpfromUser, tokenData.token);
    if (!isOtpCorrect) {
      throw new CustomError("wrong otp entered", 400);
    }

    cookieStore.delete("registration-token");

    return NextResponse.json(
      { message: "verification successful", success: true },
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
