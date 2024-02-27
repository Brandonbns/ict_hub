const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();
app.use(cors());
app.use(express.json());

console.log(process.env.DB_URI);

connectDB(app);

const userRoutes = require("./src/routes/userRoutes");
app.use("/user", userRoutes);

// app.post("/user", (req, res) => {
//   console.log(req.body);
//   res.send("recieved");
// });
