
const express = require("express");
const { CHANNELS, messages } = require("../data/messages");

const router = express.Router();

let nextMessageId = 5;

router.param("channel", (req, res, next, channel) => {
  if (!CHANNELS.includes(channel)) {
    return res.status(404).json({
      error: "CHANNEL_NOT_FOUND",
      message: `Unknown channel: ${channel}`,
    });
  }

  next();
});

router.get("/:channel", (req, res) => {
  const { channel } = req.params;

  res.json({
    channel,
    messages: messages[channel],
  });
});

router.post("/:channel", (req, res) => {
  const { channel } = req.params;
  const { author, content } = req.body ?? {};

  if (
    typeof author !== "string" ||
    typeof content !== "string" ||
    author.trim().length < 2 ||
    author.trim().length > 40 ||
    content.trim().length < 1 ||
    content.trim().length > 500
  ) {
    return res.status(400).json({
      error: "INVALID_MESSAGE",
      message:
        "Author must be 2-40 characters and content must be 1-500 characters.",
    });
  }

  const newMessage = {
    id: nextMessageId++,
    author: author.trim(),
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };

  messages[channel].push(newMessage);

  return res.status(201).json({
    channel,
    message: newMessage,
  });
});

module.exports = router;
