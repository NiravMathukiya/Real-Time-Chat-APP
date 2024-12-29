// const express = require("express");
import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import cors from "cors"

import meesageRoues from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";


dotenv.config()
const app = express();
const PORT = process.env.PORT
app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies
  }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/message", meesageRoues)

app.listen(PORT , ()=>{
    console.log("Server is running on port"+ PORT);
    connectDB();
});