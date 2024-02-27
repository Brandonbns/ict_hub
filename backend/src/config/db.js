const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = (app) => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URI, { dbName: "icthub" })
    .then(() => {
      app.listen(8000, () => {
        console.log("Servers started and listening at port 8000");
      });
      console.log("db connected");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = connectDB;
