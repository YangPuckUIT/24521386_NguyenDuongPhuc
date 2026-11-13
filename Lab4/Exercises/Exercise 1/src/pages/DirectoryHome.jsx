
import { Link } from "react-router";

export default function DirectoryHome() {
  return (
    <article className="directory-home">
      <p className="eyebrow">Archive / Introduction</p>
      <h2>Ideas that changed everything.</h2>
      <p>
        Explore the people behind some of the most important
        breakthroughs in computing, mathematics, and technology.
      </p>

      <Link to="/people/1" className="explore-link">
        Explore the first dossier
        <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
