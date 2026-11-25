export const ShowData = ({ data }) => {
  return (
    <dl className="json-inspector">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="data-row">
          <dt>{key}</dt>
          <dd>{String(value) || "—"}</dd>
        </div>
      ))}
    </dl>
  );
};
