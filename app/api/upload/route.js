import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { v2 as cloudinary } from "cloudinary";
import { resolve } from "styled-jsx/css";

cloudinary.config({
  cloud_name: "dwsknjdsr",
  api_key: 113317687158625,
  api_secret: "P1fZqO33FXuunBKVhBA5KAJBT94",
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    console.log(image);

    //const arrayBuffer = await image.arrayBuffer();
    //const buffer = Buffer.from(arrayBuffer);

    return NextResponse.json({
      message: "got image succesfully",
      image: image,
      success: true,
    });
  } catch (error) {
    console.log("error in upload route ");
    console.log(error);

    return NextResponse.json({
      message: "faielde upload",
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
