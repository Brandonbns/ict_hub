const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userControllers = require("../controllers/userControllers");

router.post("/", (req, res) => {
  res.send("user route");
});

router.post("/signup", userControllers.signup);

router.post("/login", userControllers.login);

module.exports = router;
