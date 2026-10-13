from pathlib import Path

content = """# Task Decomposition — Homework 1 & 2

## Working Rules

- Work in small, reviewable milestones.
- Complete and test each milestone before committing it.
- Keep commits focused on one purpose.
- Do not combine all changes into one large commit.
- Understand and be able to explain every implementation decision.
- Update this file when a task is completed; do not mark work as done before verifying it.

---

# HW1 — Production Portfolio

## HW1 Goal

Build and verify a portfolio website with accessible navigation, a strict Content Security Policy (CSP), no inline event handlers, and optimized performance.

### M0 — Inspect and Plan

**Tasks**
- [ ] Review the existing repository, files, scripts, and current website behavior.
- [ ] Identify the pages, navigation elements, interactive controls, and assets.
- [ ] Record the baseline accessibility and Lighthouse results.
- [ ] Confirm how the site is built and served before changing CSP.

**Acceptance criteria**
- [ ] The current structure and test/build commands are documented.
- [ ] Baseline issues are recorded so later changes can be verified.

**Commit**
- `docs: document portfolio audit plan`

### M1 — WCAG 2.2 AA Audit

**Tasks**
- [ ] Check text and UI contrast.
- [ ] Check semantic landmarks and heading structure.
- [ ] Check accessible names and labels for interactive elements.
- [ ] Check keyboard access and visible focus indicators.
- [ ] Fix confirmed issues and retest.

**Acceptance criteria**
- [ ] Contrast and landmark issues found during the audit are addressed.
- [ ] Main interactions can be reached and operated with a keyboard.
- [ ] Audit results and any known limitations are documented.

**Required commit**
- `fix(a11y): contrast & landmarks`

### M2 — Focus Trap Audit

**Tasks**
- [ ] Identify menus, dialogs, overlays, and other components that manage focus.
- [ ] Test Tab and Shift+Tab behavior when these components open.
- [ ] Ensure focus cannot become unintentionally trapped.
- [ ] Ensure focus is restored appropriately when a component closes.
- [ ] Retest keyboard navigation.

**Acceptance criteria**
- [ ] Keyboard focus follows the intended interaction flow.
- [ ] Any intentional modal focus management has a valid exit path.
- [ ] Focus behavior has been manually tested.

**Required commit**
- `fix(nav): keyboard trap prevention`

### M3 — Strict CSP and No Inline Handlers

**Tasks**
- [ ] Search the codebase for inline event-handler attributes such as `onclick=`, `onload=`, and similar patterns.
- [ ] Replace inline handlers with JavaScript event listeners or the framework's event system.
- [ ] Identify scripts, styles, fonts, and other resources required by the site.
- [ ] Configure a strict CSP appropriate to the actual hosting setup.
- [ ] Avoid unsafe CSP exceptions where possible; do not add `unsafe-inline` merely to make the page work.
- [ ] Test the site and inspect the browser console for CSP violations.

**Acceptance criteria**
- [ ] No inline event-handler attributes remain in the shipped HTML.
- [ ] CSP is delivered through the appropriate response header or supported meta policy.
- [ ] Required site features work without unexpected CSP violations.
- [ ] The final policy and any unavoidable limitations are documented.

**Commit**
- `security: enforce strict CSP and remove inline handlers`

### M4 — Lighthouse Performance Audit

**Tasks**
- [ ] Run Lighthouse and save the initial results.
- [ ] Inspect performance findings and identify the main bottlenecks.
- [ ] Optimize images and other assets where appropriate.
- [ ] Reduce unnecessary loading and improve asset delivery without breaking the design.
- [ ] Run Lighthouse again under a consistent test setup.

**Acceptance criteria**
- [ ] The Lighthouse target specified by the assignment is verified with recorded results.
- [ ] The performance changes are evidence-based and do not break functionality.
- [ ] If a score is below 100, document the remaining cause rather than claiming it passed.

**Required commit**
- `perf: optimize assets`

### HW1 Final Verification

- [ ] Run the available build and test commands.
- [ ] Recheck keyboard navigation and accessibility fixes.
- [ ] Recheck CSP and confirm there are no inline event handlers.
- [ ] Record final Lighthouse results.
- [ ] Review the commit history and ensure each milestone is a separate, focused change.

---

# HW2 — Drum Kit Engine (Contract-First)

## HW2 Goal

Build a drum kit whose HTML declares the sound mapping contract and whose JavaScript independently handles audio playback, keyboard input, and beat recording.

**Mandatory order:** HTML contract → audio engine → keyboard listener → FIFO recorder.

### H2.1 — Define and Commit the HTML Data-Sound Contract

**Tasks**
- [ ] Inspect the existing HTML and available sound assets.
- [ ] Decide how each drum control declares its sound using a `data-sound` attribute.
- [ ] Use consistent sound identifiers and ensure each identifier maps to a known sound.
- [ ] Document the contract and how JavaScript is expected to consume it.
- [ ] Validate the HTML contract before implementing the engine.

**Acceptance criteria**
- [ ] Each playable control has a clear, consistent sound identifier.
- [ ] The contract can be understood without reading the JavaScript implementation.
- [ ] No JavaScript engine implementation has been started before this contract commit.

**Commit**
- `feat(audio): define HTML data-sound contract`

### H2.2 — Implement the Polyphonic Audio Engine

**Tasks**
- [ ] Implement audio playback as a separate module or component.
- [ ] Make the engine accept a sound identifier rather than a hard-coded keyboard key.
- [ ] Support overlapping sounds so a new drum hit does not stop an earlier hit.
- [ ] Handle missing or invalid sound identifiers safely.
- [ ] Test rapid hits and simultaneous different sounds.

**Acceptance criteria**
- [ ] The engine can play multiple sounds concurrently.
- [ ] Audio playback logic does not depend on a particular keyboard layout.
- [ ] Invalid sound identifiers fail safely.

**Commit**
- `feat(audio): implement polyphonic playback engine`

### H2.3 — Implement the Keyboard Listener

**Tasks**
- [ ] Read the HTML sound contract to associate configured keys or controls with sounds.
- [ ] Keep key bindings in one clearly identifiable configuration or mapping.
- [ ] Implement the `keydown` listener.
- [ ] Use `event.repeat` throttling so holding a key does not trigger repeated hits unintentionally.
- [ ] Test each binding, rapid presses, and held keys.
- [ ] Ensure changing a binding does not require rewriting the audio engine.

**Acceptance criteria**
- [ ] Configured keys trigger the correct sounds.
- [ ] Held keys do not produce unwanted repeated hits.
- [ ] Key mapping and audio playback remain separate responsibilities.

**Commit**
- `feat(input): add configurable keyboard controls`

### H2.4 — Implement the FIFO Beat Recorder

**Tasks**
- [ ] Define the event structure for each recorded hit, including a sound identifier and timestamp.
- [ ] Append events to a queue in the order they occur.
- [ ] Preserve timestamps so the timing and order of hits can be inspected.
- [ ] Ensure recording does not block audio playback.
- [ ] Test several hits in quick succession and verify FIFO order.

**Acceptance criteria**
- [ ] Each recorded hit includes a timestamp and sound identifier.
- [ ] Events are retained in first-in, first-out order.
- [ ] The recorder is separate from the audio playback implementation.

**Commit**
- `feat(recorder): add timestamped FIFO beat recording`

### HW2 Final Verification and Live Defense

- [ ] Verify that the HTML contract is still the source of truth for sound identifiers.
- [ ] Test polyphonic playback.
- [ ] Test `event.repeat` behavior.
- [ ] Verify FIFO order and timestamps.
- [ ] Change a keyboard binding and practice completing the refactor within 3 minutes.
- [ ] Explain the responsibilities and interfaces of the contract, audio engine, keyboard listener, and recorder.

---

# Definition of Done

A task is complete only when:
1. Its implementation matches the task scope.
2. Its acceptance criteria have been checked.
3. Relevant tests or manual verification have been performed.
4. The change has been reviewed and committed separately.
5. The commit message accurately describes the change.
6. This document reflects the actual status.

## Progress Log

| Milestone | Status | Evidence / Notes |
|---|---|---|
| HW1 M0 — Inspect and plan | Not started | |
| HW1 M1 — WCAG 2.2 AA | Not started | |
| HW1 M2 — Focus trap audit | Not started | |
| HW1 M3 — Strict CSP | Not started | |
| HW1 M4 — Lighthouse | Not started | |
| HW2 H2.1 — HTML contract | Not started | |
| HW2 H2.2 — Audio engine | Not started | |
| HW2 H2.3 — Keyboard listener | Not started | |
| HW2 H2.4 — FIFO recorder | Not started | |
"""
path = Path("/mnt/data/TASK_DECOMPOSITION.md")
path.write_text(content, encoding="utf-8")
print(f"Created: {path}")
