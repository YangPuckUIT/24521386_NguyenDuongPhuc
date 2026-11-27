# Exercise 0 — State Management & Responsive Dashboard

A responsive evidence dashboard for the Himass & TanVuu case archive, built with React and Vite.

## Objectives

- Implement a pure `useReducer` state management architecture.
- Separate state and dispatch contexts.
- Prevent unnecessary component re-renders.
- Implement pagination using derived state without `useEffect`.
- Build a responsive dashboard using CSS container queries.

## Features

- Dark and light theme switching.
- Sidebar navigation with multiple sections.
- Evidence cards with status labels.
- Pagination with render-time calculations.
- Responsive layout for desktop and mobile.
- React DevTools Profiler inspection.

## Technologies

- React
- Vite
- JavaScript
- CSS

## Project Structure

```text
Exercise 1/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── reducer/
│   ├── App.jsx
│   └── index.css
├── TASK_DECOMPOSITION.md
└── README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## Notes

Evidence records are mock data for demonstration purposes. Timeline and Case Overview sections are placeholders.

## Author

Nguyen Duong Phuc — UIT
