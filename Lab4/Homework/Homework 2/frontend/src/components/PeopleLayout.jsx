import { NavLink, Outlet } from "react-router";

export default function PeopleLayout({ people }) {
  return (
    <div className="people-frame">
      <nav className="sidebar" aria-label="Player dossiers">
        <h2>Player Dossiers</h2>

        {people.map((person) => (
          <NavLink
            key={person.id}
            to={`/dossier/${person.id}`}
            className={({ isActive }) => (isActive ? "active-link" : "link")}
          >
            {person.name}
          </NavLink>
        ))}
      </nav>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}
