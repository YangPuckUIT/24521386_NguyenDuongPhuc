# AI Failure Audit

## 1. Project Overview

The Full-Stack Esports Fair-Play Appeal Tribunal is a web application for managing esports player appeal cases. It provides player dossiers, an appeal form, case discussions, and an SLA countdown.

The application uses React and React Router for the frontend, and Node.js with Express for the backend.

## 2. Architecture Decisions

### Frontend

- React components are separated by responsibility.
- React Router handles navigation between player dossiers.
- Context API shares form state between form components.
- Custom hooks encapsulate reusable logic, including forum message fetching and SLA countdown calculations.

### Backend

- Express provides REST API endpoints for forum messages.
- CORS allows the frontend development server to communicate with the backend.
- Message data is currently stored in memory for demonstration purposes.

## 3. Potential AI-Generated Code Failures

| Area             | Potential Failure                                                        | Impact                                          | Prevention                                            |
| ---------------- | ------------------------------------------------------------------------ | ----------------------------------------------- | ----------------------------------------------------- |
| Routing          | Incorrect route parameters or missing 404 handling                       | Users may see the wrong dossier                 | Test valid and invalid player IDs                     |
| Form validation  | Validation runs asynchronously when synchronous validation is sufficient | Unnecessary rendering and inconsistent feedback | Derive validation errors directly during render       |
| Accessibility    | Inputs have no associated labels or error descriptions                   | Screen readers may not communicate form errors  | Use `useId`, `htmlFor`, and ARIA attributes           |
| API              | Missing payload validation                                               | Invalid messages may enter the system           | Validate required fields on the backend               |
| Data fetching    | Requests are not cancelled when components unmount                       | Stale updates or unnecessary requests           | Use AbortController and cleanup                       |
| SLA timer        | Countdown subtracts one second per interval                              | Timer may drift when the browser is inactive    | Recalculate using the fixed deadline and `Date.now()` |
| State management | Frontend assumes API requests always succeed                             | Users may not know when an operation fails      | Handle loading, success, and error states             |

## 4. Testing Strategy

The following checks are used to verify the application:

- Open both Himass and TanVuu dossiers.
- Navigate to an invalid player ID and verify the 404 state.
- Submit valid and invalid appeal form data.
- Retrieve forum messages using GET requests.
- Submit a new message using POST requests.
- Verify that empty messages are rejected with HTTP 400.
- Refresh the page and verify that the SLA countdown uses the same fixed deadline.
- Run the frontend production build to identify compilation errors.

## 5. Known Limitations

- Forum messages are stored in memory and are lost when the backend restarts.
- SLA deadlines are currently defined in frontend demo data rather than a persistent database.
- The application does not include authentication or role-based authorization.
- The current API is intended for coursework demonstration, not production deployment.

## 6. Conclusion

This project demonstrates component-based architecture, reusable React hooks, context-driven form state, REST API development, and basic error handling.

The audit highlights the importance of reviewing AI-generated code instead of accepting it without testing. Correctness, accessibility, maintainability, and predictable behavior should be verified before considering a feature complete.
