import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req) {
  try {
    const reqbody = await req.json();
    const { email, password } = reqbody;
    // console.log(reqbody);

    const user = await User.findOne({ email });
    if (!user) {
        // console.log("could not find user");
      return NextResponse.json(
        { error: "user dose not exist" },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "wrong password" }, { status: 400 });
    }

    return NextResponse.json({ loggedIn: true });
  } catch (error) {
    // console.log("Error while trying to login");
    // console.log(error);
    return NextResponse.json({error : error}, {status: 400});
  }
}
