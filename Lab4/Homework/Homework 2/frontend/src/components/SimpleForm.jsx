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

  if (!values.reason.trim()) {
    errors.reason = "Please explain your appeal.";
  } else if (values.reason.trim().length < 20) {
    errors.reason = "Please provide at least 20 characters.";
  }

  if (values.evidenceUrl.trim()) {
    try {
      const url = new URL(values.evidenceUrl);

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
