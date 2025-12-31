const noteModel = require("../models/note");

const createNotes = async (req, res) => {
    const { title, description } = req.body;

    // Check if a file was uploaded
    let imageUrl = null;
    if (req.file && req.file.path) {
        imageUrl = req.file.path; // Cloudinary returns the URL in .path
    }

    const newNote = new noteModel({
        title: title,
        description: description,
        imageUrl: imageUrl, // Add this to your MongoDB model schema
        userId: req.userId
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}

const updateNotes = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    const newNote = {
        title: title,
        description: description,
        userId: req.userId
    };

    // If user uploaded a new image, update the imageUrl
    if (req.file && req.file.path) {
        newNote.imageUrl = req.file.path;
    }

    try {
        const updatedNote = await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}

const deleteNotes = async (req, res) => {
    const id = req.params.id;
    try {
        const note = await noteModel.findByIdAndDelete(id);
        // Note: Ideally, you should also delete the image from Cloudinary here
        res.status(202).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}

const getNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({ userId: req.userId });
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}

module.exports = {
    createNotes,
    updateNotes,
    deleteNotes,
    getNotes
}