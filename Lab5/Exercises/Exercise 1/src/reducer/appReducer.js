export const initialState = {
  theme: "dark",
  activeTab: "reels",
};

export function appReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };

    case "SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: action.payload,
      };

    default:
      return state;
  }
}
