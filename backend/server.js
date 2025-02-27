const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/user");
require("dotenv").config();
const linking = require("./linked");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const fs=require('fs')
const app = express();
const path = require('path');
const uploadPath = path.join(__dirname, 'public', 'uploads');


if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(
  session({
    secret:
      process.env.JWT_SECRET ||
      "fa3693916f03d17488815d746cefc1c17736cff40be132bec64df47446288448",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.mongoURI || "mongodb://localhost:27017/realestate",
    }),

    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, 
      httpOnly: true, 
      secure: false, 
    },
  })
);
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.mongoURI || "mongodb://localhost:27017/realestate";
app.use("/api", userRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI, {})
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
