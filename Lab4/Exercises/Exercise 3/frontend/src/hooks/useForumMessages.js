
import { useEffect, useState } from "react";
import { fetchMessages } from "../services/forumApi";

export function useForumMessages(channel) {
  const [request, setRequest] = useState({
    channel: null,
    status: "idle",
    messages: [],
    error: null,
    version: 0,
  });

  useEffect(() => {
    if (!channel) return;

    const controller = new AbortController();

    fetchMessages(channel, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;

        setRequest((previous) => ({
          channel,
          status: "success",
          messages: data.messages,
          error: null,
          version: previous.version,
        }));
      })
      .catch((error) => {
        if (controller.signal.aborted) return;

        setRequest((previous) => ({
          channel,
          status: "error",
          messages: [],
          error: error.message,
          version: previous.version,
        }));
      });

    return () => {
      controller.abort();
    };
  }, [channel, request.version]);

  const visibleRequest =
    request.channel === channel
      ? request
      : {
          channel,
          status: channel ? "loading" : "idle",
          messages: [],
          error: null,
          version: request.version,
        };

  function refresh() {
    setRequest((previous) => ({
      ...previous,
      channel,
      status: "loading",
      messages: [],
      error: null,
      version: previous.version + 1,
    }));
  }

  return {
    status: visibleRequest.status,
    messages: visibleRequest.messages,
    error: visibleRequest.error,
    refresh,
  };
}
