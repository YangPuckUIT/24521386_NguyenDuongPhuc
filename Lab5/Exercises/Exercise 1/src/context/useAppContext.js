import { useContext } from "react";
import { AppStateContext, AppDispatchContext } from "./AppProvider";

export function useAppState() {
  const context = useContext(AppStateContext);

  if (context === null) {
    throw new Error("useAppState must be used inside AppProvider");
  }

  return context;
}

export function useAppDispatch() {
  const context = useContext(AppDispatchContext);

  if (context === null) {
    throw new Error("useAppDispatch must be used inside AppProvider");
  }

  return context;
}
