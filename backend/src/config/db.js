const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = (app) => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URI, { dbName: "icthub" })
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log("Servers started and listening at port", process.env.PORT);
      });
      console.log("db connected");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = connectDB;
