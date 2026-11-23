const mongoose = require("mongoose");

const swipeSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    action: {
      type: String,
      enum: ["like", "reject", "superlike"],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Swipe", swipeSchema);
