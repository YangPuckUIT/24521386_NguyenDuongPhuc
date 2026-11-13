
import { lazy, Suspense, useState } from "react";
import { PEOPLE } from "./data/people";
import Skeleton from "./components/Skeleton";
import "./App.css";

const PersonDetail = lazy(() => import("./components/PersonDetail"));

export default function App() {
  const [selectedId, setSelectedId] = useState("1");

  const selectedPerson = PEOPLE.find(
    (person) => person.id === selectedId
  );

  return (
    <main className="app">

<header className="app-header">
  <p className="eyebrow">An archive of extraordinary minds / Vol. 01</p>
  <h1>People<br />Directory.</h1>
  <p>
    A curated index of individuals who shaped the way
    we think, build, and understand the world.
  </p>
</header>


      <div className="directory-layout">
        <nav className="people-list" aria-label="People directory">
          <h2>Directory</h2>

          {PEOPLE.map((person) => (
            <button
              key={person.id}
              type="button"
              className={selectedId === person.id ? "selected" : ""}
              aria-pressed={selectedId === person.id}
              onClick={() => setSelectedId(person.id)}
            >
              <strong>{person.name}</strong>
              <span>{person.role}</span>
            </button>
          ))}
        </nav>

        <section className="detail-panel" aria-label="Person details">
          <Suspense fallback={<Skeleton />}>
            <PersonDetail person={selectedPerson} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
