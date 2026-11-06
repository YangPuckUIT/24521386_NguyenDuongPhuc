# HW1 – Production Studio Drum Kit

## Goal

Modernize Legacy Slide 26 Drum Kit using React, WCAG 2.2 AA accessibility standards, and Lighthouse best practices.

## Task 1 – Project Setup

- [x] Initialize React + Vite project
- [x] Install dependencies
- [x] Verify development server
- [x] Verify initial Git commit

Commit: `chore(hw1): initialize drum kit project`

## Task 2 – Drum Pad Components

- [x] Create `src/data/drumPads.js`
- [x] Define seven drum pads (W/A/S/D/J/K/L)
- [x] Create `DrumPad.jsx`
- [x] Create `DrumKit.jsx`
- [x] Render all seven pads
- [x] Verify component rendering

Commit: `feat(hw1): add drum pad components`

## Task 3 – Keyboard Controls

- [x] Create `useDrumKeyboard.js`
- [x] Use `event.code` instead of deprecated `keyCode`
- [x] Ignore `event.repeat`
- [x] Ignore shortcuts while typing in input fields
- [x] Handle keyboard listener cleanup
- [x] Test all seven physical keys

Commit: `feat(hw1): implement keyboard controls`

## Task 4 – Audio Playback

- [x] Add drum sound assets
- [x] Implement pad audio playback
- [x] Handle `keydown` and `keyup`
- [x] Support mouse and keyboard triggering
- [x] Verify playback behavior

Commit: `feat(hw1): add drum audio playback`

## Task 5 – Accessibility

- [x] Use semantic HTML buttons
- [x] Implement `aria-pressed` for active pads
- [x] Provide visible keyboard focus
- [x] Support Tab, Enter, and Space
- [x] Check color contrast
- [x] Verify WCAG 2.2 AA requirements

Commit: `feat(hw1): improve pad accessibility`

## Task 6 – Visual Hit History

- [x] Create `HitHistory.jsx`
- [x] Display recently triggered pads
- [x] Use `<output aria-live="polite">`
- [x] Ensure sound events have accessible text alternatives

Commit: `feat(hw1): add accessible hit history`

## Task 7 – Visual Decibel Meter

- [x] Create `DecibelMeter.jsx`
- [x] Display visual audio activity
- [x] Update meter when pads are triggered
- [x] Provide accessible text for meter values

Commit: `feat(hw1): add visual audio meter`

## Task 8 – Quality Assurance

- [ ] Test responsive layouts
- [ ] Test keyboard-only navigation
- [ ] Test Vietnamese UniKey input behavior
- [ ] Run Lighthouse audit
- [ ] Run automated accessibility checks
- [ ] Perform manual WCAG checks
- [ ] Fix identified issues
- [ ] Run production build

Commit: `test(hw1): verify accessibility and performance`

## Definition of Done

- All seven drum pads work
- Physical keyboard shortcuts work correctly
- No OS key-repeat flooding
- Input focus isolation works
- Visual hit history is accessible
- Visual audio meter works
- WCAG 2.2 AA checks pass
- Lighthouse scores are verified, targeting 100
- Production build succeeds
