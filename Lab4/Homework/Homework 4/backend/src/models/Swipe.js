import mongoose from "mongoose";

const swipeSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    type: {
      type: String,
      enum: ["LIKE", "PASS", "SUPERLIKE"],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Swipe", swipeSchema);
