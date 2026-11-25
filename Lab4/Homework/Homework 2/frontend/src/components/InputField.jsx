import { useId } from "react";

export const InputField = ({ label, error, as = "input", ...props }) => {
  const id = useId();
  const errorId = `${id}-error`;
  const Control = as;

  return (
    <div className="field-group">
      <label htmlFor={id}>{label}</label>

      <Control
        {...props}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={error ? "field-control field-error" : "field-control"}
      />

      {error && (
        <span id={errorId} className="field-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
