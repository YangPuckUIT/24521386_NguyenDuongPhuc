
const API_BASE_URL = "http://localhost:3000/api";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed: ${response.status}`
    );
  }

  return data;
}

export async function fetchMessages(channel, signal) {
  const response = await fetch(
    `${API_BASE_URL}/messages/${encodeURIComponent(channel)}`,
    { signal }
  );

  return handleResponse(response);
}

export async function createMessage(channel, message) {
  const response = await fetch(
    `${API_BASE_URL}/messages/${encodeURIComponent(channel)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );

  return handleResponse(response);
}
