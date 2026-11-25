const forums = {
  himass: [
    {
      id: "msg-001",
      author: "Tribunal Admin",
      text: "The appeal review process has started.",
      timestamp: new Date().toISOString(),
    },
  ],
  tanvuu: [
    {
      id: "msg-002",
      author: "Tribunal Admin",
      text: "Additional evidence is being reviewed.",
      timestamp: new Date().toISOString(),
    },
  ],
};

const getMessagesByForum = async (forumId) => {
  return forums[forumId] || [];
};

const addMessage = async (forumId, message) => {
  if (!forums[forumId]) {
    forums[forumId] = [];
  }

  forums[forumId].push(message);
  return message;
};

module.exports = {
  getMessagesByForum,
  addMessage,
};
