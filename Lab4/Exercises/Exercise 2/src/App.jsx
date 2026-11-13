
import SimpleForm from "./components/SimpleForm";
import "./App.css";

export default function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Form Lab home">
          <span className="brand-mark">F/</span>
          <span>FORM LAB</span>
        </a>

        <span className="header-tag">REACT 19 / EXPERIMENT 02</span>
      </header>

      <section className="hero">
        <div className="hero-meta">
          <span>INTERFACE STUDIES</span>
          <span>NO. 002 — VALIDATION</span>
        </div>

        <h1>
          Form follows
          <br />
          <em>function.</em>
        </h1>

        <div className="hero-bottom">
          <p>
            One source of truth. Zero effect chains.
            A form that tells you exactly what went wrong.
          </p>
          <span className="hero-counter">02 / 03</span>
        </div>
      </section>

      <SimpleForm />

      <footer className="site-footer">
        <span>FORM LAB / REACT ENGINEERING</span>
        <span>CONTEXT · ACCESSIBILITY · VALIDATION</span>
      </footer>
    </main>
  );
}
