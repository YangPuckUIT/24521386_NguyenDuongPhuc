import dotenv from "dotenv";
import mongoose from "mongoose";
import Profile from "./models/Profile.js";

dotenv.config();

const profiles = [
  { name: "Minh Anh", age: 23, bio: "Coffee and sunsets." },
  { name: "Thu Hà", age: 22, bio: "Music lover and traveler." },
  { name: "Ngọc", age: 20, bio: "Looking for good conversations." },
  {
    name: "Huỳnh Ngọc Yến Vy",
    age: 21,
    bio: "Extrovert always be positive like sunshine.",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Profile.deleteMany({});
    await Profile.insertMany(profiles);

    console.log("Seed completed successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
