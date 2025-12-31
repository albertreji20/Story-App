import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import storyRoutes from "./routes/storyRoutes.js";

dotenv.config();

// 1️⃣ Create app FIRST
const app = express();

// 2️⃣ Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// 3️⃣ Connect to database
connectDB();

// 4️⃣ Routes (AFTER app is created)
app.use("/api/stories", storyRoutes);

// 5️⃣ Test route
app.get("/", (req, res) => {
  res.json({ message: "📚 Story backend running" });
});

// 6️⃣ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
