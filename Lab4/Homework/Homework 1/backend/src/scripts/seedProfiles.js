const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const Profile = require("../models/Profile");

const profiles = [
  {
    name: "Linh Chi",
    age: 21,
    bio: "Love photography, cozy cafes and weekend trips.",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    interests: ["Photography", "Reading", "Travel"],
  },
  {
    name: "Minh Khang",
    age: 23,
    bio: "A developer who enjoys music and good coffee.",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    interests: ["Coffee", "Music", "Gaming"],
  },
  {
    name: "Thu Ha",
    age: 22,
    bio: "I enjoy cooking and discovering new restaurants.",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    interests: ["Cooking", "Movies", "Food"],
  },
  {
    name: "Gia Bao",
    age: 24,
    bio: "Gym in the morning, movies at night.",
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    interests: ["Fitness", "Movies", "Travel"],
  },
  {
    name: "Ngoc Anh",
    age: 20,
    bio: "Introvert who loves books and quiet places.",
    imageUrl: "https://randomuser.me/api/portraits/women/22.jpg",
    interests: ["Books", "Art", "Coffee"],
  },
  {
    name: "Quang Huy",
    age: 25,
    bio: "Always looking for a new adventure.",
    imageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    interests: ["Hiking", "Photography", "Music"],
  },
  {
    name: "Bao Tram",
    age: 22,
    bio: "A big fan of cats, desserts and cute things.",
    imageUrl: "https://randomuser.me/api/portraits/women/33.jpg",
    interests: ["Cats", "Baking", "Shopping"],
  },
  {
    name: "Duc Anh",
    age: 23,
    bio: "Football, technology and late-night conversations.",
    imageUrl: "https://randomuser.me/api/portraits/men/18.jpg",
    interests: ["Football", "Technology", "Gaming"],
  },
  {
    name: "Phuong Nhi",
    age: 21,
    bio: "Enjoys sunsets and exploring new places.",
    imageUrl: "https://randomuser.me/api/portraits/women/56.jpg",
    interests: ["Travel", "Music", "Fashion"],
  },
  {
    name: "Tuan Kiet",
    age: 24,
    bio: "Food lover. Can recommend good places to eat.",
    imageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    interests: ["Food", "Cooking", "Movies"],
  },
  {
    name: "My Linh",
    age: 23,
    bio: "I spend too much time listening to music.",
    imageUrl: "https://randomuser.me/api/portraits/women/75.jpg",
    interests: ["Singing", "Music", "Reading"],
  },
  {
    name: "Hoang Nam",
    age: 22,
    bio: "Casual gamer and weekend badminton player.",
    imageUrl: "https://randomuser.me/api/portraits/men/76.jpg",
    interests: ["Gaming", "Badminton", "Movies"],
  },
  {
    name: "Thanh Thao",
    age: 25,
    bio: "Creative soul who loves painting and traveling.",
    imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    interests: ["Painting", "Travel", "Art"],
  },
  {
    name: "Anh Tuan",
    age: 21,
    bio: "Coffee enthusiast and aspiring entrepreneur.",
    imageUrl: "https://randomuser.me/api/portraits/men/29.jpg",
    interests: ["Business", "Coffee", "Fitness"],
  },
  {
    name: "Kim Ngan",
    age: 24,
    bio: "Looking for someone to share good food and stories.",
    imageUrl: "https://randomuser.me/api/portraits/women/90.jpg",
    interests: ["Food", "Travel", "Photography"],
  },
];

async function seedProfiles() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully.");

    const names = profiles.map((profile) => profile.name);

    const existingNames = await Profile.distinct("name", {
      name: { $in: names },
    });

    const newProfiles = profiles.filter(
      (profile) => !existingNames.includes(profile.name),
    );

    if (newProfiles.length === 0) {
      console.log("All seed profiles already exist. Nothing to insert.");
      return;
    }

    await Profile.insertMany(newProfiles);

    console.log(`Successfully added ${newProfiles.length} profiles.`);
    console.log(`Skipped ${existingNames.length} existing profiles.`);
  } catch (error) {
    console.error("Failed to seed profiles:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedProfiles();
