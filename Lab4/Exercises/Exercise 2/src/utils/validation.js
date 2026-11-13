
export const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const validationRules = {
  name: [
    {
      test: (value) => value.trim().length > 0,
      message: "Name is required.",
    },
    {
      test: (value) => value.trim().length >= 2,
      message: "Name must contain at least 2 characters.",
    },
  ],

  email: [
    {
      test: (value) => value.trim().length > 0,
      message: "Email is required.",
    },
    {
      test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Enter a valid email address.",
    },
  ],

  password: [
    {
      test: (value) => value.length >= 8,
      message: "Password must contain at least 8 characters.",
    },
    {
      test: (value) => /[A-Z]/.test(value),
      message: "Password must contain an uppercase letter.",
    },
    {
      test: (value) => /[0-9]/.test(value),
      message: "Password must contain a number.",
    },
  ],

  confirmPassword: [
{
  test: (value) => value.length > 0,
  message: "Please confirm your password.",
},
    {
      test: (value, values) => value === values.password,
      message: "Passwords do not match.",
    },
  ],
};

export function evaluateErrors(values, rules) {
  const errors = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = values[field] ?? "";

    for (const rule of fieldRules) {
      if (!rule.test(value, values)) {
        errors[field] = rule.message;
        break;
      }
    }
  }

  return errors;
}
