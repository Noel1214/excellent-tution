import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "@/utils/errors";

export async function POST(req) {
  await connect();
  try {
    const cookieStore = cookies();
    const formData = await req.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("invalid email or password !", 401);
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new CustomError("invalid email or password !", 401);
    }

    const tokenData = {
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const expiry = 3 * 60 * 60 * 1000;
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: expiry,
    });

    // setting cookie
    cookieStore.set("token", token, { maxAge: expiry, httpOnly: true });

    return NextResponse.json(
      {
        message: "Login successful",
        success: true,
        isLoggedIn: true,
        isAdmin: user.isAdmin,
        id: user._id.toString(),
      },
      { status: 200 }
    );
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";
    console.log("error in login route\n", error);

    return NextResponse.json(
      { message: message, success: false },
      { status: statusCode }
    );
  }
}
