"use client";
import React, { useState } from 'react';
import axios from 'axios';

const MyUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleFileUpload = async (file) => {

    if (!file) {
      console.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    const res = await axios.post("/api/upload", formData);
    console.log(res.data);

    

    //console.log('Selected file:', selectedFile);

    // Perform further actions like sending the file to the server
  };

  return (
    <div>
      <h1>THIS IS UPLOADING PLACE</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Uplaaoda</button>
      {imagePreview && (
        <div>
          <h2>Image Preview:</h2>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default MyUploadComponent;
