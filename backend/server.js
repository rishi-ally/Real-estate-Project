const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const fs = require("fs");
const path = require("path");
const userRouter = require("./routers/user");
const linking = require("./linked");
require("dotenv").config();

const app = express();

// Log environment variables
console.log("Environment Variables:");
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded ✅" : "Missing ❌");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded ✅" : "Missing ❌");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("NODE_ENV:", process.env.NODE_ENV);

// Ensure the upload path exists
const uploadPath = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Serve static files from public folder (for uploads, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5173"], // Update with production URL when deployed
    credentials: true,
  })
);

// Session Middleware with MongoDB Store
app.use(
  session({
    secret: process.env.JWT_SECRET || "fallback-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/realestate",
      dbName: process.env.DB_NAME || "realestate",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// API Routing (your backend endpoints)
app.use("/api", userRouter);

// ================================================
// Serve static files from React frontend app
// (Assuming the build output is in ../client/build; if you used Vite and it's in "dist", change accordingly)

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/realestate";

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI, { dbName: process.env.DB_NAME || "realestate" })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
    linking();
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });
