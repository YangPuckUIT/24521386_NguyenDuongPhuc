const express = require("express");
const cors = require("cors");
const crypto = require("node:crypto");
const { rateLimit } = require("express-rate-limit");

const { getMessagesByForum, addMessage } = require("./data/messages");

const app = express();
const PORT = process.env.PORT || 5000;

const VALID_FORUMS = ["himass", "tanvuu"];
const MAX_MESSAGE_LENGTH = 1000;
const MAX_AUTHOR_LENGTH = 40;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json({ limit: "10kb" }));

// Rate limit: 5 message submissions per minute per IP.
const messageLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many messages. Please try again later.",
  },
});

// Validate forum ID.
app.param("forum", (req, res, next, forumId) => {
  if (!VALID_FORUMS.includes(forumId)) {
    return res.status(404).json({
      error: "Forum not found.",
    });
  }

  next();
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// GET messages by forum.
app.get("/api/messages/:forum", async (req, res) => {
  try {
    const messages = await getMessagesByForum(req.params.forum);
    return res.json(messages);
  } catch {
    return res.status(500).json({
      error: "Failed to retrieve messages.",
    });
  }
});

// POST a new message.
app.post("/api/messages/:forum", messageLimiter, async (req, res) => {
  try {
    const { text, author } = req.body || {};

    if (typeof text !== "string" || typeof author !== "string") {
      return res.status(400).json({
        error: "Text and author must be strings.",
      });
    }

    const cleanText = text.trim();
    const cleanAuthor = author.trim();

    if (!cleanText || !cleanAuthor) {
      return res.status(400).json({
        error: "Text and author cannot be empty.",
      });
    }

    if (cleanText.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Message must not exceed ${MAX_MESSAGE_LENGTH} characters.`,
      });
    }

    if (cleanAuthor.length > MAX_AUTHOR_LENGTH) {
      return res.status(400).json({
        error: `Author must not exceed ${MAX_AUTHOR_LENGTH} characters.`,
      });
    }

    const newMessage = {
      id: crypto.randomUUID(),
      text: cleanText,
      author: cleanAuthor,
      timestamp: new Date().toISOString(),
    };

    await addMessage(req.params.forum, newMessage);

    return res.status(201).json(newMessage);
  } catch {
    return res.status(500).json({
      error: "Failed to create message.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Tribunal API running at http://localhost:${PORT}`);
});
