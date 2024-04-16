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
    console.log(response.secure_url);

    const newTeacher = new Teacher({
      teacherName: name,
      subject: subject,
      education: education,
      image: response.secure_url,
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

// import axios from 'axios';

// const handleFileUpload = async (event) => {
//   event.preventDefault();

//   const formData = new FormData();
//   formData.append('file', event.target.files[0]);

//   try {
//     const response = await axios.post('/api/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     console.log('File upload successful:', response.data);
//     // Handle success feedback or redirect
//   } catch (error) {
//     console.error('File upload error:', error);
//     // Handle error feedback
//   }
// };

// return (
//   <form onSubmit={handleFileUpload}>

// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const filePath = '/path/to/your/file.jpg'; // Replace with actual file path

// try {
//   const result = await cloudinary.uploader.upload(filePath, {
//     // Optional transformations, folder, etc.
//   });

//   console.log('File uploaded successfully:', result);
// } catch (error) {
//   console.error('Error uploading file:', error);
// }
