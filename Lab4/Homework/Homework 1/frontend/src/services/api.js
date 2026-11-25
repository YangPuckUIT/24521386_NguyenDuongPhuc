const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const getProfiles = () => request("/profiles");

export const createSwipe = (profileId, action) =>
  request("/swipes", {
    method: "POST",
    body: JSON.stringify({ profileId, action }),
  });

export const getSwipes = () => request("/swipes");

export const undoSwipe = () =>
  request("/swipes/undo", {
    method: "DELETE",
  });

export const resetSwipes = () =>
  request("/swipes", {
    method: "DELETE",
  });
