import { NextResponse } from "next/server";

export async function GET() {

    try {
        
        const response = NextResponse.json({
            message:"logout successful",
            success: true
        })
        response.cookies.set("token", "", {expires: 0});

        return response;


    } catch (error) {
        console.log("Error in logout route");
        console.log(error);
    }

}