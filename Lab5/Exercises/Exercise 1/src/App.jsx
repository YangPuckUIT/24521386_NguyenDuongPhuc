import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import EvidenceGrid from "./components/EvidenceGrid";
import { evidence } from "./data/evidence";
import { useAppState } from "./context/useAppContext";

function DashboardContent() {
  const { activeTab } = useAppState();

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">
        <Header />

        <div className="content">
          <section className="page-intro">
            <div className="eyebrow">DIGITAL CASE ARCHIVE / 001</div>

            <h1>
              Facts first.
              <br />
              <span>Context matters.</span>
            </h1>

            <p>
              A structured archive of public records, statements and materials
              related to the Himass & TanVuu case.
            </p>
          </section>

          {activeTab === "reels" && (
            <>
              <div className="section-heading">
                <div>
                  <span className="section-index">01 / MATERIALS</span>
                  <h2>Evidence collection</h2>
                </div>

                <span className="record-count">
                  {String(evidence.length).padStart(2, "0")} RECORDS
                </span>
              </div>

              <EvidenceGrid clips={evidence} pageSize={6} />
            </>
          )}

          {activeTab === "timeline" && (
            <section className="empty-section">
              <span className="section-index">02 / CHRONOLOGY</span>
              <h2>Timeline</h2>
              <p>Chronological records will be organized here.</p>
            </section>
          )}

          {activeTab === "dossier" && (
            <section className="empty-section">
              <span className="section-index">03 / CASE SUMMARY</span>
              <h2>Case overview</h2>
              <p>
                Background information, public statements and case references
                will be organized here.
              </p>
            </section>
          )}

          <footer className="page-footer">
            <span>ARCHIVE INTERFACE · LAB 5</span>
            <span>INDEPENDENT STUDENT PROJECT</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const { theme } = useAppState();

  return (
    <div className={`app-shell theme-${theme}`}>
      <DashboardContent />
    </div>
  );
}
