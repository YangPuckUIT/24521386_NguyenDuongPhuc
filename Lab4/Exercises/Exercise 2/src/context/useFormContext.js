
import { useContext } from "react";
import { FormContext } from "./form-context";

export function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error(
      "useFormContext must be used inside FormProvider."
    );
  }

  return context;
}
