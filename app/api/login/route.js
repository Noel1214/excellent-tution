import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req) {
  try {
    const reqbody = await req.json();
    const { email, password } = reqbody;
    // console.log(reqbody);

    const user = await User.findOne({ email });
    if (!user) {
      // console.log("could not find user");
      return NextResponse.json({
        message: "invalid username or password!",
        isLoggedIn: false,
        success: false,
      }, {status: 400});
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "invalid username or password!", success: false }, {status: 400});
    }

    const tokenData = {
      username: user.username,
      email: user.email,
    };

    const expiry = "30m";
    //const expiry = 15 * 24 * 60 * 60;
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: expiry,
    });

    console.log("going to set cookies");
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      isLoggedIn: true,
    }, {status: 200});

    response.cookies.set("token", token, { httpOnly: true });
    console.log("cookise should be set now");
    return response;

  } catch (error) {
    console.log("error from login rotue");
    console.log(error);
    return NextResponse.json(
      { error: error, message: "login failed !" }, {status: 500}
    );
  }
}
