import { useState, useEffect, useCallback } from "react";

export const useForumMessages = (forumId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(
    async (signal) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/messages/${forumId}`,
          { signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const result = await response.json();

        if (!signal.aborted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    [forumId],
  );

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    fetchMessages(controller.signal);

    return () => controller.abort();
  }, [fetchMessages]);

  const postMessage = async (payload) => {
    const response = await fetch(
      `http://localhost:5000/api/messages/${forumId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to post message");
    }

    const newMessage = await response.json();

    setData((previous) => [...previous, newMessage]);

    return newMessage;
  };

  return {
    data,
    loading,
    error,
    postMessage,
  };
}; //ok
