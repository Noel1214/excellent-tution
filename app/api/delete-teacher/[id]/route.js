import { NextResponse } from "next/server";
import Teacher from "@/models/teacherModel";
import { connect } from "@/dbconfig/dbconfig";
import { deleteObjectInS3 } from "@/utils/awsClient";
import CustomError from "@/utils/errors";

export async function DELETE(req, { params }) {
  await connect();
  try {
    const id = await params.id;
    if (!id) {
      throw new CustomError("no teacher found", 401);
    }
    const teacher = await Teacher.findOneAndDelete(id);
    await deleteObjectInS3(teacher.key);

    return NextResponse.json(
      { message: `teacher ${teacher.teacherName} deleted`, success: true },
      { status: 200 }
    );
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.customMessage || "internal error";
    console.log("error in delete teacher\n", error);
    
    return NextResponse.json(
      { message: message, success: false },
      { status: statusCode }
    );
  }
}
