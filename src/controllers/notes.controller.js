// src/controllers/notes.controller.js
const fs = require("fs");
const path = require("path");

// Path to notes JSON file
const notesFile = path.join(__dirname, "../../data/notes.json");

// ---------- Utility to load notes ----------
function loadNotes() {
    try {
        if (!fs.existsSync(notesFile)) return [];
        const data = fs.readFileSync(notesFile, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error loading notes:", err);
        return [];
    }
}

// ---------- Utility to save notes ----------
function saveNotes(notes) {
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}

// -------------------------------------------
// GET ALL NOTES
// -------------------------------------------
exports.getAllNotes = (req, res) => {
    const notes = loadNotes();

    return res.status(200).json({
        success: true,
        notes: notes, // FRONTEND EXPECTS: data.notes
    });
};

// -------------------------------------------
// CREATE A NOTE
// -------------------------------------------
exports.createNote = (req, res) => {
    const { title, content } = req.body;

    const notes = loadNotes();

    const newNote = {
        id: Date.now().toString(),
        title,
        content: content || "",
    };

    notes.push(newNote);
    saveNotes(notes);

    return res.status(201).json({
        success: true,
        message: "Note added successfully",
        note: newNote, // FRONTEND EXPECTS: data.note
    });
};

// -------------------------------------------
// UPDATE A NOTE
// -------------------------------------------
exports.updateNote = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    let notes = loadNotes();
    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Note not found" });
    }

    notes[index] = {
        ...notes[index],
        title: title || notes[index].title,
        content: content || notes[index].content,
    };

    saveNotes(notes);

    return res.json({
        success: true,
        message: "Note updated successfully",
        note: notes[index],
    });
};

// -------------------------------------------
// DELETE A NOTE
// -------------------------------------------
exports.deleteNote = (req, res) => {
    const { id } = req.params;

    let notes = loadNotes();
    const newNotes = notes.filter((n) => n.id !== id);

    if (newNotes.length === notes.length) {
        return res.status(404).json({ success: false, message: "Note not found" });
    }

    saveNotes(newNotes);

    return res.json({
        success: true,
        message: "Note deleted successfully",
    });
};
