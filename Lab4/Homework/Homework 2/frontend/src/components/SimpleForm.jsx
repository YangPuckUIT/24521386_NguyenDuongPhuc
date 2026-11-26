import { useState } from "react";
import { FormContext } from "../context/FormContext";

const initialValues = {
  playerId: "",
  appealType: "",
  reason: "",
  evidenceUrl: "",
};

function validateForm(values) {
  const errors = {};

  if (!values.playerId.trim()) {
    errors.playerId = "Player ID is required.";
  }

  if (!values.appealType) {
    errors.appealType = "Please select an appeal type.";
  }

  const reason = values.reason.trim();

  if (!reason) {
    errors.reason = "Please explain your appeal.";
  } else {
    const minimumLength = ["Match integrity", "Other"].includes(
      values.appealType,
    )
      ? 30
      : 20;

    if (reason.length < minimumLength) {
      errors.reason = `Please provide at least ${minimumLength} characters.`;
    }
  }

  const evidenceUrl = values.evidenceUrl.trim();

  if (values.appealType === "Evidence dispute" && !evidenceUrl) {
    errors.evidenceUrl = "Evidence URL is required for an evidence dispute.";
  } else if (evidenceUrl) {
    try {
      const url = new URL(evidenceUrl);

      if (!["http:", "https:"].includes(url.protocol)) {
        errors.evidenceUrl = "Please enter a valid HTTP or HTTPS URL.";
      }
    } catch {
      errors.evidenceUrl = "Please enter a valid URL.";
    }
  }

  return errors;
}

export default function SimpleForm({ children }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Synchronous validation: no useEffect.
  const errors = validateForm(values);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleBlur = (event) => {
    setTouched((previous) => ({
      ...previous,
      [event.target.name]: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setTouched({
      playerId: true,
      appealType: true,
      reason: true,
      evidenceUrl: true,
    });

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
  };

  const contextValue = {
    values,
    errors,
    touched,
    submitted,
    handleChange,
    handleBlur,
    resetForm,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form className="appeal-form" onSubmit={handleSubmit} noValidate>
        {children}
      </form>
    </FormContext.Provider>
  );
}
