import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Teacher from "@/models/teacherModel";

connect();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    const name = formData.get("name");
    const subject = formData.get("subject");
    const education = formData.get("education");

    console.log(name);
    console.log(subject);
    console.log(education);

    const newTeacher = new Teacher({
      teacherName: name,
      subject: subject,
      education: education,
      image: "for now nothing",
      public_id: "for now nothing",
    });

    const savedTeacher = await newTeacher.save();
    console.log("this is teacher that is saved in db");
    console.log(savedTeacher);

    return NextResponse.json({
      message: "Image uploaded successfully",
      image: "nothing for now", // Assuming you want to return the secure URL of the uploaded image
      success: true,
    });
  } catch (error) {
    console.log("Error in upload route:");
    console.log(error);

    return NextResponse.json({
      message: "Failed to upload image",
      success: false,
    });
  }
}
