const express = require("express");
const mongoose = require("mongoose");
const app = express();

const db_uri =
  "mongodb+srv://icthubdev:ICTHUBDEV001@icthubdev001.lihstfk.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
  try {
    await mongoose.connect(db_uri);
    console.log("db connected");
  } catch (error) {
    console.error(error);
  }
};
connect();

app.get("/", (req, res) => {
  res.send("hello node api");
});

app.listen(8000, () => {
  console.log("Servers started and listening at port 80000");
});
