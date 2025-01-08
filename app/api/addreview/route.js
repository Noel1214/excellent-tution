import { connect } from "@/dbconfig/dbconfig";
import Reviews from "@/models/reviewModel";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { rating, review, teacherId } = reqBody;
        
        const cookieStore = cookies();   
        const { email } = jwt.verify(cookieStore.get("token").value, process.env.JWT_SECRET);

        const user = await User.findOne({email});
        
        const newReview = new Reviews({
            userID: user._id,
            username: user.username,
            teacherId: teacherId,
            rating: rating,
            reviewString: review
        });

        const savedReview = await newReview.save();

        return NextResponse.json({
            message: "review added successfully",
            success: true,
            savedReview,
          },{status: 200});
               
    } catch (error) {
        console.log("Error in add reviews Route \n", error);
        return NextResponse.json({message: "error in review add route"}, {status: 500});
    }
}