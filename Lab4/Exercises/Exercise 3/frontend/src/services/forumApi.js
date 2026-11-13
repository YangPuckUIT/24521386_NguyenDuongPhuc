const API_BASE_URL = "http://localhost:3000/api";

function validMessage(message) {
  return (
    message &&
    (typeof message.id === "number" || typeof message.id === "string") &&
    typeof message.author === "string" &&
    typeof message.content === "string" &&
    typeof message.createdAt === "string" &&
    Number.isFinite(Date.parse(message.createdAt))
  );
}

async function request(channel, options) {
  let response;
  try {
    response = await fetch(
      `${API_BASE_URL}/messages/${encodeURIComponent(channel)}`,
      options,
    );
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error(
      "Cannot reach the forum. Check your connection and try again.",
      { cause: error },
    );
  }
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(
      "The forum returned an unreadable response. Please try again.",
    );
  }
  if (!response.ok)
    throw new Error(
      typeof data?.message === "string"
        ? data.message
        : `Request failed (${response.status}). Please try again.`,
    );
  return data;
}

export async function fetchMessages(channel, signal) {
  const data = await request(channel, { signal });
  if (
    data?.channel !== channel ||
    !Array.isArray(data.messages) ||
    !data.messages.every(validMessage) ||
    new Set(data.messages.map((message) => message.id)).size !==
      data.messages.length
  ) {
    throw new Error("The forum returned invalid messages. Please try again.");
  }
  return data;
}

export async function createMessage(channel, message, signal) {
  const data = await request(channel, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
    signal,
  });
  if (data?.channel !== channel || !validMessage(data.message))
    throw new Error(
      "The forum could not confirm your message. Refresh before trying again.",
    );
  return data;
}
