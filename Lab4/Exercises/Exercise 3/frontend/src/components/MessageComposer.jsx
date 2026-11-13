import { useEffect, useRef, useState } from "react";
import { createMessage } from "../services/forumApi";

export default function MessageComposer({ channel, onPosted }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const pending = useRef(null);
  useEffect(() => () => pending.current?.abort(), []);

  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    const message = { author: author.trim(), content: content.trim() };
    const nextErrors = {};
    if (message.author.length < 2 || message.author.length > 40)
      nextErrors.author = "Use 2–40 characters for your name.";
    if (message.content.length < 1 || message.content.length > 500)
      nextErrors.content = "Write a message of 1–500 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const controller = new AbortController();
    pending.current = controller;
    setStatus("sending");
    try {
      await createMessage(channel.id, message, controller.signal);
      if (controller.signal.aborted) return;
      setContent("");
      setStatus("success");
      onPosted();
    } catch (error) {
      if (controller.signal.aborted) return;
      setErrors({ server: error.message });
      setStatus("error");
    } finally {
      if (pending.current === controller) pending.current = null;
    }
  }

  return (
    <section className="composer" aria-labelledby="composer-title">
      <p className="eyebrow">Add your voice</p>
      <h2 id="composer-title">Send a signal.</h2>
      <p>
        Posting to <strong>{channel.name}</strong>
      </p>
      <form onSubmit={submit} noValidate>
        <fieldset disabled={status === "sending"}>
          <legend className="sr-only">New message</legend>
          <label htmlFor="author">Your name</label>
          <input
            id="author"
            name="author"
            autoComplete="nickname"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            aria-invalid={!!errors.author}
            aria-describedby={errors.author ? "author-error" : "author-hint"}
          />
          <small id="author-hint">2–40 characters after trimming</small>
          {errors.author && (
            <p className="field-error" id="author-error">
              {errors.author}
            </p>
          )}
          <label htmlFor="content">Your message</label>
          <textarea
            id="content"
            name="content"
            rows="4"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            aria-invalid={!!errors.content}
            aria-describedby={
              errors.content ? "content-hint content-error" : "content-hint"
            }
          />
          <div className="form-meta">
            <small id="content-hint">1–500 characters after trimming</small>
            <small>{content.trim().length}/500</small>
          </div>
          {errors.content && (
            <p className="field-error" id="content-error">
              {errors.content}
            </p>
          )}
          <button className="submit" type="submit">
            {status === "sending" ? "Sending…" : "Post message"}{" "}
            <span aria-hidden="true">↗</span>
          </button>
        </fieldset>
        {errors.server && (
          <p className="field-error" role="alert">
            {errors.server} Your draft is still here. If delivery is uncertain,
            refresh before resending.
          </p>
        )}
        <p className="submission-status" role="status">
          {status === "success"
            ? "Message posted. Thanks for joining in."
            : status === "sending"
              ? "Sending your message"
              : ""}
        </p>
      </form>
      <small>
        Messages are stored in memory and reset when the server restarts.
      </small>
    </section>
  );
}
