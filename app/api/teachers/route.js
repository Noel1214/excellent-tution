import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Teacher from "@/models/teacherModel";

connect();

export async function GET(req) {
  let teachers = [];

  try {
    //teachers = await Teacher.find({}).sort({ _id: -1 });
    teachers = await Teacher.find({}).sort({ _id: -1 });

    //console.log(teachers);

    return NextResponse.json({
      message: "teachers request success",
      success: true,
      teachers: teachers,
    });
  } catch (error) {
    console.log("error in teachers route");
    console.log(error);

    return NextResponse.json({
      message: "teachers request failed",
      success: false,
      error: error,
    });
  }
}
