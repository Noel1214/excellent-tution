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
        message: "user dose not exist",
        isLoggedIn: false,
        success: true,
      });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "wrong password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
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
      messge: "Login successful",
      isLoggedIn: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    console.log("cookise should be set now");

    // NextResponse.cookies.delete('token');

    //return NextResponse.json({ loggedIn: true });
    return response;
  } catch (error) {
    console.log("error from login rotue");
    console.log(error);
    return NextResponse.json(
      { error: error, message: "login failed !" },
      { status: 400 }
    );
  }
}
