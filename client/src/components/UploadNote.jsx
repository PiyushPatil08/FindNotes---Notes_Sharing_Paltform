import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const UploadNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");

  const user = useSelector((state) => state.user.userData);
  const userId = user?._id;
  const userName = user?.userName;
  const navigate = useNavigate(); // Initialize navigation

  const submitFile = async (e) => {
    e.preventDefault();

    if (!userId || !file) {
      alert("Missing user or file data!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("userName", userName);

    try {
      await axios.post("http://localhost:6969/notes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/profile"); // Redirect to the profile page after success
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("Failed to upload notes, please try again!");
    }
  };

  return (
    <form
      className="flex flex-col items-center w-full max-w-lg p-6 bg-gray-900 text-white rounded-lg shadow-lg"
      onSubmit={submitFile}
    >
      <h1 className="mb-5 text-2xl font-bold text-blue-400">Upload Your Notes</h1>
      <input
        type="text"
        placeholder="Title"
        required
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-4 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Description"
        required
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 mb-4 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        required
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 mb-4 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Category</option>
        <option value="Academic Subjects">Academic Subjects</option>
        <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
        <option value="DBMS">DBMS</option>
        <option value="Web Development">Web Development</option>
        <option value="Machine Learning">Machine Learning</option>
        <option value="Data Science">Data Science</option>
        <option value="App Development">App Development</option>
        <option value="Aptitude">Aptitude</option>
        <option value="Others">Others</option>
      </select>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-40 p-5 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-gray-800"
      >
        <svg
          className="w-10 h-10 mb-3 text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="text-sm">Click to Upload or Drag & Drop</p>
        <input
          type="file"
          accept="application/pdf"
          required
          id="dropzone-file"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>
      <button
        type="submit"
        className="w-full py-3 mt-5 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default UploadNote;
