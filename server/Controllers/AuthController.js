const express = require("express");
const dotenv = require("dotenv");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary");

dotenv.config();

const router = express.Router();

const storage = multer.memoryStorage();
var upload = multer({
    storage: storage
});

//Signup Route
const signup = async (req, res) => {
    try {
        const { firstName, lastName, userBio, userEmail, userMobile, userName, userPassword } = req.body;

        // If user already exists, send response and stop execution
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(401).json({ error: "User Already Exists with this email" }); // ✅ Add `return`
        }

        // Check if file is provided
        if (!req.file) {
            return res.status(400).json({ error: "No Profile Image Provided" }); // ✅ Add `return`
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(userPassword, salt);
        console.log("Request Body: ", req.body);

        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: encryptedPassword,
            profileImage: result.secure_url
        });

        await newUser.save();

        return res.status(201).json({  // ✅ Use status 201 for successful creation
            status: "Ok",
            user: newUser
        });

    } catch (error) {
        console.error("Signup Error:", error);

        // ✅ Ensure response is only sent if headers are not already sent
        if (!res.headersSent) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};


const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        // console.log(userEmail);

        const user = await User.findOne({ userEmail });

        if (user) {
            const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
            if (passwordMatch) {
                return res.json(user);
            } else {
                return res.json({ status: "Error", getUser: false })
            }
        } else {
            return res.json({ status: "Error", getUser: false });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { signup, login };