const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notes.controller");
const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const { body } = require("express-validator");

// -------------------------
// Validation rules
// -------------------------
const noteValidation = [
  body("title").notEmpty().withMessage("Title is required"),
];

// -------------------------
// Protected Routes
// -------------------------
router.get("/", auth, notesController.getAllNotes);

router.post("/", auth, noteValidation, validate, notesController.createNote);

router.put("/:id", auth, notesController.updateNote);

router.delete("/:id", auth, notesController.deleteNote);

module.exports = router;
