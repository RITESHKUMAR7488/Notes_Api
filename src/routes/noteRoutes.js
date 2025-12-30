const express = require("express");
const { getNotes, createNotes, deleteNotes, updateNotes } = require("../controllers/noteController");
const auth = require("../middlewares/auth");

const noteRouter = express.Router();

// Get all notes (Protected by auth)
noteRouter.get("/", auth, getNotes);

// Create a note (Protected by auth)
noteRouter.post("/", auth, createNotes);

// Optional: Add these if you want to implement delete/update later
 noteRouter.delete("/:id", auth, deleteNotes);
 noteRouter.put("/:id", auth, updateNotes);

module.exports = noteRouter;