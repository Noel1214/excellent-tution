import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import CustomError from "@/utils/errors";

export async function GET(req, { params }) {
  await connect();
  try {
    const { id } = await params;
    console.log(id);

    if (!id) {
      throw new CustomError("no id found", 401);
    }

    const user = await User.findById(id, "username email phoneNumber");
    console.log(user);

    if (!user) {
      throw new CustomError("no user found", 404);
    }

    return NextResponse.json({
      message: "success",
      success: true,
      userDetails: {
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber || "",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed",
      success: false,
    });
  }
}
