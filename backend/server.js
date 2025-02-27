const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/user");
require("dotenv").config();
const linking = require("./linked");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const fs = require('fs');
const app = express();
const path = require('path');

// Ensure the upload path exists
const uploadPath = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

app.use(express.static(path.join(__dirname, 'public')));

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
    secret: process.env.JWT_SECRET || "fallback-secret-key", // Make sure to set JWT_SECRET in your env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/realestate", // Use dynamic URI or local fallback
      dbName: process.env.DB_NAME || "realestate", // Dynamic DB name from env
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Make sure cookies are secure in production
    },
  })
);

// Routing
app.use("/api", userRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/realestate";

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI, { dbName: process.env.DB_NAME || "realestate" }) // Dynamic DB name from env
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
