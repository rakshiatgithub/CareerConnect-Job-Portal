
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Register user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password ||
        !["candidate", "recruiter"].includes(role)) {
      return res.status(400).send("Please provide valid details.");
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingUser) {
      return res.status(409).send("Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed.");
  }
});

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid email or password.");
    }

    req.session.user = {
      id: user._id.toString(),
      name: user.name,
      role: user.role
    };

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Login failed.");
  }
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
