
const express = require("express");
const cors = require("cors");
const messagesRouter = require("./routes/messages");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "lab4-forum-api",
  });
});

app.use("/api/messages", messagesRouter);

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      error: "INVALID_JSON",
      message: "Request body contains invalid JSON.",
    });
  }

  console.error(error);

  return res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "An unexpected server error occurred.",
  });
});

app.listen(PORT, () => {
  console.log(`Forum API running at http://localhost:${PORT}`);
});
