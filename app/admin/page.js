"use client";
import React, { useState } from "react";
import axios from "axios";
import AddTeacherUi from "@/components/AddTeacherUi"

const page = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      console.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    const res = await axios.post("/api/upload", formData);
    console.log(res.data);
  };

  return (
    <div>
      
      <AddTeacherUi />
    </div>
  );
};

export default page;
