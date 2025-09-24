let express = require("express");

let router = express.Router();
let User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//secret token
const secreteKey = "$3i949052sdjlfjloi54654/&$%^##";

// <-----------------Sign in----------------------->
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ status: false, message: "All fildes are reqired" });

    //pahele is email se koi register he to false ho jayega
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ status: false, message: "Email already register.." });

    //bcrypt the password
    const hashPassword = await bcrypt.hash(password, 10);

    //ager existingUser nahi he to new reacord genreted hoga
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    return res
      .status(201)
      .json({ status: true, message: "Register successful" });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});

// <--------------------Login---------------------->

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ status: false, message: "All fildes are reqired" });

    const user = await User.findOne({ email });

    //if wrong user or password (password jo req se ayega or jo req user se milega o compair karenga)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credential" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, secreteKey, {
      expiresIn: "1hr",
    });

    return res
      .status(201)
      .json({ status: true, message: "Login successful", token: token });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});

// <--------------------Profile---------------------->

router.post("/profile", async (req, res) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];
    if (!token)
      return res.status(400).json({ status: false, message: "Access Denied" });

    jwt.verify(token, secreteKey, async (err, decode) => {
      const user = await User.findById(decode?.id);

      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "Invalid Token" });
      const userData = {
        id: user?.id,
        email: user?.email,
        name: user?.name,
      };
      return res
        .status(201)
        .json({ status: true, message: "Profile data", data: userData });
    });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});

module.exports = router;
