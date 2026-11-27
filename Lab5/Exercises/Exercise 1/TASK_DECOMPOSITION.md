# Exercise 1 — Sprint 1: Evidence Dashboard

## Objective

Build a responsive evidence dashboard for the Himass & TanVuu PUBG fair-play case while applying React state-management and responsive-layout principles.

## Requirements

### Exercise 0.1 — State Management

- Implement a pure `appReducer(state, action)`.
- Split `AppStateContext` and `AppDispatchContext`.
- Implement theme and active-tab state.
- Keep reducer free of side effects.
- Ensure dispatch-only components do not subscribe to state.

### Exercise 0.2 — Derived State & Responsive

- Implement pagination using render-time calculations.
- No `useEffect` for pagination.
- Initialize state correctly.
- Use stable keys (`clip._id`).
- Implement responsive container queries.
- Use `100dvh` and minimum 44x44px touch targets.

### Sprint 1 — Evidence Dashboard

- Create the dashboard shell.
- Integrate the provider and evidence grid.
- Implement theme toggle and tab navigation.
- Create responsive evidence cards.
- Use realistic case-related sample data.

## Planned Structure

- `src/context/AppProvider.jsx`
- `src/components/ThemeToggle.jsx`
- `src/components/Sidebar.jsx`
- `src/components/Header.jsx`
- `src/components/EvidenceGrid.jsx`
- `src/components/EvidenceCard.jsx`
- `src/data/evidence.js`
- `src/reducer/appReducer.js`
- `src/App.jsx`
- `src/index.css`

git commit -m "style(exercise-1): implement responsive archive dashboard"

## Verification

- Theme toggle changes the theme.
- Tab navigation changes active content.
- Evidence pagination works.
- No pagination `useEffect`.
- State-only consumers and dispatch-only consumers are separated.
- Layout works on narrow and wide screens.
- Git history contains atomic commits.
