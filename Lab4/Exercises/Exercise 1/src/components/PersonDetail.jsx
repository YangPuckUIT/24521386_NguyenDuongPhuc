
import { useParams, Link } from "react-router";
import { PEOPLE } from "../data/people";

export default function PersonDetail() {
  const { id } = useParams();

  const person = PEOPLE.find((item) => item.id === id);

  if (!person) {
    return (
      <article className="not-found" role="alert">
        <p className="eyebrow">Archive / Error 404</p>
        <h2>Record not found.</h2>
        <p>
          The requested person does not exist in this directory.
        </p>
        <Link to="/">Return to directory</Link>
      </article>
    );
  }

  return (
    <article className="person-detail">
      <header>
        <p className="eyebrow">Archive / Person Dossier</p>
        <h2>{person.name}</h2>
        <p>{person.role}</p>
      </header>

      <dl className="person-info">
        <dt>Field</dt>
        <dd>{person.field}</dd>

        <dt>Description</dt>
        <dd>{person.description}</dd>
      </dl>
    </article>
  );
}
