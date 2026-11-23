const mongoose = require("mongoose");
const Profile = require("../models/Profile");
const Swipe = require("../models/Swipe");

const createSwipe = async (req, res) => {
  try {
    const { profileId, action } = req.body;

    if (!mongoose.isValidObjectId(profileId)) {
      return res.status(400).json({ message: "Invalid profile ID" });
    }

    if (!["like", "reject", "superlike"].includes(action)) {
      return res.status(400).json({ message: "Invalid swipe action" });
    }

    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const swipe = await Swipe.create({
      profile: profileId,
      action,
    });

    res.status(201).json(swipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSwipes = async (req, res) => {
  try {
    const swipes = await Swipe.find()
      .populate("profile")
      .sort({ createdAt: -1 });

    res.json(swipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const undoSwipe = async (req, res) => {
  try {
    const latestSwipe = await Swipe.findOne().sort({ createdAt: -1 });

    if (!latestSwipe) {
      return res.status(404).json({ message: "No swipe to undo" });
    }

    await latestSwipe.deleteOne();

    res.json({
      message: "Swipe undone successfully",
      swipe: latestSwipe,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSwipe, getSwipes, undoSwipe };
