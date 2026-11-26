# Homework 3 – Photo Gallery Layout

## Objective

Build an interactive photo gallery using React Router's `useSearchParams` and the native HTML5 `<dialog>` element.

The implementation must synchronize the selected photo with the URL and provide accessible modal interactions following WCAG 2.2 AA principles.

## Development Rules

- Follow the Slide 30 code contract.
- Use `useSearchParams()` for URL query synchronization.
- Derive `selectedPhotoId` directly from `searchParams`.
- Use `useRef()` to control the native HTML5 dialog.
- Use `showModal()` and `close()` through `useEffect()`.
- Synchronize dialog closing with `setSearchParams({})`.
- Avoid duplicated state for URL-derived information.
- Keep components modular and maintainable.
- Use atomic Git commits for completed milestones.

## Milestones

### M0 – Project Setup and Planning

- [x] Create project structure.
- [x] Create `TASK_DECOMPOSITION.md`.
- [x] Configure the React development environment.
- [x] Verify the project runs successfully.

### M1 – Photo Gallery Interface

- [x] Prepare photo data.
- [x] Build the gallery layout.
- [x] Display photos with appropriate descriptions.
- [x] Implement photo selection interactions.

### M2 – URL State Synchronization

- [x] Configure React Router.
- [x] Implement `useSearchParams()`.
- [x] Derive `selectedPhotoId` from the URL.
- [x] Update the URL when selecting a photo.

### M3 – Native HTML5 Dialog

- [ ] Create and bind `dialogRef`.
- [ ] Implement `showModal()` and `close()` inside `useEffect()`.
- [ ] Display the selected photo in the dialog.
- [ ] Synchronize dialog closing with `setSearchParams({})`.

### M4 – Accessibility and Focus Management

- [ ] Verify native dialog focus behavior.
- [ ] Support keyboard interaction.
- [ ] Ensure focus returns to the triggering element after closing.
- [ ] Verify accessible dialog labeling and controls.

### M5 – Final Verification

- [ ] Test opening and closing the dialog.
- [ ] Test direct URL access with a valid `photoId`.
- [ ] Test browser back and forward navigation.
- [ ] Verify URL synchronization.
- [ ] Check keyboard accessibility.
- [ ] Capture screenshots and document the implementation.

## Acceptance Criteria

- The gallery displays all available photos.
- Selecting a photo updates the URL query parameter.
- The selected photo is derived from `photoId`.
- The native HTML5 dialog opens using `showModal()`.
- The dialog closes when the selected photo ID is removed.
- Closing the dialog clears the URL query string.
- Keyboard users can interact with the gallery and dialog.
- Focus is managed appropriately when the dialog opens and closes.
- No console errors occur during normal interactions.

## Commit Strategy

Use Conventional Commits with small, focused changes.

Examples:

- `chore(hw3): initialize photo gallery project`
- `feat(hw3): build photo gallery layout`
- `feat(hw3): synchronize selected photo with URL`
- `feat(hw3): implement native dialog modal`
- `fix(hw3): improve modal focus management`
- `docs(hw3): document implementation and screenshots`

## Definition of Done

- All milestones are completed.
- All acceptance criteria are verified.
- The application runs successfully.
- Screenshots demonstrate the required functionality.
- Git changes are committed and pushed.
