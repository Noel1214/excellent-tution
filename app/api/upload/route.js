<<<<<<< HEAD
import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Import fs module to work with files
import path from "path"; // Import path module to work with file paths
import Teacher from "@/models/teacherModel";

connect();

// Ensure the temporary folder exists
const tempFolderPath = "./temp"; // Path to the temporary folder
fs.mkdir(tempFolderPath, { recursive: true }) // Create the folder recursively if it doesn't exist
  .catch((err) => {
    console.error("Error creating temporary folder:", err);
  });

cloudinary.config({
  cloud_name: "dwsknjdsr",
  api_key: 113317687158625,
  api_secret: "P1fZqO33FXuunBKVhBA5KAJBT94",
});

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

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Specify the file path within the temporary folder
    const tempFilePath = path.join(tempFolderPath, "tempImage.jpg");

    // Write buffer to the temporary file
    await fs.writeFile(tempFilePath, buffer);

    // Upload the temporary file to Cloudinary
    const response = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: "auto",
    });

    // Delete the temporary file after uploading
    await fs.unlink(tempFilePath);
    //console.log(response.secure_url);
    console.log(response.public_id);

    const newTeacher = new Teacher({
      teacherName: name,
      subject: subject,
      education: education,
      image: response.secure_url,
      public_id: response.public_id,
    });

    const savedTeacher = await newTeacher.save();
    console.log("this is teacher that is saved in db");
    console.log(savedTeacher);

    return NextResponse.json({
      message: "Image uploaded successfully",
      image: response.secure_url, // Assuming you want to return the secure URL of the uploaded image
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

=======
import fs from "fs";
import path from "path";
// Import your Teacher model if needed, or remove if not using
// import Teacher from "@/models/teacherModel";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing to handle it manually
  },
};

export async function POST(req) {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "uploads"); // Use process.cwd() to get the root directory
  form.keepExtensions = true; // Keep file extensions

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("Error in form parsing:", err);
        return resolve(NextResponse.json({ message: "Failed to upload image", success: false }));
      }

      try {
        const { name, subject, education } = fields;

        // Move the uploaded file to the specified directory
        const tempPath = files.image.filepath; // Path of the uploaded file
        const newPath = path.join(form.uploadDir, files.image.originalFilename);
        fs.renameSync(tempPath, newPath); // Move file to the uploads directory

        // Optional: Save teacher info to the database using the Teacher model
        // await Teacher.create({ name, subject, education, image: newPath });

        return resolve(NextResponse.json({
          message: "Image uploaded successfully",
          success: true,
        }));
      } catch (error) {
        console.error("Error in upload handler:", error);
        return resolve(NextResponse.json({
          message: "Failed to upload image",
          success: false,
        }));
      }
    });
  });
}
>>>>>>> 2f2a5b9 (Initial commit)
