import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { sendMail } from "@/utils/awsClient";
import CustomError from "@/utils/errors";

export async function POST(req) {
  await connect();
  try {
    const formData = await req.formData();
    const email = formData.get("email");

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("invalid email", 401);
    }

    const digits = 4;
    let otp = "";
    for (let i = 0; i < digits; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    const sendMailResponse = await sendMail(email, otp);
    if (!sendMailResponse.success) {
      throw new CustomError("error try again later", 500);
    }

    await User.findOneAndUpdate({ email: email }, { $set: { otp: otp } });

    const response = NextResponse.json(
      { success: true, message: "otp sent" },
      { status: 200 }
    );
    return response;
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";

    console.log(error);

    return NextResponse.json(
      {
        message: message,
        success: false,
      },
      { status: statusCode }
    );
  }
}
