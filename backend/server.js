import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import colors from "colors";
import path from "path";

dotenv.config();
connectDB();
const app = express();

app.use("/api/notes", notesRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () =>
  console.log(`Server running in ${NODE_ENV} environment on port ${PORT}`.green)
);
