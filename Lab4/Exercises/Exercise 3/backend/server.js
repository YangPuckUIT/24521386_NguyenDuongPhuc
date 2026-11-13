
const express = require("express");
const cors = require("cors");

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

app.listen(PORT, () => {
  console.log(`Forum API running at http://localhost:${PORT}`);
});
