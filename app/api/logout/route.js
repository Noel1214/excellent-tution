import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");

    const response = NextResponse.json({
      message: "logout successful",
      success: true,
    });
    return response;
  } catch (error) {
    console.log("Error in logout route");
    console.log(error);
  }
}
