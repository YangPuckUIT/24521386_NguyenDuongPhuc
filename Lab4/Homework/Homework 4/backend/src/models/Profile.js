import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bio: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
});

export default mongoose.model("Profile", profileSchema);
