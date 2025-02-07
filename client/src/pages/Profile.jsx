import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.user.userData);
  const [userFiles, setUserFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;
    const getUserFiles = async () => {
      try {
        const result = await axios.get(`http://localhost:6969/notes/getFiles/${userId}`);
        setUserFiles(result.data.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };
    getUserFiles();
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6 lg:flex-row">
      {/* Profile Section */}
      <div className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-800 p-6 shadow-lg lg:h-full lg:w-1/3">
        {/* Profile Image */}
        <div className="h-[180px] w-[180px] overflow-hidden rounded-full border-4 border-purple-500 shadow-md profile-img">
          <img
            src={user.profileImage || "https://via.placeholder.com/200"}
            alt={`${user.firstName}'s profile`}
            className="h-full w-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-white">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-purple-400">@{user.userName}</p>
          <p className="mt-2 text-gray-300 italic">{user.userBio}</p>
        </div>

        {/* Uploads Count */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-400">Uploads</p>
            <p className="text-3xl font-bold text-purple-500">{userFiles.length}</p>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mt-6 w-full rounded-lg bg-gray-800 p-6 shadow-lg lg:mt-0 lg:ml-6 lg:w-2/3">
        <h1 className="mb-4 text-xl font-bold text-white">My Documents</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {loading ? (
            // Skeleton Loaders
            [...Array(6)].map((_, index) => (
              <div key={index} className="h-32 rounded-lg bg-gray-700 animate-pulse"></div>
            ))
          ) : userFiles.length > 0 ? (
            userFiles.map((file) => (
              <div
                key={file._id}
                className="rounded-lg border border-gray-700 bg-gray-700 p-4 shadow hover:shadow-lg transition-all duration-300 file-card"
              >
                {/* File Name */}
                <p className="truncate text-lg font-semibold text-white">{file.fileName}</p>

                {/* Category */}
                <p className="text-sm text-gray-400">Category: {file.category}</p>

                {/* Upload Date */}
                <p className="text-sm text-gray-400">
                  Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                </p>

                {/* View File Link */}
                <a
                  href={`http://localhost:6969/files/${file.files}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  View File <FaExternalLinkAlt />
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No documents uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
