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

## M0 — Project Inspection and Baseline

**Tasks**

- [x] Inspect the repository structure and existing source code.
- [x] Identify the website sections, navigation, interactive elements, and assets.
- [x] Identify how to run the website and inspect its behavior.
- [x] Test basic keyboard navigation and browser loading behavior.
- [x] Run Lighthouse and record the initial results.
- [x] Save a screenshot of the baseline results.

**Project Structure**

The project uses Exercise 3 as its starting point. It is built with HTML, CSS, and vanilla JavaScript.

```text
Homework 1/
├── TASK_DECOMPOSITION.md
├── source/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── images/
│       └── angry.jpg
└── screenshots/
    └── lighthouse-baseline.png
```

**Initial Findings**

- The website contains a navigation bar, hero section, skills section, projects section, contact form, and footer.
- Interactive features include a theme toggle and contact form.
- The website uses HTML, CSS, and vanilla JavaScript without a frontend framework.
- The browser Console and Network panel were inspected during the initial test.
- Basic keyboard navigation using the Tab key was tested.

**Baseline Lighthouse Results**

The Lighthouse audit was run in a Chrome Incognito window to reduce potential interference from browser extensions.

| Category | Score |
|---|---:|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

An earlier Performance audit scored 90 in the regular Chrome profile. The score may have been affected by browser extensions, so the Incognito result is used as the baseline for subsequent comparisons.

**Initial Assessment**

The Lighthouse results indicate strong baseline scores across all four categories. However, Lighthouse scores alone do not prove that every accessibility, keyboard navigation, or security requirement has been satisfied.

The following milestones will verify the specific requirements and address any issues identified during testing.

**Baseline Evidence**

![Lighthouse baseline results](screenshots/lighthouse-baseline.png)

**Acceptance Criteria**

- [x] The existing project structure is documented.
- [x] The website can be run and its basic behavior has been checked.
- [x] Initial Lighthouse scores are recorded.
- [x] The baseline screenshot is saved.

**Commit**

`docs: document project inspection and baseline audit`

### M1: WCAG 2.2 AA Audit

**Changes**
- Added visible focus indicators for keyboard navigation.
- Improved text contrast for the Send Message button in dark mode.

**Verification**
- Lighthouse Accessibility score: 100.
- Checked six foreground/background color pairs using WebAIM Contrast Checker. All pairs passed WCAG AA requirements for normal text.
- Tested keyboard navigation using Tab and Shift + Tab in both light and dark themes.
- Verified that focus indicators were visible on interactive elements in both themes.

**Evidence**

Lighthouse Accessibility report:

![Lighthouse M1 Accessibility results](screenshots/lighthouse-m1-accessibility.png)

Keyboard focus in light theme:

![Keyboard focus in light theme](screenshots/keyboard-focus-light.png)

Keyboard focus in dark theme:

![Keyboard focus in dark theme](screenshots/keyboard-focus-dark.png)

**Acceptance Criteria**
- [x] Tested text color contrast meets WCAG AA requirements.
- [x] Interactive elements are keyboard accessible.
- [x] Focus indicators are visible in both themes.
- [x] Lighthouse Accessibility score is 100.

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
