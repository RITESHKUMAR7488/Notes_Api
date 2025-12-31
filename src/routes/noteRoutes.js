const express = require("express");
const { getNotes, createNotes, deleteNotes, updateNotes } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload"); // Import the middleware we just made

const noteRouter = express.Router();

// Get all notes
noteRouter.get("/", auth, getNotes);

// Create a note + Upload Image
// "image" is the key name you must use in your frontend form-data
noteRouter.post("/", auth, upload.single("image"), createNotes);

// Delete note
noteRouter.delete("/:id", auth, deleteNotes);

// Update note + Update Image (Optional)
noteRouter.put("/:id", auth, upload.single("image"), updateNotes);

module.exports = noteRouter;