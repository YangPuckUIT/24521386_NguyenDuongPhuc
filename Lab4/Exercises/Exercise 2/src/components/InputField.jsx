
import { useId } from "react";
import { useFormContext } from "../context/useFormContext";

export default function InputField({
  name,
  label,
  type = "text",
  placeholder = "",
  autoComplete,
}) {
  const generatedId = useId();

  const {
    values,
    errors,
    touched,
    onFieldChange,
    onFieldBlur,
  } = useFormContext();

  const inputId = `${generatedId}-input`;
  const errorId = `${generatedId}-error`;

  const value = values[name] ?? "";
  const error = errors[name];
  const showError = Boolean(touched[name] && error);

  return (
    <div className={`form-field${showError ? " has-error" : ""}`}>
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) =>
          onFieldChange(name, event.target.value)
        }
        onBlur={() => onFieldBlur(name)}
        aria-invalid={showError}
        aria-describedby={showError ? errorId : undefined}
        required
      />

      {showError && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
