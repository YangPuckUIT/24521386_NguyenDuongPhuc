const Profile = require("../models/Profile");

const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const { name, age, bio, imageUrl, interests } = req.body || {};

    if (!name || !age || !imageUrl) {
      return res.status(400).json({
        message: "Name, age and imageUrl are required",
      });
    }

    const profile = await Profile.create({
      name,
      age,
      bio,
      imageUrl,
      interests,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProfiles,
  getProfileById,
  createProfile,
};
