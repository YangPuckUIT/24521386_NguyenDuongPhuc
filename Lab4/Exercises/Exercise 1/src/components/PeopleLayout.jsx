
import { NavLink, Outlet } from "react-router";
import { PEOPLE } from "../data/people";

export default function PeopleLayout() {
  return (
    <div className="directory-layout">
      <nav className="people-list" aria-label="People directory">
        <h2>Directory / Index</h2>

        {PEOPLE.map((person) => (
          <NavLink
            key={person.id}
            to={`/people/${person.id}`}
            className={({ isActive }) =>
              `person-link${isActive ? " selected" : ""}`
            }
          >
            <strong>{person.name}</strong>
            <span>{person.role}</span>
          </NavLink>
        ))}
      </nav>

      <section className="detail-panel" aria-label="Person details">
        <Outlet />
      </section>
    </div>
  );
}
