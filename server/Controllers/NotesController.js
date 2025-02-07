// const express = require("express");
// const dotenv = require("dotenv");
// const Notes = require("../Models/Notes");
// const multer = require("multer");
// const path = require("path");

// dotenv.config();

// const storage = multer.memoryStorage();
// var upload = multer({ storage: storage });

// const uploadNote = async (req, res) => {
//     try {
//         const fileName = req.body.title;
//         const fileDescription = req.body.description;
//         const category = req.body.category;
//         const file = req.file.filename;

//         const uploadedBy = req.body.userId;
//         console.log(uploadedBy);

//         const newFile = new Notes({
//             fileName: fileName,
//             fileDescription: fileDescription,
//             category: category,
//             files: file,
//             uploadedBy: uploadedBy
//         });

//         await newFile.save();
//         res.send({ status: "Ok" });

//     } catch (error) {
//         res.status(400).json({ error: error.message });
//         console.log(error);
//     }
// };

// const getNote = async (req, res) => {
//     try {
//         const { title, category } = req.query;
//         const query = {};

//         if (title) {
//             query.fileName = {
//                 $regex: title,
//                 $options: "i"
//             };
//         };

//         if (category) {
//             query.category = {
//                 $regex: category,
//                 $options: "i"
//             };
//         };

//         const data = await Notes.find(query);
//         res.send({ data: data });

//     } catch (error) {
//         console.log(error);
//     }
// };

// const getNoteByID = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         console.log(userId);

//         await Notes.find({
//             uploadedBy: userId
//         }).then(data => {
//             res.send({ data: data });
//         })
//     } catch (error) {
//         console.log(error);
//     }
// };

// module.exports = { uploadNote, getNote, getNoteByID };



const express = require("express");
const dotenv = require("dotenv");
const Notes = require("../Models/Notes");
const User = require("../Models/User"); // Import User Model
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();

// Ensure the 'uploads' folder exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
});

const upload = multer({ storage: storage });

// Upload Note API
const uploadNote = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "File is required" });
        }

        const { title, description, category, userId } = req.body;

        // Check if all required fields are present
        if (!title || !description || !category || !userId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Fetch user details
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create a new note entry
        const newFile = new Notes({
            fileName: title,
            fileDescription: description,
            category: category,
            files: req.file.filename, // Stored filename
            uploadedBy: { userId: user._id, userName: user.userName }, // Store userId and userName
            uploadDate: new Date(), // Store upload date
        });

        await newFile.save();
        res.json({ status: "Success", message: "File uploaded successfully!" });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get Notes with Filtering
const getNote = async (req, res) => {
    try {
        const { title, category } = req.query;
        const query = {};

        if (title) {
            query.fileName = { $regex: title, $options: "i" };
        }
        if (category) {
            query.category = { $regex: category, $options: "i" };
        }

        const data = await Notes.find(query);
        res.json({ data });

    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get Notes by User ID
const getNoteByID = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await Notes.find({ "uploadedBy.userId": userId });

        if (!data.length) {
            return res.status(404).json({ message: "No notes found for this user" });
        }

        res.json({ data });

    } catch (error) {
        console.error("Error fetching user's notes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { uploadNote, getNote, getNoteByID };
