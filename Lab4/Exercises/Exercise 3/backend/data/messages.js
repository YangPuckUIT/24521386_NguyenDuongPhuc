
const CHANNELS = ["nasa", "esports-tribunal", "notNasa"];

const messages = {
  nasa: [
    {
      id: 1,
      author: "Mission Control",
      content: "Welcome to the NASA discussion channel.",
      createdAt: "2026-11-13T08:00:00.000Z",
    },
    {
      id: 2,
      author: "Orbit Analyst",
      content: "What space mission are you following?",
      createdAt: "2026-11-13T08:05:00.000Z",
    },
  ],

  "esports-tribunal": [
    {
      id: 3,
      author: "Arena Moderator",
      content: "Welcome to the esports tribunal.",
      createdAt: "2026-11-13T08:10:00.000Z",
    },
  ],

  notNasa: [
    {
      id: 4,
      author: "Community Bot",
      content: "This is the off-topic discussion channel.",
      createdAt: "2026-11-13T08:15:00.000Z",
    },
  ],
};

module.exports = { CHANNELS, messages };
