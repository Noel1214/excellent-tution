import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  await connect();
  try {
    const reqbody = await req.json();
    const cookieStore = await cookies();

    const { email, password } = reqbody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "invalid username or password!",
          isLoggedIn: false,
          success: false,
        },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "invalid username or password!", isLoggedIn: false, success: false },
        { status: 400 }
      );
    }

    const tokenData = {
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const expiry = "30m";
    //const expiry = 15 * 24 * 60 * 60;
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: expiry,
    });

    // setting cookie
    cookieStore.set("token", token, { httpOnly: true });

    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,  
        isLoggedIn: true,
        isAdmin: user.isAdmin,
      },
      { status: 200 }
    );

    return response;

  } catch (error) {
    console.log("error from login route");
    console.log(error);
    return NextResponse.json(
      { message: "login failed !", success: false },
      { status: 500 }
    );
  }
}
