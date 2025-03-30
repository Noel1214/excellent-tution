import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image"; // Import Image
import toast from "react-hot-toast";
import LoadingCircle from "./LoadingCircle";

const AddTeacherUi = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setname] = useState("");
  const [subject, setsubject] = useState("");
  const [education, seteducation] = useState("");
  const [uploading, setuploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileUpload = async () => {
    setuploading(true);
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    URL.revokeObjectURL(imagePreview);

    const formData = new FormData();
    formData.append("type", selectedFile.type);
    formData.append("name", name);
    formData.append("subject", subject);
    formData.append("education", education);

    try {
      const res = await axios.post("/api/upload", formData);
      // console.log(res.data);
      if (res.data.url) {
        const awsRes = await axios.put(res.data.url, selectedFile);
      }
      toast.success("image uploaded");
      setuploading(false);
    } catch (error) {
      toast.error("upload failed");
      // console.error("Error uploading file", error);
    }
  };

  return (
    <div>
      <div className={`${uploading ? "blur-md" : ""} flex flex-col h-screen w-screen p-2`}>
        <div className="TeacherImage mx-auto mt-8 mb-0 rounded-xl w-auto max-w-full overflow-hidden">
          {imagePreview && (
            <Image
              src={imagePreview}
              width={265}
              height={190}
              alt="Teacher Image"
              className="min-h-[8rem] max-h-auto max-w-auto min-w-full rounded-xl border-2 object-cover"
            />
          )}
        </div>
        <div className="flex flex-col items-center gap-3 w-auto p-2 ">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-[15rem]"
          />
          <input
            type="text"
            className="outline-none rounded-lg p-1 text-black w-full max-w-[26rem]"
            placeholder="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="text"
            className="outline-none rounded-lg p-1 text-black w-full max-w-[26rem]"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}
            placeholder="subject"
          />
          <input
            type="text"
            className="outline-none rounded-lg p-1 text-black w-full max-w-[26rem]"
            value={education}
            onChange={(e) => seteducation(e.target.value)}
            placeholder="education"
          />
          <button
            className="mx-auto h-[2rem] w-full rounded-xl bg-cyan-600 max-w-[26rem]"
            onClick={handleFileUpload}
            disabled={uploading}
          >
            Submit
          </button>
        </div>
      </div>
      {uploading && (
        <div className="absolute z-20 top-[50%] -translate-y-[80%] -translate-x-[50%] left-[50%] drop-shadow-2xl rounded-lg">
          <LoadingCircle />
        </div>
      )}
    </div>
  );
};

export default AddTeacherUi;
