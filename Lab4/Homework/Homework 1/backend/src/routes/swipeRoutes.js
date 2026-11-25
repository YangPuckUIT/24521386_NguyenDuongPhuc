const express = require("express");
const router = express.Router();

const {
  createSwipe,
  getSwipes,
  undoSwipe,
  resetSwipes,
} = require("../controllers/swipeController");

router.post("/", createSwipe);
router.get("/", getSwipes);
router.delete("/undo", undoSwipe);
router.delete("/", resetSwipes);

module.exports = router;
