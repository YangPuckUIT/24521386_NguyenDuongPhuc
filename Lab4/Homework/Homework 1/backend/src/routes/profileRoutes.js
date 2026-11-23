const express = require("express");
const router = express.Router();

const {
  getProfiles,
  getProfileById,
  createProfile,
} = require("../controllers/profileController");

router.get("/", getProfiles);
router.get("/:id", getProfileById);
router.post("/", createProfile);

module.exports = router;
