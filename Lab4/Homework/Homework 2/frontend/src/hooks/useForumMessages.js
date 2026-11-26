import { useState, useEffect, useCallback, useRef } from "react";

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
  const retryLocks = useRef(new Set());
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
    const tempId = `temp-${crypto.randomUUID()}`;

    const optimisticMessage = {
      ...payload,
      id: tempId,
      timestamp: new Date().toISOString(),
      status: "pending",
    };

    setData((previous) => [...previous, optimisticMessage]);

    try {
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

      const savedMessage = await response.json();

      setData((previous) =>
        previous.map((item) =>
          item.id === tempId ? { ...savedMessage, status: "sent" } : item,
        ),
      );

      return savedMessage;
    } catch (err) {
      setData((previous) =>
        previous.map((item) =>
          item.id === tempId ? { ...item, status: "failed" } : item,
        ),
      );

      throw err;
    }
  };

  const retryMessage = async (item) => {
    if (retryLocks.current.has(item.id)) {
      return;
    }

    retryLocks.current.add(item.id);

    setData((previous) =>
      previous.map((message) =>
        message.id === item.id ? { ...message, status: "pending" } : message,
      ),
    );

    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${forumId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            author: item.author,
            text: item.text,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to resend message");
      }

      const savedMessage = await response.json();

      setData((previous) =>
        previous.map((message) =>
          message.id === item.id
            ? { ...savedMessage, status: "sent" }
            : message,
        ),
      );

      return savedMessage;
    } catch (err) {
      setData((previous) =>
        previous.map((message) =>
          message.id === item.id ? { ...message, status: "failed" } : message,
        ),
      );

      throw err;
    } finally {
      retryLocks.current.delete(item.id);
    }
  };

  return {
    data,
    loading,
    error,
    postMessage,
    retryMessage,
  };
};
