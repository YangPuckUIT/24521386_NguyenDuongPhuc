# HW3: Resilient Landing Page

## 1. Objective

Build a responsive landing page using HTML, CSS, and vanilla JavaScript. The application must provide an accurate UTC countdown, a state-machine form, duplicate-submission prevention, and safe input handling.

## 2. Architecture

### Component 1: HTML Contract and Semantic DOM

**Responsibilities**
- Define the landing page, countdown display, and form.
- Use semantic HTML elements and accessible labels.
- Load JavaScript modules explicitly.

**Acceptance Criteria**
- The page uses semantic HTML.
- Every form control has an accessible label.
- The countdown and form status are accessible to assistive technologies.
- The page works at a viewport width of 375px.

### Component 2: Drift-Free Countdown Engine

**Responsibilities**
- Accept a target timestamp in UTC ISO 8601 format.
- Calculate the remaining time using the target timestamp and current time.
- Update the countdown display.
- Stop updating when the countdown reaches zero.
- Clean up timers when they are no longer needed.

**Acceptance Criteria**
- The target timestamp is parsed consistently.
- Remaining time is recalculated from the current time instead of decrementing a counter.
- The countdown never displays negative time.
- The countdown reaches zero and stops.
- Timer resources are cleaned up correctly.

### Component 3: Form State Machine

**Responsibilities**
- Manage the states `Idle`, `Submitting`, `Success`, and `Error`.
- Validate input before processing.
- Provide clear status and error messages.
- Restore an appropriate state after a failed submission.

**Acceptance Criteria**
- Only valid state transitions are allowed.
- Invalid input does not trigger submission.
- Success and error states provide understandable feedback.
- Status changes are accessible to keyboard and screen-reader users.

### Component 4: Submission Protection and Input Security

**Responsibilities**
- Prevent duplicate submissions.
- Disable or otherwise protect the submit control while a submission is in progress.
- Treat user input as text, not executable HTML.
- Validate and constrain input according to the form requirements.

**Acceptance Criteria**
- Repeated clicks and rapid submission attempts do not create duplicate requests.
- Input is handled safely without inserting untrusted content through `innerHTML`.
- The submit control becomes available again when appropriate.
- Input validation and output handling are verified.

## 3. Implementation Milestones

### M0: Planning
- Define architecture and acceptance criteria.
- Confirm the project structure.
- Define the state machine and testing strategy.
- Commit the planning document.

### M1: HTML and CSS Contract
- Create the semantic landing page structure.
- Add countdown and form elements.
- Implement responsive styling.
- Verify keyboard navigation and visible focus.
- Commit the page structure separately.

### M2: Countdown Engine
- Implement UTC timestamp parsing.
- Calculate remaining time from the target and current timestamps.
- Implement timer cleanup.
- Test future, expired, and invalid timestamps.
- Commit the countdown implementation separately.

### M3: Form State Machine
- Implement the four form states.
- Define allowed transitions.
- Implement validation and status feedback.
- Test success and error paths.
- Commit the form state machine separately.

### M4: Submission Protection and Security
- Prevent duplicate submissions.
- Sanitize or safely render user-controlled input.
- Review event listeners and timer cleanup.
- Test invalid input and repeated submission attempts.
- Commit security fixes separately.

### M5: Final Verification and AI Failure Audit
- Test the complete application.
- Verify responsiveness at 375px.
- Verify keyboard accessibility.
- Inspect the browser console and network activity where applicable.
- Review Git history and final repository status.
- Document three real AI-induced defects discovered during review.
- Commit the audit and verification report.

## 4. Architectural Constraints

- Use HTML, CSS, and vanilla JavaScript unless the assignment explicitly requires another technology.
- Keep the countdown logic independent of presentation code where practical.
- Recalculate countdown time from timestamps instead of decrementing a counter.
- Model form states explicitly.
- Prevent duplicate submissions while processing.
- Never insert untrusted user input as executable HTML.
- Keep commits small, meaningful, and independently reviewable.
- Do not modify HW2 while implementing HW3.

## 5. Testing Strategy

### Countdown
- Valid future UTC timestamp.
- Timestamp already in the past.
- Invalid timestamp.
- Countdown accuracy over time.
- Timer cleanup after completion.

### Form
- Empty input.
- Invalid input.
- Successful submission.
- Failed submission.
- Repeated clicks during submission.
- Keyboard-only operation.

### Responsive and Accessibility
- Viewport width of 375px.
- No unintended horizontal overflow.
- Logical heading structure.
- Accessible form labels and status messages.
- Visible keyboard focus.
- All interactive controls usable without a mouse.

### Security
- Attempt to submit HTML-like input.
- Confirm input is displayed as text.
- Confirm repeated submission attempts are blocked.
- Inspect DOM updates and browser console.

## 6. AI Failure Audit

Document three actual AI-induced defects discovered during review. For each defect, include:

1. **Defect Description:** What was wrong and how it affected behavior.
2. **Diagnostic Method:** How the defect was discovered, such as Git diff inspection, a focused test, or a DevTools breakpoint.
3. **Refactored Solution:** What changed and why the solution is safer or more reliable.
4. **Verification Evidence:** The test or observation that confirms the fix.

Do not invent defects or claim a fix was verified without evidence.

## 7. Git Commit Plan

1. `docs(hw3): define architecture and acceptance criteria`
2. `feat(hw3): create semantic responsive landing page`
3. `feat(hw3): implement drift-free UTC countdown`
4. `feat(hw3): implement form state machine`
5. `fix(hw3): prevent duplicate submissions and unsafe rendering`
6. `docs(hw3): add AI failure audit and verification results`

Each commit must contain the work described by its message. Adjust the plan when necessary to reflect actual implementation and testing.

## 8. Live Defense Preparation

Be prepared to explain:
- Why countdown time is recalculated from timestamps.
- How UTC ISO 8601 timestamps are interpreted.
- How the form state machine controls transitions.
- Why duplicate submissions must be prevented.
- Why untrusted input must not be rendered as HTML.
- How timer cleanup prevents unnecessary background work.
- How keyboard accessibility and responsive behavior were verified.
- How each identified AI-induced defect was diagnosed and fixed.

**Engineering principle:** Generate with AI, verify with engineering.