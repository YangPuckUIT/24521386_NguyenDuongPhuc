require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const profileRoutes = require("./routes/profileRoutes");
const swipeRoutes = require("./routes/swipeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/profiles", profileRoutes);
app.use("/api/swipes", swipeRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
