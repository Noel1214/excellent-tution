import { connect } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendMail } from "@/utils/awsClient";

export async function POST(req) {
  await connect();
  try {
    const formData = await req.formData();
    const email = formData.get("email");

    const digits = 4;
    let otp = "";
    for (let i = 0; i < digits; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    // await sendMail(email, otp);

    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { otp: otp } },
      { new: true }
    );
    console.log(user);

    const response = NextResponse.json(
      { success: true, message: "message otp sent", otp: otp },
      { status: 200 }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
