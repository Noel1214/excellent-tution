import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Teacher from "@/models/teacherModel";
import { getObjectUrl } from "@/utils/awsClient";

export async function GET(req) {
  try {
    await connect();
    const teachers = await Teacher.find({}).sort({ _id: -1 });
    
    const dataWithImages = await Promise.all(teachers.map(async (item) => {
      
      const imageUrl = await getObjectUrl(item.key);
      return {
        ...item.toObject(),
        imageUrl: imageUrl
      }
    }))

    // console.log(dataWithImages);
    

    return NextResponse.json({
      message: "teachers request success",
      success: true,
      teachers: dataWithImages,
    }, {status: 200});
  } catch (error) {
    console.log("error in teachers route");
    console.log(error);

    return NextResponse.json({
      message: "teachers request failed",
      success: false,
      error: error,
    }, {status: 500});
  }
}
