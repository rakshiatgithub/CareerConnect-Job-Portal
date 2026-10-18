
const express = require("express");
const mongoose = require("mongoose");
const Application = require("../models/Application");
const Job = require("../models/Job");
const { isLoggedIn, isRecruiter } = require("../middleware/auth");

const router = express.Router();

// Allow only candidates
function isCandidate(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  if (req.session.user.role !== "candidate") {
    return res.status(403).send("Access denied. Candidates only.");
  }

  next();
}

// Apply for a job
router.post("/jobs/:jobId/apply", isLoggedIn, isCandidate, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.jobId)) {
      return res.status(400).send("Invalid job ID.");
    }

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).send("Job not found.");
    }

    await Application.create({
      job: job._id,
      candidate: req.session.user.id
    });

    res.redirect("/my-applications");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send("You have already applied for this job.");
    }

    console.error(error);
    res.status(500).send("Unable to submit application.");
  }
});

// View candidate's applications
router.get("/my-applications", isLoggedIn, isCandidate, async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.session.user.id
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.render("my-applications", { applications });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load your applications.");
  }
});

// Recruiter views applicants for their own jobs
router.get("/recruiter/applications", isLoggedIn, isRecruiter, async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiter: req.session.user.id
    }).select("_id");

    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({
      job: { $in: jobIds }
    })
      .populate("job", "title company")
      .populate("candidate", "name email")
      .sort({ createdAt: -1 });

    res.render("recruiter-applications", { applications });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load applicants.");
  }
});

// Recruiter updates an application status
router.post(
  "/applications/:id/status",
  isLoggedIn,
  isRecruiter,
  async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid application ID.");
      }

      const allowedStatuses = [
        "Applied",
        "Shortlisted",
        "Rejected",
        "Selected"
      ];

      const { status } = req.body;

      if (!allowedStatuses.includes(status)) {
        return res.status(400).send("Invalid application status.");
      }

      const application = await Application.findById(req.params.id)
        .populate("job");

      if (
        !application ||
        !application.job ||
        application.job.recruiter.toString() !== req.session.user.id
      ) {
        return res.status(404).send("Application not found or access denied.");
      }

      application.status = status;
      await application.save();

      res.redirect("/recruiter/applications");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to update application status.");
    }
  }
);

module.exports = router;
