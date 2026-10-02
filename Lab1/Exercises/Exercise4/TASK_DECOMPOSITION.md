# Exercise 4 - Resilient Component Architecture

## State Machine

The component has four states:

- Loading
- Live Data
- Empty
- Error

State transitions:

Loading → Live Data
Loading → Empty
Loading → Error
Error → Loading (Retry)

## Sub-Tasks

### T-03A: Loading Skeleton
- Create a loading skeleton.
- Use pure CSS shimmer animation.
- Do not use JavaScript for the shimmer effect.

### T-03B: Live Data
- Display live data using CSS Grid.
- Use Flexbox for metadata badges.

### T-03C: Empty & Error
- Create an empty state.
- Create an error state.
- Add an accessible Retry button.

## Commit Strategy

Each sub-task must be committed individually:

- feat(css): skeleton
- feat(css): live data
- feat(ui): empty and error states