import { useState, useEffect, useCallback } from "react";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const wait = (ms, signal) =>
  new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error("Request aborted"));
      return;
    }

    const timeoutId = setTimeout(() => {
      signal.removeEventListener("abort", handleAbort);
      resolve();
    }, ms);

    const handleAbort = () => {
      clearTimeout(timeoutId);
      reject(new Error("Request aborted"));
    };

    signal.addEventListener("abort", handleAbort, { once: true });
  });

export const useForumMessages = (forumId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(
    async (signal) => {
      setLoading(true);
      setError(null);

      try {
        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
          try {
            const response = await fetch(
              `http://localhost:5000/api/messages/${forumId}`,
              { signal },
            );

            if (!response.ok) {
              const requestError = new Error("Failed to fetch messages");
              requestError.status = response.status;
              throw requestError;
            }

            const result = await response.json();

            if (!signal.aborted) {
              setData(result);
              setError(null);
            }

            return;
          } catch (err) {
            if (signal.aborted) return;

            const isClientError = err.status >= 400 && err.status < 500;

            const isLastAttempt = attempt === MAX_RETRIES;

            if (isClientError || isLastAttempt) {
              setError(err.message);
              return;
            }

            const delay = RETRY_DELAY * 2 ** attempt;
            await wait(delay, signal);
          }
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
};
