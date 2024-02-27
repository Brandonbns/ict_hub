const axios = require("axios");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const FormData = require("form-data");

module.exports = {
  signup: async (req, res) => {
    console.log(req.body, "req");
    try {
      const { userName, password, email } = req.body;
      const user = await User.find({ userName: userName });
      const isEmail = await User.find({ email: email });
      if (user.length) {
        console.log("username error");
        res.status(400).json({ message: "Username already exists" });
      } else if (isEmail.length) {
        console.log("email error");
        res.status(400).json({ message: "Email already exists" });
      } else {
        let data = req.body;
        if (data.password) {
          // hash the password
          bcrypt.hash(data.password, 10, async (err, hash) => {
            if (err) throw err;
            if (hash) {
              try {
                // create moodle user account
                const moodleUser = await createMoodleUser(data);
                data.password = hash;
                if (moodleUser.length > 0) {
                  data.uId = moodleUser[0]["id"];
                  const user = await User.create(data);
                  res
                    .status(201)
                    .json({ user, message: "User Created successfully!" });
                } else {
                  console.log(moodleUser, "moodle user details");
                  throw moodleUser.message;
                }
              } catch (error) {
                res.status(500).json({ message: error, data: req.body });
              }
            }
          });
        } else {
          res.status(400).json({ message: "Please complete the signup form" });
        }
      }
    } catch (error) {
      console.log(error, "error happened");
      res.status(500).json({ message: error.message, data: req.body });
    }
  },

  login: async (req, res) => {
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
  },
};

// validate password match
const validatePassword = (password, hash) => {
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
};

const createMoodleUser = async (data) => {
  const formData = new FormData();
  await formData.append("moodlewsrestformat", "json");
  await formData.append("wstoken", "9fe7ca1d779bed50a1ed8983ec06b359");
  await formData.append("wsfunction", "core_user_create_users");
  await formData.append("users[0][username]", data.userName);
  await formData.append("users[0][password]", data.password);
  await formData.append("users[0][firstname]", data.fName);
  await formData.append("users[0][lastname]", data.lName);
  await formData.append("users[0][email]", data.email);

  return axios
    .post(
      "https://icthubwithbrandon.gnomio.com/webservice/rest/server.php",
      formData,
      { headers: formData.getHeaders() }
    )
    .then((result) => {
      console.log(result.data, "result");
      return result.data;
    })
    .catch((err) => {
      console.log(err, "moodle error");
      return err;
    });
};
