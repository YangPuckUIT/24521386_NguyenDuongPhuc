
import { useMemo } from "react";
import { FormContext } from "./form-context";
import { evaluateErrors } from "../utils/validation";

export function FormProvider({
  values,
  rules,
  touched,
  onFieldChange,
  onFieldBlur,
  children,
}) {
  const errors = useMemo(
    () => evaluateErrors(values, rules),
    [values, rules]
  );

  const isValid = Object.keys(errors).length === 0;

  const contextValue = useMemo(
    () => ({
      values,
      errors,
      isValid,
      touched,
      onFieldChange,
      onFieldBlur,
    }),
    [
      values,
      errors,
      isValid,
      touched,
      onFieldChange,
      onFieldBlur,
    ]
  );

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
}
