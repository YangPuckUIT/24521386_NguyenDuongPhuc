
export default function PersonDetail({ person }) {
  if (!person) {
    return <p role="alert">Person not found.</p>;
  }

  return (
    <article className="person-detail">
      <header>
        <p className="eyebrow">PERSON DOSSIER</p>
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
