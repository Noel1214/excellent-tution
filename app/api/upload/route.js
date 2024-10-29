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
