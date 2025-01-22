import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  await connect();
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await User.findOne({email});
    console.log(user.otpVerified);
    
    if(!user.otpVerified){
        throw new error;
    }


    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const userUpdated = await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword, otpVerified: false } },
      { new: true }
    );

    const person = await User.findOne({ email });
    console.log(person);

    const response = NextResponse.json(
      {
        success: true,
        message: "password changed successfully",
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}
