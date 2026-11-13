import { useState } from "react";
import { useForumMessages } from "./hooks/useForumMessages";
import ChannelSwitcher from "./components/ChannelSwitcher";
import MessageFeed from "./components/MessageFeed";
import MessageComposer from "./components/MessageComposer";
import "./App.css";

const channels = [
  {
    id: "nasa",
    name: "NASA",
    topic: "Space exploration",
    description:
      "Big questions. New frontiers. A place for the endlessly curious.",
    number: "01",
  },
  {
    id: "esports-tribunal",
    name: "Esports Tribunal",
    topic: "Competitive gaming",
    description:
      "The plays, the rivalries, the calls. Bring your perspective to the arena.",
    number: "02",
  },
  {
    id: "notNasa",
    name: "Not NASA",
    topic: "General discussion",
    description: "A little closer to home. Everything else belongs here.",
    number: "03",
  },
];

export default function App() {
  const [channelId, setChannelId] = useState("nasa");
  const channel = channels.find((item) => item.id === channelId);
  const { status, messages, error, refresh } = useForumMessages(channelId);
  return (
    <div className="shell">
      <a className="skip-link" href="#discussion">
        Skip to discussion
      </a>
      <header className="masthead">
        <a className="wordmark" href="/">
          FREQUENCY<span>Community Network</span>
        </a>
        <span className="edition">
          Independent minds.
          <br />
          Shared signals.
        </span>
      </header>
      <div className="layout">
        <aside>
          <p className="eyebrow">Find your frequency</p>
          <ChannelSwitcher
            channels={channels}
            active={channelId}
            onSelect={setChannelId}
          />
          <div className="sidebar-note">
            <span aria-hidden="true">↗</span>
            <h2>
              Good conversations
              <br />
              start with you.
            </h2>
            <p>
              Be curious. Be thoughtful. Make room for another point of view.
            </p>
          </div>
        </aside>
        <main id="discussion" tabIndex="-1">
          <header className="channel-heading">
            <p className="eyebrow">
              Channel {channel.number} / {channel.topic}
            </p>
            <h1>
              {channel.name}
              <span aria-hidden="true">↗</span>
            </h1>
            <p>{channel.description}</p>
          </header>
          <div className="feed-heading">
            <h2>The conversation</h2>
            <button
              type="button"
              onClick={refresh}
              disabled={status === "loading"}
            >
              Refresh <span aria-hidden="true">↻</span>
            </button>
          </div>
          <MessageFeed
            status={status}
            messages={messages}
            error={error}
            onRetry={refresh}
          />
          <MessageComposer
            key={channelId}
            channel={channel}
            onPosted={refresh}
          />
        </main>
      </div>
      <footer>
        FREQUENCY <span>A space for a different perspective.</span>
        <span>Lab 04 / Forum</span>
      </footer>
    </div>
  );
}
