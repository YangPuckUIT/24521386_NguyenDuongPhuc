
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

- [x] Add case-insensitive search
- [x] Add numeric minimum IQ filter
- [x] Add sorting using toSorted()
- [x] Calculate visible people as derived state
- [x] Avoid useEffect for filtering and sorting


## Checkpoint 3 - Delete, Reset and Accessibility

Status: Completed

### Tasks
- [x] Implement immutable deletion using filter()
- [x] Restore original dataset with Reset
- [x] Reset search, IQ and sorting inputs
- [x] Add output with role="status"
- [x] Add aria-live="polite"
- [x] Preserve stable keys using person.id
- [x] Add accessible Delete button labels
- [x] Handle empty search results

### React State
- people: current editable dataset
- query: search keyword
- minIq: minimum IQ threshold (number or null)
- sortBy: sorting preference

### Derived State
visiblePeople is calculated directly from people,
query, minIq and sortBy during render.

No useEffect is used for filtering or sorting.

### Verification
- Deleting a pioneer updates the result count
- Reset restores all six pioneers
- Search input retains focus after deleting an item
- Stable IDs preserve remaining item identities
- Live counter announces result changes
