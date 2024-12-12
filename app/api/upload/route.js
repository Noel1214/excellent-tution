import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Teacher from "@/models/teacherModel";
import { putObjectUrl } from "@/utils/awsClient";

export async function POST(req) {
  try {
    await connect();
    const formData = await req.formData();

    const type = formData.get("type");
    const name = formData.get("name");
    const subject = formData.get("subject");
    const education = formData.get("education");

    const newTeacher = new Teacher({
      teacherName: name,
      subject: subject,
      education: education,
      key: `/teachers/${name}.avif`,
    });

    const savedTeacher = await newTeacher.save();

    const url = await putObjectUrl(savedTeacher.teacherName, type);
    console.log(url);

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        url: url,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in upload route:");
    console.log(error.message);
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to upload image",
        success: false,
      },
      { status: 500 }
    );
  }
}
