# Homework 2 — Full-Stack Esports Fair-Play Appeal Tribunal

## Project Overview

Build a full-stack React and Express application for managing esports fair-play appeals based on the Himass & TanVuu case study.

## Sprint Plan

### Sprint 1 — Multi-Route Dossier Navigation

- [x] Set up React Router v7.
- [x] Implement `PeopleLayout.jsx` with nested routes and `<Outlet />`.
- [x] Implement sidebar navigation using `<NavLink>`.
- [x] Implement `PersonDetail.jsx` using `useParams()`.
- [x] Retrieve player records using `people.find()`.
- [x] Handle invalid player IDs with a 404 boundary.
- [x] Display player information using semantic HTML (`dl`, `dt`, `dd`).

### Sprint 2 — Appeal Form Engine

- [x] Implement `FormContext.js` and `useFormContext()`.
- [x] Implement `SimpleForm.jsx`.
- [x] Add synchronous form validation during rendering.
- [x] Implement `InputField.jsx` with `useId()`.
- [x] Add accessible validation using `aria-invalid` and `aria-describedby`.
- [x] Implement `ShowData.jsx` as a semantic JSON inspector.
- [x] Test real-time field validation.

### Sprint 3 — Forum API and Custom Hooks

- [x] Implement `useForumMessages.js`.
- [x] Fetch messages with `AbortController`.
- [x] Handle request cancellation and cleanup.
- [x] Implement the POST message helper.
- [x] Set up the Express REST API server.
- [x] Configure CORS and JSON middleware.
- [x] Implement GET and POST message endpoints.
- [x] Validate request payloads.
- [x] Generate message IDs using `crypto.randomUUID()`.

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
