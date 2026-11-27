import ThemeToggle from "./ThemeToggle";
import { useAppState } from "../context/useAppContext";

const pageTitles = {
  reels: "Evidence archive",
  timeline: "Timeline",
  dossier: "Case overview",
};

export default function Header() {
  const { activeTab } = useAppState();

  return (
    <header className="topbar">
      <div className="breadcrumb">
        CASE FILE <span>/</span> {pageTitles[activeTab]?.toUpperCase()}
      </div>

      <div className="topbar-actions">
        <span className="archive-label">PUBLIC RECORD / ARCHIVE</span>
        <ThemeToggle />
      </div>
    </header>
  );
}
