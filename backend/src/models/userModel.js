const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    uId: {
      type: String,
      required: false,
    },
    fName: {
      type: String,
      required: [true, "Fisrt name is required"],
    },
    lName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    userName: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    cNo: {
      type: String,
      required: [true, "Contact number is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    isAdmin: {
      type: Boolean,
    },
    school: {
      type: String,
    },
    isAlevel: {
      type: Boolean,
    },
    isOlevel: {
      type: Boolean,
    },
    examYear: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
