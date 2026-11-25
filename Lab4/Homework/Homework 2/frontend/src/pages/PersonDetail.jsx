import { useParams } from "react-router";
import Forum from "../components/Forum";
import SlaCountdown from "../components/SlaCountdown";

export default function PersonDetail({ people }) {
  const { id } = useParams();

  const person = people.find((p) => p.id === id);

  if (!person) {
    return (
      <div role="alert" className="not-found">
        404: Person Not Found
      </div>
    );
  }

  return (
    <section>
      <h1>{person.name}</h1>
      <p>Player appeal dossier</p>

      <SlaCountdown deadline={new Date(person.slaDeadline).getTime()} />

      <dl className="person-details">
        <dt>Role</dt>
        <dd>{person.role}</dd>

        <dt>Team</dt>
        <dd>{person.team}</dd>

        <dt>Case ID</dt>
        <dd>{person.caseId}</dd>

        <dt>Violation</dt>
        <dd>{person.violation}</dd>

        <dt>Status</dt>
        <dd>{person.status}</dd>
      </dl>

      <Forum forumId={person.id} />
    </section>
  );
}
