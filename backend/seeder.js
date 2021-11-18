import dotenv from "dotenv";
import colors from "colors";

import notes from "./data/notes.js";
import Note from "./models/noteModel.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Note.deleteMany();
    await Note.insertMany(notes);
    console.log(`Data imported`.green);
    process.exit(0);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Note.deleteMany();
    console.log(`Data destroyed`.yellow);
    process.exit(0);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
