import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";


const AddTeacherUi = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
<<<<<<< HEAD
<<<<<<< HEAD

=======
  
>>>>>>> 2f2a5b9 (Initial commit)
=======
  
>>>>>>> master
  const [name, setname] = useState("");
  const [subject, setsubject] = useState("");
  const [education, seteducation] = useState("");
  //console.log(education);

  const handleFileChange = (event) => {
<<<<<<< HEAD
<<<<<<< HEAD
    const file = event.target.files[0];
    setSelectedFile(file);
    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
=======
=======
>>>>>>> master
    // console.log(event.target.files[0]);
    const file = event.target.files[0];
    console.log(file);
    
    setSelectedFile(file);
    
    // Display image preview
    const reader = new FileReader();
    // console.log(reader);
    
    reader.onloadend = () => {
      // console.log(reader.result);
      
      setImagePreview(reader.result);

<<<<<<< HEAD
>>>>>>> 2f2a5b9 (Initial commit)
=======
>>>>>>> master
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      console.error("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", name);
    formData.append("subject", subject);
    formData.append("education", education);
    const res = await axios.post("/api/upload", formData);
    console.log(res.data);
  };

  return (
    <div>
      <div className="flex flex-col h-screen w-screen  p-2">
        <div className="TeacherImage mx-auto mt-8 mb-0 rounded-xl w-auto max-w-full overflow-hidden">
          <Image
            src={imagePreview}
            width={265}
            height={190}
            alt="Teacher Image"
            className="min-h-[8rem] max-h-auto max-w-auto  min-w-full rounded-xl border-2 object-cover"
          />
        </div>
        <div className="flex flex-col items-center gap-3 w-auto p-2 ">
          <input
            type="file"
            onChange={handleFileChange}
            className=" w-[15rem]"
          />
          <input
            type="text"
            className="outline-none rounded-lg p-1 text-black w-full max-w-[26rem]"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
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
