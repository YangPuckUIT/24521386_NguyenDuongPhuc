
# Exercise 2 - Interactive Scientist & Pioneer Directory

## Objective
Transform the static smartPeople array into an interactive
React directory using reconciliation and derived state.

## Checkpoint 1 - Normalize Data Schema

Status: Completed

### Tasks
- [x] Initialize React project with Vite
- [x] Create SMART_PEOPLE dataset
- [x] Assign stable IDs to all six pioneers
- [x] Create ScientistDirectory component
- [x] Render people using map()
- [x] Use stable person.id as React key

### Files
- src/data/smartPeople.js
- src/components/ScientistDirectory.jsx
- src/App.jsx
- src/App.css
- src/index.css

### Expected Result
Six pioneers are displayed with their names,
ages, and IQ values.

## Checkpoint 2 - Search, Filter and Sort

Status: Pending

- [ ] Add case-insensitive search
- [ ] Add numeric minimum IQ filter
- [ ] Add sorting using toSorted()
- [ ] Calculate visible people as derived state
- [ ] Avoid useEffect for filtering and sorting

## Checkpoint 3 - Delete, Reset and Accessibility

Status: Pending

- [ ] Delete people immutably
- [ ] Reset original data
- [ ] Add accessible live result counter
- [ ] Verify stable React keys
- [ ] Verify rendering with React DevTools
