
import { useState } from "react";
import { FormProvider } from "../context/FormContext";
import { initialValues, validationRules, evaluateErrors } from "../utils/validation";
import { useFormContext } from "../context/useFormContext";
import InputField from "./InputField";
import ShowData from "./ShowData";

const FIELDS = [
  {
    name: "name",
    label: "Full name",
    placeholder: "e.g. Alex Morgan",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "alex@example.com",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "At least 8 characters",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Repeat your password",
    autoComplete: "new-password",
  },
];

function FormContents({ onSubmit }) {
  const { values, errors, isValid, touched } = useFormContext();

  const completedFields = FIELDS.filter(
    (field) => values[field.name].trim().length > 0
  ).length;

  const visibleErrorCount = Object.keys(errors).filter(
    (name) => touched[name]
  ).length;

  return (
    <form onSubmit={onSubmit} noValidate className="registration-form">
      <div className="form-heading">
        <span className="section-index">01 / REGISTRATION</span>
        <h2>Create your profile.</h2>
        <p>
          A small experiment in predictable form state,
          synchronous validation, and accessible feedback.
        </p>
      </div>

      <div className="form-progress">
        <div className="progress-meta">
          <span>Form completion</span>
          <span>{completedFields} / {FIELDS.length}</span>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={completedFields}
          aria-valuemin={0}
          aria-valuemax={FIELDS.length}
          aria-label="Completed form fields"
        >
          <div
            className="progress-fill"
            style={{ width: `${(completedFields / FIELDS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="fields-stack">
        {FIELDS.map((field) => (
          <InputField key={field.name} {...field} />
        ))}
      </div>

      <div className="form-footer">
        <p className="validation-summary" aria-live="polite">
          {isValid
            ? "All fields are valid."
            : visibleErrorCount > 0
              ? `${visibleErrorCount} field(s) need attention.`
              : "Complete all fields to continue."}
        </p>

        <button type="submit" className="submit-button">
          Validate & submit
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}

export default function SimpleForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  function handleFieldChange(name, value) {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    setSubmittedData(null);
  }

  function handleFieldBlur(name) {
    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const errors = evaluateErrors(values, validationRules);

    if (Object.keys(errors).length > 0) {
      setTouched(
        Object.fromEntries(
          Object.keys(initialValues).map((name) => [name, true])
        )
      );
      setSubmittedData(null);
      return;
    }

    setSubmittedData({ ...values });
  }

  return (
    <div className="workspace-grid">
      <FormProvider
        values={values}
        rules={validationRules}
        touched={touched}
        onFieldChange={handleFieldChange}
        onFieldBlur={handleFieldBlur}
      >
        <FormContents onSubmit={handleSubmit} />
      </FormProvider>

      <aside className="inspector-panel">
        <div className="inspector-heading">
          <span className="section-index">02 / OUTPUT</span>
          <h2>Data inspector.</h2>
          <p>Validated submission payload</p>
        </div>

        <ShowData data={submittedData} />
      </aside>
    </div>
  );
}
