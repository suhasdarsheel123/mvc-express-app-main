import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://admin:Cherry1234@cluster0.s735bf2.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(express.json());

// Establishing connection with mongodb
connectDB(MONGO_URI);

app.use(async (req, res, next) => {
  await connectDB(MONGO_URI);
  next();
});

// Root test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "MVC Express Movie API is running" });
});

app.use("/api/v1/movies", movieRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
