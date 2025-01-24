import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import CustomError from "@/utils/errors";

export async function GET(req) {
  await connect();
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      throw new CustomError("not logged in", 401);
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: tokenData.email });    
    if (!user) {
      throw new CustomError("no user found", 404);
    }

    const response = NextResponse.json(
      { message: "success", isAdmin: user.isAdmin, isLoggedIn: true, id: user._id.toString() },
      { status: 200 }
    );
    return response;
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";
    
    return NextResponse.json({ message: message, success: false }, { status: statusCode });
  }
}
