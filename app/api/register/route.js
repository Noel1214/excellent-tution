import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(NextRequest) {
  try {
    console.log("enterin try");
    const reqBody = await NextRequest.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    //checking for if user aldready exists
    const userChecker = await User.findOne({ email });

    if (userChecker) {
      return NextResponse.json(
        { error: "user aldready exists" },
        { status: 400 }
      );
    }

    //hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //creating User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
