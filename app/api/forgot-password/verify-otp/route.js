import { connect } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

export async function POST(req) {
  await connect();
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    const otp = formData.get("otp");

    const user = await User.findOne({email});

    if(!(otp === user.otp)){
      console.log("otp dose not match");
      throw new error;
    }

    const userUpdated = await User.findOneAndUpdate(
      { email: email },
      { $set: { otpVerified: true } },
      { new: true }
    );
    console.log(userUpdated);

    const response = NextResponse.json(
      { success: true, message: "message otp sent" },
      { status: 200 }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
