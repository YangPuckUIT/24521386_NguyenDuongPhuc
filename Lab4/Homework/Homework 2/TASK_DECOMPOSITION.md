# Homework 2 — Full-Stack Esports Fair-Play Appeal Tribunal

## Project Overview

Build a full-stack React and Express application for managing esports fair-play appeals based on the Himass & TanVuu case study.

## Sprint Plan

### Sprint 1 — Multi-Route Dossier Navigation

- [ ] Set up React Router v7.
- [ ] Implement `PeopleLayout.jsx` with nested routes and `<Outlet />`.
- [ ] Implement sidebar navigation using `<NavLink>`.
- [ ] Implement `PersonDetail.jsx` using `useParams()`.
- [ ] Retrieve player records using `people.find()`.
- [ ] Handle invalid player IDs with a 404 boundary.
- [ ] Display player information using semantic HTML (`dl`, `dt`, `dd`).

### Sprint 2 — Appeal Form Engine

- [ ] Implement `FormContext.js` and `useFormContext()`.
- [ ] Implement `SimpleForm.jsx`.
- [ ] Add synchronous form validation during rendering.
- [ ] Implement `InputField.jsx` with `useId()`.
- [ ] Add accessible validation using `aria-invalid` and `aria-describedby`.
- [ ] Implement `ShowData.jsx` as a semantic JSON inspector.
- [ ] Test real-time field validation.

### Sprint 3 — Forum API and Custom Hooks

- [ ] Implement `useForumMessages.js`.
- [ ] Fetch messages with `AbortController`.
- [ ] Handle request cancellation and cleanup.
- [ ] Implement the POST message helper.
- [ ] Set up the Express REST API server.
- [ ] Configure CORS and JSON middleware.
- [ ] Implement GET and POST message endpoints.
- [ ] Validate request payloads.
- [ ] Generate message IDs using `crypto.randomUUID()`.

### Additional Requirements

- [ ] Implement `useAppealSlaTimer()` synchronized with the system clock.
- [ ] Implement context-driven appeal form behavior.
- [ ] Complete `AI_FAILURE_AUDIT.md` with architecture analysis.

### Sprint 4 — Testing and Live Defense Preparation

- [ ] Test URL Search Params synchronization.
- [ ] Test cross-field validation.
- [ ] Test automatic retry with exponential backoff.
- [ ] Test protected route guards.
- [ ] Verify all application routes and API endpoints.
- [ ] Prepare screenshots and project documentation.

## Git Workflow

Use small, focused commits following Conventional Commits.

- `feat`: New functionality
- `fix`: Bug fixes
- `docs`: Documentation
- `refactor`: Code restructuring
- `test`: Tests

Complete and verify each task before committing.
