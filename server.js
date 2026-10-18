
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "careerconnect-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60
    }
  })
);

// EJS configuration
app.set("view engine", "ejs");

// Routes
app.use("/", authRoutes);
app.use("/", jobRoutes);
app.use("/", applicationRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to CareerConnect!");
});

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/careerconnect")
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`CareerConnect running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
