import { useState } from "react";
import { useSearchParams } from "react-router";
import { useForumMessages } from "../hooks/useForumMessages";

function Forum({ forumId }) {
  const { data, loading, error, postMessage } = useForumMessages(forumId);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") || "";

  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const filteredMessages = data.filter((item) => {
    const keyword = searchQuery.trim().toLowerCase();

    return (
      item.text.toLowerCase().includes(keyword) ||
      item.author.toLowerCase().includes(keyword)
    );
  });

  const handleSearch = (event) => {
    const value = event.target.value;
    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams, { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const text = message.trim();
    if (!text || sending) return;

    setSending(true);
    setSubmitError("");

    try {
      await postMessage({
        author: forumId === "himass" ? "Himass" : "TanVuu",
        text,
      });
      setMessage("");
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="forum">
      <div className="forum-header">
        <div>
          <p className="eyebrow">CASE DISCUSSION</p>
          <h2>{forumId === "himass" ? "Himass" : "TanVuu"} Forum</h2>
        </div>
        <span className="forum-count">{filteredMessages.length} messages</span>
      </div>

      <label htmlFor={`forum-search-${forumId}`}>Search messages</label>
      <input
        id={`forum-search-${forumId}`}
        type="search"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by message or author..."
      />

      {loading && <p role="status">Loading messages...</p>}

      {error && (
        <p className="forum-error" role="alert">
          Could not load messages: {error}
        </p>
      )}

      {!loading && !error && (
        <div className="forum-messages">
          {filteredMessages.length === 0 ? (
            <p className="forum-empty">
              {searchQuery
                ? "No messages match your search."
                : "No messages yet."}
            </p>
          ) : (
            filteredMessages.map((item) => (
              <article className="forum-message" key={item.id}>
                <div className="forum-message-meta">
                  <strong>{item.author}</strong>
                  <time dateTime={item.timestamp}>
                    {new Date(item.timestamp).toLocaleString()}
                  </time>
                </div>
                <p>{item.text}</p>
              </article>
            ))
          )}
        </div>
      )}

      <form className="forum-form" onSubmit={handleSubmit}>
        <label htmlFor={`message-${forumId}`}>Add a message</label>
        <textarea
          id={`message-${forumId}`}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write your message..."
          rows={3}
          required
        />

        {submitError && (
          <p className="forum-error" role="alert">
            {submitError}
          </p>
        )}

        <button type="submit" disabled={!message.trim() || sending}>
          {sending ? "Sending..." : "Send message"}
        </button>
      </form>
    </section>
  );
}

export default Forum;
