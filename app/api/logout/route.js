import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import CustomError from "@/utils/errors";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
      throw new CustomError("already no login session found", 401);
    }

    return NextResponse.json({
      message: "logout successful",
      success: true,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";

    console.log("error in logout route\n", error);

    return NextResponse.json(
      { message: message, success: false },
      { status: statusCode }
    );
  }
}
