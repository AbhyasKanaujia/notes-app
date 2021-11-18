import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import colors from "colors";

dotenv.config();
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () =>
  console.log(`Server running in ${NODE_ENV} environment on port ${PORT}`.green)
);
