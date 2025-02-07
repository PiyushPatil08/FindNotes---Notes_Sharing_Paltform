const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileDescription: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    files: {
        type: String,
        required: true,
    },
    uploadedBy: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        userName: {
            type: String,
            required: true,
        }
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Notes", NoteSchema);
