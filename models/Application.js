
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected", "Selected"],
      default: "Applied"
    }
  },
  { timestamps: true }
);

applicationSchema.index(
  { job: 1, candidate: 1 },
  { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);
