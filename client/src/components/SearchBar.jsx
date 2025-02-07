import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes, FaUser, FaCalendarAlt } from "react-icons/fa";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:6969/notes/getFiles");
        setAllNotes(response.data.data);
        setFilteredNotes(response.data.data);
      } catch (error) {
        console.error("Error Fetching Notes: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredNotes(
        searchQuery.trim()
          ? allNotes.filter(
              (note) =>
                note.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.category?.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : allNotes
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, allNotes]);

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredNotes(allNotes);
  };

  const showPDF = (file) => {
    window.open(`http://localhost:6969/files/${encodeURIComponent(file)}`, "_blank");
  };

  const groupedNotes = filteredNotes.reduce((acc, note) => {
    const category = note.category || "Uncategorized";
    acc[category] = acc[category] || [];
    acc[category].push(note);
    return acc;
  }, {});

  const categoryColors = {
    "Academic Subjects": "bg-blue-600",
    "Data Structures & Algorithms": "bg-teal-600",
    "DBMS": "bg-pink-600",
    "Web Development": "bg-orange-600",
    "Machine Learning": "bg-blue-700",
    "Data Science": "bg-green-600",
    "App Development": "bg-yellow-600",
    "Aptitude": "bg-indigo-600",
    "Others": "bg-gray-600",
    Uncategorized: "bg-gray-500",
  };

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "Unknown Date";

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 p-6">
      {/* Header */}
      <div className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Notes Repository</h1>
        <p className="text-gray-400">Search and explore notes by category or title</p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-3 shadow-lg">
          <FaSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search notes by title or category..."
            className="w-full bg-transparent text-gray-100 outline-none placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <FaTimes
              className="text-gray-400 cursor-pointer hover:text-gray-200 transition-colors duration-200"
              onClick={clearSearch}
            />
          )}
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-teal-600 rounded-full animate-bounce delay-100"></div>
          <div className="w-4 h-4 bg-pink-600 rounded-full animate-bounce delay-200"></div>
        </div>
      )}

      {/* Notes Display */}
      <div className="w-full max-w-6xl">
        {Object.keys(groupedNotes).map((category) => (
          <div key={category} className="mb-8">
            {/* Category Header */}
            <div
              className={`p-4 text-white text-lg font-bold ${
                categoryColors[category] || "bg-gray-500"
              } rounded-t-lg shadow-md`}
            >
              {category}
            </div>
            <div className="bg-gray-800 p-6 rounded-b-lg shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedNotes[category].map((note) => (
                  <div
                    key={note._id}
                    className="flex flex-col rounded-lg bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* File Name */}
                      <h3 className="text-lg font-semibold text-white mb-2 truncate">{note.fileName}</h3>

                      {/* Description */}
                      <p className="text-sm text-gray-300 flex-grow mb-4">{note.fileDescription}</p>

                      {/* Upload Info */}
                      <div className="mt-auto flex justify-between items-center text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-400" />
                          <span>{note.uploadedBy?.userName || note.uploadedBy?.userId || "Unknown"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" />
                          <span>{formatDate(note.uploadDate)}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Note Button */}
                    <button
                      onClick={() => showPDF(note.files)}
                      className="w-full bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition-all duration-200"
                    >
                      View Note
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
