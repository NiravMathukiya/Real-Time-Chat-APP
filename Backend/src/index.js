import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import messageRoutes from "./routes/message.route.js"; // Fixed typo
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve Static Files in Production
if (process.env.NODE_ENV === "production") {
  console.log("Serving static files from:", path.join(__dirname, "../frontend/dist"));
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start the Server
server.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err.message}`);
    process.exit(1);
  }
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);

  connectDB()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
      console.error("Database connection failed:", err.message);
      process.exit(1);
    });
});
