import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import CustomErrors from "@/utils/errors";

export async function GET(req) {
  await connect();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      throw new CustomErrors("not logged in", 401);
    }

    const tokenData = jwt.verify(token.value, process.env.JWT_SECRET);

    const user = await User.findOne({ email: tokenData.email });
    if (!user) {
      throw new CustomErrors("no user found", 404);
    }

    const response = NextResponse.json(
      { message: "success", isAdmin: user.isAdmin, isLoggedIn: true },
      { status: 200 }
    );
    return response;
  } catch (error) {
    console.log("error in admin-status");
    const statusCode = error.statusCode || 500;
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: statusCode });
  }
}
