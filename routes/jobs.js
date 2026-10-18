
const express = require("express");
const mongoose = require("mongoose");
const Job = require("../models/Job");
const { isLoggedIn, isRecruiter } = require("../middleware/auth");

const router = express.Router();

// View all jobs
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("recruiter", "name")
      .sort({ createdAt: -1 });

    res.render("jobs", {
      jobs,
      user: req.session.user || null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load jobs.");
  }
});

// Show job creation form
router.get("/jobs/new", isRecruiter, (req, res) => {
  res.render("new-job");
});

// Create a job
router.post("/jobs", isRecruiter, async (req, res) => {
  try {
    const { title, company, location, description, salary } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).send("Please fill in all required fields.");
    }

    await Job.create({
      title,
      company,
      location,
      description,
      salary: salary || "Not specified",
      recruiter: req.session.user.id
    });

    res.redirect("/jobs");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to create job.");
  }
});

// Show edit job form
router.get("/jobs/:id/edit", isRecruiter, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid job ID.");
    }

    const job = await Job.findOne({
      _id: req.params.id,
      recruiter: req.session.user.id
    });

    if (!job) {
      return res.status(404).send("Job not found or access denied.");
    }

    res.render("edit-job", { job });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load job.");
  }
});

// Update job
router.post("/jobs/:id/edit", isRecruiter, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid job ID.");
    }

    const { title, company, location, description, salary } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).send("Please fill in all required fields.");
    }

    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        recruiter: req.session.user.id
      },
      {
        title,
        company,
        location,
        description,
        salary: salary || "Not specified"
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!job) {
      return res.status(404).send("Job not found or access denied.");
    }

    res.redirect("/jobs");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to update job.");
  }
});

// Delete job
router.post("/jobs/:id/delete", isRecruiter, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid job ID.");
    }

    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      recruiter: req.session.user.id
    });

    if (!job) {
      return res.status(404).send("Job not found or access denied.");
    }

    res.redirect("/jobs");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to delete job.");
  }
});

module.exports = router;
