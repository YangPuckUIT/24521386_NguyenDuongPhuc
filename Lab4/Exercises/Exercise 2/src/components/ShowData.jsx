
export default function ShowData({ data }) {
  if (!data) {
    return (
      <section className="inspector-empty" aria-label="Submission inspector">
        <span className="inspector-symbol" aria-hidden="true">{`{ }`}</span>
        <h3>Awaiting submission</h3>
        <p>
          Complete the form and submit it to inspect
          the validated data structure.
        </p>
      </section>
    );
  }

  const safeData = {
    name: data.name,
    email: data.email,
    password: "[REDACTED]",
    confirmPassword: "[REDACTED]",
  };

  return (
    <section className="inspector-result" aria-label="Submission inspector">
      <div className="inspector-status" role="status">
        <span className="status-dot" aria-hidden="true" />
        Validation passed
      </div>

      <pre className="json-output">
        <code>{JSON.stringify(safeData, null, 2)}</code>
      </pre>
    </section>
  );
}
