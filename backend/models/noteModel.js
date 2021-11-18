import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamp: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
