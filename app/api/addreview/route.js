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
        const { rating, review } = reqBody;
        
        const cookieStore = cookies();   
        const { id } = jwt.verify(cookieStore.get("token").value, process.env.JWT_SECRET);

        const user = await User.findOne({_id: id});
        
        const newReview = new Reviews({
            userID: user._id,
            username: user.username,
            rating: rating,
            reviewString: review
        });

        const savedReview = await newReview.save();

        //user.reviewsAdded.push(savedReview._id);
        //await user.save();

        return NextResponse.json({
            message: "review added successfully",
            success: true,
            savedReview,
          });

        
    } catch (error) {
        console.log("Error in add reviews Route \n", error);
        return NextResponse.json({message: "error in review add route"}, {status: 400});
    }
}