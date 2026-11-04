import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://blood-donation-app-frontend-cny724man-nimas-projects-d027bc7f.vercel.app",
  "http://localhost:5173",
].filter(Boolean);


app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(null, true); // Prevent unhandled preflight crashes
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.send("LifeLink API Server Running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/admin", adminRoutes);


if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;