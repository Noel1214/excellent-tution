  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import Image from "next/image"; // Import Image

  const AddTeacherUi = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");  

    const [name, setname] = useState("");
    const [subject, setsubject] = useState("");
    const [education, seteducation] = useState("");

    console.log(education);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      
      if (file) {
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file))
      }
    };

    const handleFileUpload = async () => {
      if (!selectedFile) {
        console.error("Please select a file to upload.");
        return;
      }

      console.log("revoking url");
      URL.revokeObjectURL(imagePreview);

      const formData = new FormData();
      formData.append("type", selectedFile.type);
      formData.append("name", name);
      formData.append("subject", subject);
      formData.append("education", education);

      // try {
      //   // const res = await axios.post("/api/upload", formData);
      //   // console.log(res.data);
      // } catch (error) {
      //   console.error("Error uploading file", error);
      // }
    };

    return (
      <div>
        <div className="flex flex-col h-screen w-screen p-2">
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
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default AddTeacherUi;
