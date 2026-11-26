const fs = require("node:fs/promises");
const path = require("node:path");

const DATA_FILE = path.join(__dirname, "messages.json");

const initialForums = {
  himass: [],
  tanvuu: [],
};

let forums;
let writeQueue = Promise.resolve();

const loadMessages = async () => {
  try {
    const content = await fs.readFile(DATA_FILE, "utf8");
    forums = JSON.parse(content);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }

    forums = initialForums;
    await saveMessages();
  }
};

const saveMessages = () => {
  writeQueue = writeQueue.then(() =>
    fs.writeFile(DATA_FILE, JSON.stringify(forums, null, 2)),
  );

  return writeQueue;
};

const getMessagesByForum = async (forumId) => {
  await loadMessagesIfNeeded();

  return forums[forumId] || [];
};

const addMessage = async (forumId, message) => {
  await loadMessagesIfNeeded();

  if (!forums[forumId]) {
    forums[forumId] = [];
  }

  forums[forumId].push(message);

  await saveMessages();

  return message;
};

let loadingPromise;

const loadMessagesIfNeeded = async () => {
  if (!forums) {
    if (!loadingPromise) {
      loadingPromise = loadMessages();
    }

    await loadingPromise;
  }
};

module.exports = {
  getMessagesByForum,
  addMessage,
};
