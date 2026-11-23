const express = require("express");
const router = express.Router();

const {
  getProfiles,
  getProfileById,
} = require("../controllers/profileController");

router.get("/", getProfiles);
router.get("/:id", getProfileById);

module.exports = router;
