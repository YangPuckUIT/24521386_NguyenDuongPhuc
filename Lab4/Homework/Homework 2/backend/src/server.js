const express = require("express");
const cors = require("cors");
const crypto = require("node:crypto");

const { getMessagesByForum, addMessage } = require("./data/messages");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// GET messages by forum
app.get("/api/messages/:forum", async (req, res) => {
  try {
    const messages = await getMessagesByForum(req.params.forum);
    res.json(messages);
  } catch {
    res.status(500).json({
      error: "Failed to retrieve messages",
    });
  }
});

// POST a new message
app.post("/api/messages/:forum", async (req, res) => {
  try {
    const { text, author } = req.body;

    if (
      typeof text !== "string" ||
      !text.trim() ||
      typeof author !== "string" ||
      !author.trim()
    ) {
      return res.status(400).json({
        error: "Missing or invalid required fields",
      });
    }

    const newMessage = {
      id: crypto.randomUUID(),
      text: text.trim(),
      author: author.trim(),
      timestamp: new Date().toISOString(),
    };

    await addMessage(req.params.forum, newMessage);

    return res.status(201).json(newMessage);
  } catch {
    return res.status(500).json({
      error: "Failed to create message",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Tribunal API running at http://localhost:${PORT}`);
});
