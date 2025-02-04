import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import CustomError from "@/utils/errors";

export async function POST(req) {
  await connect();
  try {
    const formData = await req.formData();
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const phoneNumber = formData.get("phoneNumber");

    // checking for if user aldready exists
    const userChecker = await User.findOne({ email });
    if (userChecker) {
      throw new CustomError("user already exists!", 400);
    }

    //hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // creating nad saving new user
    const newUser = new User({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    await newUser.save();

    return NextResponse.json(
      {
        message: "registered successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";

    return NextResponse.json(
      { success: false, message: message },
      { status: statusCode }
    );
  }
}
