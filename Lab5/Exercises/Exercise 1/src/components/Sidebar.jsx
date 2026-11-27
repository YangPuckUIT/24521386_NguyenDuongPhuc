import { useAppState, useAppDispatch } from "../context/useAppContext";

const tabs = [
  { id: "reels", label: "Evidence archive", number: "01" },
  { id: "timeline", label: "Timeline", number: "02" },
  { id: "dossier", label: "Case overview", number: "03" },
];

export default function Sidebar() {
  const { activeTab } = useAppState();
  const dispatch = useAppDispatch();

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">F</span>
        <div>
          <strong>FAIR PLAY</strong>
          <small>CASE ARCHIVE</small>
        </div>
      </div>

      <div className="sidebar-label">CASE FILE</div>

      <div className="case-identity">
        <div className="case-number">PUBG / 2025</div>
        <h2>
          Himass
          <br />& TanVuu
        </h2>
        <span className="case-status">
          <span className="status-dot" />
          Investigation archive
        </span>
      </div>

      <nav className="navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() =>
              dispatch({ type: "SET_ACTIVE_TAB", payload: tab.id })
            }
          >
            <span>{tab.number}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <span>STUDENT PROJECT</span>
        <span>LAB 5 · SPRINT 01</span>
      </div>
    </aside>
  );
}
