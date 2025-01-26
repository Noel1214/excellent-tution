import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import CustomError from "@/utils/errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOtp } from "@/utils/generate-otp";
import { sendMail } from "@/utils/awsClient";

export async function POST(req) {
  await connect();
  try {
    const cookieStore = cookies();
    const formData = await req.formData();
    const email = formData.get("email");    

    // checking for if user aldready exists
    const userChecker = await User.findOne({ email });
    if (userChecker) {
      throw new CustomError("user already exists!", 400, "/login");
    }

    const otp = generateOtp();
    console.log(otp);
    
    // const sendMailResponse = await sendMail(email, otp);
    // if (!sendMailResponse.success) {
    //   throw new CustomError("error try again later", 500);
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    const expiry = 3 * 60 * 1000;
    const tokenData = {
      token: hashedOtp,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: expiry,
    });

    cookieStore.set("registration-token", token, { maxAge: expiry, httpOnly: true });

    return NextResponse.json(
      {
        message: `otp sent to ${email}`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";
    const redirectTo = error.redirectTo;
    console.log("error in validate-user\n", error);

    return NextResponse.json(
      { success: false, message: message, redirectTo: redirectTo },
      { status: statusCode }
    );
  }
}
