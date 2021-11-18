import express from "express";
import mongoose from "mongoose";
import Note from "../models/noteModel.js";
import asyncHandler from "express-async-handler";
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const notes = await Note.find({});
    res.json(notes);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note) res.json(note);
    else
      res
        .status(404)
        .json({ message: `Note with id ${req.params.id} not found` });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newNote = new Note(req.body);
    newNote.save((err) => {
      if (err) res.status(500).json({ message: error.message });
      res.json(newNote);
    });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, note) => {
        if (err) res.status(500).json({ message: err.message });
        res.json(note);
      }
    );
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    Note.findByIdAndDelete(req.params.id, (err, note) => {
      if (err) res.status(500).json({ message: error.message });
      const response = {
        message: `Note with id ${note._id} successfully deleted`,
        id: note._id,
      };
      res.json(response);
    });
  })
);

export default router;
