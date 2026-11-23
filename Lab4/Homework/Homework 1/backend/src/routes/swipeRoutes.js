const express = require("express");
const router = express.Router();

const {
  createSwipe,
  getSwipes,
  undoSwipe,
} = require("../controllers/swipeController");

router.post("/", createSwipe);
router.get("/", getSwipes);
router.delete("/undo", undoSwipe);

module.exports = router;
