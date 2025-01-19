import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import CustomError from "@/utils/errors";

connect();

export async function POST(req) {
  try {
    const formData = await req.formData();
    console.log(formData);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(username);
    console.log(email);
    console.log(password);

    // checking for if user aldready exists
    const userChecker = await User.findOne({ email });
    if (userChecker) {
      throw new CustomError("user already exists!", 400, "/login");
    }

    //hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // creating nad saving new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("this is user saved");
    console.log(savedUser);

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        // savedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";
    const redirectTo = error.redirectTo;

    console.log(redirectTo);
    

    return NextResponse.json(
      { success: false, message: message, redirectTo:redirectTo },
      { status: statusCode }
    );
  }
}
