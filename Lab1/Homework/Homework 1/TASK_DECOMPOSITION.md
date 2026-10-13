# HW1 — Production Portfolio: Task Decomposition

## 1. Objective

Build and improve a portfolio website with a focus on accessibility, keyboard navigation, security, and performance.

The implementation must follow small, atomic milestones with separate commits. All changes must be tested and verified before being marked complete.

## 2. Development Rules

- Work on one milestone at a time.
- Inspect the existing project before modifying code.
- Keep each commit focused on a specific change.
- Test each milestone before moving to the next.
- Do not combine all changes into one large commit.
- Record actual test results and update progress honestly.

## 3. Milestones

### M0 — Project Inspection and Baseline

**Tasks**

- [ ] Inspect the repository structure and existing source code.
- [ ] Identify the website pages, navigation, interactive elements, and assets.
- [ ] Identify the available build, run, and test commands.
- [ ] Run the website and check its current behavior.
- [ ] Record baseline accessibility and Lighthouse results where applicable.

**Acceptance Criteria**

- The existing project structure is understood.
- The website can be run using documented instructions.
- Initial issues and baseline results are recorded.

**Commit**

`docs: document portfolio audit plan`

### M1 — WCAG 2.2 AA Accessibility Audit

**Tasks**

- [ ] Audit text and interface contrast.
- [ ] Check semantic landmarks such as `header`, `nav`, `main`, and `footer`.
- [ ] Check heading hierarchy and accessible names.
- [ ] Check keyboard accessibility and visible focus indicators.
- [ ] Fix identified accessibility issues.
- [ ] Recheck the affected elements after the fixes.

**Acceptance Criteria**

- Identified contrast and landmark issues are fixed.
- Interactive elements can be accessed using a keyboard.
- Relevant accessibility checks have been performed.
- Remaining issues are documented honestly.

**Required Commit**

`fix(a11y): contrast & landmarks`

### M2 — Focus Trap Audit

**Tasks**

- [ ] Identify menus, dialogs, overlays, and other focus-managing components.
- [ ] Test keyboard navigation using Tab and Shift+Tab.
- [ ] Check that users can leave interactive components when appropriate.
- [ ] Check focus restoration when menus or dialogs close.
- [ ] Fix confirmed focus-management problems.
- [ ] Retest keyboard navigation.

**Acceptance Criteria**

- Keyboard focus follows the intended interaction flow.
- No unintended focus traps remain.
- Intentional modal focus management has a valid exit path.
- The relevant keyboard interactions have been tested.

**Required Commit**

`fix(nav): keyboard trap prevention`

### M3 — Strict Content Security Policy (CSP)

**Tasks**

- [ ] Search for inline event-handler attributes such as `onclick`, `onload`, and similar patterns.
- [ ] Replace inline event handlers with appropriate JavaScript event listeners.
- [ ] Identify scripts, styles, images, fonts, and other required resources.
- [ ] Configure a strict CSP suitable for the project's hosting environment.
- [ ] Avoid unnecessary unsafe CSP exceptions.
- [ ] Test the website and inspect browser-console CSP violations.

**Acceptance Criteria**

- No inline event-handler attributes remain in the shipped HTML.
- The CSP is configured through an appropriate response header or supported meta policy.
- Required website functionality continues to work.
- CSP violations and any remaining limitations are documented.

**Commit**

`security: enforce strict CSP and remove inline handlers`

### M4 — Lighthouse Performance Audit

**Tasks**

- [ ] Run Lighthouse and record the baseline results.
- [ ] Identify performance bottlenecks.
- [ ] Optimize images and other assets where appropriate.
- [ ] Reduce unnecessary resource loading.
- [ ] Verify that optimizations do not break the website.
- [ ] Run Lighthouse again under a consistent test setup.

**Acceptance Criteria**

- The required Lighthouse target is verified with recorded results.
- Performance improvements are supported by test results.
- The website continues to function correctly.
- A score below 100 is reported honestly rather than claimed as a pass.

**Required Commit**

`perf: optimize assets`

## 4. Final Verification

- [ ] Run the available build and test commands.
- [ ] Recheck the accessibility fixes from M1.
- [ ] Recheck keyboard navigation and focus behavior from M2.
- [ ] Verify the CSP and absence of inline event handlers.
- [ ] Record the final Lighthouse results.
- [ ] Review the Git history to confirm that milestones were committed separately.

## 5. Definition of Done

A milestone is complete only when:

1. Its implementation matches the task requirements.
2. Its acceptance criteria have been checked.
3. Relevant tests or manual verification have been performed.
4. Its changes have been committed separately.
5. The commit message accurately describes the changes.
6. This document reflects the actual completion status.

## 6. Progress Tracker

| Milestone                            | Status      |
| ------------------------------------ | ----------- |
| M0 — Project Inspection and Baseline | Not started |
| M1 — WCAG 2.2 AA Audit               | Not started |
| M2 — Focus Trap Audit                | Not started |
| M3 — Strict CSP                      | Not started |
| M4 — Lighthouse Performance Audit    | Not started |
| Final Verification                   | Not started |
