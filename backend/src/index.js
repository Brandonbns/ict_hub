const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const functions = require("firebase-functions");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

console.log(process.env.DB_URI);

connectDB(app);

app.use("/user", userRoutes);

exports.app = functions.https.onRequest(app);
