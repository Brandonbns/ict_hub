const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./src/models/userModel");

const app = express();
app.use(express.json());

const db_uri =
  "mongodb+srv://admin:Q2tDwAcXN5YjW_Y@icthubwithbrandon.ddiadj0.mongodb.net/?retryWrites=true&w=majority&appName=icthubwithbrandon";

mongoose.set("strictQuery", false);
mongoose
  .connect(db_uri, { dbName: "icthub" })
  .then(() => {
    app.listen(8000, () => {
      console.log("Servers started and listening at port 8000");
    });
    console.log("db connected");
  })
  .catch((error) => {
    console.error(error);
  });

app.post("/user/signup", async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const user = await User.find({ userName: userName });
    const isEmail = await User.find({ email: email });
    if (user.length) {
      res.status(400).send("Username already exists");
    } else if (isEmail.length) {
      res.status(400).send("Email already exists");
    } else {
      let data = req.body;
      if (data.password) {
        bcrypt.hash(data.password, 10, async (err, hash) => {
          if (err) throw err;
          if (hash) {
            data.password = hash;
            console.log(data);
            const user = await User.create(data);
            res.status(200).json(user);
          }
        });
      } else {
        res.status(400).send("Password is required");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, data: req.body });
  }
});

app.post("/user/login", async (req, res) => {
  try {
    console.log(req.body);
    const { userName, password } = req.body;
    const user = await User.find({ userName: userName });
    if (user.length === 0) {
      res.status(401).send("User not found");
    } else if (
      user[0].userName === userName &&
      (await validatePassword(password, user[0].password))
    ) {
      res.status(200).json(user[0]);
    } else {
      res.status(401).send("Username or password provided is wrong");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, data: req.body });
  }
});

// validate password match
function validatePassword(password, hash) {
  return new Promise((resolve, rejeect) => {
    bcrypt
      .compare(password, hash)
      .then((res) => {
        if (res) {
          return resolve(true);
        } else {
          return resolve(false);
        }
        // console.log(password, hash);
        // console.log(res, "ress");
        // return res; // return true
      })
      .catch((err) => console.error(err.message));
  });
}

app.post("/user", (req, res) => {
  console.log(req.body);
  res.send("recieved");
});
